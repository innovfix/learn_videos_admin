const { responsecodes } = require("../../response-codes/lib");
const { db } = require("../../common/db");
const { getDateTimeString } = require("../../common/lib");
const utils = require("../../common/utils");
const { getStatusText } = require("../../response-codes/responseCode");

class GetPlansController {

    static async getPlans(event, context) {
        let corelationId = await getDateTimeString();
        let authorizer = await utils.getAdvertiserDetails(event);

        try {            
            // Perform get operation
            const getPlansResponse = await GetPlansController.getPlansOperation(
                corelationId,
                context,
                authorizer
            );

            if (getPlansResponse?.responseCode === "OK") {
                return context.send(getPlansResponse);
            } else {
                return context.status(400).send(getPlansResponse);
            }
        } catch (err) {
            // Handle errors
            console.log("err=============>",err)
            return context.status(400).send(await utils.throwCatchError(err));
        }
    }

    static async getPlansOperation(corelationId, context, authorizer) {
        try {
            const query = `SELECT * FROM plans WHERE is_deleted = 0 AND is_active = 1`;
            const [results] = await db.query(query);
            let unlimited = [];
            let limited = [];
            for (const result of results) {
                if(result?.is_unlimited == 1){
                    unlimited.push(result);
                } else {
                    limited.push(result);
                }
            }
            return await utils.generateResponseObj({
                responseCode: responsecodes().SUCCESS_OK,
                responseMessage: getStatusText(responsecodes().SUCCESS_OK),
                responseData: {
                    limited: limited,
                    unlimited: unlimited,
                }
            });
        } catch (err) {
            return context.status(400).send(await utils.throwCatchError(err));
        }
    }
}

module.exports = GetPlansController;
