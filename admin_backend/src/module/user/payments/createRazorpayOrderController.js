const { responsecodes } = require("../../../response-codes/lib");
const { db } = require("../../../common/db");
const { getDateTimeString } = require("../../../common/lib");
const utils = require("../../../common/utils");
const { getStatusText } = require("../../../response-codes/responseCode");
const Razorpay = require('razorpay');

class CreateRazorpayOrderController {
    static async createRazorpayOrder(event, context) {
        let corelationId = await getDateTimeString();
        const request = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
        let authorizer = await utils.getAdvertiserDetails(event);

        try {
            // Validate input data
            let response = await CreateRazorpayOrderController.createRazorpayOrderValidator(request);
            if (Object.keys(response).length > 0) {
                return context.status(400).send(response);
            }

            // Perform update operation
            const createRazorpayOrderResponse = await CreateRazorpayOrderController.createRazorpayOrderOperation(
                request,
                corelationId,
                context,
                authorizer
            );

            if (createRazorpayOrderResponse?.responseCode === "OK") {
                return context.send(createRazorpayOrderResponse);
            } else {
                return context.status(400).send(createRazorpayOrderResponse);
            }
        } catch (err) {
            // Handle errors
            console.log("err=============>",err)
            return context.status(400).send(await utils.throwCatchError(err));
        }
    }

    static async createRazorpayOrderOperation(data, corelationId, context, authorizer) {
        try {

            const [rows1] = await db.query('SELECT * FROM payment_getways WHERE id = ?', [data?.payment_getway_id]);
            if (rows1.length == 0) {
                return await utils.generateResponseObj({
                    responseCode: responsecodes().INVALID_PAYMENT_METHOD,
                    responseMessage: getStatusText(responsecodes().INVALID_PAYMENT_METHOD),
                    responseData: {}
                });
            }

            let paymentMethod = rows1[0];
            console.log(paymentMethod);

            const razorpay = new Razorpay({
                key_id: paymentMethod?.api_id,
                key_secret: paymentMethod?.api_key
            });
            
            const options = {
                amount: data?.amount * 100,
                currency: 'INR',
                // currency: 'USD',
                receipt: `rcpt_${Date.now()}`
            };

            console.log(options);

            const order = await razorpay.orders.create(options);

            return await utils.generateResponseObj({
                responseCode: responsecodes().SUCCESS_OK,
                responseMessage: getStatusText(responsecodes().SUCCESS_OK),
                responseData: order
            });
        } catch (err) {
            console.log(err);
            return context.status(400).send(await utils.throwCatchError(err));
        }
    }
    static async createRazorpayOrderValidator(req) {
        let errObj = {};

        if (!req?.payment_getway_id) {
            errObj = {
                responseCode: responsecodes().PAYMENT_METHOD_ID_REQUIRED,
                responseMessage: getStatusText(responsecodes().PAYMENT_METHOD_ID_REQUIRED),
                responseData: {}
            };
        }

        if (!req?.amount) {
            errObj = {
                responseCode: responsecodes().AMOUNT_REQUIRED,
                responseMessage: getStatusText(responsecodes().AMOUNT_REQUIRED),
                responseData: {}
            };
        }

        return errObj;
    }
}

module.exports = CreateRazorpayOrderController;
