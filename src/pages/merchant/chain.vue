<template>
  <div class="mechant">
    <div class="right_head">
      连锁商户管理
    </div>
    <div class="right_body">
      <el-form label-width="130px" class="demo-ruleForm" :model="searchkey" :rules="searchkey_rule" ref="searchkey">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="连锁商户ID：" prop="mchnt_uid">
              <el-input v-model.trim="searchkey.mchnt_uid"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="渠道ID：" prop="qd_uid">
              <el-input v-model.trim="searchkey.qd_uid"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="登录账号：" prop="username">
              <el-input v-model.trim="searchkey.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="商户名称：" prop="name">
              <el-input v-model.trim="searchkey.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24"></el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="状态：">
              <el-select v-model="searchkey.status" placeholder="请选择状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="注销" value="1"></el-option>
                <el-option label="正常" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label-width="0" class="t_c">
              <el-button type="primary" @click="search_sub">查询</el-button>
              <el-button type="success" @click="download_sub">下载</el-button>
              <el-button type="default" @click="resetSearch('searchkey')">重置</el-button>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12">
            <el-form-item label-width="0" class="t_c">
              <el-button type="primary" @click="go_add">新增连锁商户</el-button>
              <el-button type="success" @click="addShop(0)">批量入门店</el-button>
              <el-button type="warning" @click="mendShops">批量修改信息</el-button>
              <!-- <el-button type="danger" @click="bindShop">门店关联/解绑</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template>
        <el-table :data="merchants_now" border stripe style="width: 100%">
          <el-table-column prop="mchnt_uid" label="连锁商户ID" resizable min-width="130px">
          </el-table-column>
          <el-table-column prop="name" label="商户名称" resizable min-width="120px">
          </el-table-column>
          <el-table-column prop="username" label="登录账号" resizable min-width="100px">
          </el-table-column>
          <el-table-column label="费率" resizable min-width="100px">
            <template scope="scope">
              <div v-if="scope.row.fee_ratios || scope.row.settle_cycle">
                <el-popover trigger="click" placement="bottom-end" popper-class="popover_new">
                  <p class="title">费率明细</p>
                  <ul>
                    <template v-if="scope.row.fee_ratios">
                      <li>微信费率：<span class="orange">{{middle_fee.wechat_fee | percent_f }}</span></li>
                      <li>支付宝费率：<span class="orange">{{middle_fee.alipay_fee | percent_f }}</span></li>
                      <li>京东费率：<span class="orange">{{middle_fee.jd_fee | percent_f }}</span></li>
                      <li>QQ钱包费率：<span class="orange">{{middle_fee.qqwallet_fee | percent_f }}</span></li>
                      <li>刷卡费率：<span class="orange">{{middle_fee.swipecard_fee | percent_f }}</span></li>
                    </template>
                    <template v-if="scope.row.settle_cycle">
                      <li>结算周期：<span class="orange">{{scope.row.settle_cycle}}</span></li>
                    </template>
                  </ul>
                  <span slot="reference" class="hover_color" @click="scan_fee(scope.row)">查看</span>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="join_dtm" label="注册时间" resizable min-width="170px">
          </el-table-column>
          <el-table-column label="操作" resizable min-width="200px">
            <template scope="scope">
              <el-button type="text" @click="addShop(scope.row.mchnt_uid)">加分店</el-button>
              <el-button type="text" @click="scan_son(scope.row.mchnt_uid)">分店列表</el-button>
              <!-- <el-button type="text" @click="scan_merchant(scope.row.mchnt_uid)">详情</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="block t_r mar_t20">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page_now" :page-sizes="[10,20,50,100,200,250]" :page-size="page_per" layout="total, sizes, prev, pager, next" :total="pages_all">
        </el-pagination>
      </div>
    </div>
    <load :visible="loading"></load>
    <toast :msg="toastmsg" :visible="visible_toast" @on-visible-change="onVisibleChange" @on-msg-change="onMsgChange"></toast>
    <bounced :visible="addShopModal" :newclass="big_bounced">
      <span slot="header">{{addTitle}}<i class="iClose el-icon-close"  @click="addShopModal=false"></i></span>
      <el-form ref="addShopModal" label-width="100px" class="demo-ruleForm" label-position="left">
        <el-form-item label="下载模板:">
          <el-button type="text" @click="download">点击下载</el-button>
        </el-form-item>
        <el-form-item label="上传文件:">
          <form class="uploadFormButton" id="uploadFormButton" enctype="multipart/form-data">
            <div class="ipload">
              <p>点击上传</p>
              <input type="file" name="upload" size="32" 
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" 
              class="file file_style" value="" v-on:change="uploadFile($event)" />
            </div>
          </form>
        </el-form-item>
        <el-form-item label="" label-width="0">
          <span v-show="addUpData.total_cnt>0">检测到{{addUpData.total_cnt}}条数据</span> 
        </el-form-item>
        <el-form-item label="">
          <span class="bounced_button bounced_sure" v-if="addUpData.total_cnt==0">确认</span>
          <span class="bounced_button bounced_sure bounced_sure_right" @click="addSure" v-else>确认</span>
        </el-form-item>
      </el-form>
    </bounced>
    <bounced :visible="mendShopModal" :newclass="big_bounced">
      <span slot="header">批量修改信息<i class="iClose el-icon-close"  @click="mendShopModal=false"></i></span>
      <el-form ref="mendShopModal" label-width="100px" class="demo-ruleForm" label-position="left">        
        <el-form-item label="" label-width="0">
          1、<el-button type="text" @click="downMend">下载修改信息的模板</el-button>
        </el-form-item>      
        <el-form-item label="" label-width="0">
          2、上传修改后的文件，仅填写需要修改的部分
        </el-form-item>      
        <el-form-item label="" label-width="0">
          3、每次最多上传500条
        </el-form-item>
        <el-form-item label="上传文件:">
          <form class="uploadFormButton" id="uploadFormButton1" enctype="multipart/form-data">
            <div class="ipload">
              <p>点击上传</p>
              <input type="file" name="mend" size="32" 
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" 
              class="file file_style" value="" v-on:change="uploadFile1($event)" />
            </div>
          </form>
        </el-form-item>
        <el-form-item label="" label-width="0">
          <span v-show="mendData.total_cnt>0">检测到{{mendData.total_cnt}}条数据</span>     
        </el-form-item>
        <el-form-item label="">
          <span class="bounced_button bounced_sure" v-if="mendData.total_cnt==0">确认</span>
          <span class="bounced_button bounced_sure bounced_sure_right" @click="mendSure" v-else>确认</span>
        </el-form-item>
      </el-form>
    </bounced>
    <bounced :visible="bindModal" :newclass="big_bounced">
      <el-form label-width="100px" class="demo-ruleForm" label-position="left"  :model="binddata" :rules="binddata_rule" ref="binddata">        
        <el-form-item label="操作类型:">
          <el-radio v-model="binddata.type" label="1">关联</el-radio>
          <el-radio v-model="binddata.type" label="2">解绑</el-radio>
        </el-form-item> 
        <el-form-item label="连锁店ID:" prop="id">
          <el-input v-model="binddata.id"></el-input>
        </el-form-item>
        <el-form-item label="门店ID:" prop="ids">
          <el-input v-model="binddata.ids" type="textarea" placeholder="请输入门店ID，多个分店用英文逗号分隔" :rows="6" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="">
          <span class="bounced_button bounced_sure bounced_sure_right" @click="addSure">确认</span>
          <span class="bounced_button bounced_sure" @click="bindModal=false">取消</span>
        </el-form-item>
      </el-form>
    </bounced>
  </div>
</template>
<script>
import yanzheng from "../../method/yanzheng";
import { searchPost, mendPost } from "../../method/util";
export default {
  name: "merchant_chain",
  data() {
    return {
      loading: false, //load是否显示
      toastmsg: "", //toast提示文字
      visible_toast: false, //toast是否显示
      bounced_show: true, //弹框是否显示
      addShopModal: false, //加分店弹框是否显示
      mendShopModal: false,
      bindModal: false,
      large_bounced: "large_bounced", //商户详情弹框样式
      big_bounced: "big_bounced", //修改商户详情弹框样式
      searchkey: {
        mchnt_uid: "",
        qd_uid: "",
        username: "",
        name: "",
        status: ""
      },
      searchkey_rule: {
        mchnt_uid: [
          {
            required: false,
            pattern: /^[0-9\s]{0,300}$/,
            message: "请输入连锁商户ID，只能包含数字",
            trigger: "blur"
          }
        ],
        qd_uid: [
          {
            required: false,
            pattern: /^[0-9\s]{0,300}$/,
            message: "请输入渠道ID，只能包含数字",
            trigger: "blur"
          }
        ],
        username: [
          {
            required: false,
            pattern: /^[0-9a-zA-Z]+$/,
            message: "仅支持输入字母或者数字，请重新输入!",
            trigger: "blur"
          },
          {
            min: 1,
            max: 15,
            message: "请输入不超过15个字符的登录账号!",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: false,
            pattern: /^[\u4e00-\u9fa5a-zA-Z0-9\s]{1,20}$/,
            message: "请输入商户名称，长度在 1 到 20 个字符",
            trigger: "blur"
          }
        ]
      },
      list_url: "/qudao/v1/api/chain/list", //获取商户列表
      down_url: "/qudao/v1/api/chain/download", //下载
      mendDown_url: "/qudao/v1/api/chain/download_modify_template", //批量修改下载
      mendUp_url: "/qudao/v1/api/chain/upload_modify_file", //批量修改上传
      mend_url: "/qudao/v1/api/chain/mchnt/batch_modify", //批量修改
      addDown_url: "/qudao/v1/api/chain/download_create_template", //加分店下载
      addUp_url: "/qudao/v1/api/chain/upload_create_file", //加分店上传
      add_url: "/qudao/v1/api/chain/mchnt/batch_create", //加分店确认
      middle_fee: {
        wechat_fee: "",
        alipay_fee: "",
        jd_fee: "",
        qqwallet_fee: "",
        swipecard_fee: ""
      }, //商户费率-中转参数，scope不能直接识别2级信息scope.row.fee_ratios.wechat_fee
      pages_all: 0, //总信息数
      page_per: 10, //每页信息数
      page_now: 1, //当前页数
      pages: 1, //总页数
      merchants_now: [], //当前展示信息
      addId: "", //添加分店的类型- 的商户id
      binddata: {
        type: 1,
        id: "",
        ids: ""
      },
      binddata_rule: {
        id: "",
        ids: [
          {
            required: true,
            pattern: /^[\d+\s\,{1}(?=\d+\s)]{1,10000}$/,
            message: "请输入门店ID，多个id用英文逗号分隔",
            trigger: "blur"
          }
        ]
      },
      mendData: {
        fileid: "",
        total_cnt: 0
      },
      addUpData: {
        fileid: "",
        total_cnt: 0
      },
      addTitle: "" //添加店弹框标题
    };
  },
  created: function() {
    this.get_list();
  },
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
    //查看费率
    scan_fee: function(val) {
      if (val.fee_ratios === null) {
        this.middle_fee = {
          wechat_fee: "",
          alipay_fee: "",
          jd_fee: "",
          qqwallet_fee: "",
          swipecard_fee: ""
        };
      } else {
        this.middle_fee = val.fee_ratios;
      }
    },
    //获取商户列表
    get_list: function() {
      let _this = this;
      let post_data = {
        page: this.page_now,
        page_size: this.page_per
      };
      searchPost(this.searchkey.mchnt_uid, "mchnt_uid", post_data);
      searchPost(this.searchkey.qd_uid, "qd_uid", post_data);
      searchPost(this.searchkey.username, "username", post_data);
      searchPost(this.searchkey.name, "name", post_data);
      searchPost(this.searchkey.status, "status", post_data);
      this.$http
        .get(this.list_url, {
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
              _this.pages_all = data_return.data.mchnt_cnt;
              _this.merchants_now = data_return.data.mchnt_infos;
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
    //提交查询
    search_sub: function() {
      this.$refs.searchkey.validate(valid => {
        if (valid) {
          this.get_list();
        } else {
          return false;
        }
      });
    },
    //下载--整体
    download_sub: function() {
      this.$refs.searchkey.validate(valid => {
        if (valid) {
          let _this = this;
          let post_data = {
            page: _this.page_now,
            page_size: _this.page_per,
            mchnt_uid: _this.searchkey.mchnt_uid.replace(/\s/g, ""),
            qd_uid: _this.searchkey.qd_uid.replace(/\s/g, ""),
            username: _this.searchkey.username.replace(/\s/g, ""),
            name: _this.searchkey.name.replace(/\s/g, ""),
            status: _this.searchkey.status
          };
          let url = this.down_url + "?";
          let data;
          for (data in post_data) {
            url += data + "=" + post_data[data] + "&";
          }
          url = url.substr(0, url.length - 1);
          window.open(url);
        } else {
          return false;
        }
      });
    },
    //重置
    resetSearch(formName) {
      this.$refs[formName].resetFields();
      this.searchkey.status = "";
    },
    handleSizeChange(val) {
      let _this = this;
      //console.log(`每页 ${val} 条`);
      _this.page_per = val;
      _this.page_now = 1;
      this.get_list();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      let _this = this;
      _this.page_now = val;
      this.get_list();
    },
    //新增
    go_add() {
      this.$router.push({
        name: "add_chain"
      });
    },
    //点击查看详情
    scan_merchant: function(id) {
      this.$router.push({
        name: "add_chain",
        query: { style: "scan", id: id }
      });
    },
    //子列表
    scan_son: function(id) {
      this.$router.push({
        name: "son_list",
        query: { id: id }
      });
    },
    //加分店
    addShop(val) {
      this.addId = val ? val : "";
      this.addTitle = val ? "加分店" : "批量入门店";
      // console.log(val);
      // if(val){
      //   this.addId = val;
      //   this.addTitle = '加分店';
      // }else{
      //   this.addId = '';
      //   this.addTitle ='批量入门店';
      // }
      // console.log(this.addTitle);
      // console.log(this.addId);
      this.addUpData.fileid = "";
      this.addUpData.total_cnt = 0;
      this.addShopModal = true;
    },
    //确认添加
    addSure() {
      let _this = this;
      if (!this.addUpData.fileid) {
        this.$message({
          message: "请先上传文件！",
          type: "warning"
        });
        return false;
      }
      this.$http
        .post(this.add_url, this.addUpData.fileid, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(
          function(response) {
            _this.addShopModal = false;
            _this.loading = false;
            let data_return = response.body;
            if (data_return.respcd == "0000") {
              _this.get_list();
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
            _this.addShopModal = false;
            _this.loading = false;
            _this.visible_toast = true;
            _this.toastmsg = "网络超时!";
          }
        )
        .catch(function(response) {
          _this.addShopModal = false;
          _this.loading = false;
        });
    },
    //添加上传文件
    uploadFile: function(e) {
      let _this = this;
      let formdata = new FormData(document.getElementById("uploadFormButton"));
      let file = document.getElementById("uploadFormButton")[0].files[0];
      // console.log(file);
      formdata.append("content", file);
      formdata.append("file_name", file.name);
      if (this.addId) {
        formdata.append("big_userid", this.addId);
      }
      this.$http
        .post(this.addUp_url, formdata, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(
          function(response) {
            _this.loading = false;
            let data_return = response.body;
            if (data_return.respcd == "0000") {
              _this.addUpData.fileid = data_return.data.fileid;
              _this.addUpData.total_cnt = data_return.data.total_cnt;
              _this.$message({
                message: "上传成功！",
                type: "success"
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
    //修改上传
    uploadFile1: function(e) {
      let _this = this;
      let formdata = new FormData(document.getElementById("uploadFormButton1"));
      let file = document.getElementById("uploadFormButton1")[0].files[0];
      // console.log(file);
      formdata.append("content", file);
      formdata.append("file_name", file.name);
      // console.log(formdata);
      this.$http
        .post(this.mendUp_url, formdata, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(
          function(response) {
            _this.loading = false;
            let data_return = response.body;
            if (data_return.respcd == "0000") {
              _this.mendData.fileid = data_return.data.fileid;
              _this.mendData.total_cnt = data_return.data.total_cnt;
              _this.$message({
                message: "上传成功！",
                type: "success"
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
    //下载模板文件--加分店
    download: function() {
      window.open(this.addDown_url);
    },
    //批量修改
    mendShops() {
      this.mendData.fileid = "";
      this.mendData.total_cnt = 0;
      this.mendShopModal = true;
    },
    //下载修改模板
    downMend() {
      window.open(this.mendDown_url);
    },
    //修改确定
    mendSure() {
      let _this = this;
      if (!this.mendData.fileid) {
        this.$message({
          message: "请先上传文件！",
          type: "warning"
        });
        return false;
      }
      this.$http
        .post(this.mend_url, this.mendData.fileid, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(
          function(response) {
            _this.mendShopModal = false;
            _this.loading = false;
            let data_return = response.body;
            if (data_return.respcd == "0000") {
              _this.get_list();
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
            _this.mendShopModal = false;
            _this.loading = false;
            _this.visible_toast = true;
            _this.toastmsg = "网络超时!";
          }
        )
        .catch(function(response) {
          _this.mendShopModal = false;
          _this.loading = false;
        });
    },
    //关联解绑
    bindShop() {
      this.bindModal = true;
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
@import "../../css/common/const";
span.hover_color {
  &:hover {
    color: @orange;
  }
}
</style>
