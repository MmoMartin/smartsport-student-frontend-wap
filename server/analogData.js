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