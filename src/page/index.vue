//首页
<template>
  <page :sidebarData="sidebarData" :pocHeaderData="pocHeaderData"></page>
</template>
<script>
  export default {
    data() {
      return {
        sidebarData: {
           visible:true,
             title:'基础资料',
             slideActive:"产品库",
             path:'/',
             data:[
              {
                  name:'产品库',
                  router:'/'
              },{
                  name:'半产品库',
                  router:'/SemifinishedWarehouse'
              },
              {
                  name:'生产指令单',
                  router:'/ProductionOrders'
              },
              {
                  name:'设备产出记录',
                  router:'/EquipmentOutputRecord'
              }
             ]
        },
        pocHeaderData: {
          title: "MES",
          isBackShow: true
        }
      }
    },
    mounted(){
      this.$store.state.menuRoute[0] = this.pocHeaderData.title;
    },
    watch: {
      $route(to, from) {
          // this.sidebarData.data.forEach((val,i,arr)=>{
          //   if(to.path == val.router){
          //     this.$store.state.menuRoute[1] = val.name;
          //   }
          // })
      }
    } 
  }

</script>
<style lang="less">


</style>
