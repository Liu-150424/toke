// pages/shangpin/shang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    con:[],
    awa:[],
    apa:[],
    num:1,
    asws:[
      {
        tex:"商品名称",
        op:"合伙人"
      },
      {
        tex: "商品编号：",
        op: "913"
      },
      {
        tex: "分类：",
        op: "积分"
      },
    ],
    cardCur: 0,   
  },
  buta: function () {
    this.setData({ show: true });
  },
 
  onover:function () {
    this.setData({ show: false });
  },
  // 获取步进器的值，再将步进器和商品价格相乘
  onChange:function(lesa){
    var that=this
    console.log(lesa.detail)
    var v = lesa.detail * lesa.detail
    this.setData({
      apa: v,
      num:lesa.detail
    })
  },
  butas: function () {
      wx.navigateTo({
        url: '../dingdan/ding?num=' + this.data.num,
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var v =  wx.getStorageSync('jiage') * wx.getStorageSync('bujin') 
    this.setData({
      apa: v
    })
    // 商品详情接口请求
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
        wx.setStorageSync('jiage', res.data.pro.price)
        console.log(res)
        this.setData({
          con: res.data
        })
      }
    })
  },
// lunbo
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

  }
})