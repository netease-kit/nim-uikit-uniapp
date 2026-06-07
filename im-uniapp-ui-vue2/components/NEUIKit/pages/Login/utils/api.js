const baseUrl = "https://yiyong-user-center-qa.netease.im";
// const baseUrl = 'https://yiyong-user-center.netease.im'
// BUILD_ENV === 'prod'
//   ? 'https://yiyong-user-center.netease.im/'
//   : 'https://yiyong-user-center-qa.netease.im'

const loginByCodeHeader = {
  appKey: "",
  parentScope: 2,
  scope: 7,
};

const urlMap = {
  getLoginSmsCode: "/userCenter/v1/auth/sendLoginSmsCode",
  loginRegisterByCode: "/userCenter/v1/auth/loginRegisterByCode",
  loginRegisterByToken: "/userCenter/v1/auth/loginByToken",
  logout: "/userCenter/v1/auth/logout",
};

export const getLoginSmsCode = (data) => {
  const url = baseUrl + urlMap.getLoginSmsCode;

  return new Promise((resolve, reject) => {
    uni.request({
      url,
      header: loginByCodeHeader,
      method: "POST",
      data,
      success: (res) => {
        const responseData = res.data;
        if (responseData.code !== 200) {
          reject(responseData);
          return;
        }
        resolve(responseData.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export const loginRegisterByCode = (data) => {
  const url = baseUrl + urlMap.loginRegisterByCode;

  return new Promise((resolve, reject) => {
    uni.request({
      url,
      header: loginByCodeHeader,
      method: "POST",
      data,
      success: (res) => {
        const responseData = res.data;
        if (responseData.code !== 200) {
          reject(responseData);
          return;
        }
        resolve(responseData.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

/*
export const loginRegisterByToken = (data) => {
  const url = baseUrl + urlMap.loginRegisterByToken
  const loginByTokenHeader = {
    ...loginByCodeHeader,
    accessToken: data.accessToken,
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      header: loginByTokenHeader,
      method: 'POST',
      success: (res) => {
        console.log(res.data)
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
*/
