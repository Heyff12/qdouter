<template>
    <div>
        <div class="right_head">
            {{$t('menus.notice')}}
        </div>
        <div class="right_body">
            <template>
                <el-table :data="salesmen_now" border stripe style="width: 100%">
                    <el-table-column prop="title" :label="$t('app.noticeTitle')" resizable min-width="360px">
                        <template scope="scope">
                            <span class="top_span" v-if="scope.row.istop">{{$t('noticeList.bodyBank.stick')}}</span>
                            <span class="top_span" v-else></span>
                            <!-- <span class="top_span " v-if="scope.row.read">已读</span>
                            <span class="top_span red" v-else>未读</span> -->
                            <el-button type="text" @click="open_dialog(scope.row)">{{scope.row.title}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="$t('noticeList.bodyBank.createTime')" resizable min-width="120px">
                    </el-table-column>
                    <el-table-column :label="$t('app.operate')" resizable min-width="120px">
                        <template scope="scope">                            
                            <template v-if="scope.row.can_modify"><el-button :plain="true" type="warning" @click="open_chan(scope.row)">{{$t('noticeList.bodyBank.delete')}}</el-button></template>
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
        <bounced :visible="dialogslsm" :newclass="big_bounced">
            <span slot="header">{{$t('noticeList.bodyBank.Detail')}}<i class="close"  @click="dialogslsm = false"></i></span>
            <el-form label-width="80px" class="demo-ruleForm">
                <el-form-item :label="$t('app.noticeTitle')">
                    <el-input v-model="now_notice.title" type="text" auto-complete="off" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('app.noticeDetail')">
                    <el-input v-model="now_notice.content" type="textarea" :rows="6" auto-complete="off" :readonly="true"></el-input>
                </el-form-item>
            </el-form>
        </bounced>
        <bounced :visible="opratedialog">
            <p class="bounced_text">
                {{$t('noticeList.bodyBank.ifDel')}}
            </p>
            <input type="hidden" name="" v-model="notice_id">
            <p slot="footer">
                <span class="bounced_button bounced_sure" @click="mend_chan">{{$t('app.sure')}}</span>
                <span class="bounced_button bounced_cancle" @click="opratedialog = false">{{$t('app.cancle')}}</span>
            </p>
        </bounced>
    </div>
</template>
<script>
export default {
    name: 'notice',
    data() {
        return {
            loading: false, //load是否显示
            toastmsg: '', //toast提示文字
            visible_toast: false, //toast是否显示
            dialogslsm: false, //业务员信息弹框默认不显示 
            big_bounced: 'big_bounced', //注销弹框变大--样式 
            opratedialog: false, //删除弹框是否开启
            salesmen: [],
            slsm_url: location.protocol + '//' + location.host + '/qudao/v1/api/announcement/list', //获取列表 
            read_url: location.protocol + '//' + location.host + '/qudao/v1/api/announcement/', //发送已读 
            del_url: location.protocol + '//' + location.host + '/qudao/v1/api/announcement/', //修改公告状态--删除公告
            pages_all: 0, //总信息数
            page_per: 10, //每页信息数
            page_now: 1, //当前页数
            pages: 1, //总页数
            salesmen_mid: [], //搜索后的总信息
            salesmen_now: [], //当前展示信息
            now_notice: {
                "title": '',
                "content": '',
            }, //当前选择的功能
            notice_id: '', //当前要删除的公告id
            if_read:'',//当前要删除的公告是否已读，1为已读，0为未读
        }
    },
    created: function() {
        this.get_list(); //获取商户列表  
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
        //获取业务员管理列表
        get_list: function() {
            let _this = this;
            let post_data = {
                'page': _this.page_now,
                'page_size': _this.page_per,
                'read':'',
            };
            this.$ajax_log.ajax_get(this, this.slsm_url, post_data, (data_return) => {
                _this.pages_all = data_return.data.total_cnt;
                _this.salesmen_now = data_return.data.records;
            });
        },
        //更改每页显示信息条数
        handleSizeChange(val) {
            let _this = this;
            //console.log(`每页 ${val} 条`);
            _this.page_per = val;
            _this.page_now = 1;
            this.get_list();
        },
        //获取当前页信息
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            let _this = this;
            _this.page_now = val;
            this.get_list();
        },
        //打开弹框
        open_dialog(row) {
            this.now_notice = {
                "title": row.title,
                "content": row.content,
            };
            this.dialogslsm = true;
            // if(!row.read){
            //     this.get_read(row);
            //     row.read=1;//设置为已读
            //     this.get_read_no();//获取未读总条数
            //     //测试数据设置
            //     // setTimeout(()=>{
            //     //     this.$store.commit('t_notice_read_no', this.$store.state.notice_read_no-1);
            //     // },1000);   
            // }
        },
        //发送查看请求--取消已读未读
        get_read(obj) {
            let _this = this;
            let id=obj.announce_id;
            this.$ajax_log.ajax_post(this, this.read_url + id + '/read', '', (data_return) => {
                
            });
        },
        //发送未读信息数目--取消已读未读
        get_read_no() {
            let _this = this;
            let post_data = {
                'page': 0,
                'page_size': 20,
                'read':0,
            };
            this.$ajax_log.ajax_get(this, this.slsm_url, post_data, (data_return) => {
                _this.$store.commit('t_notice_read_no', data_return.data.total_cnt);//重新设置未读信息数目
            });
        },
        //开启删除弹框
        open_chan: function(val) {
            this.notice_id = val.announce_id;
            this.if_read = val.read;
            this.opratedialog = true;
        },
        //确认删除操作事件
        mend_chan: function() {
            let _this = this;
            _this.opratedialog = false; //关闭弹框
            let post_data = {
                'status': 1,
            };
            this.$ajax_log.ajax_post(this, this.del_url + this.notice_id + '/status', post_data, (data_return) => {
                _this.get_list();
            });
        },
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
.top_span {
    display: inline-block;
    width: 40px;
}
</style>
