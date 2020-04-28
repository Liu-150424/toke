//app.js
App({
  onLaunch: function() {
    var than = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        var code = res.code
        wx.getUserInfo({
          success: res => {
            console.log(res),
              this.globalData.userInfo = res.userInfo //全局储存
            wx.request({
              url: 'https://exam.qhynice.top/index.php/Api/Login/getsessionkey',
              method: "POST",
              data: {
                code: code
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: res => {
                console.log(res.data)
                var openid = res.data.openid
                wx.setStorageSync('openid', res.data.openid)
                wx.setStorageSync('session_key', res.data.session_key)
              },
            })
            wx.request({
              url: 'https://exam.qhynice.top/index.php/Api/Login/authlogin',
              method: "POST",
              data: {
                openid: wx.getStorageSync('openid'),
                NickName: res.userInfo.nickName,
                HeadUrl: res.userInfo.avatarUrl,
                gender: res.userInfo.gender
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success(res) {
                console.log(res)
                var id = res.data.arr.ID
                wx.setStorageSync('id', id)
              },
            })
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              wx.setStorageSync('nickName', userInfo.nickName)
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              // console.log(nickName)
              var country = userInfo.country // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
})