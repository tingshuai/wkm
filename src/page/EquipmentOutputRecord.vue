//设备产出记录
//半成品库
<template>
  <div class="productLibrary outRecord">
    <el-tabs type="border-card" @tab-click="toggle_machine" v-model="actor">
        <el-tab-pane label="经编机" name="jingbian">
            <!-- <div class="qftabs">
              <span v-bind:class="[machineType == 'jingbian' ? 'act' : '']" @click="toggle_machine('jingbian',$event)">经编机</span>
              <span v-bind:class="[machineType == 'zhengjing' ? 'act' : '']" @click="toggle_machine('zhengjing',$event)">整经机</span>
            </div> -->
            <!-- 搜索 -->
            <mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
            <!--  表格 -->
            <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @buttonFunction="buttonFunction"></mes-table>
        </el-tab-pane>
        <el-tab-pane label="整编机" name="zhengbian">
            <!-- 搜索 -->
            <mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
            <!--  表格 -->
            <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @buttonFunction="buttonFunction"></mes-table>
        </el-tab-pane>
    </el-tabs>
    <!-- 查看详情 -->
    <mes-toast :config="toastInfoData" @infoClose="infoClose">
      <!-- 弹窗内容 -->
      <look-info ref="ToastInfoBody" :config="lookInfoData"></look-info>
    </mes-toast>
  </div>
</template>
<script>
import {
  selectMacPage
} from "../api/EquipmentOutputRecord";
import pLToastBody from "../components/SemifinishedWarehouse/pLToastBody";
import {productlist} from '../api/index'
export default {
  data() {
    return {
      actor:"jingbian",
      machineType:'jingbian',
      lookInfoData: {},
      toastInfoData: {
        title: "查看详情", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "1000px", //弹窗宽
        btnData: [
          {
            name: "关闭", //按钮名
            method: "infoClose", //回调函数
            bgColor: "dialog-deep-blue" //按钮背景
          }
        ]
      },
      search: {
        searchData: {},
        searchConfig: [
          [
            {
              label: "日期范围：",
              field: "flagTime",
              type: "daterange"
            }
          ]
        ]
      },
      col_jingbian:[
        {
          field: "macNo",
          label: "设备编号",
          type: "text"
        },
        {
          field: "acName",
          label: "设备名称",
          type: "text"
        },
        {
          field: "flagTime",
          label: "日期",
          type: "text"
        },
        {
          field: "gtotal",
          label: "布长",
          type: "text"
        },
        {
          field: "weight",
          label: "总重量",
          type: "text"
        },
        {
          field: "unit",
          label: "单位",
          type: "text"
        },
        { field: "查看详情", label: "操作", type: "btnText" }
      ],
      col_zhengjing:[
        {
          field: "macNo",
          label: "设备编号",
          type: "text"
        },
        {
          field: "acName",
          label: "设备名称",
          type: "text"
        },
        {
          field: "flagTime",
          label: "日期",
          type: "text"
        },
        {
          field: "gtotal",
          label: "盘头组数",
          type: "text"
        },
        {
          field: "total",
          label: "盘头个数",
          type: "text"
        },
        {
          field: "weight",
          label: "总重量",
          type: "text"
        },
        {
          field: "unit",
          label: "单位",
          type: "text"
        },
        { field: "查看详情", label: "操作", type: "btnText" }
      ],
      tableConfig: {
        //表格字段配置
        colConfig: [],
        isSelection: true, //是否可选
        isPage: true, //是否分页
        currentSelectArr: [], //当前勾选的数据
        align: "center", //文本对齐方式
        pageNo: 1,
        pageSize: 20,
        total: 0,
        isHigh: false,
        isLoading: true, //是否开启loading
        loadShow: false //loading控制
      },
      tableData: [],
      attrTransfrom: {
        prodNo: "产品编码",
        prodName: "产品名称",
        midProdNo: "半成品编码",
        crafworkStructId: "所属工艺",
        param: "参数",
        modelDesc: "型号",
        norms: "规格",
        unit: "计量单位",
        rockPosition: "仓储位置",
        factorySetId: "生产场地",
        level: "等级",
        material: "材质",
        remark: "备注"
      }
    };
  },
  mounted() {
      //产品下拉
      productlist({Vue:this}).then(data=>{
          this.search.searchConfig[0][1].childrens = data.model;
          console.log( "data----" , data )
      })
    //获取表格数据
    this.tableConfig.colConfig = this.col_jingbian;
    this.searchList({flagTime:'',prodNo:''});
  },
  methods: {
    buttonFunction(data) {
      //表格单行末尾查看详情
      this.toastInfoData.dialogVisible = true;
      let params = {};
      // for (let attr in this.attrTransfrom) {
      //   let key = this.attrTransfrom[attr];
      //   let value = data[attr];
      //   params[key] = value;
      // }
      console.log('data====' , data )
      if( this.machineType == 'jingbian'){
        this.col_jingbian.forEach((val,index,arr)=>{
          if( arr.length - index > 1){
            let key = val.label;
            let value = data[val.field]
            params[key] = value;
          }
        })
      }else{
        this.col_zhengjing.forEach((val,index,arr)=>{
          if( arr.length - index > 1){
            let key = val.label;
            let value = data[val.field]
            params[key] = value;
          }
        })
      }
      setTimeout(() => {
        this.lookInfoData = params;
      }, 0);
    },
    infoClose() {    //关闭查看.......
      this.toastInfoData.dialogVisible = false;
    },
    toggle_machine(me,e){
      if(me.name == 'jingbian'){
        this.tableConfig.colConfig = this.col_jingbian;
        this.machineType = 'jingbian';
      }else{
        this.tableConfig.colConfig = this.col_zhengjing;
        this.machineType = 'zhengjing';
      }
      this.searchList({flagTime:'',prodNo:''});
    },
    searchList(data) {
      //查询数据
      this.tableConfig.pageNo = 1;
      let params = {}
      if(data.flagTime){
        params.tempStampL=data.flagTime[0];
        params.tempStampH=data.flagTime[1]
        params =   this.setAttr(params);
      }
      params.prodNo = data.prodNo ? data.prodNo : '';
      if(this.machineType == "jingbian"){
        params.type = "jbj";
      }else{
        params.type = "zjj";
      }
      console.log( "data", data )
      this.getDate(params);
    },
    sizeChange() {
      //分页size变化
      this.searchList(this.search.searchData);
    },
    pageChange() {
      //分页page变化
      this.getDate(this.search.searchData);
    },
    getDate(data = {}) {
      //获取分页数据
      data.pageNo = this.tableConfig.pageNo;
      data.pageSize = this.tableConfig.pageSize;
      selectMacPage({
        params: this.setAttr(data),
        Vue: this
      }).then(data => {
        this.tableData = data.model.items;
        
        this.tableConfig.total = data.model.numRows;
        this.tableConfig.loadShow = false;
      });
    },
    setAttr(data) {
      for (let attr in data) {
        if (!data[attr]) {
          delete data[attr];
        }
      }
      return data;
    }
  },
  components: {
    pLToastBody
  }
};
</script>

<style scope lang="less">
  .outRecord .el-table{
    top:15px;
    .el-form > .el-form-item{
      margin:0;
    }
  }
  .productLibrary .qftabs{
    >span{
      border:1px solid gray;
      padding: 5px 10px;
      &:hover{
        cursor:pointer;
      }
    }
  }
  .act{
    border:1px solid #2d887f!important;
    color: #2d887f;
  }
</style>
