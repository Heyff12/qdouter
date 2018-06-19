<template>
  <div class="mechant">
    <div class="right_head">
      商户信息列表
    </div>
    <div class="right_body">
      <el-form label-width="130px" class="demo-ruleForm" :model="searchkey" :rules="searchkey_rule" ref="searchkey">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="商户ID：" prop="mchnt_uid">
              <el-input v-model.trim="searchkey.mchnt_uid"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="商户名称：" prop="mchnt_name">
              <el-input v-model.trim="searchkey.mchnt_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="商户手机号码：" prop="mchnt_mobile">
              <el-input v-model.trim="searchkey.mchnt_mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="所属业务员姓名：" prop="slsm_name">
              <el-input v-model.trim="searchkey.slsm_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="所属渠道名称：" prop="qd_name">
              <el-input v-model.trim="searchkey.qd_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="法人姓名：" prop="mchnt_legal_name">
              <el-input v-model.trim="searchkey.mchnt_legal_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="审核状态：">
              <el-select v-model="searchkey.audit_statuses" placeholder="请选择审核状态" >
                <el-option v-for="item in check_status" v-bind:value="item.tp" v-bind:label="item.text">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="注销状态：">
              <el-select v-model="searchkey.mchnt_status" placeholder="请选择注销状态" >
                <el-option value="" label="全部"></el-option>
                <el-option value="0" label="正常"></el-option>
                <el-option value="1" label="已注销"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="子商户号：" prop="mchnt_mchid">
              <el-input v-model.trim="searchkey.mchnt_mchid"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24"></el-col>
          <!-- <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="商户类型：">
              <el-select v-model="searchkey.mchnt_type" placeholder="请选择商户类型" >
                <el-option v-for="item in mchnttypesSearch.records" v-bind:value="item.tp" v-bind:label="item.text">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="注册时间：">
              <el-date-picker v-model="searchkey.daterange" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions" :editable="false" @change="time_change">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label-width="0" class="t_c">
              <!-- <el-button type="default" @click="fresh_sub">刷新</el-button> -->
              <el-button type="primary" @click="search_sub">查询</el-button>
              <el-button type="default" @click="download_sub">商户信息下载</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template>
        <el-table :data="merchants_now" border stripe style="width: 100%">
          <el-table-column prop="shopname" label="商户名称" resizable min-width="120px" fixed>
          </el-table-column>
          <el-table-column prop="mchnt_uid" label="商户ID" resizable min-width="100px">
          </el-table-column>
          <el-table-column prop="slsm_name" label="所属业务员姓名" resizable min-width="130px">
          </el-table-column>
          <el-table-column prop="qd_info.base.name" label="所属渠道名称" resizable min-width="120px">
          </el-table-column>
          <el-table-column prop="name" label="法人姓名" resizable min-width="100px">
          </el-table-column>
          <el-table-column prop="mobile" label="商户手机号码" resizable min-width="130px">
          </el-table-column>
          <el-table-column prop="type_desc" label="商户类型" resizable min-width="100px">
            <!-- <template scope="scope">
              <span v-if="scope.row.mchnt_type==1">个人</span>
              <span v-else-if="scope.row.mchnt_type==2">个体户</span>
              <span v-else>公司</span>
            </template> -->
          </el-table-column>
          <el-table-column prop="audit_status" label="审核状态" resizable min-width="100px">
          </el-table-column>
          <el-table-column prop="status_desc" label="注销状态" resizable min-width="100px">
            <!-- <template scope="scope">
              <span v-if="scope.row.status">已注销</span>
              <span v-else>正常</span>
            </template> -->
          </el-table-column>
          <el-table-column prop="jointime" label="注册时间" resizable min-width="170px">
          </el-table-column>
          <el-table-column label="操作" resizable min-width="200px">
            <!-- <template scope="scope">
              <template v-if="scope.row.status">
                <el-button type="info" @click="open_chan(scope.row.userid)">启用</el-button>
              </template>
              <template v-else>
                <el-button type="warning" @click="stop_chan(scope.row.userid)">注销</el-button>
              </template>
              <el-button type="danger" @click="move_merchant(scope.row)">迁移</el-button>
              <el-button type="info" @click="scan_merchant(scope.row.userid)">查看详情</el-button>
            </template> -->
              <!-- <el-button type="warning" @click="mend_merchant(scope.row.userid)">修改</el-button> -->
            <template scope="scope">
              <template v-if="scope.row.status">
                <el-button type="text" @click="open_chan(scope.row.userid)">启用</el-button>
              </template>
              <template v-else>
                <el-button type="text" @click="stop_chan(scope.row.userid)">注销</el-button>
              </template>
              <el-button type="text" @click="move_merchant(scope.row)">迁移</el-button>
              <el-button type="text" @click="scan_merchant(scope.row.userid)">查看详情</el-button>
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
    <load :visible="loading1"></load>
    <load :visible="loading2"></load>
    <load :visible="loading3"></load>
    <load :visible="loading4"></load>
    <load :visible="loading5"></load>
    <load :visible="loading6"></load>
    <load :visible="loading7"></load>
    <toast :msg="toastmsg" :visible="visible_toast" @on-visible-change="onVisibleChange" @on-msg-change="onMsgChange"></toast>
    <bounced :visible="opratedialog" :newclass="big_bounced">
      <span slot="header">温馨提示<i class="iClose el-icon-close"  @click="opratedialog = false"></i></span>
      <p class="bounced_text">
        您确认要<i v-if="oprate_if">取消该商户的注销吗？</i><i v-else>注销该商户吗？</i><br/>
        <i v-if="oprate_if">取消</i><i v-else>注销</i>后，该商户便<i v-if="oprate_if">能够</i><i v-else>不能</i>进行交易以及登录钱方好近APP
      </p>
      <p slot="footer">
        <span class="bounced_button bounced_sure" @click="mend_chan">确认</span>
        <span class="bounced_button bounced_cancle" @click="opratedialog = false">取消</span>
      </p>
    </bounced>
    <bounced :visible="merchantDetailDia" :newclass="large_bounced">
      <span slot="header">商户详情<i class="iClose el-icon-close"  @click="merchantDetailDia = false"></i></span>
      <el-form label-width="80px" class="demo-ruleForm" label-position="left">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <p class="title">基本信息</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="商户ID:">{{merchantDetail.base.userid}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="商户名称:">{{merchantDetail.base.name}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="法人姓名:">{{merchantDetail.base.legal_name}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="子商户号:">{{merchantDetail.base.mchid}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="商户类型:">
              <el-select v-model.number="merchantDetail.base.type" placeholder="" :disabled="true">
                <el-option v-for="item in mchnttypes.records" v-bind:value="item.tp" v-bind:label="item.text">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="到账类型:">{{merchantDetail.base.settle_cycle}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="是否为连锁店商户:" label-width="130px">
              <span v-if="merchantDetail.base.is_linked==1">是</span>
              <span v-else>否</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="审核状态:">{{merchantDetail.base.audit_status}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12">
            <el-form-item label="失败原因:">{{merchantDetail.base.audit_memo}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="结算卡更换信息状态:" label-width="150px">
              <el-select v-model.number="merchantDetail.base.bankstatus" placeholder="" :disabled="true">
                <el-option v-for="item in cardstatuses.records" v-bind:value="item.status" v-bind:label="item.text" :key="item.status">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="clearfix_liner1"></div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <p class="title">费率明细</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="微信支付:">{{merchantDetail.fee_ratios.wechat_fee | percent_fT}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="支付宝:">{{merchantDetail.fee_ratios.alipay_fee | percent_fT}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="京东钱包:">{{merchantDetail.fee_ratios.jd_fee | percent_f}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="QQ钱包:">{{merchantDetail.fee_ratios.qqwallet_fee | percent_f}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="clearfix_liner1"></div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <p class="title">店铺信息</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="店铺名称:">{{merchantDetail.shop.shopname}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="经营类型:">{{merchantDetail.shop.mcc_desc}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="所属商圈:">{{merchantDetail.shop.region_name}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="店铺地址:">{{merchantDetail.shop.province}}{{merchantDetail.shop.city}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12">
            <el-form-item label="详细门牌号:" label-width="100px">{{merchantDetail.shop.address}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="店内联系电话（选填）:" label-width="180px">{{merchantDetail.shop.telephone}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.base.type!=1">
            <el-form-item label="营业执照注册号:" label-width="120px">{{merchantDetail.shop.licensenumber}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="clearfixNone"></div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.shop.shopphoto">
            <el-form-item  label-width="0">
              <dl>
                <dt><img :src="merchantDetail.shop.shopphoto" alt=""></dt>
                <dd>店铺门头照片</dd>
              </dl>              
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.shop.goodsphoto">
            <el-form-item  label-width="0">
              <dl>
                <dt><img :src="merchantDetail.shop.goodsphoto" alt=""></dt>
                <dd>店内陈设照片</dd>
              </dl>          
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.base.type!=1 && merchantDetail.shop.licensephoto">
            <el-form-item  label-width="0">
              <dl>
                <dt><img :src="merchantDetail.shop.licensephoto" alt=""></dt>
                <dd>营业执照照片</dd>
              </dl>          
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="clearfix_liner1"></div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <p class="title">商户信息</p>
          </el-col>
          <template v-if="merchantDetail.base.type==1">
            <el-col :xs="24" :sm="24" :md="12" :lg="6">
              <el-form-item label="店主姓名:">{{merchantDetail.merchant.name}}
              </el-form-item>
            </el-col>
          </template>
          <template v-else>
            <el-col :xs="24" :sm="24" :md="12" :lg="6">
              <el-form-item label="公司名称:">{{merchantDetail.merchant.name}}
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6">
              <el-form-item label="法人姓名:">{{merchantDetail.merchant.legal_name}}
              </el-form-item>
            </el-col>
          </template> 
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="身份证号:">{{merchantDetail.merchant.idnumber}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="证件有效日期:"  label-width="100px">{{merchantDetail.merchant.idstartdate}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="证件失效日期:"  label-width="100px">{{merchantDetail.merchant.idenddate}}
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.base.type!=1">
            <el-form-item label="开户名:">{{merchantDetail.merchant.bankuser}}
            </el-form-item>
          </el-col> -->
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="开户名:">{{merchantDetail.merchant.bankuser}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.base.type!=1">
            <el-form-item label="账户类型:">
              <el-select v-model.number="merchantDetail.merchant.banktype" placeholder="" disabled>
                <el-option v-for="cardtype in banktypes_d.records" v-bind:value="cardtype.tp" v-bind:label="cardtype.text">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="银行卡号:">{{merchantDetail.merchant.bankaccount}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="银行卡预留手机号:" label-width="150px">{{merchantDetail.merchant.bankmobile}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="开户地:">{{merchantDetail.merchant.bankprovince}}{{merchantDetail.merchant.bankcity}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="开户行:">
              <!-- {{merchantDetail.merchant.headbankname}} -->
              {{merchantDetail.merchant.bankname}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="clearfix_liner1"></div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <p class="title">其他凭证上传（必填）</p>
          </el-col>
          <template>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.cert_required.idcardfront">
              <el-form-item  label-width="0">
                <dl>
                  <dt><img :src="merchantDetail.cert_required.idcardfront" alt=""></dt>
                  <dd>身份证正面照</dd>
                </dl>              
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.cert_required.idcardback">
              <el-form-item  label-width="0">
                <dl>
                  <dt><img :src="merchantDetail.cert_required.idcardback" alt=""></dt>
                  <dd>身份证反面照</dd>
                </dl>          
              </el-form-item>
            </el-col>
          </template> 
          <!-- <template  v-else>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.cert_required.authidcardfront">
              <el-form-item  label-width="0">
                <dl>
                  <dt><img :src="merchantDetail.cert_required.authidcardfront" alt=""></dt>
                  <dd>法人身份证正面照</dd>
                </dl>              
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.cert_required.authidcardback">
              <el-form-item  label-width="0">
                <dl>
                  <dt><img :src="merchantDetail.cert_required.authidcardback" alt=""></dt>
                  <dd>法人身份证反面照</dd>
                </dl>          
              </el-form-item>
            </el-col>
          </template>  -->
          <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.cert_required.idcardinhand">
            <el-form-item  label-width="0">
              <dl>
                <dt><img :src="merchantDetail.cert_required.idcardinhand" alt=""></dt>
                <dd>申请人手持身份证照</dd>
              </dl>              
            </el-form-item>
          </el-col> 
          <el-col :xs="24" :sm="24" :md="12" :lg="6"  v-if="merchantDetail.base.type==2 && merchantDetail.merchant.banktype==1 && merchantDetail.cert_required.authbankcardfront">
            <el-form-item  label-width="0">
              <dl>
                <dt><img :src="merchantDetail.cert_required.authbankcardfront" alt=""></dt>
                <dd>银行卡正面照</dd>
              </dl>          
            </el-form-item>
          </el-col>
          <template  v-if="merchantDetail.base.type==1">
            <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.cert_required.groupphoto">
              <el-form-item  label-width="0">
                <dl>
                  <dt><img :src="merchantDetail.cert_required.groupphoto" alt=""></dt>
                  <dd>与申请人店内收银台合照</dd>
                </dl>          
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.cert_required.authbankcardfront">
              <el-form-item  label-width="0">
                <dl>
                  <dt><img :src="merchantDetail.cert_required.authbankcardfront" alt=""></dt>
                  <dd>银行卡正面照</dd>
                </dl>          
              </el-form-item>
            </el-col>
          </template>          
          <el-col :xs="24" :sm="24" :md="12" :lg="6"  v-else>
            <el-form-item  label-width="0" v-if="merchantDetail.cert_required.openlicense">
              <dl>
                <dt><img :src="merchantDetail.cert_required.openlicense" alt=""></dt>
                <dd>开户许可证</dd>
              </dl>          
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="clearfix_liner1"></div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <p class="title">其他凭证上传（选填）</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.cert_optional.subshopdesc">
            <el-form-item  label-width="0">
              <dl>
                <dt><img :src="merchantDetail.cert_optional.subshopdesc" alt=""></dt>
                <dd>分店收款说明</dd>
              </dl>              
            </el-form-item>
          </el-col>
          <template  v-if="merchantDetail.base.type!=1">
            <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.merchant.banktype==2 && merchantDetail.cert_optional.authbankcardfront">
              <el-form-item  label-width="0">
                <dl>
                  <dt><img :src="merchantDetail.cert_optional.authbankcardfront" alt=""></dt>
                  <dd>银行卡正面照</dd>
                </dl>          
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.merchant.banktype==2 && merchantDetail.cert_optional.openlicense">
              <el-form-item  label-width="0">
                <dl>
                  <dt><img :src="merchantDetail.cert_optional.openlicense" alt=""></dt>
                  <dd>开户许可证</dd>
                </dl>              
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.cert_optional.orgphoto">
              <el-form-item  label-width="0">
                <dl>
                  <dt><img :src="merchantDetail.cert_optional.orgphoto" alt=""></dt>
                  <dd>组织机构代码照</dd>
                </dl>          
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" v-if="merchantDetail.cert_optional.taxphoto">
              <el-form-item  label-width="0">
                <dl>
                  <dt><img :src="merchantDetail.cert_optional.taxphoto" alt=""></dt>
                  <dd>税务登记照片</dd>
                </dl>              
              </el-form-item>
            </el-col>
          </template>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" v-for="item in merchantDetail.cert_optional.otherphoto">
            <el-form-item  label-width="0" v-if="item">
              <dl>
                <dt><img :src="item" alt=""></dt>
                <dd>其他证明</dd>
                <!-- <dd>租赁合同/产权证明</dd> -->
              </dl>          
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </bounced>
    <bounced :visible="mendDetail" :newclass="big_bounced">
      <span slot="header"><i class="close"  @click="close_mendD"></i></span>
      <el-form :model="mendData" :rules="merchantDetailRules" ref="mendData" label-width="160px" class="demo-ruleForm">
        <el-form-item label="账户名称:" prop="bankuser">
          <el-input v-model="mendData.bankuser" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="银行卡类型:" prop="cardtype">
          <el-select v-model.number="mendData.cardtype" placeholder="" disabled>
            <el-option v-for="cardtype in cardtypes.records" v-bind:value="cardtype.tp" v-bind:label="cardtype.text">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="清算类型:" prop="banktype">
          <el-select v-model.number="mendData.banktype" placeholder="">
            <el-option v-for="banktype in banktypes.records" v-bind:value="banktype.tp" v-bind:label="banktype.text">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="银行预留手机号码:" prop="bankmobile">
          <el-input v-model="mendData.bankmobile"></el-input>
        </el-form-item>
        <el-form-item label="银行所在城市:" required>
          <el-col :span="11">
            <el-form-item prop="bankprovince">
              <el-select v-model="mendData.bankprovince" placeholder="" v-on:change="select_pro" v-on:visible-change="if_reset_branchbank=true" filterable>
                <el-option v-for="province in pro_city" v-bind:areaid="province.areaid" v-bind:value="province.areaname" v-bind:label="province.areaname">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="line_sel_fen" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="bankcity">
              <el-select v-model="mendData.bankcity" placeholder="" v-on:change="select_city" v-on:visible-change="if_reset_branchbank=true" filterable>
                <el-option v-for="city in citys" v-bind:cityid="city.cityid" v-bind:value="city.cityname" v-bind:label="city.cityname">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="收款银行:" prop="headbankname">
          <el-select v-model="mendData.headbankname" placeholder="" v-on:change="select_bank" v-on:visible-change="if_reset_branchbank=true" filterable>
            <el-option v-for="headbankname in headbanks" v-bind:bankid="headbankname.headbankid" v-bind:value="headbankname.headbankname" v-bind:label="headbankname.headbankname">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开户支行:" prop="bankname">
          <el-select v-model="mendData.bankname" placeholder="" v-on:change="select_bankbranch" popper-class="no_nomatch" filterable>
            <el-option v-for="bankname in branchbanks" v-bind:datacode="bankname.bankcode" v-bind:value="bankname.name" v-bind:label="bankname.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="银行卡号:" prop="bankaccount">
          <el-input v-model="mendData.bankaccount"></el-input>
        </el-form-item>
        <el-form-item label="">
          <span class="bounced_button bounced_sure bounced_sure_right" @click="mend_sure('mendData')">提交确认</span>
        </el-form-item>
      </el-form>
    </bounced>
    <bounced :visible="mendialog">
      <p class="bounced_text">
        是否确认修改？
      </p>
      <p slot="footer">
        <span class="bounced_button bounced_sure" @click="mend_sure_sure">确认</span>
        <span class="bounced_button bounced_cancle" @click="mendialog = false">取消</span>
      </p>
    </bounced>
    <bounced :visible="moveMerchant" :newclass="big_bounced">
      <span slot="header">商户迁移<i class="iClose el-icon-close"  @click="close_moveD"></i></span>
      <el-form :model="moveData" :rules="moveDataRules" ref="moveData" label-width="130px" class="demo-ruleForm" label-position="left">
        <el-form-item label="商户">
          <el-input v-model="moveData.shopname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="原业务员手机号">
          <el-input v-model="moveData.mobile" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="新业务员手机号" prop="newMobile">
          <el-input v-model="moveData.newMobile" @blur="getNew(getNewInfo)"></el-input>
        </el-form-item>
        <el-form-item label="新业务员姓名">
          <el-input v-model="moveData.slsm_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="新渠道全称">
          <el-input v-model="moveData.qd_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="">
          <span class="bounced_button bounced_sure" v-if="!newInfo">确认</span>
          <span class="bounced_button bounced_sure bounced_sure_right" @click="moveSure" v-else>确认</span>
        </el-form-item>
      </el-form>
    </bounced>
  </div>
</template>
<script>
import yanzheng from "../../method/yanzheng";
export default {
  name: "merchant_index",
  data() {
    return {
      opratedialog: false, //开启、停用弹框是否开启
      oprate_if: true, //true代表开启，false代表停用
      oprate_data: "", //弹框需要传入的代码
      loading: false, //load是否显示
      loading1: false, //load是否显示
      loading2: false, //load是否显示
      loading3: false, //load是否显示
      loading4: false, //load是否显示
      loading5: false, //load是否显示
      loading6: false, //load是否显示
      loading7: false, //load是否显示
      bounced_show: true, //弹框是否显示
      toastmsg: "", //toast提示文字
      visible_toast: false, //toast是否显示
      merchantDetailDia: false, //商户详情弹框是否开启
      large_bounced: "large_bounced", //商户详情弹框样式
      mendDetail: false, //修改商户详情弹框是否开启
      big_bounced: "big_bounced", //修改商户详情弹框样式
      moveMerchant: false, //商户迁移  弹框是否开启
      pro_city: [], //ajax获取
      citys: [],
      city_id: "", ////为了获取对应省份城市的银行--中间参数
      headbank_id: "", ////为了获取对应省份城市的银行--中间参数--总行id
      bankname_mid: "", //控制银行支行赋值--中间存储
      province_mid: "", //控制银行支行赋值--中间存储--取消使用
      city_mid: "", //控制银行支行赋值--中间存储--取消使用
      bank_mid: "", //控制银行支行赋值--中间存储--取消使用
      if_reset_branchbank: false, //是否重置分行的值
      branchbank_if: false, //支行是否执行
      headbanks: [], //ajax获取
      branchbanks: [], //ajax获取
      mendialog: false, //商户修改--是否确认弹框是否开启
      mendMerchantId: "", //当前修改的商户id
      banktypes: {}, //ajax获取 清算类型
      cardtypes: {}, //ajax获取 银行卡类型
      cardtypesD: {}, //ajax获取 银行卡类型--详情使用
      banktypes_d: {}, //ajax获取 清算类型 --详情展示
      mchnttypes: {}, //ajax获取 商户类型列表 --详情展示
      mchnttypesSearch:{}, //ajax获取 商户类型列表 --搜索列表
      cardstatuses: {}, //ajax获取 银行卡状态列表 --详情展示
      mend_get_branch: false, //点击修改按钮后，支行是否获取完成--取消使用
      mendData: {
        bankmobile: "", //银行预留手机号码
        bankprovinceid: "", // 省份代码
        bankprovince: "", //省份
        bankcityid: "", // 城市代码
        bankcity: "", //城市
        headbankid: "", // 开户行总行 id
        headbankname: "", //开户银行
        bankcode: "", // 开户行联行号
        bankname: "", //开户支行
        bankaccount: "", //银行账号
        banktype: "", //清算类型, 对私=1, 对公=2
        cardtype: "", //卡类型, 借记卡=1, 信用卡=2
        bankuser: "" //持卡人姓名
      }, //商户详情-修改内容
      merchantDetail: {
        base: {
          type: "", //商户类型
          mobile: "", //手机号码
          signed_entity: "", //签约实体
          legal_name: "", //法人代表
          legal_idnumber: "" //身份证号码
        }, //基本信息
        fee_ratios:{},
        account: {
          bankprovince: "", //省份
          bankcity: "", //城市
          bankuser: "", //账户名称
          headbankname: "", //开户银行
          bankname: "", //开户支行
          bankmobile: "", //银行预留手机号码
          bankaccount: "", //银行账号
          banktype: "", //清算类型
          bankstatus: "", //银行卡状态
          bankprovinceid: "", // 省份代码
          bankcityid: "", // 城市代码
          headbankid: "", // 开户行总行 id
          bankcode: "", // 开户行联行号
          cardtype: "" //卡类型, 借记卡=1, 信用卡=2
        }, //账户信息
        shop: {
          receiptname: "", //收据名称
          accountname: "", //账户名称
          mcc: "", //mcc
          mcc_desc: "",
          province: "", //省份
          city: "", //城市
          address: "" //收据名称
        }, //店铺信息
        merchant:{},
        cert_required:{},
        cert_optional:{}
      }, //商户详情内容
      merchantDetailRules: {
        bankmobile: [
          {
            required: true,
            pattern: /^1[0-9]{10}$/,
            message: "请填写正确的手机号",
            trigger: "blur"
          }
        ],
        bankaccount: [
          {
            required: true,
            pattern: /^[0-9]{1,50}$/,
            message: "请输入银行账号，长度在 1 到 50 个字符",
            trigger: "blur"
          }
        ],
        bankuser: [
          {
            required: true,
            //pattern: /^[\u4e00-\u9fa5]{1,30}$/,
            pattern: /^\D{1,25}$/,
            message: "请输入账户名称，长度在 1 到 25 个字符",
            trigger: "blur"
          }
        ],
        banktype: [
          {
            type: "number",
            required: true,
            message: "请选择清算类型",
            trigger: "change"
          }
        ],
        cardtype: [
          {
            type: "number",
            required: true,
            message: "请选择银行卡类型",
            trigger: "change"
          }
        ],
        headbankname: [
          {
            required: true,
            message: "请选择总行",
            trigger: "change"
          }
        ],
        bankname: [
          {
            required: true,
            message: "请选择支行",
            trigger: "change"
          }
        ],
        bankprovince: [
          {
            required: true,
            message: "请选择所在省份",
            trigger: "change"
          }
        ],
        bankcity: [
          {
            required: true,
            message: "请选择所在城市",
            trigger: "change"
          }
        ]
      },
      searchkey: {
        mchnt_uid:"",
        mchnt_name:"",
        mchnt_mobile:"",
        qd_name: "",
        slsm_name: "",
        mchnt_legal_name:"",
        stime: "",
        etime: "",
        // qd_uid: "",
        daterange: "",
        mchnt_mchid: "",
        audit_statuses: '',
        mchnt_status:'',
        mchnt_type:'',
      },
      searchkey_rule: {
        mchnt_uid: [
          {
            required: false,
            pattern: /^[0-9\s]{0,300}$/,
            message: "请输入商户编号，只能包含数字",
            trigger: "blur"
          }
        ],
        mchnt_name: [
          {
            required: false,
            pattern: /^[\u4e00-\u9fa5a-zA-Z0-9\s]{1,20}$/,
            message: "请输入商户名称，长度在 1 到 20 个字符",
            trigger: "blur"
          }
        ],
        mchnt_mobile: [
          {
            required: false,
            pattern: /^1[0-9]{10}$/,
            message: "请填写正确的手机号",
            trigger: "blur"
          }
        ],
        qd_name: yanzheng.test_qd_name("渠道名称", 1, 30, false, "blur"),
        slsm_name: [
          {
            required: false,
            pattern: /^[\u4e00-\u9fa5a-zA-Z0-9\s]{1,20}$/,
            message: "请输入所属业务员，长度在 1 到 20 个字符",
            trigger: "blur"
          }
        ],
        mchnt_legal_name: [
          {
            required: false,
            pattern: /^[\u4e00-\u9fa5a-zA-Z0-9\s]{1,20}$/,
            message: "请输入法人姓名，长度在 1 到 20 个字符",
            trigger: "blur"
          }
        ],
        // qd_uid: [
        //   {
        //     required: false,
        //     pattern: /^[0-9\s]{0,300}$/,
        //     message: "请输入渠道编号，只能包含数字",
        //     trigger: "blur"
        //   }
        // ],
        mchnt_mchid: [
          {
            required: false,
            pattern: /^[a-zA-Z0-9\s]{1,128}$/,
            message: "请输入子商户号，长度在 1 到 128 个字符",
            trigger: "blur"
          }
        ],
      },
      merchants: [],
      list_url:"/qudao_mis/v1/api/mchnt/list", //获取商户列表
      down_url:"/qudao_mis/v1/api/mchnt/list/download", //下载
      chan_url:"/qudao_mis/v1/api/mchnt/", // 注销
      status_url:"/qudao_mis/v1/api/tools/mchnt_audit_status", // 获取审核状态列表
      common_url:"/qudao_mis/v1/api/mchnt/", //获取商户详情 /修改商户详情--公用
      qd_areacities_url:"/qudao_mis/v1/api/tools/areacities", //省份城市列表
      qd_headbanks_url:"/qudao_mis/v1/api/tools/headbanks", //银行总行列表
      qd_branchbanks_url:"/qudao_mis/v1/api/tools/branchbanks", //银行支行列表
      qd_banktypes_url:"/qudao_mis/v1/api/tools/banktypes", //结算类型
      qd_cardtypes_url:"/qudao_mis/v1/api/tools/cardtypes", //银行卡类型
      qd_mchnttypes_url:"/qudao_mis/v1/api/tools/mchnttypes", //商户类型列表
      qd_cardstatuses_url:"/qudao_mis/v1/api/tools/cardstatuses", //银行卡状态列表
      mechantTransformUrl:"/qudao_mis/v1/api/mchnt/transfer",//商户迁移
      info_by_mobileUrl:"/qudao_mis/v1/api/slsm/info_by_mobile",//根据手机号查询对应业务员信息, 用于商户迁移
      pages_all: 0, //总信息数
      page_per: 10, //每页信息数
      page_now: 1, //当前页数
      pages: 1, //总页数
      merchants_mid: [], //搜索后的总信息
      merchants_now: [], //当前展示信息
      check_status: [], //审核状态
      middle_fee: {
        wechat_fee: "",
        alipay_fee: "",
        jd_fee: "",
        qqwallet_fee: "",
        swipecard_fee: ""
      }, //商户费率-中转参数，scope不能直接识别2级信息scope.row.fee_ratios.wechat_fee
      pickerOptions: {
        disabledDate: time => time.getTime() > Date.now(),
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      moveData: {
        mchnt_uid:"",
        shopname:"",
        mobile: "", //
        newMobile: "", //
        qd_name: "", //
        slsm_name: "", //
        slsm_uid:"",
        qd_uid:"",
      },
      moveDataRules: {
        newMobile: [
          {
            required: true,
            pattern: /^1[0-9]{10}$/,
            message: "请填写正确的手机号",
            trigger: "blur"
          }
        ]
      },
      newInfo:false,//没有获取到正确的信息
    };
  },
  created: function() {
    this.get_checkStatus(); //获取审核状态
    this.get_area(); //获取省份城市
    this.get_banktypes(); //获取结算类型
    this.get_cardtypes(); //获取银行卡类型
    this.get_mchnttypes(); //获取商户类型列表
    this.get_cardstatuses(); //获取银行卡状态列表
    //this.get_list(); //获取商户列表  --首次在审核状态成功后执行
    // setTimeout(()=>{
    //   this.get_area();
    // },1000);
    // setTimeout(()=>{
    //   this.get_banktypes();
    // },1000);
    // setTimeout(()=>{
    //   this.get_cardtypes();
    // },1000);
    // setTimeout(()=>{
    //   this.get_mchnttypes();
    // },1000);
    // setTimeout(()=>{
    //   this.get_cardstatuses();
    // },1000);
  },
  watch: {
    branchbank_if: function(val, oldVal) {
      if (this.branchbank_if) {
        this.get_banks(); //获取总行
      }
    }, //省份获取成功后-获取总行
    city_id: function(val, oldVal) {
      if (this.city_id > 0 && this.headbank_id > 0) {
        console.log("cityid---branchbank");
        this.get_branchbank(); //获取支行
      } else {
        this.branchbanks = []; //清空支行
      }
    }, //城市id或者总行id发生变化后-获取支行
    headbank_id: function(val, oldVal) {
      if (this.city_id > 0 && this.headbank_id > 0) {
        console.log("headbank_id---branchbank");
        this.get_branchbank(); //获取支行
      } else {
        this.branchbanks = []; //清空支行
      }
    } //城市id或者总行id发生变化后-获取支行
    // mend_get_branch: function(val, oldVal) {
    //   if(val){
    //     this.mend_reset_branch(); //进行支行赋值
    //   }
    // },//第一次点击修改按钮赋值时，获取支行成功--进行支行赋值
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
    //查看费率
    scan_fee: function(val) {
      // console.log(val.settle_cycle);
      // console.log(val.fee_ratios);
      // console.log(this.middle_fee);
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
      //middle_fee=scope.row.fee_ratios;
    },
    //获取商户列表
    get_list: function() {
      let _this = this;
      let post_data = {
        page: _this.page_now,
        page_size: _this.page_per,
        mchnt_uid: _this.searchkey.mchnt_uid.replace(/\s/g, ""),
        mchnt_name: _this.searchkey.mchnt_name.replace(/\s/g, ""),
        mchnt_mobile: _this.searchkey.mchnt_mobile.replace(/\s/g, ""),
        qd_name: _this.searchkey.qd_name.replace(/\s/g, ""),
        slsm_name: _this.searchkey.slsm_name.replace(/\s/g, ""),
        mchnt_legal_name: _this.searchkey.mchnt_legal_name.replace(/\s/g, ""),
        mchnt_s_join_dtm: _this.searchkey.stime,
        mchnt_e_join_dtm: _this.searchkey.etime,
        // qd_uid: _this.searchkey.qd_uid.replace(/\s/g, ""),
        mchnt_mchid: _this.searchkey.mchnt_mchid.replace(/\s/g, ""),
        audit_statuses: _this.searchkey.audit_statuses,
        // mchnt_status: _this.searchkey.mchnt_status,
        // mchnt_type: _this.searchkey.mchnt_type,
      };
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
      //列表测试数据--仅供测试
      //_this.getdata_test();
    },
    //时间变化
    time_change(val) {
      if (val.length == 0) {
        this.searchkey.stime = "";
        this.searchkey.etime = "";
      } else {
        let timerange = val.split(" - ");
        this.searchkey.stime = timerange[0] + " 00:00:00";
        this.searchkey.etime = timerange[1] + " 23:59:59";
      }
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
      // this.get_list();
    },
    //下载
    download_sub: function() {
      this.$refs.searchkey.validate(valid => {
        if (valid) {
          let _this = this;
          let post_data = {
            mchnt_uid: _this.searchkey.mchnt_uid.replace(/\s/g, ""),
            mchnt_name: _this.searchkey.mchnt_name.replace(/\s/g, ""),
            mchnt_mobile: _this.searchkey.mchnt_mobile.replace(/\s/g, ""),
            qd_name: _this.searchkey.qd_name.replace(/\s/g, ""),
            slsm_name: _this.searchkey.slsm_name.replace(/\s/g, ""),
            mchnt_legal_name: _this.searchkey.mchnt_legal_name.replace(/\s/g, ""),
            mchnt_s_join_dtm: _this.searchkey.stime,
            mchnt_e_join_dtm: _this.searchkey.etime,
            // qd_uid: _this.searchkey.qd_uid.replace(/\s/g, ""),
            mchnt_mchid: _this.searchkey.mchnt_mchid.replace(/\s/g, ""),
            audit_statuses: _this.searchkey.audit_statuses,
            // mchnt_status: _this.searchkey.mchnt_status,
            // mchnt_type: _this.searchkey.mchnt_type,
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
    get_date: function(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      return year + "/" + month + "/" + day;
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
    //商户迁移
    move_merchant(val) {
      this.$refs['moveData'].resetFields();
      this.newInfo = false;
      this.moveData.mchnt_uid = val.mchnt_uid;
      this.moveData.shopname = val.shopname;
      this.moveData.mobile = val.slsm_mobile;
      this.moveData.newMobile = '';
      this.moveData.qd_name = '';
      this.moveData.slsm_name = '';
      this.moveData.slsm_uid = '';
      this.moveData.qd_uid = '';
      this.moveMerchant = true;
    },
    //根据手机号获取信息
    getNew(func){
      this.$refs.moveData.validate(valid => {
        if (valid) {
          func();
          // if(func=='moveSure'){
          //   if(this.newInfo){
          //     func()
          //   }            
          // }else{
          //   func();
          // }
        } else {
          return false;
        }
      });   
    },
    getNewInfo(){
      let _this = this;
      let postData = {slsm_mobile:this.moveData.newMobile};
      this.$http
        .get(this.info_by_mobileUrl, {
          params: postData,
          before: function() {
            _this.loading = true;
          }
        })
        .then(
          function(response) {
            _this.loading = false;
            let data_return = response.body;
            if (data_return.respcd == "0000") {
              this.moveData.slsm_name = data_return.data.slsm_name;
              this.moveData.slsm_uid = data_return.data.slsm_uid;
              this.moveData.qd_uid = data_return.data.qd_uid;
              this.moveData.qd_name = data_return.data.qd_name;
              this.newInfo=true;
            } else {
              if (data_return.respmsg) {
                _this.toastmsg = data_return.respmsg;
              } else {
                _this.toastmsg = data_return.resperr;
              }
              _this.visible_toast = true;
              this.newInfo=false;
            }
          },
          function(response) {
            _this.loading = false;
            _this.visible_toast = true;
            _this.toastmsg = "网络超时!";
            this.newInfo=false;
          }
        )
        .catch(function(response) {
          _this.loading = false;
          this.newInfo=false;
        });
    },
    close_moveD() {
      this.moveMerchant = false;
    },
    moveSure() {
      if(!this.newInfo){
        return false;
      }  
      let _this = this;
      //console.log(_this.form_model);
      let postdata = {
          'mchnt_uid_list': _this.moveData.mchnt_uid.toString(),
          'target_qd_uid': _this.moveData.qd_uid,
          'target_slsm_uid': _this.moveData.slsm_uid,
      };
      this.moveMerchant = false;
      this.$http.post(this.mechantTransformUrl, postdata, {
              before: function() {
                  _this.loading = true;
              }
          })
          .then(function(response) {
              _this.loading = false;
              let data_return = response.body;
              if (data_return.respcd == '0000') {
                  // _this.visible_toast = true;
                  // _this.toastmsg = '商户迁移成功!';
                  _this.$refs.moveData.resetFields(); //重置输入框
                  _this.get_list();
              } else {
                  if (data_return.respmsg) {
                      _this.toastmsg = data_return.respmsg;
                  } else {
                      _this.toastmsg = data_return.resperr;
                  }
                  _this.visible_toast = true;
              }
          }, function(response) {
              _this.loading = false;
              _this.visible_toast = true;
              _this.toastmsg = '网络超时!';
          })
          .catch(function(response) {
              _this.loading = false;
          });
    },
    //开启渠道状态
    open_chan: function(val) {
      let _this = this;
      _this.oprate_data = val;
      _this.oprate_if = true;
      _this.opratedialog = true;
    },
    //关闭渠道状态
    stop_chan: function(val) {
      let _this = this;
      _this.oprate_data = val;
      _this.oprate_if = false;
      _this.opratedialog = true;
    },
    //操作事件
    mend_chan: function() {
      let _this = this;
      let userid = _this.oprate_data;
      let status;
      _this.opratedialog = false; //关闭弹框
      if (_this.oprate_if) {
        status = 0; //需要开启该状态
      } else {
        status = 1;
      }
      let post_data = {
        status: status
      };
      this.$http
        .post(this.chan_url + userid + "/status", post_data, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(
          function(response) {
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
            _this.loading = false;
            _this.visible_toast = true;
            _this.toastmsg = "网络超时!";
          }
        )
        .catch(function(response) {
          _this.loading = false;
        });
    },
    //获取审核状态
    get_checkStatus: function() {
      var _this = this;
      this.$http
        .get(this.status_url, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(
          function(response) {
            _this.loading = false;
            var data_return = response.body;
            if (data_return.respcd == "0000") {
              _this.check_status = data_return.data.records;
              _this.searchkey.audit_statuses = data_return.data.default;
              _this.get_list(); //获取商户列表
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
    //点击查看商户信息
    scan_merchant: function(id) {
      var _this = this;
      //获取商户详情
      this.get_merchant(id, data_return => {
        _this.merchantDetailDia = true; //打开弹框
        _this.merchantDetail = data_return.data; //赋值
      });
    },
    //点击修改商户信息--按钮，打开弹框并显示信息
    mend_merchant: function(id) {
      var _this = this;
      this.if_reset_branchbank = false; //将重置支行--设为false
      this.bankname_mid = "";
      this.mendMerchantId = id; //设置修改的id
      //获取商户详情
      this.get_merchant(id, data_return => {
        let bankstatus = data_return.data.account.bankstatus;
        if (bankstatus < 3) {
          this.visible_toast = true;
          this.toastmsg = "银行卡已在审核中，请耐心等待";
          return false; //不能修改
        }
        this.mend_get_branch = false; //尚未获取到支行
        this.mendData.bankmobile = data_return.data.account.bankmobile;
        this.mendData.bankaccount = data_return.data.account.bankaccount;
        this.mendData.banktype = data_return.data.account.banktype;
        //this.mendData.cardtype = data_return.data.account.cardtype>=1?data_return.data.account.cardtype:1;
        this.mendData.cardtype = 1; //默认借记卡
        this.mendData.bankuser = data_return.data.account.bankuser;
        this.mendData.bankcode = data_return.data.account.bankcode;
        this.mendData.bankprovince = data_return.data.account.bankprovince;
        this.mendData.headbankname = data_return.data.account.headbankname;
        this.bankname_mid = data_return.data.account.bankname;
        setTimeout(() => {
          //console.log(1);
          this.mendData.bankcity = data_return.data.account.bankcity;
        }, 0);
        setTimeout(() => {
          //console.log(2);
          // if (data_return.data.account.bankprovince==this.province_mid && data_return.data.account.headbankname==this.bank_mid && data_return.data.account.bankcity==this.city_mid){
          //   console.log('省 总行相同');
          //   this.mendData.bankname = data_return.data.account.bankname;
          // }
          //console.log(this.branchbanks);即便列表不同，赋值正确后，无匹配数据会消失
          //console.log('设置支行0');
          this.mendData.bankname = data_return.data.account.bankname;
          _this.mendDetail = true; //打开弹框
        }, 0);
        //设置中间值
        setTimeout(() => {
          //console.log(3);
          this.province_mid = data_return.data.account.bankprovince;
          this.city_mid = data_return.data.account.bankcity;
          this.bank_mid = data_return.data.account.headbankname;
        }, 1000);
        // _this.mendData = data_return.data.account; //赋值
        // _this.mendData.cardtype = 1;//默认借记卡
        // _this.mendDetail = true; //打开弹框
      });
    },
    mend_reset_branch: function() {
      //取消使用
      setTimeout(() => {
        this.mendData.bankname = this.bankname_mid;
        //this.mendDetail = true; //打开弹框
      }, 0);
    },
    //点击关闭修改弹框按钮，党重新复制时，会完全覆盖
    close_mendD() {
      this.mendDetail = false;
      this.bankname_mid = "";
      this.if_reset_branchbank = false; //将重置支行--设为false
      //this.mendData = {}; //清空弹框数据
    },
    //修改确认
    mend_sure: function(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.mendDetail = false; //关闭弹框
          this.mendialog = true; //打开确认弹框
        } else {
          return false;
        }
      });
    },
    mend_sure_sure: function() {
      var _this = this;
      this.mendialog = false; //关闭确认弹框
      //提交商户详情的修改
      this.$http
        .post(
          this.common_url + this.mendMerchantId + "/modify",
          this.mendData,
          {
            before: function() {
              _this.loading = true;
            }
          }
        )
        .then(
          function(response) {
            _this.loading = false;
            var data_return = response.body;
            if (data_return.respcd == "0000") {
              _this.visible_toast = true;
              _this.toastmsg = "修改成功!";
              _this.get_list(); //重新获取列表
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
    //获取某个商户信息
    get_merchant: function(id, func) {
      var _this = this;
      //获取商户详情
      this.$http
        .get(this.common_url + id + "/detail", {
          before: function() {
            _this.loading = true;
          }
        })
        .then(
          function(response) {
            _this.loading = false;
            var data_return = response.body;
            if (data_return.respcd == "0000") {
              func(data_return);
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
    //省份值变化后，市也变化
    select_pro: function(val) {
      this.province_mid = val; //中间值赋值
      for (let i = 0; i < this.pro_city.length; i++) {
        if (this.pro_city[i].areaname == this.mendData.bankprovince) {
          this.mendData.bankprovinceid = this.pro_city[i].areaid;
          this.citys = this.pro_city[i].cities;
          //console.log('省份变化');
          //如果不是手动选择更改省份，则不对市进行赋值
          if (!this.if_reset_branchbank) {
            //console.log('省份变化1');
            return false; //当重置支行字段为false时，不重置内容（点击下拉菜单时，置为true）
          }
          setTimeout(() => {
            //console.log('省份变化2');
            this.mendData.bankcity = this.citys[0].cityname;
            this.city_id = this.citys[0].cityid;
            this.mendData.bankcityid = this.citys[0].cityid;
            this.city_mid = this.citys[0].cityname; //中间值赋值
            //console.log('省份变化'+ this.city_id);
          }, 0);
          return false;
        } else {
          this.citys = [];
        }
      }
    },
    //市值也变化，求id
    select_city: function(val) {
      this.city_mid = val; //中间值赋值
      for (let i = 0; i < this.citys.length; i++) {
        if (this.citys[i].cityname == this.mendData.bankcity) {
          this.city_id = this.citys[i].cityid;
          this.mendData.bankcityid = this.citys[i].cityid;
          //console.log('市变化'+ this.city_id);
          return false;
        }
      }
    },
    //获取省份城市列表
    get_area: function() {
      var _this = this;
      _this.$http
        .get(_this.qd_areacities_url, {
          params: { no_whole_country: 1 },
          before: function() {
            _this.loading1 = true;
          }
        })
        .then(
          function(response) {
            _this.loading1 = false;
            var data_return = response.body;
            if (data_return.respcd == "0000") {
              _this.pro_city = data_return.data.records;
              //设置初始值
              //_this.mendData.bankprovince = _this.pro_city[0].areaname;
              _this.province_mid = _this.pro_city[0].areaname; //中间值赋值
              _this.citys = _this.pro_city[0].cities;
              _this.city_id = _this.citys[0].cityid;
              //_this.mendData.bankcity = _this.citys[0].cityname;
              _this.city_mid = _this.citys[0].cityname; //中间值赋值
              _this.branchbank_if = true;
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
            _this.loading1 = false;
            _this.visible_toast = true;
            _this.toastmsg = "网络超时!";
          }
        )
        .catch(function(response) {
          _this.loading1 = false;
        });
    },
    //获取银行总行列表
    get_banks: function() {
      var _this = this;
      _this.$http
        .get(_this.qd_headbanks_url, {
          before: function() {
            _this.loading2 = true;
          }
        })
        .then(
          function(response) {
            _this.loading2 = false;
            var data_return = response.body;
            if (data_return.respcd == "0000") {
              _this.headbanks = data_return.data.records;
              _this.headbank_id = _this.headbanks[0].headbankid;
              _this.bank_mid = _this.headbanks[0].headbankname;
              //设置初始值
              // _this.mendData.headbankname = _this.headbanks[0].headbankname;
              // _this.mendData.headbankid = _this.headbanks[0].headbankid;
              // if (_this.city_id.length <= 0) {
              //   _this.city_id = _this.pro_city[0].cities[0].cityid;
              // }
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
            _this.loading2 = false;
            _this.visible_toast = true;
            _this.toastmsg = "网络超时!";
          }
        )
        .catch(function(response) {
          _this.loading2 = false;
        });
    },
    //获取支行列表
    get_branchbank: function() {
      var _this = this;
      let postdata = {
        headbankid: this.headbank_id,
        cityid: this.city_id
      };
      this.$http
        .get(this.qd_branchbanks_url, {
          params: postdata,
          before: function() {
            _this.loading3 = true;
          }
        })
        .then(
          function(response) {
            _this.loading3 = false;
            var data_return = response.body;
            if (data_return.respcd == "0000") {
              _this.branchbanks = data_return.data.records;
              //设置初始值
              // if (_this.bankname_mid.length > 0) {
              //   _this.mendData.bankname = _this.bankname_mid;
              //   _this.select_bankbranch();
              // } else
              //console.log('获取支行');
              if (!_this.if_reset_branchbank) {
                //console.log('获取支行1');
                _this.mend_get_branch = true;
                //_this.mendData.bankname = _this.bankname_mid;
                setTimeout(() => {
                  //console.log('设置支行1');
                  //console.log(_this.bankname_mid);
                  _this.mendData.bankname = _this.bankname_mid;
                  _this.select_bankbranch();
                }, 0);
                return false; //当重置支行字段为false时，不重置内容（点击下拉菜单时，置为true）
              }
              _this.mend_get_branch = false;
              setTimeout(() => {
                //console.log('获取支行2');
                if (_this.branchbanks.length <= 0) {
                  _this.mendData.bankname = "";
                  _this.mendData.bankcode = "";
                } else {
                  _this.mendData.bankname = _this.branchbanks[0].name;
                  _this.mendData.bankcode = _this.branchbanks[0].bankcode;
                }
              }, 0);
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
            _this.loading3 = false;
            _this.visible_toast = true;
            _this.toastmsg = "网络超时!";
          }
        )
        .catch(function(response) {
          _this.loading3 = false;
        });
    },
    //总行变化后，调整支行
    select_bank: function(val) {
      this.bank_mid = val;
      var _this = this;
      for (let i = 0; i < _this.headbanks.length; i++) {
        if (_this.headbanks[i].headbankname == _this.mendData.headbankname) {
          _this.headbank_id = _this.headbanks[i].headbankid;
          _this.mendData.headbankid = _this.headbanks[i].headbankid;
          break;
        }
      }
    },
    //zhi行变化后，调整支行code
    select_bankbranch: function() {
      var _this = this;
      setTimeout(() => {
        for (let i = 0; i < _this.branchbanks.length; i++) {
          if (_this.branchbanks[i].name == _this.mendData.bankname) {
            _this.mendData.bankcode = _this.branchbanks[i].bankcode;
            //console.log(_this.mendData.bankcode);
            //break;
            return false;
          }
        }
      }, 0);
    },
    //获取结算类型
    get_banktypes: function() {
      var _this = this;
      this.$http
        .get(this.qd_banktypes_url, {
          before: function() {
            _this.loading4 = true;
          }
        })
        .then(
          function(response) {
            _this.loading4 = false;
            var data_return = response.body;
            if (data_return.respcd == "0000") {
              _this.banktypes = data_return.data;
              _this.banktypes_d = data_return.data;
              //设置初始值
              //_this.mendData.banktype = _this.banktypes.records[0].tp;
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
            _this.loading4 = false;
            _this.visible_toast = true;
            _this.toastmsg = "网络超时!";
          }
        )
        .catch(function(response) {
          _this.loading4 = false;
        });
    },
    //获取银行卡类型类型
    get_cardtypes: function() {
      var _this = this;
      this.$http
        .get(this.qd_cardtypes_url, {
          before: function() {
            _this.loading5 = true;
          }
        })
        .then(
          function(response) {
            _this.loading5 = false;
            var data_return = response.body;
            if (data_return.respcd == "0000") {
              _this.cardtypes = data_return.data;
              _this.cardtypesD = data_return.data;
              //设置初始值
              //_this.mendData.cardtype = _this.cardtypes.records[0].tp;
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
            _this.loading5 = false;
            _this.visible_toast = true;
            _this.toastmsg = "网络超时!";
          }
        )
        .catch(function(response) {
          _this.loading5 = false;
        });
    },
    //获取银商户类型列表
    get_mchnttypes: function() {
      var _this = this;
      this.$http
        .get(this.qd_mchnttypes_url, {
          before: function() {
            _this.loading6 = true;
          }
        })
        .then(
          function(response) {
            _this.loading6 = false;
            var data_return = response.body;
            if (data_return.respcd == "0000") {
              _this.mchnttypes = data_return.data;
              _this.mchnttypesSearch = data_return.data;
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
            _this.loading6 = false;
            _this.visible_toast = true;
            _this.toastmsg = "网络超时!";
          }
        )
        .catch(function(response) {
          _this.loading6 = false;
        });
    },
    //获取银行卡状态列表
    get_cardstatuses: function() {
      var _this = this;
      this.$http
        .get(this.qd_cardstatuses_url, {
          before: function() {
            _this.loading7 = true;
          }
        })
        .then(
          function(response) {
            _this.loading7 = false;
            var data_return = response.body;
            if (data_return.respcd == "0000") {
              _this.cardstatuses = data_return.data;
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
            _this.loading7 = false;
            _this.visible_toast = true;
            _this.toastmsg = "网络超时!";
          }
        )
        .catch(function(response) {
          _this.loading7 = false;
        });
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
.clearfix_liner1 {
  margin:12px 0 30px;
}
.mechant {
  .bounced_my_body {
    .el-form-item__label {
      color: @grey;
    }
  }
}

.large_bounced, .big_bounced {
  p.title {
    font-size: 16px;
    margin-bottom: 22px;
    padding-left: 20px;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    &:before {
      content: "";
      width: 3px;
      height: 14px;
      position: absolute;
      left: 0;
      background: @orange;
      top: 4px;
    }
  }
}

.line_sel_fen {
  text-align: center;
}

.el-form-item{
  dl{
    width: 100%;
    height: auto;
    position: relative;
    dt{
      width: 260px;
      height: auto;
      min-height: 45px;
      border-radius: 10px;
      overflow: hidden;
      img{
        width: 100%;
        height: auto;
      }
    }
    dd{
      width: 260px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background:transparent;
      background-color:rgba(0,0,0,0.6);
      position: absolute;
      bottom:0;
      left: 0;
      color:white;
      font-size: 14px;
      border-radius:0 0 10px 10px;
      overflow: hidden;
    }
  }
}
</style>
