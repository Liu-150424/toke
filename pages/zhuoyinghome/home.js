// pages/zhuoyinghome/home.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    bane:[],
    bann:[],
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    // 请求轮播+商品列表
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Index/index',
      method: "POST",
      data: {
       
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data)
        this.setData({
          bane:res.data.prolist,
          bann:res.data.ggtop
        })
        wx.setStorageSync('shangpin', res.data.prolist.price)
      },
    })
  },
  // 把商品ID传到下个页面
  dispath: function (id) {
    console.log(id.currentTarget.id)
    wx.setStorageSync('shangid', id.currentTarget.id)
    // var a = id.currentTarget.id
    wx.navigateTo({
      url: '../shangpin/shang' //?a= + a
    })
  },
  
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始    
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
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

  },
})