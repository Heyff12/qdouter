<template>
  <div>
    <div class="right_head">
      商圈管理
    </div>
    <div class="right_body">
      <el-form label-width="120px" class="demo-ruleForm" :model="searchkey" :rules="searchkey_rule" ref="searchkey">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="商圈名称：" prop="name">
              <el-input v-model.trim="searchkey.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="所在省份：" prop="province">
              <el-input v-model.trim="searchkey.province"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="所在城市：" prop="city">
              <el-input v-model.trim="searchkey.city"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="商圈类型：">
              <el-select v-model.number="searchkey.type" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="busytype in busytypes_search.records" v-bind:value="busytype.tp" v-bind:label="busytype.text">
                </el-option>
              </el-select>
              <!-- <el-select v-model="searchkey.type" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="商业区" value="0"></el-option>
                <el-option label="高新区" value="1"></el-option>
                <el-option label="写字楼" value="2"></el-option>
                <el-option label="商业街" value="3"></el-option>
                <el-option label="餐饮街" value="4"></el-option>
                <el-option label="混合型" value="5"></el-option>
                <el-option label="景区" value="6"></el-option>
                <el-option label="居住区" value="7"></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="clearfix"></div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="开放程度：">
              <el-select v-model="searchkey.openness" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="开放型" value="1"></el-option>
                <el-option label="半开放型" value="2"></el-option>
                <el-option label="封闭型" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="审核状态：">
              <el-select v-model="searchkey.audit_status" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="待审核" value="0"></el-option>
                <el-option label="已通过" value="2"></el-option>
                <el-option label="已拒绝" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="状态：">
              <el-select v-model="searchkey.status" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="正常" value="0"></el-option>
                <el-option label="冻结" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="添加开始时间：">
              <el-date-picker v-model="searchkey.s_join_dtm" type="datetime" align="right" placeholder="选择开始时间" :picker-options="pickerOptions_s" format="yyyy-MM-dd HH:mm:ss" @change="start_change" :editable="false" :clearable="false">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="clearfix"></div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="添加结束时间：">
              <el-date-picker v-model="searchkey.e_join_dtm" type="datetime" align="right" placeholder="选择结束时间" :picker-options="pickerOptions_e" format="yyyy-MM-dd HH:mm:ss" popper-class="no_now" :editable="false" :clearable="false">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label-width="0" class="t_c">
              <el-button type="primary" @click="search_sub_ajax">查询</el-button>
              <el-button type="default" icon="plus" @click="add_circle">添加商圈</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template>
        <el-table :data="trade_now" border stripe style="width: 100%">
          <el-table-column prop="name" label="商圈名称" resizable min-width="100px">
          </el-table-column>
          <el-table-column prop="type_str" label="商圈类型" resizable min-width="120px">
          </el-table-column>
          <el-table-column label="所在城市" resizable min-width="100px">
            <template scope="scope">
              {{scope.row.province}}-{{scope.row.city}}
            </template>
          </el-table-column>
          <el-table-column label="商圈开放程度" resizable min-width="120px">
            <template scope="scope">
              <span v-if="scope.row.openness==1">开放型</span>
              <span v-else-if="scope.row.openness==2">半开放型</span>
              <span v-else>封闭型</span>
            </template>
          </el-table-column>
          <el-table-column label="审核状态" resizable min-width="120px">
            <template scope="scope">
              <span v-if="scope.row.audit_status==1">已拒绝</span>
              <span v-else-if="scope.row.audit_status==2">已通过</span>
              <span v-else>待审核</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" resizable min-width="120px">
            <template scope="scope">
              <span v-if="scope.row.status==0">正常</span>
              <span v-else>冻结</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="添加时间" resizable min-width="170px">
          </el-table-column>
          <el-table-column label="操作" resizable min-width="160px">
            <template scope="scope">
              <div class="btn_margin">
                <el-button type="info" @click="scan_info(scope.row)">查看</el-button>
                <el-button type="success" @click="edit_info(scope.row)" v-show="scope.row.audit_status!=2 || scope.row.status!=0">编辑</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="block t_r mar_t20">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page_now" :page-sizes="[20,50,100,200,250]" :page-size="page_per" layout="total, sizes, prev, pager, next" :total="pages_all">
        </el-pagination>
      </div>
    </div>
    <load :visible="loading"></load>
    <load :visible="loading1"></load>
    <load :visible="loading2"></load>
    <toast :msg="toastmsg" :visible="visible_toast" @on-visible-change="onVisibleChange" @on-msg-change="onMsgChange"></toast>
    <bounced :visible="add_bounced" :newclass="big_bounced">
      <span slot="header">
            <template v-if="bounced_status==1">添加</template><template v-else-if="bounced_status==2">查看</template><template v-else>编辑</template>商圈
            <i class="close"  @click="add_bounced=false"></i>
            </span>
      <el-form :model="add_info" :rules="add_info_rules" ref="add_info" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商圈名称" prop="name">
          <el-input v-model="add_info.name" type="text" auto-complete="off" @blur="if_right" :readonly="bounced_status==2"></el-input>
        </el-form-item>
        <el-form-item label="所在省" prop="province">
          <el-select v-model="add_info.province" placeholder="" v-on:change="select_pro"  v-on:visible-change="sel_check" filterable :disabled="bounced_status==2">
            <el-option v-for="province in pro_city" v-bind:areaid="province.areaid" v-bind:value="province.areaname" v-bind:label="province.areaname">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在市" prop="city">
          <el-select v-model="add_info.city" placeholder="" v-on:change="select_city"  v-on:visible-change="sel_check" filterable :disabled="bounced_status==2">
            <el-option v-for="city in citys" v-bind:cityid="city.cityid" v-bind:value="city.cityname" v-bind:label="city.cityname">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商圈类型" prop="type">
          <el-select v-model.number="add_info.type" placeholder=""  v-on:visible-change="sel_check" :disabled="bounced_status==2">
            <el-option v-for="busytype in busytypes.records" v-bind:value="busytype.tp" v-bind:label="busytype.text">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商圈开放程度" prop="openness">
          <el-select v-model="add_info.openness" placeholder=""  v-on:visible-change="sel_check" :disabled="bounced_status==2">
            <el-option label="开放型" value="1"></el-option>
            <el-option label="半开放型" value="2"></el-option>
            <el-option label="封闭型" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" v-show="bounced_status!=2">
          <span class="bounced_button bounced_sure" v-bind:class="{bounced_sure_right:if_right_class}" @click="add_circle_sub">保存</span>
          <span class="bounced_button bounced_cancle" @click="add_bounced=false">取消</span>
        </el-form-item>
      </el-form>
    </bounced>
  </div>
</template>
<script>
export default {
  name: 'merchant_index',
  data() {
    return {
      loading: false, //load是否显示
      loading1: false, //load是否显示
      loading2: false, //load是否显示
      toastmsg: '', //toast提示文字
      visible_toast: false, //toast是否显示
      searchkey: {
        'name': '',
        'city': '',
        'province': '',
        'type': '', //商圈类型
        'openness': '',
        'audit_status': '',
        'status': '', //状态
        's_join_dtm': '',
        'e_join_dtm': '',
      },
      list_url: '/qudao/v1/api/region/list', //获取列表  
      add_url: '/qudao/v1/api/region/create', //添加  
      fix_url: '/qudao/v1/api/region/edit', //编辑  
      qd_areacities_url: '/qudao/v1/api/tools/areacities', //省份城市列表   
      busy_style_url: '/qudao/v1/api/tools/regiontypes', //商圈类型  
      busytypes_search: {},
      busytypes: {},
      pages_all: 0, //总信息数
      pages: 1, //总页数
      page_per: 20, //每页信息数
      page_now: 1, //当前页数
      trade_now: [], //当前展示信息
      now_year: new Date().getFullYear(), //当前年份
      now_month: new Date().getMonth() + 1, //当前年份
      end_day: new Date(), //结束时间可选的最后一个时间点
      start_day: this.get_daystart(), //结束时间可选的第一天
      pickerOptions_s: {
        disabledDate: (time) => time.getTime() > Date.now()
      },
      pickerOptions_e: {
        disabledDate: (time) => time.getTime() > this.end_day || time.getTime() < this.start_day
      },
      searchkey_rule: {
        name: [{
          required: false,
          pattern: /^[\u4e00-\u9fa5a-zA-Z0-9\s]{1,10}$/,
          message: '请输入商圈名称，长度在 1 到 10 个字符',
          trigger: 'blur'
        }],
        city: [{
          required: false,
          pattern: /^[\u4e00-\u9fa5a-zA-Z0-9\s]{1,30}$/,
          message: '请输入所在市，长度在 1 到 30 个字符',
          trigger: 'blur'
        }],
        province: [{
          required: false,
          pattern: /^[\u4e00-\u9fa5a-zA-Z0-9\s]{1,30}$/,
          message: '请输入所省份，长度在 1 到 30 个字符',
          trigger: 'blur'
        }],
      },
      //弹框---------------------------------------------------------------------------------------
      add_bounced: false, //弹框是否显示
      big_bounced: 'big_bounced', //弹框特殊样式--大弹框
      bounced_status: 1, //操作是添加1 查看2 编辑3 
      now_id: '', //当前正在编辑的弹框信息id
      if_right_class: false, //弹框输入内容是否都正确，都正确，增加类 显示橙色，否则 灰色
      pro_city: [], //ajax获取
      citys: [],
      reset_province: '',
      reset_city: '',
      add_info: {
        "name": "",
        "type": '',
        "openness": "1",
        // "provinceid": '', // 省份代码
        "province": '', //省份
        // "cityid": '', // 城市代码
        "city": '', //城市
      },
      add_info_rules: {
        name: [{
          required: true,
          pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,10}$/,
          message: '请设置不超过10个字符中文、英文、数字格式的商圈名称',
          trigger: 'blur'
        }],
        type: [{
          require: true,
          message: '请选择商圈类型',
          type: 'number',
          trigger: 'change',
        }],
        openness: [{
          require: true,
          message: '请选择商圈开放程度',
          trigger: 'change',
        }],
        province: [{
          required: true,
          message: '请选择所在省份',
          trigger: 'change'
        }],
        city: [{
          required: true,
          message: '请选择所在城市',
          trigger: 'change'
        }],
      },
      if_city: false, //是否获取到城市
      if_busystyle: false, //是否获取到商圈类型
    }
  },
  created: function() {
    this.get_area(); //获取省份城市 
    this.get_busytypes(); //获取商圈类型
    //设置默认时间--取消时间区间选择
    //默认时间
    this.searchkey.s_join_dtm = this.get_daystart();
  },
  watch: {
    if_city: function(val, oldVal) {
      if (this.if_city && this.if_busystyle) {
        this.get_list();
      }
    }, //省份获取成功后-获取总行
    if_busystyle: function(val, oldVal) {
      if (this.if_city && this.if_busystyle) {
        this.get_list();
      }
    }, //省份获取成功后-获取总行
  },
  methods: {
    //输入是否正确--随之更改确认保存 按钮的 颜色
    if_right: function() {
      let _this = this;
      this.$refs.add_info.validate((valid) => {
        if (valid) {
          _this.if_right_class = true;
        } else {
          _this.if_right_class = false;
        }
      });
    },
    //监听toast是否可见的值得变化
    onVisibleChange(val) {
      this.visible_toast = val; //④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
    },
    //监听toast内容的值得变化
    onMsgChange(val) {
      this.toastmsg = val; //④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
    },
    //调整每页显示信息数量
    handleSizeChange(val) {
      let _this = this;
      _this.page_per = val;
      _this.page_now = 1;
      this.get_list();
    },
    //更换当前页
    handleCurrentChange(val) {
      let _this = this;
      _this.page_now = val;
      this.get_list();
    },
    //获取商户列表
    get_list: function() {
      let _this = this;
      if (_this.searchkey.s_join_dtm.getTime() > _this.searchkey.e_join_dtm.getTime()) {
        _this.loading = false;
        _this.visible_toast = true;
        _this.toastmsg = '结束时间小于开始时间!';
        return false;
      }
      let post_data = {
        'page': _this.page_now,
        'page_size': _this.page_per,
        'name': _this.searchkey.name.replace(/\s/g, ''),
        'city': _this.searchkey.city.replace(/\s/g, ''),
        'province': _this.searchkey.province.replace(/\s/g, ''),
        // 'type': _this.searchkey.type,
        // 'openness': _this.searchkey.openness - 0,
        // 'audit_status': _this.searchkey.audit_status - 0,
        // 'status': _this.searchkey.status - 0,
        's_join_dtm': _this.get_datetime(_this.searchkey.s_join_dtm),
        'e_join_dtm': _this.get_datetime(_this.searchkey.e_join_dtm),
      };
      if(this.searchkey.type.toString().length>0){
        post_data.type = this.searchkey.type;
      }
      if(this.searchkey.openness.length>0){
        post_data.openness = this.searchkey.openness - 0;
      }
      if(this.searchkey.audit_status.length>0){
        post_data.audit_status = this.searchkey.audit_status - 0;
      }
      if(this.searchkey.status.length>0){
        post_data.status = this.searchkey.status - 0;
      }
      this.$ajax_log.ajax_get(this, this.list_url, post_data, (data_return) => {
        _this.pages_all = data_return.data.total_cnt;
        _this.trade_now = data_return.data.records;
      });
    },
    //提交查询--后台处理
    search_sub_ajax: function() {
      this.$refs.searchkey.validate((valid) => {
        if (valid) {
          this.page_now = 1;
          this.get_list();
        } else {
          return false;
        }
      });
    },
    //添加商圈
    add_circle: function() {
      this.$refs['add_info'].resetFields();//重置
      this.bounced_status = 1; //弹框为添加状态
      this.if_right_class = false; //默认确认按钮为灰色
      //设置默认值
      this.add_info.name = ''; //赋值
      this.add_info.openness = '1'; //赋值
      this.add_info.type = 1; //赋值
      this.add_info.province = this.reset_province; //赋值
      setTimeout(() => {
        this.add_info.city = this.reset_city; //赋值
      }, 0);
      this.add_bounced = true; //打开弹框
    },
    //查看商圈
    scan_info: function(val) {
      this.$refs['add_info'].resetFields();//重置
      // console.log(val);
      this.bounced_status = 2; //弹框为添加状态
      //设置初始值
      this.add_info.name = val.name; //赋值
      this.add_info.openness = val.openness.toString(); //赋值
      this.add_info.type = val.type - 0; //赋值
      this.add_info.province = val.province; //赋值
      setTimeout(() => {
        this.add_info.city = val.city; //赋值
      }, 100);
      this.add_bounced = true; //打开弹框
    },
    //编辑商圈
    edit_info: function(val) {
      this.$refs['add_info'].resetFields();//重置
      // console.log(val);
      this.bounced_status = 3; //弹框为添加状态
      this.if_right_class = false; //默认确认按钮为灰色
      //设置初始值
      this.add_info.name = val.name; //赋值
      this.add_info.openness = val.openness.toString(); //赋值
      this.add_info.type = val.type - 0; //赋值
      this.add_info.province = val.province; //赋值
      setTimeout(() => {
        this.add_info.city = val.city; //赋值
      }, 100);
      this.now_id = val.id;
      this.add_bounced = true; //打开弹框
    },
    //点击确定
    add_circle_sub: function() {
      let _this = this;
      this.$refs.add_info.validate((valid) => {
        if (valid) {
          if (_this.if_right_class) {
            _this.add_sub();
          }
        } else {
          return false;
        }
      });
    },
    //提交新增加or修改的信息
    add_sub: function() {
      let _this = this;
      let url_now;
      // let post_data = {};
      // post_data = this.add_info;
      let post_data = {
        'name': this.add_info.name,
        'province': this.add_info.province,
        'city': this.add_info.city,
        'type': this.add_info.type,
        'openness': this.add_info.openness - 0,
      };
      if (this.bounced_status == 1) {
        url_now = this.add_url;
        // post_data.id = '';
      } else if (this.bounced_status == 3) {
        url_now = this.fix_url;
        post_data.id = this.now_id;
      }
      this.$ajax_log.ajax_post(this, url_now, post_data, (data_return) => {
        _this.add_bounced = false; //关闭弹框
        _this.get_list(); //重新获取列表信息
      }, (data_return) => {
        _this.add_bounced = false; //关闭弹框
      }, (data_return) => {
        _this.add_bounced = false; //关闭弹框
      });
    },
    //地区----------------------start-------------------------------------------------------------------------------------
    //获取省份城市列表
    get_area: function() {
      var _this = this;
      this.$ajax_log.ajax_load_get(this, 'loading1', this.qd_areacities_url, { 'no_whole_country': 1 }, (data_return) => {
        _this.pro_city = data_return.data.records;
        //设置初始值
        _this.citys = _this.pro_city[0].cities;
        _this.reset_province = _this.pro_city[0].areaname;
        _this.reset_city = _this.citys[0].cityname;
        //设置初始值
        _this.add_info.province = _this.pro_city[0].areaname;
        _this.add_info.city = _this.citys[0].cityname;
        _this.if_city = true;
      });
    },
    //省份值变化后，市也变化
    select_pro: function(val) {
      for (let i = 0; i < this.pro_city.length; i++) {
        if (this.pro_city[i].areaname == this.add_info.province) {
          // this.add_info.provinceid = this.pro_city[i].areaid;
          this.citys = this.pro_city[i].cities;
          //console.log('省份变化');
          //如果不是手动选择更改省份，则不对市进行赋值
          // if (!this.if_reset_branchbank) {
          //   //console.log('省份变化1');
          //   return false; //当重置支行字段为false时，不重置内容（点击下拉菜单时，置为true）
          // }
          setTimeout(() => {
            //console.log('省份变化2');
            this.add_info.city = this.citys[0].cityname;
            // this.add_info.cityid = this.citys[0].cityid; 
          }, 0);
          return false;
        } else {
          this.citys = [];
        }
      }
    },
    //市值也变化，求id
    select_city: function(val) {
      for (let i = 0; i < this.citys.length; i++) {
        if (this.citys[i].cityname == this.add_info.city) {
          // this.add_info.cityid = this.citys[i].cityid;
          return false;
        }
      }
    },
    //编辑状态下，下拉框隐藏时，是否触发判断
    sel_check: function(val){
      if(!val && this.bounced_status==3){
        this.if_right();
      }
    },
    //地区----------------------end-------------------------------------------------------------------------------------
    //获取结算类型
    get_busytypes: function() {
      var _this = this;
      this.$ajax_log.ajax_load_get(this, 'loading2', this.busy_style_url, '', (data_return) => {
        _this.busytypes = data_return.data;
        _this.busytypes_search = data_return.data;
        _this.if_busystyle = true;
      });
    },
    //时间区间----------------------start-------------------------------------------------------------------------------------
    //计算开始时间 ，计算结束时间的区间
    start_change(time) {
      let _this = this;
      let iosTime = time.replace(/-/g, '/');
      let date = new Date(iosTime);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      //结束时间--年月日
      let end_t = this.searchkey.e_join_dtm;
      let end_t_y = new Date(end_t).getFullYear();
      let end_t_m = new Date(end_t).getMonth() + 1;
      let end_t_d = new Date(end_t).getDate();
      //计算当天天的前一天,设置结束时间的最小值
      let day = date.getDate();
      let now_day = year + '/' + month + '/' + day + ' 00:00:00';
      _this.start_day = new Date(now_day);
      //如果当前结束时间<最小时间，则将结束时间默认设置为当天时间
      let endTime = new Date(_this.searchkey.e_join_dtm).getTime();
      if (endTime - _this.start_day.getTime() < 0) {
        _this.searchkey.e_join_dtm = new Date();
      }
    },
    //获取当天0点的时间
    get_daystart: function() {
      let _this = this;
      let d = new Date();
      let year = d.getFullYear();
      let month = _this.date_long(d.getMonth() + 1);
      let day = _this.date_long(d.getDate());
      //结束时间初始赋值
      let ddend = year + '/' + month + '/' + day + ' 23:59:59';
      this.end_day = new Date(ddend);
      setTimeout(() => {
        this.searchkey.e_join_dtm = new Date(ddend);
      }, 0);
      //计算半年前的开始时间
      let b_year = year,
        b_dd = '';
      let b_month = month - 5;
      if (b_month <= 0) {
        b_year = year - 1;
        b_month = 12 + b_month;
      }
      b_dd = b_year + '/' + this.date_long(b_month) + '/' + '01 00:00:00';
      return new Date(b_dd);
    },
    //获取年月日时分秒
    get_datetime: function(d) {
      let _this = this;
      let date = new Date(d);
      let year = date.getFullYear();
      let month = _this.date_long(date.getMonth() + 1);
      let day = _this.date_long(date.getDate());
      let hour = _this.date_long(date.getHours());
      let min = _this.date_long(date.getMinutes());
      let sec = _this.date_long(date.getSeconds());
      return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
    },
    //处理1位01---取消区间选择，取消时间转化
    date_long: function(n) {
      if (n < 10) {
        return '0' + n;
      } else {
        return n;
      }
    },
    //时间区间----------------------end-------------------------------------------------------------------------------------
  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped rel="stylesheet/less">
.btn_margin .el-button {
  margin: 5px 0;
}

</style>
