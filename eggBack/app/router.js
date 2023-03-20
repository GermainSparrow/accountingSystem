'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  //备用金表
  router.post('/financial/addFinancialList', controller.reserves.add);
  router.post('/financial/delete', controller.reserves.delete);
  router.post('/financial/updateFinancialList', controller.reserves.update);
  router.get('/financial/getFinancialList', controller.reserves.get);

  //波箱表
  router.post('/waveBox/addWaveBox', controller.waveBox.add);
  router.post('/waveBox/delete', controller.waveBox.delete);
  router.post('/waveBox/updateWaveBox', controller.waveBox.update);
  router.get('/waveBox/getWaveBoxList', controller.waveBox.get);
  //油品表
  router.post('/oil/addOil', controller.oilSale.add);
  router.post('/oil/delete', controller.oilSale.delete);
  router.post('/oil/updateOilList', controller.oilSale.update);
  router.get('/oil/', controller.oilSale.get);
  //现金表
  router.post('/cash/update', controller.cash.update);
  router.get('/cash', controller.cash.get);
  //获取可视化数据
  router.get('/oil/getVisualData',controller.crude.getVisual);
  router.get('/waveBox/getVisualData',controller.crude.getVisual);
  router.get('/financial/getVisualData',controller.crude.getVisual);
  //条件查询数据
  router.post('/crud/search',controller.crude.search);
};
