const { responsecodes } = require('../../../response-codes/lib');
const { db } = require('../../../common/db');
const { getDateTimeString } = require('../../../common/lib');
const utils = require('../../../common/utils');
const { getStatusText } = require('../../../response-codes/responseCode');

class SeriesController {
  static async getShorts(request, res) {
    try {
      let shorts;
      switch (request?.query?.tag) {
        case 'is_home_shorts':
          [shorts] = await db.query(`SELECT * FROM shorts WHERE is_home_shorts = true`);
          break;
        case 'is_top_10':
          [shorts] = await db.query(`SELECT * FROM shorts WHERE is_top_10 = true`);
          break;
        case 'is_love_affairs':
          [shorts] = await db.query(`SELECT * FROM shorts WHERE is_love_affairs = true`);
          break;
        case 'is_specials':
          [shorts] = await db.query(`SELECT * FROM shorts WHERE is_specials = true`);
          break;
        case 'is_trending_now':
          [shorts] = await db.query(`SELECT * FROM shorts WHERE is_trending_now = true`);
          break;
        case 'is_top_originals':
          [shorts] = await db.query(`SELECT * FROM shorts WHERE is_top_originals = true`);
          break;
        case 'is_top_10_new_releases':
          [shorts] = await db.query(`SELECT * FROM shorts WHERE is_top_10_new_releases = true`);
          break;
        case 'is_ceo_billionaire':
          [shorts] = await db.query(`SELECT * FROM shorts WHERE is_ceo_billionaire = true`);
          break;
        case 'is_just_launched':
          [shorts] = await db.query(`SELECT * FROM shorts WHERE is_just_launched = true`);
          break;
        case 'is_hidden_identity':
          [shorts] = await db.query(`SELECT * FROM shorts WHERE is_hidden_identity = true`);
          break;
        case 'is_new_hot':
          [shorts] = await db.query(`SELECT * FROM shorts WHERE is_new_hot = true`);
          break;
        case 'is_revenge_and_dhoka':
          [shorts] = await db.query(`SELECT * FROM shorts WHERE is_revenge_and_dhoka = true`);
          break;
        default:
          [shorts] = await db.query(`SELECT * FROM shorts`);
      }

      return res.status(200).send({
        success: true,
        shorts,
      });
    } catch (err) {
      // Handle errors
      console.log('err=============>', err);
      return res.status(400).send({
        code: 400,
        message: 'Bad Request',
      });
    }
  }

  static async getListStatus(req, res) {
    try {
      if (req?.query?.short_id) {
        const authorizer = req.requestContext.authorizer;
        const [myList] = await db.query(
          `SELECT * FROM my_list WHERE user_id = ${authorizer} and short_id = ${req?.query?.short_id} LIMIT 1`,
        );

        return res.status(200).send({
          success: true,
          is_listed: myList && myList.length > 1,
        });
      } else {
        return res.status(400).send({
          code: 400,
          message: 'Short id required',
        });
      }
    } catch (err) {
      console.log('err=============>', err);
      return res.status(400).send({
        code: 400,
        message: 'Bad Request',
      });
    }
  }

  static async saveListStatus(req, res) {
    try {
      if (req?.query?.short_id) {
        const authorizer = req.requestContext.authorizer;
        const [myList] = await db.query(
          `SELECT * FROM my_list WHERE user_id = ${authorizer} and short_id = ${req?.query?.short_id} LIMIT 1`,
        );

        if (!myList || myList.length === 0) {
          await db.query(`INSERT INTO my_list (user_id, short_id) VALUES (?,?)`, [authorizer, req?.query?.short_id]);
        }
        return res.status(200).send({
          success: true,
          message: 'status saved successfully',
        });
      } else {
        return res.status(400).send({
          code: 400,
          message: 'Short id required',
        });
      }
    } catch (err) {
      console.log('err=============>', err);
      return res.status(400).send({
        code: 400,
        message: 'Bad Request',
      });
    }
  }

  static async saveHistory(req, res) {
    try {
      if (req?.query?.short_id) {
        const authorizer = req.requestContext.authorizer;
        const [myList] = await db.query(
          `SELECT * FROM history WHERE user_id = ${authorizer} and short_id = ${req?.query?.short_id} LIMIT 1`,
        );

        if (!myList || myList.length === 0) {
          await db.query(`INSERT INTO history (user_id, short_id) VALUES (?,?)`, [authorizer, req?.query?.short_id]);
        }
        return res.status(200).send({
          success: true,
          message: 'history saved successfully',
        });
      } else {
        return res.status(400).send({
          code: 400,
          message: 'Short id required',
        });
      }
    } catch (err) {
      console.log('err=============>', err);
      return res.status(400).send({
        code: 400,
        message: 'Bad Request',
      });
    }
  }

  static async removeListStatus(req, res) {
    try {
      if (req?.query?.short_id) {
        const authorizer = req.requestContext.authorizer;
        const [myList] = await db.query(
          `SELECT * FROM my_list WHERE user_id = ${authorizer} and short_id = ${req?.query?.short_id} LIMIT 1`,
        );

        if (myList && myList.length > 0) {
          await db.query(`DELETE FROM my_list WHERE user_id = ? and short_id=?`, [authorizer, req?.query?.short_id]);
        }
        return res.status(200).send({
          success: true,
          message: 'status removed successfully',
        });
      } else {
        return res.status(400).send({
          code: 400,
          message: 'Short id required',
        });
      }
    } catch (err) {
      console.log('err=============>', err);
      return res.status(400).send({
        code: 400,
        message: 'Bad Request',
      });
    }
  }

  static async removeHistory(req, res) {
    try {
      if (req?.query?.short_id) {
        const authorizer = req.requestContext.authorizer;
        const [history] = await db.query(
          `SELECT * FROM history WHERE user_id = ${authorizer} and short_id = ${req?.query?.short_id} LIMIT 1`,
        );

        if (history && history.length > 0) {
          await db.query(`DELETE FROM history WHERE user_id = ? and short_id=?`, [authorizer, req?.query?.short_id]);
        }
        return res.status(200).send({
          success: true,
          message: 'history removed successfully',
        });
      } else {
        return res.status(400).send({
          code: 400,
          message: 'Short id required',
        });
      }
    } catch (err) {
      console.log('err=============>', err);
      return res.status(400).send({
        code: 400,
        message: 'Bad Request',
      });
    }
  }

  static async getMyList(req, res) {
    try {
      const authorizer = req.requestContext.authorizer;
      const [myList] = await db.query(
        `SELECT s.* FROM my_list ml INNER JOIN users u ON u.id = ml.user_id INNER JOIN shorts s ON s.id = ml.short_id WHERE u.id = ${authorizer}`,
      );

      return res.status(200).send({
        success: true,
        my_list: myList,
      });
    } catch (err) {
      console.log('err=============>', err);
      return res.status(400).send({
        code: 400,
        message: 'Bad Request',
      });
    }
  }

  static async getHistory(req, res) {
    try {
      const authorizer = req.requestContext.authorizer;
      const [histories] = await db.query(
        `SELECT s.* FROM history ml INNER JOIN users u ON u.id = ml.user_id INNER JOIN shorts s ON s.id = ml.short_id WHERE u.id = ${authorizer}`,
      );
      return res.status(200).send({
        success: true,
        my_list: histories,
      });
    } catch (err) {
      console.log('err=============>', err);
      return res.status(400).send({
        code: 400,
        message: 'Bad Request',
      });
    }
  }

  static async getSeriesOperation(corelationId, context, authorizer) {
    try {
      const [recommended] = await db.query(
        `SELECT a.*, c.id as tags_id, c.name as tags_name, d.type_image, d.type_name, d.id as type_id, e.id as category_id, e.name as category_name, CASE WHEN b.id IS NOT NULL THEN true ELSE false END AS is_liked FROM series a LEFT JOIN tags c ON a.tag_id = c.id LEFT JOIN types d ON a.type_id = d.id LEFT JOIN categories e ON a.category_id = e.id LEFT JOIN users_liked_episode b ON b.user_id = ${authorizer?.id} AND b.series_id = a.id WHERE a.is_deleted = 0 AND a.is_recommended = 1 AND a.is_active = 1`,
      );
      const [populer] = await db.query(
        `SELECT a.*, c.id as tags_id, c.name as tags_name, d.type_image, d.type_name, d.id as type_id, e.id as category_id, e.name as category_name, CASE WHEN b.id IS NOT NULL THEN true ELSE false END AS is_liked FROM series a LEFT JOIN tags c ON a.tag_id = c.id LEFT JOIN types d ON a.type_id = d.id LEFT JOIN categories e ON a.category_id = e.id LEFT JOIN users_liked_episode b ON b.user_id = ${authorizer?.id} AND b.series_id = a.id WHERE a.is_deleted = 0 AND a.is_active = 1 ORDER BY a.views DESC LIMIT 20`,
      );
      const [ranking] = await db.query(
        `SELECT a.*, c.id as tags_id, c.name as tags_name, d.type_image, d.type_name, d.id as type_id, e.id as category_id, e.name as category_name, CASE WHEN b.id IS NOT NULL THEN true ELSE false END AS is_liked FROM series a LEFT JOIN tags c ON a.tag_id = c.id LEFT JOIN types d ON a.type_id = d.id LEFT JOIN categories e ON a.category_id = e.id LEFT JOIN users_liked_episode b ON b.user_id = ${authorizer?.id} AND b.series_id = a.id WHERE a.is_deleted = 0 AND a.is_active = 1 ORDER BY a.views DESC LIMIT 5`,
      );
      const [new_relese] = await db.query(
        `SELECT a.*, c.id as tags_id, c.name as tags_name, d.type_image, d.type_name, d.id as type_id, e.id as category_id, e.name as category_name, CASE WHEN b.id IS NOT NULL THEN true ELSE false END AS is_liked FROM series a LEFT JOIN tags c ON a.tag_id = c.id LEFT JOIN types d ON a.type_id = d.id LEFT JOIN categories e ON a.category_id = e.id LEFT JOIN users_liked_episode b ON b.user_id = ${authorizer?.id} AND b.series_id = a.id WHERE a.is_deleted = 0 AND a.is_active = 1 ORDER BY a.created_at DESC LIMIT 20`,
      );
      const [findoutmore] = await db.query(`SELECT * FROM tags WHERE is_deleted = 0 ORDER BY RAND() LIMIT 4`);
      const [categories] = await db.query(`SELECT * FROM categories WHERE is_deleted = 0`);
      for (const i in categories) {
        const [series] = await db.query(
          `SELECT a.*, c.id as tags_id, c.name as tags_name, d.type_image, d.type_name, d.id as type_id, e.id as category_id, e.name as category_name, CASE WHEN b.id IS NOT NULL THEN true ELSE false END AS is_liked FROM series a LEFT JOIN tags c ON a.tag_id = c.id LEFT JOIN types d ON a.type_id = d.id LEFT JOIN categories e ON a.category_id = e.id LEFT JOIN users_liked_episode b ON b.user_id = ${authorizer?.id} AND b.series_id = a.id WHERE a.is_deleted = 0 AND a.is_active = 1 AND a.category_id = ${categories[i].id}`,
        );
        categories[i]['series'] = series;
      }
      const [history] = await db.query(
        `SELECT a.*, b.*, CASE WHEN c.id IS NOT NULL THEN true ELSE false END AS is_liked, d.name as tags_name, e.name as category_name FROM users_watched_series a LEFT JOIN series b ON a.series_id = b.id LEFT JOIN users_liked_episode c ON a.user_id = c.user_id AND a.series_id = c.series_id LEFT JOIN tags d ON b.tag_id = d.id LEFT JOIN categories e ON b.category_id = e.id WHERE a.user_id = ${authorizer?.id} AND b.is_deleted = 0 AND b.is_active = 1`,
      );
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
          history: history,
        },
      });
    } catch (err) {
      console.log(err);
      return context.status(400).send(await utils.throwCatchError(err));
    }
  }
}

module.exports = SeriesController;
