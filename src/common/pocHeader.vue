<template>
    <div class="poc-home">
        <div class="poc-header clearfix">
            <div class="poc-home-logo left">
                <!-- <span class="poc-home-logo-img bg-logo left"></span> -->
                <img :src="getCompanyLogo" class="left  bg-logo"/>
                <div class="poc-home-logo-r left">
                <h1 class="poc-home-title">{{getCompanyName}}</h1>
                <p class="poc-home-mtitle">{{getCompanyEnglish}}</p>
                </div>
            </div>
            <div class="poc-home-navL left">
                  {{pocHeaderData.title}}
            </div>
            <div class="poc-home-navR right">
                    <router-link v-if="pocHeaderData.isBackShow" to="/index" class="icon-home back-home"></router-link>
                    <img :src="getUserImg" height="30">
                    <span>{{getUserName}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
   props:{
     pocHeaderData:Object
   },
   computed:{
       ...mapGetters([
           'getUserName',
           'getUserImg',
           'getCompanyName',
           'getCompanyEnglish',
           'getCompanyLogo'
       ])
   }
}
</script>

<style lang="less">
.poc-home {
    height: 80px;
    width: 100%;
    min-width: 1280px;
    font-family: PingFang-SC-Bold;
    box-shadow: 0px 3px 5px rgba(117, 182, 225, 0.2);
    .bg-logo{margin: 20px 10px 0;}
    .poc-header {
      margin-bottom: 5px;
      background-color: white;
      height: 80px;
    }
    .poc-home-logo {
      height: 80px;
      background-color: #DEE3E8;
      user-select: none;
      padding: 0 22.5px;
    }
    .poc-home-logo-img {
      margin-top: 20px;
      margin-left: 30px;
      margin-right: 5px;
    }
    .poc-home-logo-r {
      text-align: center;
    }
    .poc-home-title {
      font-size: 16px;
      line-height: 14px;
      margin-top: 25px;
      letter-spacing: 1.5px;
      white-space: nowrap;
    }
    .poc-home-mtitle {
      font-size: 9px;
      line-height: 14px;
      margin-top: 5px;
      letter-spacing: -1px;
      white-space: nowrap;
    }
    .poc-home-navL{
        position: relative;
        font-size: 16px;
        padding: 0 30px;
        line-height: 80px;
        &::after{
            content: '';
            position: absolute;
            width: 100%;
            height: 5px;
            background-color: #66b1ff;
            bottom: 0;
            left: 0;
        }
    }
    .poc-home-navR{
      margin-right: 100px;
      line-height: 80px;
      .back-home{
          text-decoration: none;
          font-size: 25px;
          margin-right: 5px;
          font-weight: 600;
           color: #409EFF;
          vertical-align: middle;
      }
       .back-home:hover{
           color: #6aadf1;
       }

            span {
            font-weight: 100;
            font-size: 14px;
            }
        }
    }
</style>

