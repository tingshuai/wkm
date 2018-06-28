<template>
  <div class="settingToastBody">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="产品信息" prop="producInfo">
            <el-select v-model="ruleForm.producInfo" placeholder="请选择" filterable @change="change">
              <el-option v-for="item in producInfoData" :key="item.id" :label="item.label" :value="item.prodNo">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="盘头组编码" prop="midProdNo">
            <el-input type="text" v-model.trim="ruleForm.midProdNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属工艺" prop="crafworkStructId">
            <el-select v-model="ruleForm.crafworkStructId" placeholder="请选择" filterable >
              <el-option v-for="item in crafData" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        </el-col>
        <el-col :span="8">
          <el-form-item label="参数" prop="param">
            <el-input type="text" v-model.trim="ruleForm.param"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="型号" prop="modelDesc">
            <el-input type="text" v-model.trim="ruleForm.modelDesc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="规格" prop="norms">
            <el-input type="text" v-model.trim="ruleForm.norms"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="仓储位置" prop="rockPosition">
            <el-input type="text" v-model.trim="ruleForm.rockPosition"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生产场地" prop="factorySetId">
            <el-input type="text" v-model.trim="ruleForm.factorySetId" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数量" prop="amount">
            <el-input-number type="number" v-model.trim="ruleForm.amount" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计量单位" prop="unit">
            <el-input type="text" v-model.trim="ruleForm.unit" ></el-input> 
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="材质" prop="material">
            <el-input type="text" v-model.trim="ruleForm.material" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="等级" prop="level">
            <el-input type="text" v-model.trim="ruleForm.level" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" :rows="3" v-model.trim="ruleForm.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import {
    productlist
  } from '../../api/index'
  import {
  crafworkTaskEmp
} from "../../api/ProdictionOrders";
  export default {
    props: ['options', 'type'],
    data() {
      return {
        crafData:[],
        producInfoData: [],
        ruleForm: {
          producInfo: '',
          midProdNo:'',//盘头组编码
          mattersTypeId: '', //所属分类
          crafworkStructId: '', //所属工艺
          param: '', //参数
          modelDesc: '', //型号
          norms: '', //规格
          rockPosition: '', //仓储位置
          factorySetId: '', //生产场地
          unit: '', //计量单位
          material: '', //材质
          level: '', //等级
          amount:'',
          remark: '' //备注
        },
        rules: { //校验
          producInfo:[
            { required: true, message: '请选择产品信息', trigger: 'change' }
          ],//产品信息
          midProdNo:[
            { required: true, message: '请输入产品编码', trigger: 'blur' }
          ],//产品编码....
          mattersTypeId: [], //所属分类
          crafworkStructId: [
            { required: true, message: '请选择所属工艺', trigger: 'change' }
          ], //所属工艺
          param: [], //参数
          modelDesc: [], //型号
          norms: [], //规格
          rockPosition: [], //仓储位置
          factorySetId: [], //生产场地
          amount:[
            { required: true, message: '请输入数量', trigger: 'blur' }
          ],//数量
          unit: [
            { required: true, message: '请输入计量单位', trigger: 'blur' }
          ], //计量单位
          material: [], //材质
          level: [], //等级
          remark: [] //备注      
        }
      }
    },
    props: ['options'],
    methods: {
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      },
      submitForm(fun) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
              fun();
          } else {
            return false;
          }
        });
      },//表单验证.....
      change() {
        let index = this.producInfoData.findIndex((item, index) => {
          return this.ruleForm.producInfo == item.prodNo;
        })
        console.log('99999999',index,this.ruleForm.producInfo,this.producInfoData)
        if (index != -1) {
          let {
            mattersTypeId, //所属分类1
            crafworkStructId, //所属工艺
            param, //参数
            modelDesc, //型号
            norms, //规格
            amount,//数量
            rockPosition, //仓储位置
            factorySetId, //生产场地1
            unit, //计量单位
            material, //材质1
            level, //等级1
            remark, //备注
            prodNo, //产品编号
            prodName, //产品名称
            id //id
          } = this.producInfoData[index];
          this.ruleForm = {
            mattersTypeId, //所属分类1
            crafworkStructId, //所属工艺
            param, //参数
            modelDesc, //型号
            norms, //规格
            rockPosition, //仓储位置
            factorySetId, //生产场地1
            amount,//数量
            unit, //计量单位
            material, //材质1
            level, //等级1
            remark, //备注
            prodNo, //产品编号
            prodName, //产品名称
            id
          }
        }

      },
      setSelectData(data){
        let _arr = new Array();
        for(let key in data){
            _arr.push({
                label:data[key],
                value:key
            })
        }
        return _arr;
    }
    },
    mounted() {
      //工艺信息查询
      crafworkTaskEmp({Vue:this}).then(data=>{
          this.crafData = this.setSelectData(data.model);
      })
      productlist({
        Vue: this
      }).then(data => {
        this.producInfoData = data.model;
      })
    }
  }

</script>
<style lang="less">
  .settingToastBody {
    padding: 0 30px 0 0;
  }

</style>
