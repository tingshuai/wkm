<template>
  <div class="settingToastBody">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="产品名称" prop="prodName">
            <el-input type="text" v-model.trim="ruleForm.prodName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品编码" prop="prodNo">
            <el-input type="text" v-model.trim="ruleForm.prodNo"></el-input>
          </el-form-item>
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
          <el-form-item label="计量单位" prop="unit">
            <el-input type="text" v-model.trim="ruleForm.unit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="等级" prop="level">
            <el-input type="text" v-model.trim="ruleForm.level"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="材质" prop="material">
            <el-input type="text" v-model.trim="ruleForm.material"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生产场地" prop="factorySetId">
            <el-input type="text" v-model.trim="ruleForm.factorySetId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="仓储位置" prop="rockPosition">
            <el-input type="text" v-model.trim="ruleForm.rockPosition"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="当前库存量" prop="curAmount">
            <el-input type="text" v-model.trim="ruleForm.curAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input v-model.trim="ruleForm.remark" type="textarea" :rows="3"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  export default {
    props: ['options'],
    data() {
      return {
        ruleForm: {
          prodName: '',
          norms: '',
          param: '',
          modelDesc: '',
          mattersTypeId: '',
          storeSetId:'',
          unit: '',
          level: '',
          material: '',
          prodStatus: '',
          rockPosition: '',
          curAmount: '',
          factorySetId: '',
          remark: ''
        },
        rules: { //校验
          prodName: [], //产品名称
          norms: [], //规格
          param: [], //参数
          storeSetId:[],//仓库
          modelDesc: [], //型号
          mattersTypeId: [], //所属分类
          unit: [], //计量单位
          level: [], //等级
          material: [], //材质
          prodStatus: [], //产品状态
          rockPosition: [], //仓储位置
          curAmount: [], //当前库存量
          factorySetId: [], //生产场地
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
    }
  }

</script>
<style lang="less">
  .settingToastBody {
    padding:0 40px 0 15px;
  }

</style>
