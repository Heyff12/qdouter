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
              <el-form-item label="品牌名称" prop="brandname">
                <el-input v-model="base.brandname" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="公司名称" prop="company">
                <el-input v-model="base.company" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="商户类型" prop="type">
                <el-input v-model="base.type" placeholder="" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="联系人" prop="name">
                <el-input v-model="base.name" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="联系人邮箱" prop="email">
                <el-input v-model="base.email" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <div class="clearfix_liner1"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <p class="title">银行信息</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="收款银行" prop="bank">
                <el-input v-model="base.bank" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="分行" prop="branchbank">
                <el-input v-model="base.branchbank" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="开户账号" prop="account">
                <el-input v-model="base.account" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="收款账号" prop="accountNum">
                <el-input v-model="base.accountNum" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="银行号" prop="swiftcode">
                <el-input v-model="base.swiftcode" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item label="清算规则" prop="rule">
                <el-input v-model="base.rule" :disabled="pageStyle=='scan'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <div class="clearfix_liner1"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <p class="title">产品信息</p>
            </el-col>
           <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <el-table ref="multipleTable" :data="products" border stripe style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="product_id" label="交易类型" resizable min-width="120px">
                </el-table-column>
                <el-table-column prop="name" label="费率" resizable min-width="100px">
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
export default {
  name: "add_chain",
  data() {
    return {
      products: [], //ajax获取
      pageStyle: "", //页面类型
      pageId: "", //id
      titleTop: "", //id
      loading: false, //load是否显示
      toastmsg: "", //提示文字
      visible_toast: false, //toast是否显示
      base: {
        brandname: "", 
        company: "", 
        name: "", 
        email: "", 
        type: "", 
        bank: "", 
        branchbank: "", 
        accountNum: "", 
        account: "", 
        swiftcode: "",
        rule: "", 
      },
      rules: {
        brandname: [
          {
            required: true,
            min: 1,
            max: 128,
            message: "请输入品牌名称，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ],
        company: [
          {
            required: true,
            min: 1,
            max: 128,
            message: "请输入公司名称，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: false,
            min: 2,
            max: 128,
            message: "请输入商户类型，长度在 2 到 128 个字符",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: false,
            min: 1,
            max: 128,
            message: "请输入联系人，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ],
        email: [
          {
            type: "email",
            required: false,
            message: "请填写正确的联系人邮箱",
            trigger: "blur"
          }
        ],
        bank: [
          {
            required: false,
            min: 1,
            max: 128,
            message: "请输入收款银行，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ],
        branchbank: [
          {
            required: false,
            min: 1,
            max: 128,
            message: "请输入分行，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ],
        account: [
          {
            required: false,
            min: 1,
            max: 128,
            message: "请输入开户账号，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ],
        accountNum: [
          {
            required: false,
            pattern: /^[0-9a-zA-Z\s]+$/,
            min: 1,
            max: 128,
            message: "请输入收款账号，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ],
        accountNum: [
          {
            required: false,
            pattern: /^[0-9a-zA-Z\s]+$/,
            min: 1,
            max: 128,
            message: "请输入收款账号，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            pattern: /^1[0-9]{10}$/,
            message: "请填写正确的手机号",
            trigger: "blur"
          }
        ],
      },
      userid: "", 
      userid_url: "/qudao_mis/v1/api/qd/precreate", //获取userid 渠道预注册
    };
  },
  created: function() {
    this.fetchPath();
  },
  computed: {
  },
  watch: {
  },
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
        this.firstVal();//赋值
        return false;
      }
      this.GetInfo(this.pageId);
      if (this.pageStyle == "scan") {
        this.titleTop = "查看";
      }
    },
    GetInfo(id) {
    //   this.$ajax_axios.ajax_get(this, this.common_url + id, "", data_return => {
    //     this.addPush = data_return.data;
    //     this.addPush.ispush = data_return.data.ispush.toString();
    //     this.addPush.send_type = data_return.data.send_type.toString();
    //     this.addPush.spectype = data_return.data.spectype.toString();
    //     if(data_return.data.spectype == 2){
    //       this.addPush.userids_form = data_return.data.userids;
    //       this.form_num = this.addPush.userids_form.split(',').length;
    //     }else if(data_return.data.spectype == 3){
    //       this.addPush.userids_input = data_return.data.userids;
    //       this.input_num = this.addPush.userids_input.split(',').length;
    //     }
    //     if(data_return.data.send_time){
    //       this.addPush.send_time = new Date(data_return.data.send_time);
    //     }
    //     this.firstVal();//赋值
    //   });
    },
    //第一次取固定值
    firstVal(){
    //   for(let key in this.addPush){
    //     this.fixInfo[key] = this.addPush[key];
    //   }
    },
    goback: function() {
      this.$router.go(-1);
    },
    //产品选择监听事件
    handleSelectionChange(val) {
      let _this = this;
      let select_val = val;
      _this.product = [];
      for (let i = 0; i < select_val.length; i++) {
        let id = select_val[i].product_id;
        _this.product.push(id);
      }
    },
    mend(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          //提交修改ajax--todo
          _this.fix_info();
        }
      });
    },
    //获取特定渠道的基本信息
    get_info: function() {
      var _this = this;
      this.$http
        .get(this.qd_info_url, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(
          function(response) {
            _this.loading = false;
            var data_return = response.body;
            if (data_return.respcd == "0000") {
              var areas = data_return.data.auth_areas;
              areas.forEach((item, index) => {
                _this.if_remove_operation = true;
                //console.log(item);
                _this.get_citylist(item.auth_province, item.auth_city, index);
              });

              setTimeout(() => {
                _this.base = data_return.data;
                _this.city_mid = data_return.data.city;
                //如果url为空，给图片赋默认值
                if (_this.base.logo_url.length <= 0) {
                  _this.base.logo_url = "/qudao/v1/static/login/img/ic_img.png";
                }
                if (_this.base.icon_url.length <= 0) {
                  _this.base.icon_url = "/qudao/v1/static/login/img/ic_img.png";
                }
                if (_this.base.business_license_url.length <= 0) {
                  _this.base.business_license_url =
                    "/qudao/v1/static/login/img/ic_img.png";
                }
                if (_this.base.bank_account_url.length <= 0) {
                  _this.base.bank_account_url =
                    "/qudao/v1/static/login/img/ic_img.png";
                }
                _this.userid = _this.base.qd_uid; //上传图片时需要
              }, 1000);
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
      //测试数据
      //this.test_info();
    },
    //修改特定渠道的基本信息
    fix_info: function() {
      let _this = this;
      let post_data = _this.base;
      //如果没有上传一下两个图片，设置值为空
      if (
        _this.base.business_license_url ==
        "/qudao/v1/static/login/img/ic_img.png"
      ) {
        _this.base.business_license_url = "";
      }
      if (
        _this.base.bank_account_url == "/qudao/v1/static/login/img/ic_img.png"
      ) {
        _this.base.bank_account_url = "";
      }
      this.$http
        .post(this.qd_info_url, post_data, {
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
              _this.toastmsg = "修改成功!";
            } else {
              if (data_return.respmsg) {
                _this.toastmsg = data_return.respmsg;
              } else {
                _this.toastmsg = data_return.resperr;
              }
              _this.visible_toast = true;
            }
            if (_this.base.business_license_url.length <= 0) {
              _this.base.business_license_url =
                "/qudao/v1/static/login/img/ic_img.png";
            }
            if (_this.base.bank_account_url.length <= 0) {
              _this.base.bank_account_url =
                "/qudao/v1/static/login/img/ic_img.png";
            }
          },
          function(response) {
            _this.loading = false;
            _this.visible_toast = true;
            _this.toastmsg = "网络超时!";
            if (_this.base.business_license_url.length <= 0) {
              _this.base.business_license_url =
                "/qudao/v1/static/login/img/ic_img.png";
            }
            if (_this.base.bank_account_url.length <= 0) {
              _this.base.bank_account_url =
                "/qudao/v1/static/login/img/ic_img.png";
            }
          }
        )
        .catch(function(response) {
          _this.loading = false;
          if (_this.base.business_license_url.length <= 0) {
            _this.base.business_license_url =
              "/qudao/v1/static/login/img/ic_img.png";
          }
          if (_this.base.bank_account_url.length <= 0) {
            _this.base.bank_account_url =
              "/qudao/v1/static/login/img/ic_img.png";
          }
        });
    },
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
</style>
