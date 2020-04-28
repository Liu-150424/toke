// pages/dingdan/ding.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dizhia:[],
    num:[],
  },
  oapw: function () {
    wx.navigateTo({
      url: '../lie/lie',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.num)
    this.setData({
      num: options.num
    })
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Product/index',
      method: "POST",
      data: {
        pro_id: wx.getStorageSync('shangid'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        wx.setStorageSync('jiage', res.data.pro.price)
        var v = res.data.pro.price * this.data.num
        console.log(v)
        this.setData({
          con: res.data,
          jiages: v
        })
      }
    })
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Address/index',
      method: "POST",
      data: {
        user_id: wx.getStorageSync('id'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data.adds[0])
        this.setData({
          dizhia: res.data.adds[0]
        })
        wx.setStorageSync('moren', res.data.adds[0].id)
      }
    })
  },
  xianxia:function(){
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Payment/pay_now',
      method: "POST",
      data: {
        uid: wx.getStorageSync('id'),
        pid: wx.getStorageSync('shangid'),
        type: "1",
        price: wx.getStorageSync('shangpin'),
        aid: wx.getStorageSync('moren'),
        num: wx.getStorageSync('bujin')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data)
      }
    })
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