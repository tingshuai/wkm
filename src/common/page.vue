//考勤管理
<template>
    <div class="poc-page">
    <!-- 导航 -->
    <poc-header :pocHeaderData="pocHeaderData"></poc-header>
    <!-- 主体 -->
    <div class="poc-page-main clearfix">
        <sidebar :config="sidebarData" @slideBack="slideBack"></sidebar>
        <div class="poc-page-body" :class="sidebarData.visible?'left-go':'left-back'">
            <bread-crumb :menu="this.sidebarData.slideActive"></bread-crumb>
            <router-view></router-view>
        </div>
    </div>
    </div>
</template>
<script>
export default {
  props:['sidebarData','pocHeaderData'],
  data(){
    return{
        menu:this.sidebarData.slideActive
    }
  },
  mounted(){
      this.$router.push({ path:this.sidebarData.path })
  },
  methods:{
      slideBack(data){
        this.sidebarData.slideActive = data;
      }
  }
}
</script>

<style lang="less">
.poc-page{
    .poc-page-main{
        position: absolute;
        top: 80px;
        bottom: 0;
        width: 100%;
        min-height: 600px;
        min-width: 1280px;
        max-height: 100vh;
        .poc-page-body{
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            transition: left 0.5s;
            overflow: hidden;;
            box-sizing: border-box;
            // padding: 20px;
        }
    }
    .slideActive{
        height: 50px;
        background-color: #409EFF;
        background-image: linear-gradient(to right, #4a8dd2, #2acaff);
        line-height: 50px;
        color:white;
        font-size: 16px;
        padding-left: 20px;
        font-weight: 600;
        .slideActive-small{
        color: white;
        font-weight: 500;
        }
    }
    .left-go{
        left: 260px;
    }
    .left-back{
        left: 0;
    }
   }
</style>
