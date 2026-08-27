Page({
  data: {
    username: "",
    password: "",
    idNumber: "",
    phone: "",
    email: ""
  },
  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [field]: e.detail.value });
  },
  onRegister() {
    const { username, password, idNumber, phone, email } = this.data;
    
    if (!username) { wx.showToast({ title: "请输入用户名", icon: "none" }); return; }
    if (!password) { wx.showToast({ title: "请输入密码", icon: "none" }); return; }
    if (!idNumber) { wx.showToast({ title: "请输入证件号", icon: "none" }); return; }
    if (!phone) { wx.showToast({ title: "请输入手机号", icon: "none" }); return; }
    if (!email) { wx.showToast({ title: "请输入邮箱", icon: "none" }); return; }
    
    wx.request({
      url: "http://localhost/program/register.php", 
      method: "POST",
      data: { username, password, idNumber, phone, email },
      header: { 'content-type': 'application/x-www-form-urlencoded' }, 
      success: (res) => {
        console.log("注册响应:", res.data);
        if (res.data.code === 200) {
          wx.showToast({ title: "注册成功", icon: "success" });
          const userInfo = {
            username: username,
            isLogin: true,
            isGuest: false
          };
          wx.setStorageSync('userInfo', userInfo);
          setTimeout(() => wx.navigateTo({ url: '/pages/login/login' }), 1500);
        } else {
          wx.showToast({ title: res.data.message || "注册失败", icon: "none" });
        }
      },
      fail: (err) => {
        console.error("接口请求失败:", err);
        wx.showToast({ title: "服务器连接失败，请检查后端服务", icon: "none" });
      }
    });
  },
  goToLogin() { wx.navigateTo({ url: "/pages/login/login" }); },
  onGuestLogin() {
    const userInfo = {
      username: "游客",
      isGuest: true,
      isLogin: false
    };
    wx.setStorageSync("userInfo", userInfo);
    wx.switchTab({ url: "/pages/index/index" });
  }
});