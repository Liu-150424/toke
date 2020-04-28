// pages/shouquan/shouquan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('nickName')==""){
      console.log(2)
    }
    else{
      console.log(2)
      wx.showToast({
        title: '已授权',
        icon: 'success',
        duration: 2000
      })
    }
  },
  bindGetUserInfo(res) {
    wx.login({
      success: res => {
        var code = res.code
        wx.getUserInfo({
          success: res => {
            console.log(res),
              // this.globalData.userInfo = res.userInfo //全局储存
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
            setTimeout(function () {
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
                  wx.setStorageSync('id', res.data.arr.ID)
                },
              })
            }, 2000)
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // wx.navigateTo({
    //   url: '../bindleader/bindleader'
    // })
    setTimeout(function () {
      wx.reLaunch({
        url: '../bindleader/bindleader'
      })
    }, 4000)
    console.log(res);
    if (res.detail.userInfo) {
      console.log("点击了同意授权");
    } else {
      console.log("点击了拒绝授权");
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})