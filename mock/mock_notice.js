// 使用 Mock
var Mock = require('mockjs');
var Random = Mock.Random;
//列表
var list_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "total_cnt": 200, // 商户数
    "page": 1,
    "page_size": 10,
    "records|50-80": [{
      "title": Random.string(30,45),
      "content": Random.paragraph(3,7),
      "create_time": Random.datetime('yyyy-MM-dd HH:mm:ss'),
      "istop|1": [1, 0], // 是否置顶
      "announce_id|+1": 123456, // 公告 id
      "read|1": [1, 0], // 是否已读,1 为已读, 0 为未读
      "can_modify|1": [1, 0], 
    }],
  }
};
Mock.mock(/qudao\/v1\/api\/announcement\/list/, 'get', list_info);
