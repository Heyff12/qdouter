<template>
  <div>
    <!-- 图片上传，保存ajax -->
    <div class="right_head">
      {{titleTop}}连锁商户
    </div>
    <div class="right_body">
      <el-form :model="base" :rules="rules" ref="base" label-width="125px" class="demo-ruleForm">
        <el-row>
          <div class="step_show">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <p class="title">公司信息</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="品牌名称" prop="brand_name">
                <el-input v-model="base.brand_name" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="公司名称" prop="company_name">
                <el-input v-model="base.company_name" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="渠道ID" prop="qd_uid">
                <el-input v-model="base.qd_uid" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="业务员登录账号" prop="slsm_username">
                <el-input v-model="base.slsm_username" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="商户类型" prop="mchnt_mcc">
                <el-input v-model="base.mchnt_mcc" placeholder="" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="联系人" prop="contact_name">
                <el-input v-model="base.contact_name" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="联系人邮箱" prop="contact_email">
                <el-input v-model="base.contact_email" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <div class="clearfix_liner1"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <p class="title">银行信息</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="收款银行" prop="head_bankname">
                <el-input v-model="base.head_bankname" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="分行" prop="branch_bankname">
                <el-input v-model="base.branch_bankname" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="开户账号" prop="bankuser">
                <el-input v-model="base.bankuser" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="收款账号" prop="bankaccount">
                <el-input v-model="base.bankaccount" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="银行号" prop="bankcode">
                <el-input v-model="base.bankcode" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="清算规则" prop="clear_rule">
                <el-input v-model="base.clear_rule" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <div class="clearfix_liner1"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <p class="title">产品信息</p>
            </el-col>
           <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <el-table ref="multipleTable" :data="proListShow" border stripe style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="name" label="交易类型" resizable min-width="120px">
                </el-table-column>
                <el-table-column label="费率" resizable min-width="100px">
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
              <el-button type="primary" @click="mend('base')">确定</el-button>
              <el-button @click="goback">返回</el-button>
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
        qd_uid: "",
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
            message: "请输入品牌名称，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ],
        company_name: [
          {
            required: true,
            min: 1,
            max: 128,
            message: "请输入公司名称，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ],
        qd_uid: [
          {
            required: true,
            pattern: /^[0-9\s]{0,300}$/,
            message: "请输入渠道ID，只能包含数字",
            trigger: "blur"
          }
        ],
        slsm_username: [
          {
            required: true,
            pattern: /^[0-9a-zA-Z]{1,15}$/,
            message: "请输入业务员登录账号，长度在 1 到 15 个字符",
            trigger: "blur"
          }
        ],
        mchnt_mcc: [
          {
            required: false,
            pattern: /^[0-9\s]{2,128}$/,
            message: "请输入商户类型，长度在 2 到 128 个数字",
            trigger: "blur"
          }
        ],
        contact_name: [
          {
            required: false,
            min: 1,
            max: 128,
            message: "请输入联系人，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ],
        contact_email: [
          {
            type: "email",
            required: false,
            message: "请填写正确的联系人邮箱",
            trigger: "blur"
          }
        ],
        head_bankname: [
          {
            required: false,
            min: 1,
            max: 128,
            message: "请输入收款银行，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ],
        branch_bankname: [
          {
            required: false,
            min: 1,
            max: 128,
            message: "请输入分行，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ],
        bankuser: [
          {
            required: false,
            min: 1,
            max: 128,
            message: "请输入开户账号，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ],
        bankaccount: [
          {
            required: false,
            pattern: /^[0-9a-zA-Z\s]+$/,
            min: 1,
            max: 128,
            message: "请输入收款账号，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ],
        bankcode: [
          {
            required: false,
            pattern: /^[0-9a-zA-Z\s]+$/,
            min: 1,
            max: 128,
            message: "请输入联行号，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ],
        clear_rule: [
          {
            required: false,
            pattern: /^[0-9\s]+$/,
            min: 1,
            max: 128,
            message: "请输入清算规则，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ]
      },
      add_url: "/qudao/v1/api/chain/create",
      pro_url: "/qudao/v1/api/tools/product_info",
      fixInfo: {}
    };
  },
  created: function() {
    this.fetchPath();
    this.getpro_list();
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
        this.titleTop = "新建";
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
          message: "费率填写错误",
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
        qd_uid: this.base.qd_uid
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
      this.$http
        .post(this.add_url, post_data, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(
          function(response) {
            _this.loading = false;
            let data_return = response.body;
            if (data_return.respcd == "0000") {
              _this.visible_toast = true;
              _this.toastmsg = "新增成功!";
              _this.$router.push({
                name: "merchant_chain"
              });
            } else {
              if (data_return.respmsg) {
                _this.toastmsg = data_return.respmsg;
              } else {
                _this.toastmsg = data_return.resperr;
              }
              _this.visible_toast = true;
            }
          },
          function(response) {
            _this.loading = false;
            _this.visible_toast = true;
            _this.toastmsg = "网络超时!";
          }
        )
        .catch(function(response) {
          _this.loading = false;
        });
    },
    //获取产品列表
    getpro_list: function() {
      let _this = this;
      let post_data = {
        prod_cate: 1
      };
      this.$http
        .get(this.pro_url, {
          params: post_data,
          before: function() {
            _this.loading = true;
          }
        })
        .then(
          function(response) {
            _this.loading = false;
            let data_return = response.body;
            if (data_return.respcd == "0000") {
              _this.proList = data_return.data;
              _this.getproShow(data_return.data);
            } else {
              if (data_return.respmsg) {
                _this.toastmsg = data_return.respmsg;
              } else {
                _this.toastmsg = data_return.resperr;
              }
              _this.visible_toast = true;
            }
          },
          function(response) {
            _this.loading = false;
            _this.visible_toast = true;
            _this.toastmsg = "网络超时!";
          }
        )
        .catch(function(response) {
          _this.loading = false;
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
          message: "费率填写错误",
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
