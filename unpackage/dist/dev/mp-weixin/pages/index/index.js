"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      inputValue: "",
      title: "AI\u5C0F\u667A\u53D6\u540D",
      sexIndex: 0,
      value: "",
      motherSurname: "",
      resmsg: "",
      togetprompt: ""
    };
  },
  methods: {
    onShareAppMessage() {
      var url = "/pages/index/index";
      return {
        title: "AI\u5C0F\u667A\u53D6\u540D",
        path: url
      };
    },
    onShareTimeline() {
      var url = "/pages/index/index";
      return {
        title: "AI\u5C0F\u667A\u53D6\u540D",
        path: url,
        imageUrl: "https://www.aierleshop.com/api/apiimg/xiaozhi.png"
      };
    },
    checkSex: function(e) {
      this.sexIndex = e.currentTarget.dataset.index;
    },
    startNaming() {
      const sex = this.sexIndex === 0 ? "\u7537" : "\u5973";
      const value = this.inputValue;
      const mother = this.motherSurname;
      if (value == "") {
        common_vendor.index.showToast({
          title: "\u4F60\u8FD8\u6CA1\u6709\u8F93\u5165\u7236\u59D3\u5462\uFF01",
          icon: "none",
          duration: 1e3
        });
        return 0;
      }
      if (value.length > 2) {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u7236\u59D3\uFF01",
          icon: "none",
          duration: 1e3
        });
        return 0;
      }
      if (mother.length > 2) {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u6BCD\u59D3\uFF01",
          icon: "none",
          duration: 1e3
        });
        return 0;
      }
      const apiUrl = `/pages/Result/Result?msg=${value}&sex=${sex}`;
      common_vendor.index.navigateTo({
        url: apiUrl
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.title),
    b: $data.inputValue,
    c: common_vendor.o(($event) => $data.inputValue = $event.detail.value),
    d: $data.motherSurname,
    e: common_vendor.o(($event) => $data.motherSurname = $event.detail.value),
    f: common_vendor.n($data.sexIndex == 0 ? "active" : ""),
    g: common_vendor.o((...args) => $options.checkSex && $options.checkSex(...args)),
    h: common_vendor.n($data.sexIndex == 1 ? "active" : ""),
    i: common_vendor.o((...args) => $options.checkSex && $options.checkSex(...args)),
    j: common_vendor.o(($event) => $options.startNaming($event))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/WeixinXCX/myname/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
