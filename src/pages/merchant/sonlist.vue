<template>
    <div>
        <div class="right_head">
            {{$t('merchantlList.titleBank.sonTitle')}}
        </div>
        <div class="right_body">
            <el-form label-width="120px" class="demo-ruleForm" ref="searchkey">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="12" :lg="6">
                        <el-form-item label-width="0">
                            <el-button type="primary" @click="download" :disabled="product.length<=0">{{$t('merchantlList.searchBank.downId')}}</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template>
                <el-table :data="listData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="mchnt_uid" :label="$t('generalPro.bodyBank.merNumId')" resizable min-width="120px">
                    </el-table-column>
                    <el-table-column prop="shopname" :label="$t('generalPro.bodyBank.shopName')" resizable min-width="120px">
                    </el-table-column>
                    <el-table-column prop="username" :label="$t('generalPro.bodyBank.loginName')" resizable min-width="120px">
                    </el-table-column>
                    <el-table-column prop="join_dtm" :label="$t('generalPro.bodyBank.regTime')" resizable min-width="180px">
                    </el-table-column>
                    <!-- <el-table-column label="操作" resizable min-width="180px">
                        <template scope="scope">
                            <el-button type="text" @click="scan_merchant(scope.row.mchnt_uid)">{{$t('merchantlList.bodyBank.detail')}}</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
            </template>
        </div>
          <div class="m_t_20 t_c">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <el-button @click="goback">{{$t('app.return')}}</el-button>
            </el-col>
          </div>
        <load :visible="loading"></load>
        <toast :msg="toastmsg" :visible="visible_toast" @on-visible-change="onVisibleChange" @on-msg-change="onMsgChange"></toast>
    </div>
</template>
<script>
export default {
  name: "merchant_list",
  data() {
    return {
      loading: false, //load是否显示
      toastmsg: "", //toast提示文字
      visible_toast: false, //toast是否显示
      list_url: "/qudao/v1/api/chain/branch/list", //获取列表
      down_url: "/qudao/v1/api/chain/branch/download",
      detail_url: "/qudao/v1/api/chain/branch/detail", //取消
      listData: [], //当前展示信息
      product: []
    };
  },
  created: function() {
    this.fetchPath();
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
    download() {
      // console.log(this.product);
      //判断是否选中id
      // if (this.product.length <= 0) {
      //   this.$message({
      //     message: this.$t('merchantlList.bodyBank.selMerchant'),
      //     type: "warning"
      //   });
      //   return false;
      // }
      let url = this.down_url + "?big_userid="+ this.pageId +"mchnt_uids=" + this.product;
      window.open(url);
    },
    //根据style判断是否获取信息
    fetchPath() {
      this.pageId = this.$route.query.id;
      this.get_list();
    },
    //点击查看详情
    scan_merchant: function(id) {
      this.$router.push({
        name: "add_chain",
        query: { style: "scan", id: id }
      });
    },
    //获取商户列表
    get_list: function() {
      let _this = this;
      let post_data = {
        page: this.page_now,
        page_size: this.page_per,
        big_userid: this.pageId
      };
      this.$ajax_log.ajax_get(this, this.list_url, post_data, data_return => {
        _this.pages_all = data_return.data.total_cnt;
        _this.listData = data_return.data.branch_infos;
      });
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
        let id = select_val[i].mchnt_uid;
        _this.product.push(id);
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
</style>
