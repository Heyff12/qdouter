// 使用 Mock
var Mock = require('mockjs');
var Random = Mock.Random;
//商圈管理--列表
var info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "total_cnt": 200, // 商户数
    "page": 1,
    "page_size": 10,
    "records|50-80": [{
      "id|+1": 12345, // 渠道 userid
      "name": Random.string(10), // 渠道名
      "province": "河南省", // 商户名
      "city": "洛阳市", // 商户名
      "create_time": Random.datetime('yyyy-MM-dd HH:mm:ss'), // 交易时间
      "type|1": ["8", "1", "2", "3", "4", "5", "6", "7"], // 商圈类型 
      "type_str|1": ["商业区", "高新区", "写字楼", "商业街", "餐饮街", "混合型", "景区", "居住区"], // 商圈类型 
      // <el-option label="商业区" value="0"></el-option>
      //          <el-option label="高新区" value="1"></el-option>
      //          <el-option label="写字楼" value="2"></el-option>
      //          <el-option label="商业街" value="3"></el-option>
      //          <el-option label="餐饮街" value="4"></el-option>
      //          <el-option label="混合型" value="5"></el-option>
      //          <el-option label="景区" value="6"></el-option>
      //          <el-option label="居住区" value="7"></el-option>
      "openness|1": ["3", "1", "2"], // 商圈开放程度
      // "openness_str|1": ["开放型", "半开放型", "封闭型"], // 商圈开放程度
      // <el-option label="开放型" value="0"></el-option>
      //          <el-option label="半开放型" value="1"></el-option>
      //          <el-option label="封闭型" value="2"></el-option>
      "audit_status|1": ["2", "1", "0"], // 审核状态
      // "audit_status_str|1": ["待审核", "已通过", "已拒绝"], // 审核状态
      // <el-option label="待审核" value="-1"></el-option>
      //          <el-option label="已通过" value="1"></el-option>
      //          <el-option label="已拒绝" value="0"></el-option>
      "status|1": ["0", "1"], // 状态 
      // "status_str|1": ["正常", "冻结"], // 状态  
      // <el-option label="正常" value="0"></el-option>
      //          <el-option label="冻结" value="1"></el-option>
    }],
  }
};
Mock.mock(/qudao\/v1\/api\/region\/list/, 'get', info);
//商圈类型
var busytypes = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    'default': 1, // 默认tp
    'records': [{
      'tp': 1,
      'text': '商业区'
    }, {
      'tp': 2,
      'text': '高新区'
    }, {
      'tp': 3,
      'text': '写字楼'
    }, {
      'tp': 4,
      'text': '商业街'
    }, {
      'tp': 5,
      'text': '餐饮街'
    }, {
      'tp': 6,
      'text': '混合型'
    }, {
      'tp': 7,
      'text': '景区'
    }, {
      'tp': 8,
      'text': '居住区'
    }]
  }
};
Mock.mock(/qudao\/v1\/api\/tools\/regiontypes/, 'get', busytypes);

//商圈管理--操作日志--列表
var infoLog = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "history_cnt": 200, // 商户数
    "page": 1,
    "page_size": 10,
    "infos|50-80": [{
      "id|+1": 12345, // 渠道 userid
      "content": Random.string(10), // 渠道名
      "cadmin": Random.string(10), // 商户名
      "ctime": Random.datetime('yyyy-MM-dd HH:mm:ss'), // 交易时间
    }],
  }
};
Mock.mock(/qudao\/v1\/api\/region\/history\/list/, 'get', infoLog);



