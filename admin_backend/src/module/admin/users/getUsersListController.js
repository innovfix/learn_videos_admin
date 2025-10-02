const { responsecodes } = require("../../../response-codes/lib");
const { db } = require("../../../common/db");
const { getDateTimeString } = require("../../../common/lib");
const utils = require("../../../common/utils");
const { getStatusText } = require("../../../response-codes/responseCode");

class GetUsersListController {

    static async getUsersList(event, context) {
        let corelationId = await getDateTimeString();
        const request = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
        let authorizer = await utils.getAdvertiserDetails(event);

        try {
            
            // Perform update operation
            const updateUserResponse = await GetUsersListController.getUsersListOperation(
                request,
                corelationId,
                context,
                authorizer
            );

            if (updateUserResponse?.responseCode === "OK") {
                return context.send(updateUserResponse);
            } else {
                return context.status(400).send(updateUserResponse);
            }
        } catch (err) {
            // Handle errors
            console.log("err=============>",err)
            return context.status(400).send(await utils.throwCatchError(err));
        }
    }

    static async getUsersListOperation(req, corelationId, context, authorizer) {
        try {
            const [rows] = await db.query('SELECT * FROM admin WHERE id = ?', [authorizer?.id]);
            if (rows.length == 0) {
                return await utils.generateResponseObj({
                    responseCode: responsecodes().INVALID_USER,
                    responseMessage: getStatusText(responsecodes().INVALID_USER),
                    responseData: {}
                });
            }
            const { search, start, length, dir, sortColumn } = req;

            const limit = length || 10;
            const offset = start || 0;
            const searchValue = search || '';
            const orderBy = dir || 'asc';
            const column = sortColumn || 'name';
            
            const query = `SELECT users.*, (IFNULL(users.wallet_balance, 0) + IFNULL(users.coin_balance, 0)) AS coins, IFNULL(plans.name, 'Free') AS current_plan FROM users LEFT JOIN ( SELECT up.* FROM users_payments up INNER JOIN ( SELECT user_id, MAX(created_at) AS latest_payment FROM users_payments WHERE status = 2 GROUP BY user_id ) latest_up ON latest_up.user_id = up.user_id AND latest_up.latest_payment = up.created_at ) latest_payment ON latest_payment.user_id = users.id LEFT JOIN plans ON plans.id = latest_payment.plan_id WHERE ( IFNULL(users.name, '') LIKE ? OR IFNULL(users.email, '') LIKE ? OR users.login_type LIKE ? ) ORDER BY ?? ${orderBy} LIMIT ? OFFSET ?`;
            const [result] = await db.query(query, [`%${searchValue}%`, `%${searchValue}%`, `%${searchValue}%`, column, parseInt(limit), parseInt(offset)]);

            const [count] = await db.query(`SELECT COUNT(*) as total FROM users`);

            const [filteredCount] = await db.query(`SELECT COUNT(*) as total FROM users WHERE ( IFNULL(name, '') LIKE ? OR IFNULL(email, '') LIKE ? OR login_type LIKE ? )`, [`%${searchValue}%`, `%${searchValue}%`, `%${searchValue}%`]);
            // const [newRows] = await db.query('SELECT * FROM users');

            return await utils.generateResponseObj({
                responseCode: responsecodes().SUCCESS_OK,
                responseMessage: getStatusText(responsecodes().SUCCESS_OK),
                responseData: {
                    data: result,
                    totalRecords: count[0].total,
                    recordsFiltered: filteredCount[0].total
                }
            });
        } catch (err) {
            return context.status(400).send(await utils.throwCatchError(err));
        }
    }
}

module.exports = GetUsersListController;
