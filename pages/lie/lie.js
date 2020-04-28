// pages/lie/lie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    liea:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        console.log(res.data)
        this.setData({liea:res.data.adds})
        console.log(res.data.adds)
      }
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  taw:function()  {
    wx.navigateTo({
      url: '../dizhi/dizhi',
    })
  },
  waw:function(id){
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Address/del_adds',
      method: "POST",
      data: {
        user_id: wx.getStorageSync('id'),
        id_arr: id.currentTarget.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
      }
    })
    this.onLoad()
  },
  sas:function(id){
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Address/set_default',
      method: "POST",
      data: {
        uid: wx.getStorageSync('id'),
        addr_id: id.currentTarget.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
      }
    })
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