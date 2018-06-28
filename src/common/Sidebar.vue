// 侧边栏
<template>
  <div class="menu_nav_collapse" :class="sidebar">
    <div class="menu-slide-header">
      <span class="el-icon-menu"></span>
      <span>{{config.title}}</span>
    </div>
    <div class="menu-silde-list">
      <div v-for="item in config.data" class="menu-silde-item" :class="{'menu-silde-active':isAcitive===item.name}" @click="router(item)">
        {{item.name}}
      </div>
    </div>
    <!-- <el-menu
      default-active="/WarehouseDefinition"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      unique-opened
      router
      active-text-color="#ffd04b">
      <el-submenu   :index="item.icon" v-for="item in config.data">
        <template slot="title" >
          <i class="iconfont" :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group v-if="item.chlid">
          <el-menu-item  v-for="_item in item.chlid" :index="_item.router"  >{{_item.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu> -->
    <!-- 拖拉 -->
    <span class="el-icon-d-arrow-left" :class="menuDrag" @click="goback"></span>
  </div>
</template>

<script>
  export default {
    props: {
      config: {
        type: Object,
        required: true
      }
    },
    computed: {
      menuDrag() {
        let result = this.config.visible ? 'el-icon-d-arrow-left menu-drag-go' : 'el-icon-d-arrow-right menu-drag-back';
        return result;
      },
      sidebar() {
        let result = this.config.visible ? 'menu-slide-enter-active' : 'menu-slide-enter';
        return result;
      }
    },
    data() {
      return {
        isAcitive: '',
      }
    },
    mounted() {
      this.$nextTick(function () {
        //默认选中第一个
        this.isAcitive = this.config.data ? this.config.data[0].name : '';
      })
    },
    methods: {
      router(item) {
        this.isAcitive = item.name; //当前选中
        this.$emit('slideBack',this.isAcitive);
        this.$router.push({
          path: item.router
        })
      },
      goback() {
        this.config.visible = !this.config.visible;
      }
    }
  }

</script>

<style lang="less">
  .menu_nav_collapse {
    width: 260px;
    float: left;
    height: 100%;
    background-color:  rgb(84, 92, 100);
    box-sizing: border-box;
    position: relative;
    transition: margin-left 0.5s;
    margin-left: 0;
    z-index: 1;
  }
  .el-menu-item-group__title{
    padding: 0;
  }
.el-menu {
    border-right: none;
    }
  .menu-slide-header {
    height: 50px;
    line-height:50px;
    background-color: #272C34;
    color: white;
    padding-left: 20px;
    .el-icon-menu {
      font-size: 18px;
    }
    span {
      vertical-align: middle;
      font-size: 15px;
    }
  }

  .menu-silde-list {
    position: absolute;
    top: 50px;
    bottom: 0;
    width:100%;
    overflow: auto;
  }

  .menu-silde-item {
    text-align: center;
    color: white;
    width: 140px;
    height: 40px;
    margin: 10px auto;
    line-height: 40px;
    cursor: pointer;
    border-radius: 5px;
  }

  .menu-drag-go,
  .menu-drag-back {
    position: absolute;
    top: 50%;
    height: 70px;
    width: 35px;
    margin-top: -40px;
    text-align: center;
    line-height: 70px;
    background-color: #232429;
    color: white;
    font-size: 30px;
    cursor: pointer;
  }

  .menu-drag-back {
    right: -35px;
    border-radius: 0px 5px 5px 0;
  }

  .menu-drag-go {
    right: 0;
    border-radius: 5px 0px 0 5px;
  }

  .menu-silde-item.menu-silde-active {
    background-color: rgba(12,104,241,1);
    // background-image: linear-gradient(to right,#4a8dd2, #409EFF);
    color: white;
  }
 .menu-silde-item:hover{
    background-image: linear-gradient(to right, #8ebded, #409EFF);
    color: white;
  }

  .menu-slide-enter-active {
    margin-left: 0px;
  }

  .menu-slide-enter {
    margin-left: -260px;
  }

</style>
