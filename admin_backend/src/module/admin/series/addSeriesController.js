const { responsecodes } = require('../../../response-codes/lib');
const { db } = require('../../../common/db');
const { getDateTimeString } = require('../../../common/lib');
const utils = require('../../../common/utils');
const { getStatusText } = require('../../../response-codes/responseCode');

class AddSeriesController {
  static async addSeries(event, context) {
    let corelationId = await getDateTimeString();
    const request = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    let authorizer = await utils.getAdvertiserDetails(event);

    try {
      // Validate input data
      let response = await AddSeriesController.addSeriesValidator(event);
      if (Object.keys(response).length > 0) {
        return context.status(400).send(response);
      }

      // Perform add operation
      const addSeries = await AddSeriesController.addSeriesOperation(event, corelationId, context, authorizer);

      if (addSeries?.responseCode === 'OK') {
        return context.send(addSeries);
      } else {
        return context.status(400).send(addSeries);
      }
    } catch (err) {
      // Handle errors
      console.log('err=============>', err);
      return context.status(400).send(await utils.throwCatchError(err));
    }
  }

  static async addSeriesOperation(req, corelationId, context, authorizer) {
    try {
      console.log('addSeriesOperation', process.env.BASE_URL);

      const thumbnail_url = `${process.env.BASE_URL}uploads/series/images/${req.files.thumbnail_url[0].filename}`;
      const video = `${process.env.BASE_URL}uploads/series/video/${req.files.video[0].filename}`;

      const query = `INSERT INTO shorts (title, description, thumbnail_url, 
      video_url, is_home_shorts, is_top_10, is_love_affairs, is_specials, is_trending_now, is_top_originals, 
      is_top_10_new_releases, is_ceo_billionaire, is_just_launched, is_hidden_identity, is_new_hot,
      is_revenge_and_dhoka) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        req?.body?.title,
        req?.body?.description,
        thumbnail_url,
        video,
        req?.body?.tag_id?.includes('is_home_shorts'),
        req?.body?.tag_id?.includes('is_top_10'),
        req?.body?.tag_id?.includes('is_love_affairs'),
        req?.body?.tag_id?.includes('is_specials'),
        req?.body?.tag_id?.includes('is_trending_now'),
        req?.body?.tag_id?.includes('is_top_originals'),
        req?.body?.tag_id?.includes('is_top_10_new_releases'),
        req?.body?.tag_id?.includes('is_ceo_billionaire'),
        req?.body?.tag_id?.includes('is_just_launched'),
        req?.body?.tag_id?.includes('is_hidden_identity'),
        req?.body?.tag_id?.includes('is_new_hot'),
        req?.body?.tag_id?.includes('is_revenge_and_dhoka'),
      ];
      const [result] = await db.query(query, values);

      const [data] = await db.query(`SELECT * FROM shorts WHERE id = ?`, [result?.insertId]);
      return await utils.generateResponseObj({
        responseCode: responsecodes().SUCCESS_OK,
        responseMessage: getStatusText(responsecodes().SUCCESS_OK),
        responseData: data[0],
      });
    } catch (err) {
      return context.status(400).send(await utils.throwCatchError(err));
    }
  }

  static async addSeriesValidator(req) {
    let errObj = {};
    if (!req?.body?.title) {
      return {
        responseCode: responsecodes().SERIES_TITLE_REQUIRED,
        responseMessage: getStatusText(responsecodes().SERIES_TITLE_REQUIRED),
        responseData: {},
      };
    }
    if (!req?.body?.description) {
      return {
        responseCode: responsecodes().SERIES_DESCRIPTION_REQUIRED,
        responseMessage: getStatusText(responsecodes().SERIES_DESCRIPTION_REQUIRED),
        responseData: {},
      };
    }

    if (!req.files || !req.files.thumbnail_url || !req.files.video) {
      return await utils.generateResponseObj({
        responseCode: responsecodes().FILES_MISSING,
        responseMessage: getStatusText(responsecodes().FILES_MISSING),
        responseData: {},
      });
    }

    const thumbnail_url = req.files.thumbnail_url[0];
    if (!thumbnail_url.mimetype.startsWith('image/')) {
      return await utils.generateResponseObj({
        responseCode: responsecodes().INVALID_THUMBNAIL_IMAGE,
        responseMessage: getStatusText(responsecodes().INVALID_THUMBNAIL_IMAGE),
        responseData: {},
      });
    }

    const video = req.files.video[0];
    if (!video.mimetype.startsWith('video/')) {
      return await utils.generateResponseObj({
        responseCode: responsecodes().INVALID_COVER_VIDEO,
        responseMessage: getStatusText(responsecodes().INVALID_COVER_VIDEO),
        responseData: {},
      });
    }

    if (!req?.body?.tag_id) {
      return {
        responseCode: responsecodes().SERIES_TAG_ID_REQUIRED,
        responseMessage: getStatusText(responsecodes().SERIES_TAG_ID_REQUIRED),
        responseData: {},
      };
    }

    return errObj;
  }
}

module.exports = AddSeriesController;
