const { responsecodes } = require("../../../response-codes/lib");
const { db } = require("../../../common/db");
const { getDateTimeString } = require("../../../common/lib");
const utils = require("../../../common/utils");
const { getStatusText } = require("../../../response-codes/responseCode");
function getMySQLDatePlus(date, days) {
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 19).replace('T', ' ');
}
class CreateTransactionController {
    static async createTransaction(event, context) {
        let corelationId = await getDateTimeString();
        const request = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
        let authorizer = await utils.getAdvertiserDetails(event);

        try {
            // Validate input data
            let response = await CreateTransactionController.createTransactionValidator(request);
            if (Object.keys(response).length > 0) {
                return context.status(400).send(response);
            }

            // Perform update operation
            const createTransactionResponse = await CreateTransactionController.createTransactionOperation(
                request,
                corelationId,
                context,
                authorizer
            );

            if (createTransactionResponse?.responseCode === "OK") {
                return context.send(createTransactionResponse);
            } else {
                return context.status(400).send(createTransactionResponse);
            }
        } catch (err) {
            // Handle errors
            console.log("err=============>",err)
            return context.status(400).send(await utils.throwCatchError(err));
        }
    }

    static async createTransactionOperation(data, corelationId, context, authorizer) {
        try {
            const [rows] = await db.query('SELECT * FROM plans WHERE id = ?', [data?.plan_id]);
            if (rows.length == 0) {
                return await utils.generateResponseObj({
                    responseCode: responsecodes().INVALID_PLAN,
                    responseMessage: getStatusText(responsecodes().INVALID_PLAN),
                    responseData: {}
                });
            }
            const [rows1] = await db.query('SELECT * FROM payment_getways WHERE id = ?', [data?.payment_getway_id]);
            if (rows1.length == 0) {
                return await utils.generateResponseObj({
                    responseCode: responsecodes().INVALID_PAYMENT_METHOD,
                    responseMessage: getStatusText(responsecodes().INVALID_PAYMENT_METHOD),
                    responseData: {}
                });
            }
            let planDetails = rows[0];
            let expire_date = null;
            if(planDetails.is_unlimited == 1){
                if(planDetails.is_weekly == 1){
                    expire_date = getMySQLDatePlus(new Date(), 7);
                } else {
                    expire_date = getMySQLDatePlus(new Date(), 365);
                }
            }
            const [oldRows] = await db.query('SELECT * FROM users_payments WHERE user_id = ? AND status = 2 AND expire_date > NOW() ORDER BY expire_date DESC', [authorizer?.id]);
            if(oldRows.length > 0) {
                let oldData = oldRows[0];
                if(planDetails.is_unlimited == 1){
                    if(planDetails.is_weekly == 1){
                        expire_date = getMySQLDatePlus(new Date(oldData.expire_date), 7);
                    } else {
                        expire_date = getMySQLDatePlus(new Date(oldData.expire_date), 365);
                    }
                }
            }
            let transaction_id = await utils.generate16DigitUUID();
            const query = 'INSERT into users_payments (user_id, transaction_id, plan_id, payment_getway_id, amount, expire_date) values (?, ?, ?, ?, ?, ?)';
            const values = [
                authorizer?.id,
                transaction_id,
                data?.plan_id,
                data?.payment_getway_id,
                planDetails?.amount,
                expire_date
            ];
            const [result] = await db.query(query, values);
            const [newRows] = await db.query('SELECT * FROM users_payments WHERE id = ?', [result?.insertId]);

            return await utils.generateResponseObj({
                responseCode: responsecodes().SUCCESS_OK,
                responseMessage: getStatusText(responsecodes().SUCCESS_OK),
                responseData: newRows[0]
            });
        } catch (err) {
            return context.status(400).send(await utils.throwCatchError(err));
        }
    }
    static async createTransactionValidator(req) {
        let errObj = {};

        if (!req?.plan_id) {
            errObj = {
                responseCode: responsecodes().PLAN_ID_REQUIRED,
                responseMessage: getStatusText(responsecodes().PLAN_ID_REQUIRED),
                responseData: {}
            };
        }
        if (!req?.payment_getway_id) {
            errObj = {
                responseCode: responsecodes().PAYMENT_METHOD_ID_REQUIRED,
                responseMessage: getStatusText(responsecodes().PAYMENT_METHOD_ID_REQUIRED),
                responseData: {}
            };
        }

        return errObj;
    }
}

module.exports = CreateTransactionController;
