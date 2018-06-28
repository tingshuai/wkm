<template>
   <!-- 查看详情 -->
   <div class="breadCrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>MES</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.menu}}</el-breadcrumb-item>
        </el-breadcrumb>
   </div>
</template>
<script>
    export default {
        props:['menu'],
        data(){
            return{
                menuRouter:[]
            }
        },
        mounted(){
            
        },
        watch: {
            $route(to, from) {
                console.log( "menu------", this.menu )
            }
        }
    }
</script>
<style lang="less" scope>
    div.breadCrumb{
        height: 50px;;
        width: 100%;
        margin-bottom: 20px;
        >.el-breadcrumb{
            height: 100%;
            width: 100%;
            line-height: 50px;
            background:rgba(222,227,232,1);
            border-radius:4px;
            padding-left: 20px;
            >span{
                font-size:16px;
                font-family:PingFang-SC-Bold;
                color:rgba(97,97,97,1);
            }
        }
    }
   
</style>



