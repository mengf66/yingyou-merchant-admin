<template>
  <div class="login">
    <div class="login-box">
      <div class="logo">
        <span class="seal">晋</span>
        <div>
          <div class="name">应游晋游</div>
          <div class="sub">古城商户后台</div>
        </div>
      </div>
      <div class="body">
        <p class="tips">商户登录</p>
        <el-form ref="form" :model="form" :rules="rules" label-position="top">
          <el-form-item label="" prop="username">
            <el-input v-model="form.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              type="password"
              v-model="form.password"
              placeholder="密码"
              @keyup.enter.native="startLogin"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="startLogin"
              :loading="loading"
              style="width: 100%"
            >
              {{ loading ? "登录中..." : "登录" }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/config/api";
export default {
  data() {
    return {
      root: "",
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码不得低于6个字符", trigger: "blur" },
        ],
      },
      loading: false,
    };
  },
  components: {},
  methods: {
    startLogin() {
      console.log("<<<<<<<<==================>>>>>>>>");
      console.log(123123);
      console.log("<<<<<<<<==================>>>>>>>>");
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          return false;
        }
        this.loading = true;
        let root = this.root;
        this.axios
          .post(root + "auth/login", {
            username: this.form.username,
            password: this.form.password,
          })
          .then((res) => {
            let call = res.data;
            console.log(call);
            this.loading = false;
            if (res.data.errno === 0) {
              console.log(res.data.data);
              localStorage.setItem("token", res.data.data.token);
              localStorage.setItem(
                "userInfo",
                JSON.stringify(res.data.data.userInfo)
              );
              console.log(JSON.stringify(res.data.data.token));
              console.log(JSON.stringify(res.data.data.userInfo));
              this.$router.push({ name: "welcome" });
              let sUserAgent = navigator.userAgent;
              // todo 手机端
              let mobileAgents = [
                "Android",
                "iPhone",
                "Symbian",
                "WindowsPhone",
                "iPod",
                "BlackBerry",
                "Windows CE",
              ];
              let goUrl = 0;
              for (var i = 0; i < mobileAgents.length; i++) {
                if (sUserAgent.indexOf(mobileAgents[i]) > -1) {
                  goUrl = 1;
                  break;
                }
              }
              console.log(goUrl);
              if (goUrl == 1) {
                this.$router.push({ name: "wap" });
              }
            } else {
              this.$message({
                type: "error",
                message: call.errmsg,
              });
              return false;
            }
          })
          .catch((err) => {
            this.loading = false;
          });
      });
    },
  },
  mounted() {
    this.root = api.rootUrl;
  },
};
</script>
<style>
/* 登录页：夜色古城背景 + 宣纸登录卡（原背景图外链到开源作者网站，已替换为本地 SVG） */
.login {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #5c534c;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 400' preserveAspectRatio='xMidYMax slice'%3E%3Cpath d='M0 220 L180 120 L330 180 L520 60 L700 170 L860 100 L1040 190 L1240 90 L1420 170 L1600 110 V400 H0Z' fill='%232f4d8a' opacity='.55'/%3E%3Cpath d='M0 280 L220 210 L420 250 L640 190 L860 260 L1100 200 L1320 250 L1600 210 V400 H0Z' fill='%23223d74'/%3E%3Cg fill='%230c1a3c'%3E%3Crect x='0' y='300' width='1600' height='100'/%3E%3Crect x='700' y='230' width='200' height='72'/%3E%3Cpath d='M650 240 L950 240 L910 206 L690 206Z'/%3E%3Crect x='740' y='176' width='120' height='32'/%3E%3Cpath d='M710 184 L890 184 L862 156 L738 156Z'/%3E%3C/g%3E%3Cpath d='M650 240 L690 206 L910 206 L950 240 M710 184 L738 156 L862 156 L890 184 M0 300 H1600' fill='none' stroke='%23d9b36a' stroke-width='2' opacity='.8'/%3E%3C/svg%3E") center bottom / 100% auto no-repeat,
    radial-gradient(circle at 75% 22%, rgba(240, 217, 162, 0.55) 0, rgba(240, 217, 162, 0.15) 70px, transparent 140px),
    linear-gradient(180deg, #0c1735 0%, #16295a 70%, #1d3569 100%);
}

.login-box {
  position: relative;
  width: 380px;
  padding-bottom: 10px;
  background: #fffdf8;
  border: 1px solid #e6dccb;
  border-radius: 8px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
}

.login-box::before {
  content: "";
  position: absolute;
  inset: 8px;
  border: 1px solid #efe5d3;
  border-radius: 4px;
  pointer-events: none;
}

.login-box .logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 36px 0 8px;
}

.login-box .seal {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-family: "STXingkai", "STKaiti", "KaiTi", serif;
  font-size: 30px;
  color: #fff6e6;
  background: linear-gradient(135deg, #c9483a, #962c23);
  border-radius: 6px;
  box-shadow: inset 0 0 0 3px rgba(255, 246, 230, 0.35), 0 4px 10px rgba(150, 44, 35, 0.3);
}

.login-box .name {
  font-family: "STXingkai", "STKaiti", "KaiTi", serif;
  font-size: 28px;
  letter-spacing: 4px;
  color: #2a2522;
  text-align: left;
}

.login-box .sub {
  font-size: 12px;
  letter-spacing: 3px;
  color: #8f857b;
  text-align: left;
}

.login-box .body {
  position: relative;
  padding: 10px 36px 28px;
}

.login-box .body .tips {
  margin: 8px 0 22px;
  font-family: "STKaiti", "KaiTi", serif;
  font-size: 17px;
  letter-spacing: 4px;
  text-align: center;
  color: #b83a2f;
}

.login-box .body .tips::before,
.login-box .body .tips::after {
  content: "";
  display: inline-block;
  width: 40px;
  height: 1px;
  margin: 0 12px;
  vertical-align: middle;
  background: #e0d3bb;
}

.login-box .el-input__inner {
  height: 42px;
  background: #fffdf8;
}

.login-box .el-button--primary {
  height: 44px;
  font-family: "STKaiti", "KaiTi", serif;
  font-size: 18px;
  letter-spacing: 6px;
  box-shadow: 0 6px 14px rgba(150, 44, 35, 0.25);
}

.login-box .body .author {
  display: block;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  color: #8f857b;
}
</style>
