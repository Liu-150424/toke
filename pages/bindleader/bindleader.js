// pages/bindleader/bindleader.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nick: "",
    te: "",
    name: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(query) {
    if (query.scene) {
      var uid = decodeURIComponent(query.scene);
      wx.setStorageSync('user1_id', uid);
    }
    var than = this
    than.setData({
      nick: wx.getStorageSync('openid'),
      te: wx.getStorageSync('tel')
    })
    if (than.data.nick == "") {
      setTimeout(function() {
        wx.reLaunch({
          url: '../shouquan/shouquan'
        })
      }, 3000)
    } else if (than.data.te == "") {
      setTimeout(function() {
        wx.reLaunch({
          url: '../bangding/bangding'
        })
      }, 3000)
    }
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/User/userinfo',
      method: "POST",
      data: {
        uid: wx.getStorageSync('user1_id')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        this.setData({
          name: res.data.userinfo.name,
          itou: res.data.userinfo.photo,
        })
        wx.setStorageSync('yonghuid', res.data.userinfo.type)
        wx.setStorageSync('initial_id', res.data.userinfo.initial_id)
      }
    })
  },
  buta: function() {
    if (wx.getStorageSync('yonghuid') == "0") {
      wx.showToast({
        title: '您是初始人',
        icon: 'success',
        duration: 2000
      })
      setTimeout(function() {
        wx.reLaunch({
          url: '../zhuoyinghome/home'
        })
      }, 1000)
    } else {
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      })
      wx.request({
        url: 'https://exam.qhynice.top/index.php/Api/User/user_edit',
        data: {
          uid: wx.getStorageSync('id'),
          tel: wx.getStorageSync('tel'),
          spread_id: wx.getStorageSync('user1_id'),
          secondary_id: wx.getStorageSync('id'),
          initial_id: wx.getStorageSync('initial_id'),
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          console.log(res)
        }
      })
    }
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