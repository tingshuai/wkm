import Vue from 'vue'
import Router from 'vue-router'
//主路由
const index = () =>
  import ('../page/index.vue'); //首页应用中心
const productLibrary = () =>
  import ('../page/productLibrary');//产品库
const SemifinishedWarehouse = () =>
  import ('../page/SemifinishedWarehouse');//半成品库
const EquipmentOutputRecord = () =>
  import ('../page/EquipmentOutputRecord');//设备产出记录
const ProductionOrders = () =>
  import ('../page/ProductionOrders');//生产指令单
Vue.use(Router)
export default new Router({
  routes: [{
    path: "/",
    name: 'index',
    component: index,
    children: [
    {
      path: "/",
      component: productLibrary,
      name: "productLibrary"
    },
    {
      path: "/SemifinishedWarehouse",
      component: SemifinishedWarehouse,
      name: "SemifinishedWarehouse"
    },
    {
      path: "/EquipmentOutputRecord",
      component: EquipmentOutputRecord,
      name: "EquipmentOutputRecord"
    },
    {
      path: "/ProductionOrders",
      component: ProductionOrders,
      name: "ProductionOrders"
    }]
  }]
})
