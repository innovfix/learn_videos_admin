const { responsecodes } = require('../../response-codes/lib');
const { db } = require('../../common/db');

class SettingsListController {
  static async getSettingsList(req, res) {
    try {
      const [data] = await db.query(`SELECT * FROM admin`);
      return res.status(200).send({
        success: true,
        data,
      });
    } catch (err) {
      console.log('err=============>', err);
      return res.status(400).send({
        code: 400,
        message: 'Bad Request',
      });
    }
  }
}

module.exports = SettingsListController;
