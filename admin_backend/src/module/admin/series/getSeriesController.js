const { responsecodes } = require('../../../response-codes/lib');
const { db } = require('../../../common/db');
const { getDateTimeString } = require('../../../common/lib');
const utils = require('../../../common/utils');
const { getStatusText } = require('../../../response-codes/responseCode');

class GetSeriesController {
  static async getSeries(event, context) {
    let corelationId = await getDateTimeString();
    const request = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    let authorizer = await utils.getAdvertiserDetails(event);

    try {
      // Perform get operation
      const getSeriesResponse = await GetSeriesController.getSeriesOperation(
        request,
        corelationId,
        context,
        authorizer,
      );

      if (getSeriesResponse?.responseCode === 'OK') {
        return context.send(getSeriesResponse);
      } else {
        return context.status(400).send(getSeriesResponse);
      }
    } catch (err) {
      // Handle errors
      console.log('err=============>', err);
      return context.status(400).send(await utils.throwCatchError(err));
    }
  }

  static async getSeriesOperation(req, corelationId, context, authorizer) {
    try {
      const { search, start, length, dir, sortColumn } = req;

      const searchValue = search || '';

      const query = `SELECT * FROM shorts`;
      //   const [result] = await db.query(query, [`%${searchValue}%`, `%${searchValue}%`, `%${searchValue}%`]);
      const [result] = await db.query(query);

      return await utils.generateResponseObj({
        responseCode: responsecodes().SUCCESS_OK,
        responseMessage: getStatusText(responsecodes().SUCCESS_OK),
        responseData: result,
      });
    } catch (err) {
      console.log(err);
      return context.status(400).send(await utils.throwCatchError(err));
    }
  }
}

module.exports = GetSeriesController;
