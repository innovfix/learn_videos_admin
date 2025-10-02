const { responsecodes } = require("../../../response-codes/lib");
const { db } = require("../../../common/db");
const { getDateTimeString } = require("../../../common/lib");
const utils = require("../../../common/utils");
const { getStatusText } = require("../../../response-codes/responseCode");

class SeriesController {

    static async getSeries(event, context) {
        let corelationId = await getDateTimeString();
        let authorizer = await utils.getAdvertiserDetails(event);

        try {            
            // Perform get operation
            const getSeriesResponse = await SeriesController.getSeriesOperation(
                corelationId,
                context,
                authorizer
            );

            if (getSeriesResponse?.responseCode === "OK") {
                return context.send(getSeriesResponse);
            } else {
                return context.status(400).send(getSeriesResponse);
            }
        } catch (err) {
            // Handle errors
            console.log("err=============>",err)
            return context.status(400).send(await utils.throwCatchError(err));
        }
    }

    static async getSeriesOperation(corelationId, context, authorizer) {
        try {
            const [recommended] = await db.query(`SELECT a.*, c.id as tags_id, c.name as tags_name, d.type_image, d.type_name, d.id as type_id, e.id as category_id, e.name as category_name, CASE WHEN b.id IS NOT NULL THEN true ELSE false END AS is_liked FROM series a LEFT JOIN tags c ON a.tag_id = c.id LEFT JOIN types d ON a.type_id = d.id LEFT JOIN categories e ON a.category_id = e.id LEFT JOIN users_liked_episode b ON b.user_id = ${authorizer?.id} AND b.series_id = a.id WHERE a.is_deleted = 0 AND a.is_recommended = 1 AND a.is_active = 1`);
            const [populer] = await db.query(`SELECT a.*, c.id as tags_id, c.name as tags_name, d.type_image, d.type_name, d.id as type_id, e.id as category_id, e.name as category_name, CASE WHEN b.id IS NOT NULL THEN true ELSE false END AS is_liked FROM series a LEFT JOIN tags c ON a.tag_id = c.id LEFT JOIN types d ON a.type_id = d.id LEFT JOIN categories e ON a.category_id = e.id LEFT JOIN users_liked_episode b ON b.user_id = ${authorizer?.id} AND b.series_id = a.id WHERE a.is_deleted = 0 AND a.is_active = 1 ORDER BY a.views DESC LIMIT 20`);
            const [ranking] = await db.query(`SELECT a.*, c.id as tags_id, c.name as tags_name, d.type_image, d.type_name, d.id as type_id, e.id as category_id, e.name as category_name, CASE WHEN b.id IS NOT NULL THEN true ELSE false END AS is_liked FROM series a LEFT JOIN tags c ON a.tag_id = c.id LEFT JOIN types d ON a.type_id = d.id LEFT JOIN categories e ON a.category_id = e.id LEFT JOIN users_liked_episode b ON b.user_id = ${authorizer?.id} AND b.series_id = a.id WHERE a.is_deleted = 0 AND a.is_active = 1 ORDER BY a.views DESC LIMIT 5`);
            const [new_relese] = await db.query(`SELECT a.*, c.id as tags_id, c.name as tags_name, d.type_image, d.type_name, d.id as type_id, e.id as category_id, e.name as category_name, CASE WHEN b.id IS NOT NULL THEN true ELSE false END AS is_liked FROM series a LEFT JOIN tags c ON a.tag_id = c.id LEFT JOIN types d ON a.type_id = d.id LEFT JOIN categories e ON a.category_id = e.id LEFT JOIN users_liked_episode b ON b.user_id = ${authorizer?.id} AND b.series_id = a.id WHERE a.is_deleted = 0 AND a.is_active = 1 ORDER BY a.created_at DESC LIMIT 20`);
            const [findoutmore] = await db.query(`SELECT * FROM tags WHERE is_deleted = 0 ORDER BY RAND() LIMIT 4`);
            const [categories] = await db.query(`SELECT * FROM categories WHERE is_deleted = 0`);
            for (const i in categories) {
                const [series] = await db.query(`SELECT a.*, c.id as tags_id, c.name as tags_name, d.type_image, d.type_name, d.id as type_id, e.id as category_id, e.name as category_name, CASE WHEN b.id IS NOT NULL THEN true ELSE false END AS is_liked FROM series a LEFT JOIN tags c ON a.tag_id = c.id LEFT JOIN types d ON a.type_id = d.id LEFT JOIN categories e ON a.category_id = e.id LEFT JOIN users_liked_episode b ON b.user_id = ${authorizer?.id} AND b.series_id = a.id WHERE a.is_deleted = 0 AND a.is_active = 1 AND a.category_id = ${categories[i].id}`);
                categories[i]['series'] = series;
            }
            const [history] = await db.query(`SELECT a.*, b.*, CASE WHEN c.id IS NOT NULL THEN true ELSE false END AS is_liked, d.name as tags_name, e.name as category_name FROM users_watched_series a LEFT JOIN series b ON a.series_id = b.id LEFT JOIN users_liked_episode c ON a.user_id = c.user_id AND a.series_id = c.series_id LEFT JOIN tags d ON b.tag_id = d.id LEFT JOIN categories e ON b.category_id = e.id WHERE a.user_id = ${authorizer?.id} AND b.is_deleted = 0 AND b.is_active = 1`);
            return await utils.generateResponseObj({
                responseCode: responsecodes().SUCCESS_OK,
                responseMessage: getStatusText(responsecodes().SUCCESS_OK),
                responseData: {
                    populer: populer,
                    recommended: recommended,
                    ranking: ranking,
                    findoutmore: findoutmore,
                    categories: categories,
                    new_relese: new_relese,
                    history: history
                }
            });
        } catch (err) {
            console.log(err);
            return context.status(400).send(await utils.throwCatchError(err));
        }
    }
}

module.exports = SeriesController;
