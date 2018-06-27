<template>
  <div>
    <!-- 图片上传，保存ajax -->
    <div class="right_head">
      <!-- {{titleTop}}连锁商户 -->
      {{$t('merchantlList.searchBank.addChain')}}
    </div>
    <div class="right_body">
      <el-form :model="base" :rules="rules" ref="base" label-width="125px" class="demo-ruleForm">
        <el-row>
          <div class="step_show">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <p class="title">{{$t('merchantlList.bodyBank.company')}}</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('merchantlList.bodyBank.brand')" prop="brand_name">
                <el-input v-model="base.brand_name" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('merchantlList.bodyBank.companyName')" prop="company_name">
                <el-input v-model="base.company_name" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('merchantlList.bodyBank.salName')" prop="slsm_username" @blur="getQd_uid">
                <el-input v-model="base.slsm_username" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('merchantlList.bodyBank.merStyle')" prop="mchnt_mcc">
                <el-input v-model="base.mchnt_mcc" placeholder="" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('merchantlList.bodyBank.contactName')" prop="contact_name">
                <el-input v-model="base.contact_name" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('merchantlList.bodyBank.contactEmail')" prop="contact_email">
                <el-input v-model="base.contact_email" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <div class="clearfix_liner1"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <p class="title">{{$t('merchantlList.bodyBank.bank')}}</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('merchantlList.bodyBank.bankNameGet')" prop="head_bankname">
                <el-input v-model="base.head_bankname" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('merchantlList.bodyBank.branchBank')" prop="branch_bankname">
                <el-input v-model="base.branch_bankname" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('merchantlList.bodyBank.bankNameAccount')" prop="bankuser">
                <el-input v-model="base.bankuser" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('merchantlList.bodyBank.bankCode')" prop="bankaccount">
                <el-input v-model="base.bankaccount" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('merchantlList.bodyBank.bankNum')" prop="bankcode">
                <el-input v-model="base.bankcode" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('merchantlList.bodyBank.rules')" prop="clear_rule">
                <el-input v-model="base.clear_rule" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <div class="clearfix_liner1"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <p class="title">{{$t('merchantlList.bodyBank.product')}}</p>
            </el-col>
           <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <el-table ref="multipleTable" :data="proListShow" border stripe style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="name" :label="$t('generalPro.bodyBank.tradeStyle')" resizable min-width="120px">
                </el-table-column>
                <el-table-column :label="$t('merchantlList.bodyBank.feePercent')" resizable min-width="100px">
                    <template scope="scope">
                      <el-input v-model.number="scope.row.value" @blur="check_fee(scope.row.value,$event)">
                        <template slot="append">%</template>
                      </el-input>
                    </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <div class="clearfix_liner1"></div>
            </el-col>
          </div>
          <div class="m_t_20 t_c">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <el-button type="primary" @click="mend('base')">{{$t('app.save')}}</el-button>
              <el-button @click="goback">{{$t('app.return')}}</el-button>
            </el-col>
          </div>
        </el-row>
      </el-form>
    </div>
    <load :visible="loading"></load>
    <toast :msg="toastmsg" :visible="visible_toast" @on-visible-change="onVisibleChange" @on-msg-change="onMsgChange"></toast>
  </div>
</template>
<script>
import yanzheng from "../../method/yanzheng";
import { searchPost, mendPost } from "../../method/util";
export default {
  name: "add_chain",
  data() {
    return {
      proList: [], //获取的差评列表//ajax获取
      proListShow: [], //展示的数据列表
      proSelId: [], //选择产品id
      pageStyle: "", //页面类型
      pageId: "", //id
      titleTop: "", //id
      loading: false, //load是否显示
      toastmsg: "", //提示文字
      visible_toast: false, //toast是否显示
      base: {
        brand_name: "",
        company_name: "",
        slsm_username:"",
        contact_name: "",
        contact_email: "",
        mchnt_mcc: "",
        head_bankname: "",
        branch_bankname: "",
        bankaccount: "",
        bankuser: "",
        bankcode: "",
        clear_rule: "",
        products: []
      },
      rules: {
        brand_name: [
          {
            required: true,
            min: 1,
            max: 128,
            message: this.$t('yanzheng.bandName'),
            trigger: "blur"
          }
        ],
        company_name: [
          {
            required: true,
            min: 1,
            max: 128,
            message: this.$t('yanzheng.companyName'),
            trigger: "blur"
          }
        ],
        slsm_username: [
          {
            required: true,
            pattern: /^1[0-9]{10}$/,
            message: this.$t('yanzheng.SalesName'),
            trigger: "blur"
          }
        ],
        mchnt_mcc: [
          {
            required: false,
            pattern: /^[0-9]{2,4}$/,
            message: this.$t('yanzheng.merStyle'),
            trigger: "blur"
          }
        ],
        contact_name: [
          {
            required: false,
            min: 1,
            max: 128,
            message: this.$t('yanzheng.contact'),
            trigger: "blur"
          }
        ],
        contact_email: [
          {
            type: "email",
            required: false,
            message: this.$t('yanzheng.contactEmail'),
            trigger: "blur"
          }
        ],
        head_bankname: [
          {
            required: false,
            min: 1,
            max: 50,
            message: this.$t('yanzheng.bank'),
            trigger: "blur"
          }
        ],
        branch_bankname: [
          {
            required: false,
            min: 1,
            max: 256,
            message: this.$t('yanzheng.branch'),
            trigger: "blur"
          }
        ],
        bankuser: [
          {
            required: false,
            min: 1,
            max: 256,
            message: this.$t('yanzheng.bankcode'),
            trigger: "blur"
          }
        ],
        bankaccount: [
          {
            required: false,
            pattern: /^[0-9a-zA-Z\s]{1,256}$/,
            // min: 1,
            // max: 128,
            message: this.$t('yanzheng.bankNum'),
            trigger: "blur"
          }
        ],
        bankcode: [
          {
            required: false,
            pattern: /^[0-9a-zA-Z\s]{1,50}$/,
            // min: 1,
            // max: 128,
            message:this.$t('yanzheng.swift'),
            trigger: "blur"
          }
        ],
        clear_rule: [
          {
            required: false,
            pattern: /^[0-9\s]{1,9}$/,
            // min: 1,
            // max: 128,
            message: this.$t('yanzheng.rule'),
            trigger: "blur"
          }
        ]
      },
      add_url: "/qudao/v1/api/chain/create",
      pro_url: "/qudao/v1/api/tools/product_info",
      qdid_url: "/qudao/v1/api/slsm/info_by_mobile",
      product_url:"/qudao/v1/api/qd/",
      fixInfo: {},
      qdUid:'',
    };
  },
  created: function() {
    this.fetchPath();
    // this.getpro_list();//取消
  },
  computed: {},
  watch: {},
  methods: {
    //监听toast是否可见的值得变化
    onVisibleChange(val) {
      this.visible_toast = val; //④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
    },
    //监听toast内容的值得变化
    onMsgChange(val) {
      this.toastmsg = val; //④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
    },
    //根据style判断是否获取信息
    fetchPath() {
      this.pageStyle = this.$route.query.style;
      this.pageId = this.$route.query.id;
      if (!this.pageStyle) {
        // this.titleTop = "新建";
        this.firstVal(); //赋值
        return false;
      }
      // this.GetInfo(this.pageId);
      // if (this.pageStyle == "scan") {
      //   this.titleTop = "查看";
      // }
    },
    GetInfo(id) {
      // this.$ajax_axios.ajax_get(this, this.common_url + id, "", data_return => {
      //   this.addPush = data_return.data;
      //   this.firstVal();//赋值
      // });
    },
    //第一次取固定值
    firstVal() {
      for (let key in this.base) {
        this.fixInfo[key] = this.base[key];
      }
    },
    goback: function() {
      this.$router.go(-1);
    },
    //获取渠道id-校验输入业务员名称是否正确
    getQd_uid(){
      let reg=/^1[0-9]{10}$/;
      let val = this.base.slsm_username;
      if(reg.test(val)){
        this.getQdId(val);        
      }
    },
    //获取渠道id
    getQdId(val){
      let _this = this;
      let post_data = {
        slsm_mobile: val
      };
      this.$ajax_log.ajax_get(this, this.qdid_url, post_data, data_return => {
        _this.qdUid = data_return.data.qd_uid;
        _this.getProduct(_this.qdUid);
      });
    },
    //获取产品
    getProduct(id){
      let _this = this;
      let post_data = {
        prod_cate: 1
      };
      this.$ajax_log.ajax_get(this, this.product_url+id+'/product_info', post_data, data_return => {
        _this.proList = data_return.data;
        _this.getproShow(data_return.data);
      });
    },
    //产品选择监听事件
    handleSelectionChange(val) {
      let select_val = val;
      this.proSelId = [];
      for (let i = 0; i < select_val.length; i++) {
        let id = select_val[i].product_id;
        // let value = select_val[i].value;
        // this.base.products.push({ [id]: value });
        this.proSelId.push(id);
      }
      // console.log(this.base.products);
      // console.log(this.proListShow);
    },
    mend(formName) {
      var _this = this;
      let errNum = document.getElementsByClassName('errBorder').length;
      if(errNum>0){
        this.$message({
          message: this.$t('yanzheng.fee'),
          type: "error"
        });
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          //提交修改ajax--todo
          _this.fix_info();
        }
      });
    },
    //修改特定渠道的基本信息
    fix_info: function() {
      let _this = this;
      let post_data = {
        brand_name: this.base.brand_name,
        company_name: this.base.company_name,
        slsm_username: this.base.slsm_username
      };
      searchPost(this.base.contact_name, "contact_name", post_data);
      searchPost(this.base.contact_email, "contact_email", post_data);
      searchPost(this.base.mchnt_mcc, "mchnt_mcc", post_data);
      searchPost(this.base.head_bankname, "head_bankname", post_data);
      searchPost(this.base.branch_bankname, "branch_bankname", post_data);
      searchPost(this.base.bankaccount, "bankaccount", post_data);
      searchPost(this.base.bankuser, "bankuser", post_data);
      searchPost(this.base.bankcode, "bankcode", post_data);
      searchPost(this.base.clear_rule, "clear_rule", post_data);
      if (this.proSelId.length > 0) {
        post_data.products = this.getIds();
      }
      this.$ajax_log.ajax_post(this, this.add_url, post_data, data_return => {
        _this.visible_toast = true;
        _this.toastmsg = this.$t('merchantlList.bodyBank.addSuce');
        _this.$router.push({
          name: "merchant_chain"
        });
      });
    },
    //获取产品列表--取消
    getpro_list: function() {
      let _this = this;
      let post_data = {
        prod_cate: 1
      };
      this.$ajax_log.ajax_get(this, this.pro_url, post_data, data_return => {
        _this.proList = data_return.data;
        _this.getproShow(data_return.data);
      });
    },
    //重组列表
    getproShow(data) {
      data.forEach(item => {
        this.proListShow.push({
          product_id: item.product_id,
          name: item.name,
          value: ""
        });
      });
    },
    //重组提交数据
    getIds() {
      this.base.products = [];
      this.proSelId.forEach(item => {
        for (let i = 0; i < this.proListShow.length; i++) {
          if (this.proListShow[i].product_id == item) {
            this.base.products.push({ [item]: this.proListShow[i].value });
            return false;
          }
        }
      });
      return this.base.products;
    },
    //检查费率
    check_fee(val, e) {
      // console.log(val);
      // console.log(e.target.className);
      let reg = /^[0-9]{0,2}(\.{1}\d{1,2}){0,1}$/;
      if (!reg.test(val)) {
        this.$message({
          message: this.$t('yanzheng.fee'),
          type: "error"
        });
        e.target.className = "el-input__inner errBorder"
      } else {
        e.target.className = "el-input__inner"
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
.el-input-group--append .el-input__inner{
  &.errBorder{
    color:red;
    border-color:red;
  }
}
</style>
