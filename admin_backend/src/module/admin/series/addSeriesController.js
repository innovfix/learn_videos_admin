const { responsecodes } = require("../../../response-codes/lib");
const { db } = require("../../../common/db");
const { getDateTimeString } = require("../../../common/lib");
const utils = require("../../../common/utils");
const { getStatusText } = require("../../../response-codes/responseCode");

class AddSeriesController {

    static async addSeries(event, context) {
        let corelationId = await getDateTimeString();
        const request = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
        let authorizer = await utils.getAdvertiserDetails(event);

        try {
            // Validate input data
            let response = await AddSeriesController.addSeriesValidator(event);
            if (Object.keys(response).length > 0) {
                return context.status(400).send(response);
            }
            
            // Perform add operation
            const addSeries = await AddSeriesController.addSeriesOperation(
                event,
                corelationId,
                context,
                authorizer
            );

            if (addSeries?.responseCode === "OK") {
                return context.send(addSeries);
            } else {
                return context.status(400).send(addSeries);
            }
        } catch (err) {
            // Handle errors
            console.log("err=============>",err)
            return context.status(400).send(await utils.throwCatchError(err));
        }
    }

    static async addSeriesOperation(req, corelationId, context, authorizer) {
        try {
            const thumbnail = `${process.env.BASE_URL}uploads/series/images/${req.files.thumbnail[0].filename}`;
            const coverFile = (req.files.cover_video && req.files.cover_video[0]) || (req.files.video && req.files.video[0]);
            const cover_video = `${process.env.BASE_URL}uploads/series/cover_video/${coverFile.filename}`;
            const poster = (req.files.poster && req.files.poster[0])
                ? `${process.env.BASE_URL}uploads/series/poster/${req.files.poster[0].filename}`
                : null;

            const query = `INSERT INTO series (title, description, thumbnail, cover_video, type_id, tag_id, category_id, total_episode, free_episodes, is_free, is_recommended, poster) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [
                req?.body?.title,
                req?.body?.description || '',
                thumbnail,
                cover_video,
                req?.body?.type_id || null,
                req?.body?.tag_id || '',
                req?.body?.category_id || null,
                parseInt(req?.body?.total_episode || 0),
                parseInt(req?.body?.free_episodes || 0),
                req?.body?.is_free ? 1 : 0,
                req?.body?.is_recommended ? 1 : 0,
                poster
            ];
            const [result] = await db.query(query, values);

            const [data] = await db.query(`SELECT * FROM series WHERE id = ?`, [result?.insertId]);

            return await utils.generateResponseObj({
                responseCode: responsecodes().SUCCESS_OK,
                responseMessage: getStatusText(responsecodes().SUCCESS_OK),
                responseData: data[0]
            });
        } catch (err) {
            // Return error object; caller will decide response handling
            return await utils.throwCatchError(err);
        }
    }

    static async addSeriesValidator(req) {
        let errObj = {};
        if (!req?.body?.title) {
            return {
                responseCode: responsecodes().SERIES_TITLE_REQUIRED,
                responseMessage: getStatusText(responsecodes().SERIES_TITLE_REQUIRED),
                responseData: {}
            };
        }
        if (!req?.body?.description) {
            return {
                responseCode: responsecodes().SERIES_DESCRIPTION_REQUIRED,
                responseMessage: getStatusText(responsecodes().SERIES_DESCRIPTION_REQUIRED),
                responseData: {}
            };
        }
        
        if (!req.files || !req.files.thumbnail || (!req.files.cover_video && !req.files.video)) {
            return await utils.generateResponseObj({
                responseCode: responsecodes().FILES_MISSING,
                responseMessage: getStatusText(responsecodes().FILES_MISSING),
                responseData: {}
            });
        }

        const thumbnail = req.files.thumbnail[0];
        if (!thumbnail.mimetype.startsWith("image/")) {
            return await utils.generateResponseObj({
                responseCode: responsecodes().INVALID_THUMBNAIL_IMAGE,
                responseMessage: getStatusText(responsecodes().INVALID_THUMBNAIL_IMAGE),
                responseData: {}
            });
        }

        const cover_video = (req.files.cover_video && req.files.cover_video[0]) || (req.files.video && req.files.video[0]);
        if (!cover_video.mimetype.startsWith("video/")) {
            return await utils.generateResponseObj({
                responseCode: responsecodes().INVALID_COVER_VIDEO,
                responseMessage: getStatusText(responsecodes().INVALID_COVER_VIDEO),
                responseData: {}
            });
        }

        if (req.files.poster && req.files.poster[0]) {
            const poster = req.files.poster[0];
            if (!poster.mimetype.startsWith("image/")) {
                return await utils.generateResponseObj({
                    responseCode: responsecodes().INVALID_POSTER_IMAGE,
                    responseMessage: getStatusText(responsecodes().INVALID_POSTER_IMAGE),
                    responseData: {}
                });
            }
        }

        if (!req?.body?.tag_id) {
            return {
                responseCode: responsecodes().SERIES_TAG_ID_REQUIRED,
                responseMessage: getStatusText(responsecodes().SERIES_TAG_ID_REQUIRED),
                responseData: {}
            };
        }

        // category_id, total_episode, free_episodes, is_free, is_recommended are optional now
        return errObj;
    }
}

module.exports = AddSeriesController;
