const { responsecodes } = require("../../../response-codes/lib");
const { db } = require("../../../common/db");
const { getDateTimeString } = require("../../../common/lib");
const utils = require("../../../common/utils");
const { getStatusText } = require("../../../response-codes/responseCode");
const Stripe = require('stripe');

class CreateStripePaymentIntentController {
    static async createStripePaymentIntent(event, context) {
        let corelationId = await getDateTimeString();
        const request = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
        let authorizer = await utils.getAdvertiserDetails(event);

        try {
            // Validate input data
            let response = await CreateStripePaymentIntentController.createStripePaymentIntentValidator(request);
            if (Object.keys(response).length > 0) {
                return context.status(400).send(response);
            }

            // Perform update operation
            const createStripePaymentIntentResponse = await CreateStripePaymentIntentController.createStripePaymentIntentOperation(
                request,
                corelationId,
                context,
                authorizer
            );

            if (createStripePaymentIntentResponse?.responseCode === "OK") {
                return context.send(createStripePaymentIntentResponse);
            } else {
                return context.status(400).send(createStripePaymentIntentResponse);
            }
        } catch (err) {
            // Handle errors
            console.log("err=============>",err)
            return context.status(400).send(await utils.throwCatchError(err));
        }
    }

    static async createStripePaymentIntentOperation(data, corelationId, context, authorizer) {
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

            const stripe = new Stripe(paymentMethod?.api_key);
            
            const paymentIntent = await stripe.paymentIntents.create({
                amount: data?.amount * 100,
                currency: 'usd',
                metadata: {
                    transaction_id: data?.transaction_id,
                    user_id: authorizer?.id
                },
                automatic_payment_methods: {
                    enabled: true
                },
            });

            return await utils.generateResponseObj({
                responseCode: responsecodes().SUCCESS_OK,
                responseMessage: getStatusText(responsecodes().SUCCESS_OK),
                responseData: paymentIntent?.client_secret
            });
        } catch (err) {
            console.log(err);
            return context.status(400).send(await utils.throwCatchError(err));
        }
    }
    static async createStripePaymentIntentValidator(req) {
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

        if (!req?.transaction_id) {
            errObj = {
                responseCode: responsecodes().TRANSACTION_ID_REQUIRED,
                responseMessage: getStatusText(responsecodes().TRANSACTION_ID_REQUIRED),
                responseData: {}
            };
        }

        return errObj;
    }
}

module.exports = CreateStripePaymentIntentController;
