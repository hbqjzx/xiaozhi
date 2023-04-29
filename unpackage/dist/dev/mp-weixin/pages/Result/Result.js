"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      prompt: "",
      nameprompt: "",
      name: "",
      sex: "",
      showtips: "AI\u5C0F\u667A\u6B63\u5728\u5206\u6790\u8D77\u540D\u4E2D\u2026\u2026",
      showgg: "",
      showback: "",
      childnames: [{ myname: "" }]
    };
  },
  mounted() {
    this.toask();
  },
  onLoad(options) {
    this.name = options.msg;
    this.sex = options.sex;
    console.log(this.sex);
    if (this.sex === "") {
      this.gopage("/pages/index/index");
    }
  },
  methods: {
    onShareAppMessage: {
      title: "AI\u5C0F\u667A\u8D77\u540D",
      path: "/pages/index/index"
    },
    copyText(text) {
      common_vendor.index.setClipboardData({
        data: text,
        success() {
          common_vendor.index.showToast({
            title: "\u5DF2\u590D\u5236",
            icon: "none"
          });
        }
      });
    },
    gopage(url) {
      common_vendor.index.navigateTo({
        url
      });
    },
    getprompt() {
      common_vendor.index.request({
        url: "https://www.aierleshop.com/api/getprompt.php",
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(
          {}
        ),
        success: (res) => {
          console.log(res.data);
          if (res.data.code === 200 && res.data.nameprompt != null) {
            return res.data.namepromt;
          } else {
            console.log("\u8FD4\u56DE\u9519\u8BEF\uFF0C\u5931\u8D25\u3002");
          }
        }
      });
    },
    toask() {
      this.prompt = "\u7236\u4EB2\u59D3" + this.name + "\uFF0C\u4E3A" + this.sex;
      console.log(this.name);
      console.log(this.prompt);
      common_vendor.index.request({
        url: "https://www.aierleshop.com/api/api.php",
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(
          {
            msg: this.prompt,
            father: this.name,
            sex: this.sex,
            token: "4000"
          }
        ),
        success: (res) => {
          console.log(res.data);
          if (res.data.code === 200 && res.data.resmsg != null) {
            this.showtips = "\u4E3A\u60A8\u7684\u5B9D\u5B9D\u53D6\u597D\u4E86\u540D\u5B57";
            this.showgg = "\u5982\u679C\u60A8\u559C\u6B22\uFF0C\u8BF7\u8F6C\u53D1\u5206\u4EAB\u7ED9\u597D\u670B\u53CB\uFF01";
            this.showback = "1";
            this.childnames.push(
              { "myname": res.data.resmsg }
            );
          } else {
            console.log("\u8FD4\u56DE\u9519\u8BEF\uFF0C\u5931\u8D25\u3002");
            this.childnames.push(
              { "myname": "\u53EF\u80FD\u53D1\u751F\u4E86\u7F51\u7EDC\u6545\u969C\uFF0C\u8BF7\u91CD\u8BD5\uFF01" }
            );
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showtips != ""
  }, $data.showtips != "" ? {
    b: common_vendor.t($data.showtips)
  } : {}, {
    c: $data.showgg != ""
  }, $data.showgg != "" ? {
    d: common_vendor.f($data.childnames, (message, index, i0) => {
      return {
        a: common_vendor.t(message.myname),
        b: common_vendor.o(($event) => $options.copyText(message.myname), index),
        c: index
      };
    })
  } : {}, {
    e: $data.showgg != ""
  }, $data.showgg != "" ? {
    f: common_vendor.o(($event) => $options.gopage("/pages/index/index"))
  } : {}, {
    g: $data.showgg != ""
  }, $data.showgg != "" ? {} : {}, {
    h: $data.showback === ""
  }, $data.showback === "" ? {
    i: common_vendor.o(($event) => $options.gopage("/pages/index/index"))
  } : {}, {
    j: common_vendor.t($data.showgg)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6764f686"], ["__file", "D:/WeixinXCX/myname/pages/Result/Result.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
