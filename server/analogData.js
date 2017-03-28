const data = [
  {
    url: '/api/auth/school/count',
    data: {
      data: {
        total: 1
      },
      status: {
        code: 0,
        msg: 'request success',
      },
    }
  },
  {
    url: '/api/auth/my_plan', // 运动计划列表
    data: {
      "data": [
        {
          "_id": "587dd4d75914a932ebddeexx",
          "rate": "75%",
          "category": 1,
          "id": "587dd4d75914a932ebddee00",
          "name": "长跑",
          "num": "20170320123456",
          "status": 1,
          "competitiveAbility": [
            {
              "_id": "58be77f1b222201f6449712a",
              "name": "耐力类",
              "level": 1,
              "__v": 0
            },
            {
              "_id": "58be77f1b222201f64497132",
              "name": "超长距离",
              "level": 2,
              "parent": "58be77f1b222201f6449712a",
              "__v": 0
            }
          ],
          "phases": [
            {
              "seq": 1,
              "days": 4,
              "content": "马拉松训练项目",
              "timeStatus": {
                "2017-03-22": true,
                "2017-03-24": true,
                "2017-03-26": true,
                "2017-03-28": true
              }
            },
            {
              "seq": 2,
              "days": 4,
              "content": "马拉松训练项目",
              "timeStatus": {
                "2017-03-30": true,
                "2017-04-01": false,
                "2017-04-03": true,
                "2017-04-05": true
              }
            },
            {
              "seq": 3,
              "days": 4,
              "content": "马拉松训练项目",
              "timeStatus": {
                "2017-04-05": true,
                "2017-04-07": true,
                "2017-04-09": false,
                "2017-04-11": false
              }
            },
            {
              "seq": 4,
              "days": 4,
              "content": "马拉松训练项目",
              "timeStatus": {
                "2017-04-05": true,
                "2017-04-07": true,
                "2017-04-09": true,
                "2017-04-11": true
              }
            }
          ]
        },
        {
          "_id": "587dd4d75914a932ebddeexy",
          "rate": "100%",
          "category": 1,
          "id": "587dd4d75914a932ebddee00",
          "name": "短跑",
          "num": "20170320123456",
          "status": 2,
          "competitiveAbility": [
            {
              "_id": "58be77f1b222201f6449712a",
              "name": "速度类",
              "level": 1,
              "__v": 0
            },
            {
              "_id": "58be77f1b222201f64497132",
              "name": "短冲",
              "level": 2,
              "parent": "58be77f1b222201f6449712a",
              "__v": 0
            }
          ],
          "phases": [
            {
              "seq": 3,
              "days": 15,
              "content": "短跑项目",
              "timeStatus": {
                "2017-02-22": true,
                "2017-02-24": true,
                "2017-02-26": true,
                "2017-02-28": true
              }
            }
          ]
        }
      ],
    }
  }, {
    url: '/api/app_version',
    data: {
      "data": {
        "_id": "58d09bb6d64a0c3fc5d0b1c5",
        "name": 1,
        "platform": 1,
        "version": "1.1.1",
        "address": "",
        "description": "I saw thousands of alpacas running on the Gobi Desert.",
        "createBy": "皮蛋.id",
        "createAt": new Date("2017-03-21T03:19:17.829Z"),
      },
      "status": {
        "code": 0,
        "msg": "request success"
      }
    }
  },
  {
    url: '/api/auth/my_plan/status', // 运动计划总进度
    data: {
      data: {
        rate: 0.35
      },
      status: {
        code: 0,
        msg: 'request success',
      },
    }
  },
  {
    url: '/api/auth/device/own', // 查询用户所属设备
    data: {
      "data": {
        "name": "M08",
        "id": "123456789"
      },
      status: {
        code: 0,
        msg: 'request success',
      },
    }
  },
  {
    url: '/api/auth/device/check', // 检查可以绑定的设备
    data: {
      "data": [
        {
          "id": "id1",
          "name": "手环1",
        },
        {
          "id": "id2",
          "name": "手环2",
        },
        {
          "id": "id3",
          "name": "手环3",
        },
        {
          "id": "id4",
          "name": "手环4",
        },
        {
          "id": "id5",
          "name": "手环5",
        }
      ],
      status: {
        code: 0,
        msg: 'request success',
      },
    }
  },
  {
    url: '/api/auth/device/bind', // 绑定设备
    data: {
      "data": {
        "success": true
      },
      status: {
        code: 0,
        msg: 'request success',
      },
    }
  },
  {
    url: '/api/auth/device/unbind', // 解绑设备
    data: {
      "data": {
        "success": true
      },
      status: {
        code: 0,
        msg: 'request success',
      },
    }
  },
  {
    url: '/api/expert_user/verify_code',
    data: {
      status: {
        code: 0,
        msg: 'request success'
      }
    }
  },
  {
    url: 'api/expert_user/verify',
    data: {
      "status": {
        "code": 0,
        "msg": "request success"
      },
      "data": {
        "token": ""
      }
    }
  },
  {
    url: '/api/expert_user/set_password',
    data: {
      status: {
        code: 0,
        msg: 'request success'
      }
    }
  }
];
export default function(req, res) {
  const nowRequest = data.find(item => req._parsedUrl.pathname.endsWith(item.url));
  if (nowRequest) {
    res.json(nowRequest.data);
    return true;
  } else {
    // if (req._parsedUrl.pathname.endsWith('/user')) {
    //   res.json({
    //     status: {
    //       code: 1,
    //       msg: "request success"
    //     }
    //   });
    //   return true;
    // }
    return false;
  }
}
