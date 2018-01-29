<template>
  <div>
    <div class="right_head">
      设置商户默认费率
    </div>
    <div class="right_body">
      <template>
        <el-table :data="list_now" border stripe style="width: 100%">
          <el-table-column label="支付途径名称" resizable min-width="180px">
            <template scope="scope">
                {{scope.row.payway_title}}<el-badge value="新" class="item" v-if="scope.row.exist==0"></el-badge>
            </template>
          </el-table-column>
          <el-table-column prop="payway_info" label="支付途径提示" resizable min-width="180px">
          </el-table-column>
          <!-- <el-table-column prop="fee_ratio_id" label="费率配置id" resizable min-width="150px">
          </el-table-column> -->
          <!-- <el-table-column label="费率类型" resizable min-width="150px">
            <template scope="scope">
              {{scope.row.fee_type==1?'渠道成本费率':scope.row.fee_type==2?'渠道商户默认费率':'商户费率'}}
            </template>
          </el-table-column> -->
          <el-table-column label="百分比费率" resizable min-width="100px">
            <template scope="scope">
              <span v-if="scope.row.payway_fee_mode!=2">{{scope.row.fee_percent}}%</span>               
            </template>
          </el-table-column>
          <el-table-column label="定额手续费/元" resizable min-width="120px">
            <template scope="scope">
              <span v-if="scope.row.payway_fee_mode!=1">{{(scope.row.fee_fix/100).toFixed(2)}}</span>              
            </template>
          </el-table-column>
          <el-table-column label="封顶手续费/元" resizable min-width="120px">
            <template scope="scope">
              <span v-if="scope.row.payway_max_type==2 && scope.row.fee_max.toString().length>=1">{{(scope.row.fee_max/100).toFixed(2)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fee_memo" label="备注" resizable min-width="180px">
          </el-table-column>
          <!-- <el-table-column prop="payway_id" label="支付途径id" resizable min-width="180px">
          </el-table-column>
          <el-table-column label="费率组成形式" resizable min-width="170px">
            <template scope="scope">
              {{scope.row.payway_fee_mode==1?'百分比':scope.row.payway_fee_mode==2?'定额':'组合'}}
            </template>
          </el-table-column> -->
          <el-table-column label="操作" resizable min-width="100px">
            <template scope="scope">
              <el-button type="text" @click="mendD(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <load :visible="loading"></load>
    <toast :msg="toastmsg" :visible="visible_toast" @on-visible-change="onVisibleChange" @on-msg-change="onMsgChange"></toast>
    <bounced :visible="opratedialog">
      <p class="bounced_text">
        您确认要<span>修改</span>该条信息？
      </p>
      <p slot="footer">
        <span class="bounced_button bounced_sure" @click="mend_chan">确认</span>
        <span class="bounced_button bounced_cancle" @click="opratedialog = false">取消</span>
      </p>
    </bounced>
    <bounced :visible="publicDialog" :newclass="large_bounced">
      <span slot="header">修改<!-- -{{mendTitle}} --><i class="close"  @click="publicDialog = false"></i></span>
      <el-form label-width="110px" class="demo-ruleForm form_width" ref="mend_form" :model="mend_form" :rules="mend_form_rule">
        <el-form-item label="费率类型：">
          {{mend_form.fee_type==1?'渠道成本费率':mend_form.fee_type==2?'渠道商户默认费率':'商户费率'}}
        </el-form-item>
        <el-form-item label="费率配置id：">
          {{mend_form.fee_ratio_id}}
        </el-form-item>
        <el-form-item label="百分比费率：" prop="fee_percent" v-if="mend_form.payway_fee_mode==1 || mend_form.payway_fee_mode==3">
          <el-input v-model="mend_form.fee_percent">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="定额手续费：" prop="fee_fix" v-if="mend_form.payway_fee_mode==2 || mend_form.payway_fee_mode==3">
          <el-input v-model="mend_form.fee_fix">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="封顶手续费：" prop="fee_max" v-if="mend_form.payway_max_type==2">
          <el-input v-model="mend_form.fee_max">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="fee_memo">
          <el-input v-model="mend_form.fee_memo" type="textarea" :rows="4" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付途径id：">
          {{mend_form.payway_id}}
        </el-form-item>
        <el-form-item label="费率组成形式：">
          {{mend_form.payway_fee_mode==1?'百分比':mend_form.payway_fee_mode==2?'定额':'组合'}}
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('mend_form')">确认</el-button>
        </el-form-item>
      </el-form>
    </bounced>
  </div>
</template>
<script>
import yanzheng from '../../method/yanzheng'
export default {
  name: 'merchant_index',
  data() {
    var check_fee_has = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入百分比费率'));
      }
      let reg = /^[0-9]{0,3}(\.{1}\d{1,2}){0,1}$/;
      //value = value.toString().replace(/\D/g, '');
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('百分比费率填写错误'));
        } else if (value - 0 > 100) {
          callback(new Error('百分比费不能大于100'));
        } else {
          callback();
        }
      }, 100);
    };
    return {
      loading: false, //load是否显示
      toastmsg: '', //toast提示文字
      visible_toast: false, //toast是否显示
      publicDialog: false, //修改弹框是否显示
      opratedialog: false, //确认弹框弹框是否显示
      large_bounced: 'big_bounced',
      list_url: '/qudao/v1/api/payquick_ratio/list', //获取交易列表  
      mend_url: '/qudao/v1/api/payquick_ratio/modify',
      list_now: [], //当前展示信息
      mendTitle:'',//修改弹框名称--支付途径名称
      mend_form: {
        'fee_type': '',
        'fee_ratio_id': '',
        'fee_percent': '',
        'fee_fix': '',
        'fee_max': '',
        'fee_memo': '',
        'payway_id': '',
        'payway_fee_mode': '',
      },
      mend_form_rule: {
        fee_memo: yanzheng.test_any('费率备注信息', 0, 500, false, 'blur'),
        fee_percent: [{
          validator: check_fee_has,
          required: true,
          trigger: 'blur'
        }],
        fee_fix: [{
          required: true,
          validator: yanzheng.checkamt_need,
          trigger: 'blur'
        }],
        fee_max: [{
          required: false,
          validator: yanzheng.checkamt,
          trigger: 'blur'
        }],
      },
    }
  },
  created: function() {
    this.get_list();
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
    //获取商户列表
    get_list: function() {
      let _this = this;
      let post_data = {};
      this.$ajax_log.ajax_get(this, this.list_url, post_data, (data_return) => {
        _this.list_now = data_return.data.records;
      });
    },
    //修改
    mendD(val) {
      this.mend_form = {
        'fee_type': val.fee_type,
        'fee_ratio_id': val.fee_ratio_id,
        'fee_percent': val.fee_percent,
        'fee_fix': val.fee_fix / 100,
        'payway_max_type': val.payway_max_type,
        'fee_max': val.fee_max.toString().length>=1 ? val.fee_max/ 100 : '',
        'fee_memo': val.fee_memo,
        'payway_id': val.payway_id,
        'payway_fee_mode': val.payway_fee_mode,
      };
      this.mendTitle = val.payway_title;
      this.publicDialog = true; //打开修改弹框
    },
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.publicDialog = false; //关闭修改弹框
          this.opratedialog = true; //出现确认弹框
        } else {
          return false;
        }
      });
    },
    //二次确认--发表于
    mend_chan() {
      this.opratedialog = false; //关闭确认弹框
      this.sure_ajax();
    },
    //修改
    sure_ajax: function() {
      let _this = this;
      // this.mend_form.fee_fix = yanzheng.floatToint(this.mend_form.fee_fix);
      // this.mend_form.fee_max = yanzheng.floatToint(this.mend_form.fee_max);
      let post_data = {
        'qd_uid': this.mend_form.qd_uid,
        'fee_type': this.mend_form.fee_type,
        'fee_ratio_id': this.mend_form.fee_ratio_id,
        'fee_percent': this.mend_form.fee_percent,
        'fee_fix': yanzheng.floatToint(this.mend_form.fee_fix),
        'fee_memo': this.mend_form.fee_memo,
        'payway_id': this.mend_form.payway_id,
        'payway_fee_mode': this.mend_form.payway_fee_mode,
      };
      if(this.mend_form.payway_max_type==2){
        post_data.fee_max=yanzheng.floatToint(this.mend_form.fee_max)
      }
      this.$ajax_log.ajax_post(this, this.mend_url, post_data, (data_return) => {
        _this.visible_toast = true;
        _this.toastmsg = 'success!';
        _this.get_list();
        _this.$refs.mend_form.resetFields(); //重置输入框
      }, (data_return) => {
        _this.$refs.mend_form.resetFields(); //重置输入框
      }, (data_return) => {
        _this.$refs.mend_form.resetFields(); //重置输入框
      });
    },
  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped rel="stylesheet/less">
@import "../../css/common/const";
span.hover_color {
  color: @orange;
  &:hover {
    color: @orange;
  }
}

</style>
