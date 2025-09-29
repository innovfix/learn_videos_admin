const { responsecodes } = require("../response-codes/lib");
const { Resend } = require("resend");
const crypto = require('crypto');
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const Ffmpeg = require("fluent-ffmpeg");

Ffmpeg.setFfmpegPath(ffmpegPath);

class Utils {

    static async generateResponseObj(responseObj = {}) {
        let response = {
            responseCode: responseObj?.responseCode,
            responseMessage: responseObj?.responseMessage,
            responseDetails: responseObj?.responseData
        }
        return response;
    }

    static async throwCatchError(err = {}) {
        let response = {
            responseCode: responsecodes().INVALID_REQUEST,
            responseMessage: err.message,
            responseDetails:{}
        }
        return response;
    }

    static getAdvertiserDetails(event) {
        try {
          return event.requestContext?.authorizer;
        } catch (err) {
          return err;
        }
    }



    static async sendMail(req, res) {
        try {
            const resend = new Resend(process.env.RESEND_KEY);
            let response = await resend.emails.send({
                from: 'no-replay <noreplay@sarkariyojanavale.com>',
                to: `${req?.to}`,
                subject: `${req?.subject}`,
                html: `${req?.message}`,
            });
            console.log("Email Sent With Response =====> ", response);
            return { status: 1, message: "Sent Successfully", data: response };
            // console.log("reqdata===> ", req.to);
            // console.log("reqdata===> ", req.subject);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    static async decrypt(encryptedText, key) {
        try {
            if (key.length !== 16) {
                throw new Error(`Key must be 16 bytes long. Current length: ${key.length}`);
            }
            const encryptedBuffer = Buffer.from(encryptedText, 'base64');
            const saltedPrefix = encryptedBuffer.slice(0, 8).toString();
            if (saltedPrefix !== 'Salted__') {
                throw new Error('Invalid encrypted text format.');
            }
            const encryptedData = encryptedBuffer.slice(8);
            const decipher = crypto.createDecipheriv('aes-128-ecb', key, null);
            let decryptedData = decipher.update(encryptedData, 'binary', 'utf8');
            decryptedData += decipher.final('utf8');
            return decryptedData;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async encrypt(plainText, key) {
        try {
            if (key.length !== 16) {
                throw new Error(`Key must be 16 bytes long. Current length: ${key.length}`);
            }
            if (typeof plainText === 'object') {
                plainText = JSON.stringify(plainText);
            }
            const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
            let encryptedData = cipher.update(plainText, 'utf8', 'binary');
            encryptedData += cipher.final('binary');
            const saltedPrefix = Buffer.from('Salted__');
            const resultBuffer = Buffer.concat([saltedPrefix, Buffer.from(encryptedData, 'binary')]);
            const encryptedBase64 = resultBuffer.toString('base64');
            return encryptedBase64;
        } catch (error) {
            throw new Error(error);
        }
    }
    static async generate16DigitUUID() {
        let hexUuid = uuidv4().replace(/-/g, "");
        let bigIntUuid = BigInt("0x" + hexUuid);
        let numericUuid = bigIntUuid.toString().slice(0, 10);
        return numericUuid;
    }

    // static async getThumbnailFromVideo(videoPath, uploadPath){
    //     return new Promise((resolve, reject) => {
    //         let uploadDir = path.join(__dirname, '../../' + uploadPath);
    //         if (!fs.existsSync(uploadDir)) {
    //             fs.mkdirSync(uploadDir, { recursive: true });
    //         }
    //         const outputFile = `${Date.now()}-thumbnail.jpg`;
    //         let thumbnailPath = process.env.BASE_URL + uploadPath + '/' + outputFile;

    //         Ffmpeg(videoPath)
    //             .on('end', () => {
    //                 console.log('Thumbnail created at', thumbnailPath);
    //                 resolve({err: false, path: thumbnailPath});
    //             })
    //             .on('error', (err) => {
    //                 console.error('Error:', err.message);
    //                 resolve({err: true, message: err.message});
    //             })
    //             .screenshots({
    //                 count: 1,
    //                 folder: uploadDir,
    //                 filename: outputFile,
    //                 timemarks: ['00:00:01.000'] // capture at 1s
    //             });
    //     });
    // }

    static async getThumbnailFromVideo(videoPath, uploadPath){
        return new Promise((resolve, reject) => {
            const baseUrlNew = process.env.BASE_URL || '';
            const normalizedBaseUrl = baseUrlNew.endsWith('/') ? baseUrlNew : baseUrlNew + '/';
            let newVideoPath = videoPath.startsWith(normalizedBaseUrl) ? videoPath.substring(normalizedBaseUrl.length) : videoPath;
            let uploadDir = path.join(__dirname, '../../' + uploadPath);
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const outputFile = `${Date.now()}-thumbnail.jpg`;
            let thumbnailPath = process.env.BASE_URL + uploadPath + '/' + outputFile;
 
            Ffmpeg(newVideoPath)
                .on('end', () => {
                    resolve({err: false, path: thumbnailPath});
                })
                .on('error', (err) => {
                    console.error('Error:', err);
                    resolve({err: true, message: err.message});
                })
                .screenshots({
                    count: 1,
                    folder: uploadDir,
                    filename: outputFile,
                    timemarks: ['00:00:01.000'] // capture at 1s
                });
        });
    }
}
module.exports = Utils;
