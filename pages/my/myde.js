// pages/my/myde.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    aww:{},
    ajw: [{
        name: '绑定手机',
        uaw: 'http://i1.fuimg.com/704616/eee020b569269fc9.png',
        ua: '/pages/bangding/bangding'
      },
      {
        name: '积分兑换',
        uaw: 'http://i1.fuimg.com/704616/92c5a04176243903.png',
        ua: '/pages/index/index'
      },
      {
        name: '我的订单',
        uaw: 'http://i1.fuimg.com/704616/77ef7daf8d507f7f.png',
        ua: '/pages/index/index'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({aww:app.globalData.userInfo})
  },
  bindGetUserInfo(res) {
    wx.navigateTo({
      url: '../shouquan/shouquan',
    })
    console.log(res);
    // if (res.detail.userInfo) {
    //   console.log("点击了同意授权");
    // } else {
    //   console.log("点击了拒绝授权");
    // }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})