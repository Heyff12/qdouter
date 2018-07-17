<template>
  <div class="mechant">
    <div class="right_head">
      {{$t('menus.merChainManage')}}
    </div>
    <div class="right_body">
      <el-form label-width="130px" class="demo-ruleForm" :model="searchkey" :rules="searchkey_rule" ref="searchkey">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item :label="$t('merchantlList.searchBank.chanId')+'：'" prop="mchnt_uid">
              <el-input v-model.trim="searchkey.mchnt_uid"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item :label="$t('merchantlList.searchBank.qdId')+'：'" prop="qd_uid">
              <el-input v-model.trim="searchkey.qd_uid"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item :label="$t('generalPro.bodyBank.loginName')+'：'" prop="username">
              <el-input v-model.trim="searchkey.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item :label="$t('merchantlList.bodyBank.brand')" prop="name">
              <el-input v-model.trim="searchkey.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24"></el-col>
          <!-- <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item :label="$t('merchantlList.searchBank.status')+'：'">
              <el-select v-model="searchkey.status" placeholder="">
                <el-option :label="$t('app.all')" value=""></el-option>
                <el-option :label="$t('merchantlList.searchBank.closed')" value="1"></el-option>
                <el-option :label="$t('merchantlList.searchBank.opend')" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label-width="0" class="t_c">
              <el-button type="primary" @click="search_sub">{{$t('merchantlList.searchBank.search')}}</el-button>
              <el-button type="success" @click="download_sub">{{$t('merchantlList.searchBank.download')}}</el-button>
              <el-button type="default" @click="resetSearch('searchkey')">{{$t('merchantlList.searchBank.reset')}}</el-button>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12">
            <el-form-item label-width="0" class="t_c">
              <el-button type="primary" @click="go_add">{{$t('merchantlList.searchBank.addChain')}}</el-button>
              <el-button type="success" @click="addShop(0)">{{$t('merchantlList.searchBank.addShops')}}</el-button>
              <el-button type="warning" @click="mendShops">{{$t('merchantlList.searchBank.mendShops')}}</el-button>
              <!-- <el-button type="danger" @click="bindShop">{{$t('merchantlList.searchBank.bindShops')}}</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template>
        <el-table :data="merchants_now" border stripe style="width: 100%">
          <el-table-column prop="mchnt_uid" :label="$t('merchantlList.searchBank.chanId')" resizable min-width="130px">
          </el-table-column>
          <el-table-column prop="qd_uid" :label="$t('merchantlList.searchBank.qdId')" resizable min-width="130px">
          </el-table-column>
          <el-table-column prop="name" :label="$t('merchantlList.bodyBank.brand')" resizable min-width="120px">
          </el-table-column>
          <el-table-column prop="username" :label="$t('generalPro.bodyBank.loginName')" resizable min-width="100px">
          </el-table-column>
          <el-table-column :label="$t('merchantlList.bodyBank.feePercent')" resizable min-width="100px">
            <template scope="scope">
              <div v-if="scope.row.fee_ratios || scope.row.settle_cycle">
                <el-popover trigger="click" placement="bottom-end" popper-class="popover_new">
                  <p class="title">{{$t('merchantlList.bodyBank.feeD')}}</p>
                  <ul>
                    <template v-if="scope.row.fee_ratios">
                      <li v-if="middle_fee.wechat_fee">{{$t('merchantlList.bodyBank.feeWeixin')}}：<span class="orange">{{middle_fee.wechat_fee | percent_f }}</span></li>
                      <li v-if="middle_fee.alipay_fee">{{$t('merchantlList.bodyBank.feeBao')}}：<span class="orange">{{middle_fee.alipay_fee | percent_f }}</span></li>
                      <li v-if="middle_fee.jd_fee">{{$t('merchantlList.bodyBank.feeJd')}}：<span class="orange">{{middle_fee.jd_fee | percent_f }}</span></li>
                      <li v-if="middle_fee.qqwallet_fee">{{$t('merchantlList.bodyBank.feeQQ')}}：<span class="orange">{{middle_fee.qqwallet_fee | percent_f }}</span></li>
                      <li v-if="middle_fee.swipecard_fee">{{$t('merchantlList.bodyBank.feeCard')}}：<span class="orange">{{middle_fee.swipecard_fee | percent_f }}</span></li>
                    </template>
                    <template v-if="scope.row.settle_cycle">
                      <li>{{$t('merchantlList.bodyBank.settleCycle')}}：<span class="orange">{{scope.row.settle_cycle}}</span></li>
                    </template>
                  </ul>
                  <span slot="reference" class="hover_color" @click="scan_fee(scope.row)">{{$t('merchantlList.bodyBank.view')}}</span>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="join_dtm" :label="$t('generalPro.bodyBank.regTime')" resizable min-width="170px">
          </el-table-column>
          <el-table-column :label="$t('app.operate')" resizable min-width="200px">
            <template scope="scope">
              <el-button type="text" @click="addShop(scope.row.mchnt_uid)">{{$t('merchantlList.bodyBank.addshop')}}</el-button>
              <el-button type="text" @click="scan_son(scope.row.mchnt_uid)">{{$t('merchantlList.bodyBank.shopList')}}</el-button>
              <!-- <el-button type="text" @click="scan_merchant(scope.row.mchnt_uid)">{{$t('merchantlList.bodyBank.detail')}}</el-button> -->
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
        <el-form-item label="" label-width="0">
          1、<el-button type="text" @click="download">{{$t('merchantlList.bodyBank.addTip1')}}</el-button>
        </el-form-item>      
        <el-form-item label="" label-width="0">
          2、{{$t('merchantlList.bodyBank.addTip2')}}
        </el-form-item>      
        <el-form-item label="" label-width="0">
          3、{{$t('merchantlList.bodyBank.addTip3')}}
        </el-form-item> 
        <el-form-item :label="$t('merchantlList.bodyBank.mendTip4')+'：'">
          <form class="uploadFormButton" id="uploadFormButton" enctype="multipart/form-data">
            <div class="ipload">
              <p>{{$t('merchantlList.bodyBank.mendTip4')}}</p>
              <input type="file" name="upload" size="32" 
              accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
              class="file file_style" :value="addValue" v-on:change="uploadFile($event)" />
            </div>
          </form>
        </el-form-item>
        <el-form-item label="" label-width="0">
          <template v-if="$store.state.language=='zh'">  
            <span v-show="addUpData.total_cnt>0">检测到{{addUpData.total_cnt}}条数据</span>
          </template> 
          <template v-else-if="$store.state.language=='en'">  
            <span v-show="addUpData.total_cnt>0">{{addUpData.total_cnt}} data detected</span>
          </template>  
        </el-form-item>
        <el-form-item label="">
          <span class="bounced_button bounced_sure" v-if="addUpData.total_cnt==0">{{$t('app.save')}}</span>
          <span class="bounced_button bounced_sure bounced_sure_right" @click="addSure" v-else>{{$t('app.save')}}</span>
        </el-form-item>
      </el-form>
    </bounced>
    <bounced :visible="mendShopModal" :newclass="big_bounced">
      <span slot="header">{{$t('merchantlList.searchBank.mendShops')}}<i class="iClose el-icon-close"  @click="mendShopModal=false"></i></span>
      <el-form ref="mendShopModal" label-width="100px" class="demo-ruleForm" label-position="left">        
        <el-form-item label="" label-width="0">
          1、<el-button type="text" @click="downMend">{{$t('merchantlList.bodyBank.mendTip1')}}</el-button>
        </el-form-item>      
        <el-form-item label="" label-width="0">
          2、{{$t('merchantlList.bodyBank.mendTip2')}}
        </el-form-item>      
        <el-form-item label="" label-width="0">
          3、{{$t('merchantlList.bodyBank.mendTip3')}}
        </el-form-item>
        <el-form-item :label="$t('merchantlList.bodyBank.mendTip4')+'：'">
          <form class="uploadFormButton" id="uploadFormButton1" enctype="multipart/form-data">
            <div class="ipload">
              <p>{{$t('merchantlList.bodyBank.mendTip4')}}</p>
              <input type="file" name="mend" size="32" 
              accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
              class="file file_style" :value="mendValue" v-on:change="uploadFile1($event)" />
            </div>
          </form>
        </el-form-item>
        <el-form-item label="" label-width="0">
          <template v-if="$store.state.language=='zh'">  
            <span v-show="mendData.total_cnt>0">检测到{{mendData.total_cnt}}条数据</span>
          </template> 
          <template v-else-if="$store.state.language=='en'">  
            <span v-show="mendData.total_cnt>0">{{mendData.total_cnt}} data detected</span>
          </template>  
        </el-form-item>
        <el-form-item label="">
          <span class="bounced_button bounced_sure" v-if="mendData.total_cnt<=0">{{$t('app.save')}}</span>
          <span class="bounced_button bounced_sure bounced_sure_right" @click="mendSure" v-else>{{$t('app.save')}}</span>
        </el-form-item>
      </el-form>
    </bounced>
    <bounced :visible="bindModal" :newclass="big_bounced">
      <span slot="header">{{$t('merchantlList.searchBank.bindShops')}}<i class="iClose el-icon-close"  @click="bindModal=false"></i></span>
      <el-form label-width="100px" class="demo-ruleForm" label-position="left"  :model="binddata" :rules="binddata_rule" ref="binddata">        
        <el-form-item :label="$t('merchantlList.searchBank.operateStyle')+'：'">
          <el-radio v-model="binddata.type" label="1">{{$t('merchantlList.bodyBank.bind')}}</el-radio>
          <el-radio v-model="binddata.type" label="2">{{$t('merchantlList.bodyBank.unbind')}}</el-radio>
        </el-form-item> 
        <el-form-item :label="$t('merchantlList.searchBank.chanId')+'：'" prop="id">
          <el-input v-model="binddata.id"></el-input>
        </el-form-item>
        <el-form-item :label="$t('merchantlList.searchBank.storeId')+'：'"  prop="ids">
          <el-input v-model="binddata.ids" type="textarea" :placeholder="$t('yanzheng.shopId')" :rows="6" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="">
          <span class="bounced_button bounced_sure bounced_sure_right" @click="bindSure">{{$t('app.save')}}</span>
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
        // status: ""
      },
      searchkey_rule: {
        mchnt_uid: [
          {
            required: false,
            pattern: /^[0-9\s]{0,300}$/,
            message: this.$t("yanzheng.chainId"),
            trigger: "blur"
          }
        ],
        qd_uid: [
          {
            required: false,
            pattern: /^[0-9\s]{0,300}$/,
            message: this.$t("yanzheng.qdId"),
            trigger: "blur"
          }
        ],
        username: [
          {
            required: false,
            pattern: /^[0-9a-zA-Z]+$/,
            message: this.$t("yanzheng.loginNameString"),
            trigger: "blur"
          },
          {
            min: 1,
            max: 15,
            message: this.$t("yanzheng.loginNameNum"),
            trigger: "blur"
          }
        ],
        name: [
          {
            required: false,
            pattern: /^[\u4e00-\u9fa5a-zA-Z0-9\s]{1,30}$/,
            message: this.$t("yanzheng.bandName1"),
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
      merchants_now: [], //当前展示信息
      addId: "", //添加分店的类型- 的商户id
      binddata: {
        type: "1",
        id: "",
        ids: ""
      },
      binddata_rule: {
        id: [
          {
            required: true,
            pattern: /^[0-9\s]{0,300}$/,
            message: this.$t("yanzheng.chainId"),
            trigger: "blur"
          }
        ],
        ids: [
          {
            required: true,
            pattern: /^[\d+\s\,{1}(?=\d+\s)]{1,10000}$/,
            message: this.$t("yanzheng.shopId"),
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
      addTitle: "", //添加店弹框标题
      addValue:"",//添加门店--值，保证上传同样的内容，依然可以执行
      mendValue:"",//修改门店--值，保证上传同样的内容，依然可以执行
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
      // searchPost(this.searchkey.status, "status", post_data);
      this.$ajax_log.ajax_get(this, this.list_url, post_data, data_return => {
        _this.pages_all = data_return.data.total_cnt;
        _this.merchants_now = data_return.data.mchnt_infos;
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
            // status: _this.searchkey.status
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
      this.addTitle = val
        ? this.$t("merchantlList.bodyBank.addshop")
        : this.$t("merchantlList.searchBank.addShops");
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
      if (!this.addUpData.fileid) {
        this.$message({
          message: this.$t("merchantlList.bodyBank.upFirst"),
          type: "warning"
        });
        return false;
      }
      let post_data = {
        fileid: this.addUpData.fileid
      };
      // if (this.addId) {
      //   post_data.big_userid=this.addId;
      // }
      this.$ajax_log.ajax_post(this, this.add_url, post_data, data_return => {
        this.addShopModal = false;
        this.get_list();
      },data_return => {
        this.addShopModal = false;
      },data_return => {
        this.addShopModal = false;
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
      this.$ajax_log.ajax_post(this, this.addUp_url, formdata, data_return => {
        _this.addUpData.fileid = data_return.data.fileid;
        _this.addUpData.total_cnt = data_return.data.total_cnt;
        _this.$message({
          message: this.$t("merchantlList.bodyBank.upSuccess"),
          type: "success"
        });
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
      this.$ajax_log.ajax_post(this, this.mendUp_url, formdata, data_return => {
        _this.mendData.fileid = data_return.data.fileid;
        _this.mendData.total_cnt = data_return.data.total_cnt;
        _this.$message({
          message: this.$t("merchantlList.bodyBank.upSuccess"),
          type: "success"
        });
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
      if (!this.mendData.fileid) {
        this.$message({
          message: this.$t("merchantlList.bodyBank.upFirst"),
          type: "warning"
        });
        return false;
      }
      let post_data = {
        fileid:this.mendData.fileid
      };
      this.$ajax_log.ajax_post(
        this,
        this.mend_url,
        post_data,
        data_return => {
          this.mendShopModal = false;
          this.get_list();
        },
        data_return => {
          this.mendShopModal = false;
        },
        data_return => {
          this.mendShopModal = false;
        }
      );
    },
    //关联解绑
    bindShop() {
      this.bindModal = true;
    },
    bindSure() {}
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
