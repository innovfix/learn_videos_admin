const fs = require('fs');
const path = require('path');
const { responsecodes } = require('../../../response-codes/lib');
const { db } = require('../../../common/db');
const { getDateTimeString } = require('../../../common/lib');
const utils = require('../../../common/utils');
const { getStatusText } = require('../../../response-codes/responseCode');

class UpdateSeriesController {
  static async updateSeries(event, context) {
    let corelationId = await getDateTimeString();
    const request = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    let authorizer = await utils.getAdvertiserDetails(event);

    try {
      // Validate input data
      let response = await UpdateSeriesController.updateSeriesValidator(event);
      if (Object.keys(response).length > 0) {
        return context.status(400).send(response);
      }

      // Perform update operation
      const updateSeries = await UpdateSeriesController.updateSeriesOperation(event, corelationId, context, authorizer);

      if (updateSeries?.responseCode === 'OK') {
        return context.send(updateSeries);
      } else {
        return context.status(400).send(updateSeries);
      }
    } catch (err) {
      console.log('Error in updateSeries:', err);
      return context.status(400).send(await utils.throwCatchError(err));
    }
  }

  static async updateSeriesOperation(req, corelationId, context, authorizer) {
    try {
      const [rows] = await db.query('SELECT * FROM shorts WHERE id = ?', [req?.body?.id]);
      if (rows.length === 0) {
        return await utils.generateResponseObj({
          responseCode: responsecodes().INVALID_SERIES,
          responseMessage: getStatusText(responsecodes().INVALID_SERIES),
          responseData: {},
        });
      }

      let seriesData = rows[0];

      // Delete old files
      const deleteFileIfExists = (filePath) => {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      };

      const updateFields = {
        title: req?.body?.title,
        description: req?.body?.description,
        thumbnail_url: seriesData?.thumbnail_url,
        video: seriesData?.video,
      };

      if (req?.files?.thumbnail_url) {
        const oldImagePath = path.join(__dirname, seriesData?.thumbnail.replace(process.env.BASE_URL, '../../../../'));
        deleteFileIfExists(oldImagePath);
        updateFields.thumbnail_url = `${process.env.BASE_URL}uploads/series/images/${req.files.thumbnail[0].filename}`;
      }

      if (req?.files?.video) {
        const oldVideoPath = path.join(__dirname, seriesData?.video.replace(process.env.BASE_URL, '../../../../'));
        deleteFileIfExists(oldVideoPath);
        updateFields.video = `${process.env.BASE_URL}uploads/series/video/${req.files.video[0].filename}`;
      }

      const query = `UPDATE shorts SET 
                title = ?, 
                description = ?, 
                thumbnail_url = ?, 
                video_url = ?, 
                is_home_shorts = ?, 
                is_top_10 = ? ,
                is_love_affairs = ? ,
                is_specials = ? ,
                is_trending_now = ? ,
                is_top_originals = ? ,
                is_top_10_new_releases = ? ,
                is_ceo_billionaire = ? ,
                is_just_launched = ? ,
                is_hidden_identity = ? ,
                is_new_hot = ? ,
                is_revenge_and_dhoka = ? 
                WHERE id = ?`;

      const values = [
        updateFields.title,
        updateFields.description,
        updateFields.thumbnail_url,
        updateFields.video,
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
        req?.body?.id,
      ];

      await db.query(query, values);

      return await utils.generateResponseObj({
        responseCode: responsecodes().SUCCESS_OK,
        responseMessage: getStatusText(responsecodes().SUCCESS_OK),
        responseData: {
          id: req?.body?.id,
          ...updateFields,
        },
      });
    } catch (err) {
      console.log('error', err);
      return context.status(400).send(await utils.throwCatchError(err));
    }
  }

  static async updateSeriesValidator(req) {
    if (!req?.body?.id) {
      return {
        responseCode: responsecodes().SERIES_ID_REQUIRED,
        responseMessage: getStatusText(responsecodes().SERIES_ID_REQUIRED),
        responseData: {},
      };
    }

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

    if (!req?.body?.tag_id) {
      return {
        responseCode: responsecodes().SERIES_TAG_ID_REQUIRED,
        responseMessage: getStatusText(responsecodes().SERIES_TAG_ID_REQUIRED),
        responseData: {},
      };
    }
    return {};
  }
}

module.exports = UpdateSeriesController;
