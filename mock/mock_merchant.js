// 使用 Mock
var Mock = require('mockjs');
var Random = Mock.Random;
//结算管理--渠道分润列表
var mchnt_info = {
    "respcd": "0000",
    "respmsg": "OK",
    "resperr": "",
    "data": {
        "mchnt_cnt": 200, // 商户数
        "page": 1,
        "page_size": 10,
        "mchnt_infos|50-80": [{
            "qd_info": {}, // 渠道基本信息
            "slsm_info": {}, // 业务员基本信息
            "userid|+1": 456, // 商户编号
            "shopname": Random.string(10), // 商户名称
            "name": Random.name(), // 法人名称
            "mobile": /^1[0-9]{10}$/, // 商户手机号码
            "status|1": [0, 1], // 商户状态, 正常=0, 注销=1
            "jointime": Random.datetime('yyyy-MM-dd HH:mm:ss'), // 注册时间
            "audit_status|1": ["审核中", "拒绝", "成功", "失败"], // 审核状态 (审核中, 拒绝, 成功, 失败)
            "audit_memo": Random.paragraph(2, 5),
            "audit_dtm": Random.datetime('yyyy-MM-dd HH:mm:ss'), // 审核时间
            "slsm_uid+1": 789, // 业务员 userid
            "slsm_name": Random.name(),
            "mchid": Random.string(15), // 钱台 mchid
            "fee_ratios|1": [{ // 费率
                "wechat_fee": 12,
                "alipay_fee": 34,
                "jd_fee": 56,
                "qqwallet_fee": 78,
                "swipecard_fee": 90,
            }, null],
            "settle_cycle|1": ["T+1", "T+0", null], // 商户结算周期
        }],
    }
};
Mock.mock(/qudao\/v1\/api\/mchnt\/list/, 'get', mchnt_info);
//审核状态
var checkStatus = {
    "respcd": "0000",
    "respmsg": "OK",
    "resperr": "",
    "data": {
        'records': [{
            'name': '成功'
        }, {
            'name': '失败'
        }, {
            'name': '拒绝'
        }, {
            'name': '通道审核成功'
        }, {
            'name': '关注同步成功'
        }]
    }
};
Mock.mock(/qudao\/v1\/api\/tools\/mchnt_audit_status/, 'get', checkStatus);
//商户详情
var mchntd_info = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        base: {
            "type|1": ["小微", "个体工商户", "企业"], //商户类型
            mobile: /^1[0-9]{10}$/, //手机号码
            signed_entity: Random.name(), //签约实体
            legal_name: Random.name(), //法人代表
            legal_idnumber: "111222111111112255", //身份证号码
            idnumber: "111222111111112255",
            idenddate: Random.datetime("yyyy-MM-dd"),
            userid: 456, // 商户编号
            name: "发发超市", // 商户名称
            "mchid|+1": 123334454, // 钱台 mchid, 子商户号
            "settle_cycle|1": ["T+1", "T+0"], // 商户结算周期
            "is_linked|1": [1, 0], // 是否为连锁商户, 是=1, 否=0
            "audit_status|1": ["审核中", "拒绝", "成功", "失败"], // 审核状态 (审核中, 拒绝, 成功, 失败)
            audit_memo: "审核原因",
            audit_dtm: Random.datetime("yyyy-MM-dd HH:mm:ss"), // 审核时间
            "bankstatus|1": [1, 2, 3, 4] // 银行卡状态, 等待处理=1, 审核中=2, 审核通过=3, 审核关闭=4
        }, //基本信息
        account: {
            bankprovince: "四川省", //省份
            bankcity: "成都市", //城市
            bankuser: Random.name(), //账户名称
            headbankname: "邮政银行", //开户银行
            bankname: "成都分行", //开户支行
            "bankaccount|1": [
                "111111555555555556666",
                "11122658",
                "1234567890",
                "123456789012"
            ], //银行账号
            bankmobile: /^1[0-9]{10}$/, //银行预留手机号
            "banktype|1": [2, 1], //清算类型['对公', '对私']
            "bankstatus|1": ["审核中", "成功"], //银行卡状态
            bankprovinceid: 13, // 省份代码
            bankcityid: 1301, // 城市代码
            headbankid: 123456, // 开户行总行 id
            bankcode: 123456, // 开户行联行号
            "cardtype|1": [2, 1] //清算类型['信用卡', '借记卡']
        }, //账户信息
        shop: {
            receiptname: Random.name(), //收据名称
            accountname: Random.name(), //账户名称
            mcc: "", //mcc
            mcc_desc: "小型超市",
            province: "四川1", //省份
            city: "成都1", //城市
            address: "高新区天府菁蓉大厦", //收据名称
            // TODO: 所属商圈
            // TODO: 联系电话
            shopphoto: "@image('200x200', '#02adea', '#FFF', 'shopphoto')", // 门头照片
            goodsphoto: "@image('200x200', '#02adea', '#FFF', 'goodsphoto')", // 店内陈设照片

            // 以下字段只有个体对公, 企业对公, 个体对私类型才会有:
            licensephoto: "@image('200x200', '#02adea', '#FFF', 'licensephoto')", // 营业执照照片
            licensenumber: "123456", // 营业执照注册号

            shopname: "店铺名称",
            region_name: "商圈名称"
        }, //店铺信息
        merchant: {
            idnumber: "111222111111112255",
            idenddate: Random.datetime("yyyy-MM-dd"),
            bankuser: "张三", // 开户名
            bankaccount: "123456789", // 银行卡号
            bankmobile: "12345678901", // 银行预留手机号
            bankprovince: "河北",
            bankcity: "石家庄",
            headbankname: "开户行",
            bankname: "开户行支行",
            "cardtype|1": [1, 2], // 银行卡类型, 借记卡=1, 信用卡=2

            // 个体对公会包括以下字段:
            // TODO: 公司名称(没有这个字段)
            legal_name: "张三", // 法人名称
            "banktype|1": [1, 2], // 结算类型, 对私=1, 对公=2

            // 小微会包括以下字段:
            name: "店主姓名",

            // 企业对公会包括以下字段:
            // TODO: 公司名称
            legal_name: "张三", // 法人名称
            "banktype|1": [1, 2], // 结算类型, 对私=1, 对公=2

            // 个体对私会包括以下字段:
            // TODO: 公司名称
            legal_name: "张三", // 法人名称
            "banktype|1": [1, 2] // 结算类型, 对私=1, 对公=2
        },
        cert_required: {
            // 必填凭证
            idcardinhand: "@image('200x200', '#02adea', '#FFF', 'idcardinhand')", // 手持身份证

            // 个体对公会包括以下字段:
            authidcardfront: "@image('200x200', '#02adea', '#FFF', 'authidcardfront')", // 法人身份证正面
            authidcardback: "@image('200x200', '#02adea', '#FFF', 'authidcardback')", // 法人身份证反面
            openlicense: "@image('200x200', '#02adea', '#FFF', 'openlicense')", // 开户许可证

            // 小微会包括以下字段:
            idcardfront: "@image('200x200', '#02adea', '#FFF', 'idcardfront')", // 身份证正面
            idcardback: "@image('200x200', '#02adea', '#FFF', 'idcardback')", // 身份证反面
            groupphoto: "@image('200x200', '#02adea', '#FFF', 'groupphoto')", // 与申请人店内合影
            authbankcardfront: "@image('200x200', '#02adea', '#FFF', 'authbankcardfront')" // 银行卡正面
        },
        cert_optional: {
            // 选填凭证
            subshopdesc: "@image('200x200', '#02adea', '#FFF', 'subshopdesc')", // 分店收款说明
            // TODO: 税务合同, 产权证明
            otherphoto: [
                // 其他证明
                "@image('200x200', '#02adea', '#FFF', 'otherphoto')",
                "@image('200x200', '#02adea', '#FFF', 'otherphoto')"
            ],
            // 个体对公会包括以下字段:
            authbankcardfront: "@image('200x200', '#02adea', '#FFF', 'authbankcardfront')", // 银行卡正面
            openlicense: "@image('200x200', '#02adea', '#FFF', 'openlicense')", // 开户许可证
            orgphoto: "@image('200x200', '#02adea', '#FFF', 'orgphoto')", // 组织机构代码照
            taxphoto: "@image('200x200', '#02adea', '#FFF', 'taxphoto')" // 税务登记照片
        },
        fee_ratios: {
            // 费率
            wechat_fee: 12,
            alipay_fee: 34,
            jd_fee: 56,
            qqwallet_fee: 78
        }
    }
};
Mock.mock(/qudao\/v1\/api\/mchnt\/\d+\/detail/, 'get', mchntd_info);
//商户修改
var mchntmend_info = {
    "respcd": "0000",
    "respmsg": "OK",
    "resperr": "",
    "data": {}
};
Mock.mock(/qudao\/v1\/api\/mchnt\/\d+\/modify/, 'post', mchntmend_info);
//银行卡类型
var cardtypes = {
    "respcd": "0000",
    "respmsg": "OK",
    "resperr": "",
    "data": {
        'default': 1, // 默认tp
        'records': [{
            'tp': 1,
            'text': '借记卡'
        }, {
            'tp': 2,
            'text': '信用卡'
        }]
    }
};
Mock.mock(/qudao\/v1\/api\/tools\/cardtypes/, 'get', cardtypes);

//银行卡状态类型
var cardstatuses = {
    "respcd": "0000",
    "respmsg": "OK",
    "resperr": "",
    "data": {
        "records": [
            { "status": 1, "text": "等待处理" },
            { "status": 2, "text": "审核中" },
            { "status": 3, "text": "审核通过" },
            { "status": 4, "text": "审核关闭" }
        ],
        "default": 1
    }
};
Mock.mock(/qudao\/v1\/api\/tools\/cardstatuses/, 'get', cardstatuses);
//商户类型类型
var mchnttypes = {
    "respcd": "0000",
    "respmsg": "OK",
    "resperr": "",
    "data": {
        "records": [
            { "tp": 1, "text": "个人" },
            { "tp": 2, "text": "个体" },
            { "tp": 3, "text": "公司" }
        ],
        "default": 1 // 默认tp
    }
};
Mock.mock(/qudao\/v1\/api\/tools\/mchnttypes/, 'get', mchnttypes);

//根据手机号查询对应业务员信息, 用于商户迁移
var new_info = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        "slsm_uid|+1": 111111,
        slsm_name: Random.name(),
        "qd_uid|+111": 555555,
        qd_name: Random.name()
    }
};
Mock.mock(/qudao\/v1\/api\/slsm\/info_by_mobile/, "get", new_info);

//根据手机号查询对应业务员信息, 用于商户迁移
var transfer_info = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {

    }
};
Mock.mock(/qudao\/v1\/api\/mchnt\/transfer/, "post", transfer_info);


//连锁商户列表
var chain_info = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        total_cnt: 200, // 商户数
        page: 1,
        page_size: 10,
        "mchnt_infos|50-80": [{
            "mchnt_uid|+1": 789, 
            "qd_uid|+1": 789, 
            username: Random.name(), 
            join_dtm: Random.datetime("yyyy-MM-dd HH:mm:ss"), // 注册时间 
            name: Random.string(10), // 商户名称
            "status|1":[0,1],
            "fee_ratios|1": [{
                    // 费率
                    wechat_fee: 12,
                    alipay_fee: 34,
                    jd_fee: 56,
                    qqwallet_fee: 78,
                    swipecard_fee: 90
                },
                null
            ]
        }]
    }
};
Mock.mock(/qudao\/v1\/api\/chain\/list/, "get", chain_info);

//子商户列表
var chain_info = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        mchnt_cnt: 200, // 商户数
        page: 1,
        page_size: 10,
        "branch_infos|50-80": [{
            "id|+1": 789, 
            "mchnt_uid|+1": 232332,
            "shopname": Random.string(10),
            "username": Random.name(),
            "join_dtm": Random.datetime("yyyy-MM-dd HH:mm:ss")
        }]
    }
};
Mock.mock(/qudao\/v1\/api\/chain\/branch\/list/, "get", chain_info);

//操作记录列表
var oprate_info = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        total_cnt: 200, // 商户数
        page: 1,
        page_size: 10,
        "op_infos|50-80": [{
            "opid|+1": 34783748937, //该条操作记录id
            "optype|1": [1,2],
            "status|1": [1,2],
            "filename": Random.string(10,30),
            "succ_cnt": 10,
            "fail_cnt": 1,
            "optime": Random.datetime("yyyy-MM-dd HH:mm:ss"),
        }]
    }
};
Mock.mock(/qudao\/v1\/api\/chain\/oprecord\/list/, "get", oprate_info);

//添加上传
var addUp = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        "total_cnt|1": [200,300,100,45,68,90], // 商户数
        fileid: 34783748937
    }
};
Mock.mock(/qudao\/v1\/api\/chain\/upload_create_file/, "post", addUp);
//修改上传
var mendUp = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        "total_cnt|1": [200,300,100,45,68,90], // 商户数
        fileid: 34783748937
    }
};
Mock.mock(/qudao\/v1\/api\/chain\/upload_modify_file/, "post", mendUp);

//产品列表
var proLIst = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    "data|3-5": [{
      "userid|+1": 123, // 渠道编号
      "product_id|+1": 123, // 产品编号
      "name|1": ["微信费率","支付宝费率","京东费率","QQ费率"], // 产品名称.外部渠道支持多语言
      "cate": 1, // 产品类别
      "intro": "简介", // 产品简介
      "status": 0, // 开通状态: 0 已开通, 1 未开通
    }]
  };
  Mock.mock(/qudao\/v1\/api\/tools\/product_info/, "get", proLIst);