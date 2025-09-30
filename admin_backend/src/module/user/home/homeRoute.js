const { Router } = require('express');
const AuthMiddleware = require('../../../middleware/authMiddleware');
class HomeRouter {
  constructor() {
    this.router = Router();
    this.getRouter();
    this.postRouter();
    this.putRouter();
    this.patchRouter();
    this.deleteRouter();
  }

  postRouter() {
    this.router.post('/tag-wise', AuthMiddleware.validateToken, (req, res, next) => {
      const getTagWiseSeriesController = require('./getTagWiseSeriesController');
      getTagWiseSeriesController.getTagWiseSeries(req, res, next);
    });
    this.router.post('/search', AuthMiddleware.validateToken, (req, res, next) => {
      const searchSeriesController = require('./searchSeriesController');
      searchSeriesController.searchSeries(req, res, next);
    });
  }

  getRouter() {
    this.router.get('/get-shorts', AuthMiddleware.validateAppToken, (req, res, next) => {
      const shortsController = require('./shortsController');
      shortsController.getShorts(req, res, next);
    });
    this.router.get('/my-list', AuthMiddleware.validateAppToken, (req, res, next) => {
      const shortsController = require('./shortsController');
      shortsController.getMyList(req, res, next);
    });
    this.router.get('/history', AuthMiddleware.validateAppToken, (req, res, next) => {
      const shortsController = require('./shortsController');
      shortsController.getHistory(req, res, next);
    });
    this.router.get('/get-list-status', AuthMiddleware.validateAppToken, (req, res, next) => {
      const shortsController = require('./shortsController');
      shortsController.getListStatus(req, res, next);
    });
    this.router.get('/save-list-status', AuthMiddleware.validateAppToken, (req, res, next) => {
      const shortsController = require('./shortsController');
      shortsController.saveListStatus(req, res, next);
    });
    this.router.get('/save-history', AuthMiddleware.validateAppToken, (req, res, next) => {
      const shortsController = require('./shortsController');
      shortsController.saveHistory(req, res, next);
    });
    this.router.get('/remove-list-status', AuthMiddleware.validateAppToken, (req, res, next) => {
      const shortsController = require('./shortsController');
      shortsController.removeListStatus(req, res, next);
    });
    this.router.get('/remove-history', AuthMiddleware.validateAppToken, (req, res, next) => {
      const shortsController = require('./shortsController');
      shortsController.removeHistory(req, res, next);
    });
    // this.router.get('/rank-wise', AuthMiddleware.validateToken, (req, res, next) => {
    //   const getRankWiseSeriesController = require('./getRankWiseSeriesController');
    //   getRankWiseSeriesController.getRankWiseSeries(req, res, next);
    // });
    // this.router.get('/my-list', AuthMiddleware.validateToken, (req, res, next) => {
    //   const mySeriesController = require('./mySeriesController');
    //   mySeriesController.mySeries(req, res, next);
    // });
    // this.router.post('/recommanded-list', AuthMiddleware.validateToken, (req, res, next) => {
    //   const recommandedSeriesController = require('./recommandedSeriesController');
    //   recommandedSeriesController.recommandedSeries(req, res, next);
    // });
    // this.router.get('/series-list', AuthMiddleware.validateToken, (req, res, next) => {
    //   const seriesListController = require('./seriesListController');
    //   seriesListController.seriesList(req, res, next);
    // });
  }

  patchRouter() {}
  putRouter() {}
  deleteRouter() {}
}
module.exports = new HomeRouter().router;
