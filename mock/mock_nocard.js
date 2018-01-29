// 使用 Mock
var Mock = require('mockjs');
var Random = Mock.Random;
//列表
var list_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "records|10-30": [{
      "fee_ratio_id|+1": 11111115, // 费率配置 id, 若查询的 fee_type 是成本费率且该渠道未配置时, 返回 "0" 表示无记录, 并且除 fee_type 之外 fee_ 开头的字段都会返回对应的零值.
      "fee_type|1": [2, 1], // 费率类型, 渠道成本费率=1, 渠道商户默认费率=2, 商户费率=3.
      "fee_percent|+1": 1, // 百分比费率, 格式为小数形式, 1% 则返回 0.01
      "fee_fix": 10, // 定额费率, 单位为分
      "fee_max|1": ['',100], // 封顶手续费 单位为分
      "fee_memo": Random.string(10, 20), // 费率备注信息
      "payway_memo": Random.string(10, 20), // 费率备注信息
      "payway_id": "123456", // 支付方式 id
      "payway_title": "通道名称", // 支付通道名称
      // "payway_settle_type": 1,  // 结算类型, D0=1, D1=2, T0=3, T1=4
      "payway_fee_mode|1": [1, 2, 3], // 费率组成形式, 百分比=1, 定额=2, 组合=3, 通过该值决定 fee_percent 和 fee_fix 是否需要填写.
    }],
  }
};
Mock.mock(/qudao\/v1\/api\/payquick_ratio\/list/, 'get', list_info);

//修改
var modify_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
  }
};
Mock.mock(/qudao\/v1\/api\/payquick_ratio\/modify/, 'post', modify_info);