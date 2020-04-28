// pages/dizhi/dizhi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiIndex: [0, 0, 0],
    region: ['河南省', '新乡市', '红旗区'],
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var createArr = []
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Address/get_province',
      method: "POST",
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res)
        var lea = res.data.list
        for (let i in lea) {
          createArr.push(lea[i].name);
        }
        that.setData({
          aaa: createArr,
          sheng:lea
        })
      },
    })
    
  },
  bindPickerChange: function (e) {
    var that = this
    var aaw = []
    this.setData({
      index: e.detail.value,
      sheng_id:this.data.sheng[e.detail.value].id
    })
    // console.log(this.data.sheng_id)
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Address/get_city',
      method: "POST",
      data: {
        sheng: this.data.sheng_id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res)
        var leas = res.data.city_list
        for (let i in leas) {
          aaw.push(leas[i].name);
        }
        that.setData({
          aa: aaw,
          shi:leas
        })
      },
    })
  },
  awa: function (e) {
    var that = this
    var aw = []
    this.setData({
      indexa: e.detail.value,
      shi_id:this.data.shi[e.detail.value].id
    })
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Address/get_area',
      method: "POST",
      data: {
        city:this.data.shi_id,
        sheng: this.data.sheng_id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res)
        var las = res.data.area_list
        for (let i in las) {
          aw.push(las[i].name);
        }
        that.setData({
          a: aw,
          qu:las
        })
      },
    })
  },
  quyu:function(e){
    wx.setStorageSync('quyu', e.detail.value)
    console.log(e.detail.value)
    this.setData({
      indexs: e.detail.value,
      qu_id:this.data.qu[e.detail.value].id
    })
  },
  buta: function (e) {
    wx.setStorageSync('val1', e.detail.value)
    console.log(e.detail.value)
  },
  bute: function (e) {
    wx.setStorageSync('val2', e.detail.value)
    console.log(e.detail.value)
  },
  RegionChange:function(e){
    wx.setStorageSync('val3', e.detail.value)
    console.log(e.detail.value)
  },
  butp: function (e) {
    wx.setStorageSync('val4', e.detail.value)
    console.log(e.detail.value)
  },
  opaw:function(){
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Address/add_adds',
      method: "POST",
      data: {
        user_id: wx.getStorageSync('id'),
        receiver: wx.getStorageSync('val1'),
        tel: wx.getStorageSync('val2'),
        sheng: this.data.sheng_id,
        city: this.data.shi_id,
        quyu: this.data.qu_id,
        adds: wx.getStorageSync('val3'),
        code: wx.getStorageSync('val4'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        wx.setStorageSync('addrid', res.data.add_arr.addr_id)
        console.log(res.data.add_arr.addr_id)
      }
    })
    wx.navigateTo({
      url: '../lie/lie',
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