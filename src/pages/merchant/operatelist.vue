<template>
    <div>
        <div class="right_head">
            {{$t('menus.merChainList')}}
        </div>
        <div class="right_body">
            <el-form label-width="150px" class="demo-ruleForm" :model="searchkey" :rules="searchkey_rule" ref="searchkey">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24">
                        <el-form-item :label="$t('merchantlList.searchBank.operateTime')+':'" prop="">
                            <el-date-picker v-model="searchkey.start_time" type="datetime" align="right" placeholder="" :picker-options="pickerOptions_s" format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00']" popper-class="no_now" @change="start_change" :editable="false" :clearable="false">
                            </el-date-picker>
                            <span>至</span>  
                            <el-date-picker v-model="searchkey.end_time" type="datetime" align="right" placeholder="" :picker-options="pickerOptions_e" format="yyyy-MM-dd HH:mm:ss" :default-time="['23:59:59']" popper-class="no_now noAnotherMonth" :editable="false" :clearable="false">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24"></el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="6">
                        <el-form-item :label="$t('merchantlList.searchBank.operateStyle')+':'">
                            <el-select v-model="searchkey.style" placeholder="">
                                <el-option :label="$t('app.all')" value=""></el-option>
                                <el-option :label="$t('merchantlList.searchBank.mendMuch')" value="1"></el-option>
                                <el-option :label="$t('merchantlList.searchBank.createMuch')" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="6">
                        <el-form-item :label="$t('merchantlList.searchBank.operateStatus')+':'">
                            <el-select v-model="searchkey.status" placeholder="">
                                <el-option :label="$t('app.all')" value=""></el-option>
                                <el-option :label="$t('generalPro.searchBank.success')" value="1"></el-option>
                                <el-option :label="$t('generalPro.searchBank.failure')" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="6">
                        <el-form-item label-width="0" class="t_c">
                            <el-button type="primary" @click="search_sub_ajax">{{$t('app.search')}}</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template>
                <el-table :data="transfer_list_now" border stripe style="width: 100%">
                    <el-table-column prop="operate_time" :label="$t('merchantlList.searchBank.operateTime')" resizable min-width="180px">
                    </el-table-column>
                    <el-table-column :label="$t('merchantlList.searchBank.operateStyle')" resizable min-width="100px">
                        <template scope="scope">
                            <span v-if="scope.row.style==1">{{$t('merchantlList.searchBank.mendMuch')}}</span>
                            <span v-if="scope.row.style==2">{{$t('merchantlList.searchBank.createMuch')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="file_name" :label="$t('merchantlList.bodyBank.filename')" resizable min-width="120px">
                    </el-table-column>
                    <el-table-column :label="$t('merchantlList.searchBank.operateStatus')" resizable min-width="120px">
                        <template scope="scope">
                            <span v-if="scope.row.status==1">{{$t('generalPro.searchBank.success')}}</span>
                            <span v-if="scope.row.status==2">{{$t('generalPro.searchBank.failure')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('merchantlList.bodyBank.detail')" resizable min-width="180px">
                        <template scope="scope">
                            <el-button type="text" @click="getDetail(scope.row)" v-if="scope.row.status==2">{{$t('merchantlList.bodyBank.detail')}}</el-button>
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
        <toast :msg="toastmsg" :visible="visible_toast" @on-visible-change="onVisibleChange" @on-msg-change="onMsgChange"></toast>
    </div>
</template>
<script>
export default {
    name: 'merchant_list',
    data() {
        return {
            loading: false, //load是否显示
            toastmsg: '', //toast提示文字
            visible_toast: false, //toast是否显示
            searchkey: {
                'status': '',
                'style': '',
                'start_time': '',
                'end_time': '',
            },
            list_url: location.protocol + '//' + location.host + '/qudao_mis/v1/api/mchnt/transfer/record', //获取列表  
            pages_all: 0, //总信息数
            pages: 1, //总页数
            page_per: 20, //每页信息数
            page_now: 1, //当前页数
            transfer_list_now: [], //当前展示信息
            now_year: new Date().getFullYear(), //当前年份
            now_month: new Date().getMonth() + 1, //当前年份
            last_day: new Date(), //月份最后一天
            start_day: this.get_daystart(), //结束时间可选的第一天
            pickerOptions_s: {
                disabledDate: (time) => time.getTime() > Date.now()
            },
            pickerOptions_e: {
                disabledDate: (time) => time.getTime() > this.last_day || time.getTime() < this.start_day
            },
            searchkey_rule: {
            },
        }
    },
    created: function() {
        //设置默认时间--取消时间区间选择
        //this.searchkey.daterange = [this.get_daystart(), new Date()];
        this.searchkey.start_time = this.get_daystart();
        this.searchkey.end_time = new Date();
        setTimeout(() => {
            this.get_list(); //获取商户列表
        }, 0);
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
            if (this.searchkey.start_time - this.searchkey.end_time > 0) {
                this.$message({
                    message: this.$t('yanzheng.timeThan'),
                    type: "error"
                });
                return false;
            }
            let post_data = {
                'page': _this.page_now,
                'page_size': _this.page_per,
                'status': _this.searchkey.status,
                'style': _this.searchkey.style,
                'start_time': _this.get_datetime(_this.searchkey.start_time),
                'end_time': _this.get_datetime(_this.searchkey.end_time),
            };
            this.$ajax_log.ajax_get(this, this.list_url, post_data, (data_return) => {
                _this.pages_all = data_return.data.total_cnt;
                _this.transfer_list_now = data_return.data.records;
            });
        },
        //提交查询--后台处理
        search_sub_ajax: function() {
            this.get_list();
            // this.$refs.searchkey.validate((valid) => {
            //     if (valid) {
            //         console.log('成功');
            //         this.get_list();
            //     } else {
            //         return false;
            //     }
            // });
        },
        //详情
        getDetail(val){},
        //计算开始时间 月份的最后一天
        start_change(time) {
            let _this = this;
            let iosTime = time.replace(/-/g,'/');
            let date = new Date(iosTime);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            //结束时间--年月日
            let end_t = this.searchkey.end_time;
            let end_t_y = new Date(end_t).getFullYear();
            let end_t_m = new Date(end_t).getMonth() + 1;
            let end_t_d = new Date(end_t).getDate();
            //计算当天天的前一天
            let day = date.getDate();
            let now_day = year + '/' + month + '/' + day + ' 00:00:00';
            _this.start_day = new Date(now_day);
            //计算当前月的最后一天
            //如果与当前结束日期的年月相同，且小于当前结束日期的day值，则不再重新计算新的结束日期
            if (year == end_t_y && month == end_t_m && day <= end_t_d) {
                return false;
            }
            let nextmonth, lastday, new_month, new_year;
            if (month < 12) {
                new_month = month + 1;
                nextmonth = year + '/' + new_month + '/' + '01 00:00:00';
            } else {
                new_year = year + 1;
                nextmonth = new_year + '/' + '01/01 00:00:00';
            }
            lastday = new Date(new Date(nextmonth).getTime() - 1);
            if (year !== _this.now_year || month !== _this.now_month) {
                _this.last_day = lastday;
                _this.searchkey.end_time = lastday;
            } else {
                _this.last_day = new Date();
                _this.searchkey.end_time = new Date();
            }
        },
        //获取当月1号0点的时间
        get_daystart: function() {
            let _this = this;
            let d = new Date();
            let year = d.getFullYear();
            let month = _this.date_long(d.getMonth() + 1);
            let day = _this.date_long(d.getDate());
            let dd = year + '/' + month + '/' + '01 00:00:00';
            return new Date(dd);
        },
        //获取年月日时分秒--时间格式化
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
        //处理1位01
        date_long: function(n) {
            if (n < 10) {
                return '0' + n;
            } else {
                return n;
            }
        },
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
body .el-date-editor.el-input {
    width:auto;
}
</style>
