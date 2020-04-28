//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    awa:[],
    ae:[],
    plo:[],
    awap:[],
    daishen:[],
  },
  onClickIcon:function(e){    
    wx.setStorageSync('value1', e.detail.value)
    if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value))) {
      this.setData({
        plo:"请输入正确的名字"
      })
    }
    else{
      this.setData({
        plo: ""
      })
    }
  },
  onClickIconl: function (e) {
    wx.setStorageSync('value2', e.detail.value)
  },
  onClickIcone:function(e){
    if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(e.detail.value))) {
      this.setData({
        awap:"请输入正确的手机号"
      })
    }else{
      this.setData({awap:""})
    }
  },
  onClickIcons: function (e) {
    wx.setStorageSync('value3', e.detail.value)
    var a = Math.ceil(e.detail.value * 0.9)
    wx.setStorageSync('value5', a)
    this.setData({
      ae: a
    })
  },
  buta:function(){
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/User/withdraw',
      method: "POST",
      data: {
        uid: wx.getStorageSync('id'),
        name: wx.getStorageSync('value1'),
        tel: wx.getStorageSync('tel'),
        jifen: wx.getStorageSync('value3'),
        num: wx.getStorageSync('value5'),
        account: wx.getStorageSync('value2'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data)
      },
    })
    this.onLoad()
  },
  onLoad: function (options) {
    var than = this
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/User/userinfo',
      method: "POST",
      data: {
        uid: wx.getStorageSync('id'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data.userinfo)
        than.setData({
          awa: res.data.userinfo,
        })
        wx.setStorageSync('jifen', res.data.userinfo.jifen)
      },
    })
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/User/pending',
      method: "POST",
      data: {
        uid: wx.getStorageSync('id'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data.data)
        this.setData({
          daishen:res.data
        })
      },
    })
  },
  getPhoneNumber: function (e) {
    var than = this
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
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
  },
})