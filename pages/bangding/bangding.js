// pages/bangding/bangding.js
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
    if (wx.getStorageSync('tel')=="") {
    //  this.getPhoneNumber()
    }
    else{
      wx.showToast({
        title: '已获取',
        icon: 'success',
        duration: 2000
      })
    }
  },
  getPhoneNumber: function (e) {
    var than = this
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/User/deciphering',
      method: "GET",
      data: {
        sessionID: wx.getStorageSync('session_key'),
        iv: e.detail.iv,
        encryptedDataStr: e.detail.encryptedData
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data)
        than.setData({
          tel: res.data,
        })
        wx.setStorageSync('tel', res.data.phoneNumber)
      },
    })
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/User/user_edit',
      method: "POST",
      data: {
        uid: wx.getStorageSync('id'),
        tel: wx.getStorageSync('tel'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data)
      },
    })
    setTimeout(function () {
      wx.reLaunch({
        url: '../bindleader/bindleader'
      })
    }, 4000)
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