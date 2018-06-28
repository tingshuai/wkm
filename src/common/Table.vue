//该文件依赖 loading组件 :fixed="item.fixed" //列是否固定在左侧或者右侧 :prop="item.field" //对应列内容的字段名 :width="item.width" //对应列的宽度 :sortable="item.isSort"
//排序 :resizable="item.isResize" //对应列是否可以通过拖动改变宽度 :show-overflow-tooltip="true" //当内容过长被隐藏时显示tooltip :label="item.label"
//标头标题 :align="tableConfig.align" //文本对齐方式
<template>
  <div class="myTable">
    <!-- 交互按钮 -->
    <toolbar v-if="tableConfig.toolbarConfig" @toolbarBack="toolbarBack" :toolbarConfig="tableConfig.toolbarConfig">
      <slot></slot>
    </toolbar>
    <!-- 表格 -->
    <el-table :data="tableData" @select="select" @select-all="selectAll" @row-dblclick="rowDblclick" :highlight-current-row="tableConfig.isHigh">
      <!-- 是否勾选 -->
      
      <el-table-column v-if="tableConfig.isSelection" type="selection" width="50" :align="tableConfig.align" :disabled="tableData.length<0">
      </el-table-column>
      <!-- 表格配置 -->
      <el-table-column v-for="(item,index) in tableConfig.colConfig" :fixed="item.fixed" :prop="item.field" :width="item.width"
        :min-width="item.minWidth" :sortable="item.isSort" :resizable="item.isResize" :show-overflow-tooltip="true" :label="item.label"
        :align="tableConfig.align">
        <!-- 自定义表格内容 -->
        <template slot-scope="scope">
          <!-- 普通文本 -->
          <span v-if="item.type === 'text'">{{scope.row[item.field]}}</span>
          <!-- 输入框 -->
          <el-input v-else-if="item.type === 'input'" v-model.trim="scope.row[item.field]" size="mini"></el-input>
          <!-- 日期 -->
          <el-date-picker
            v-else-if="item.type === 'date'"
            v-model="scope.row[item.field]"
            type="date"
            placeholder="选择日期"
            size="mini"
            value-format="yyyy-MM-dd">
          </el-date-picker>
          <!-- 数字输入框 -->
          <el-input-number size="mini" :controls="false" style="width:90%" placeholder="请输入数量" :min="0" :max="100000" v-else-if="item.type === 'inputNumber'"
            v-model="scope.row[item.field]"></el-input-number>
          <!-- 下拉菜单 -->
          <el-select v-else-if="item.type === 'select'" v-model="scope.row[item.field]" clearable placeholder="请选择" size="mini">
            <!-- select的数据与字段名相匹配 'select_'+'字段名' -->
            <el-option v-for="_item in scope.row['select_'+item.field]" :label="_item.label" :value="_item.value">
            </el-option>
          </el-select>
          <!-- 盘点录入 -->
          <el-input-number  v-else-if="item.type === 'isActAmount'" size="mini" :controls="false" style="width:90%" placeholder="请输入数量" :min="1"
            v-model="scope.row[item.field]" :disabled="scope.row['isActAmount']"></el-input-number>
          <el-input-number  v-else-if="item.type === 'isProAmount'" size="mini" :controls="false" style="width:90%" placeholder="请输入数量" :min="1"
            v-model="scope.row[item.field]" :disabled="scope.row['isProAmount']"></el-input-number>
          <!-- 盘点录入 -->
          <span v-else-if="item.type == 'btnText'">
            <el-button size="small" type="text" @click="buttonFunction(scope.row) ">{{item.field}}</el-button>
          </span>
          <!-- 未完待续 -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="my-pagination">
      <el-pagination v-if="tableConfig.isPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableConfig.pageNo"
        :page-sizes="[20, 40, 60, 80]" :page-size="tableConfig.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableConfig.total">
      </el-pagination>
    </div>
    <!-- loading -->
    <loading v-show="tableConfig.loadShow"></loading>
  </div>
</template>


<script>
  export default {
    props: ["tableConfig", "tableData"],
    data() {
      return {
        // tableConfig:{
        //   toolbarConfig:[{//操作按钮配置
        //           loading:true,
        //           icon:'xxx',
        //           disabled:true,
        //           method:'xxxx',
        //           name:'小黑'
        //     }],
        //     //表格字段配置
        //     colConfig:[ { field: "voucherId", label: "出库单号", type: "select"},
        //                 { field: "inDate", label: "出库日期", type: "select"},
        //                 { field: "empName", label: "出库登记人", type: "text" },
        //                 { field: "remark", label: "备注", type: "text" }],
        //     isSelection:true,//是否可选
        //     isPage:true,//是否分页
        //     currentSelectArr:[],//当前勾选的数据
        //     align:'center',//文本对齐方式
        //     pageNo:1,
        //     pageSize:20,
        //     total:100,
        //     isHigh:false,
        //     isLoading:false,//是否开启loading
        //     loadShow:false,//loading控制
        //      },
        //     tableData:[{voucherId:'xxxx',inDate:'20152520',empName:'xxxxas',remark:'xxxasda',
        //                   select_voucherId:[{value:'xxx0',label:'xxx'},{value:'xxx0',label:'xxx'}],
        //                   select_inDate:[{value:'xxx0',label:'xxx'},{value:'xxx0',label:'xxx'}]
        //                     }]
      };
    },
    methods: {
      toolbarBack(data) {
        //操作按钮回调
        this.$emit(data.method, data.index);
      },
      handleSizeChange(val) {
        //每页数量变化
        if (this.tableConfig.isLoading) {
          this.tableConfig.loadShow = true; //加载
        }
        this.tableConfig.pageSize = val;
        this.tableConfig.currentSelectArr = [];
        this.$emit("sizeChange");
      },
      handleCurrentChange(val) {
        //页码变化
        if (this.tableConfig.isLoading) {
          this.tableConfig.loadShow = true; //加载
        }
        this.tableConfig.pageNo = val;
        this.$emit("pageChange");
      },
      select(val) {
        //表格Checkbox勾选触发
        this.tableConfig.currentSelectArr = val;
      },
      selectAll(val) {
        //表格Checkbox全选触发
        this.tableConfig.currentSelectArr = val;
      },
      rowDblclick(val) {
        //表格单行双击
        this.$emit("rowDblclick", val);
      },
      //单行操作按钮
      buttonFunction(row) {
        this.$emit("buttonFunction", row);
      }
    },
    watch:{
      'tableData':function(){
         this.tableConfig.currentSelectArr = [];
      }
    }
  };

</script>
<style lang="less">
  @colPading: 8px 0;
  @theadColor: white;
  @theadImage: linear-gradient(to right, #4a8dd2, #2acaff);
  .myTable {
    position: absolute;
    top: 75px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .my-pagination {
      text-align: center;
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 50px;
      padding-top: 10px;
      box-sizing: border-box;
    }
    .el-table {
      // border: 1px solid #dee3e8;
    }
    .el-table td {
      padding: @colPading;
    }
    .el-table thead {
      background-color: #dee3e8; // color: @theadColor;
      font-weight: 500; // background-image: @theadImage;
    }
    .has-gutter th,
    .has-gutter tr {
      background-color: #dee3e8;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 130px;
      }
  }

</style>
