<template>
  <div class="login">
    <!-- 左侧宣纸留白处的竖排题字（纯装饰） -->
    <div class="login-verse" aria-hidden="true">
      <span>千年晋商</span>
      <span>一城烟火</span>
    </div>
    <div class="login-stage">
      <div class="login-box">
        <div class="logo">
          <img class="seal" src="@/assets/images/seal-logo.png" alt="应游晋游" />
          <div class="name">应游晋游</div>
          <div class="sub">晋商古街 · 商户后台</div>
        </div>
        <div class="body">
          <p class="tips">商户登录</p>
          <el-form ref="form" :model="form" :rules="rules" label-position="top">
            <el-form-item label="" prop="username">
              <el-input
                v-model="form.username"
                placeholder="用户名"
                prefix-icon="el-icon-user"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                type="password"
                v-model="form.password"
                placeholder="密码"
                prefix-icon="el-icon-lock"
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
        <div class="foot">诚信为本 · 以义取利</div>
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
            this.loading = false;
            if (res.data.errno === 0) {
              localStorage.setItem("token", res.data.data.token);
              localStorage.setItem(
                "userInfo",
                JSON.stringify(res.data.data.userInfo)
              );
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
/* 登录页：黄昏晋商古街水墨画作背景，登录框放在画面左侧的宣纸留白处 */
.login {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 560px;
  overflow: hidden;
  color: #5c534c;
  background: #efe7d6 url("~@/assets/images/merchant-login-bg.webp") right center / cover no-repeat;
}

/* 宣纸留白一侧略提亮，保证文字清晰 */
.login::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(90deg, rgba(246, 241, 231, 0.55) 0%, rgba(246, 241, 231, 0.2) 38%, transparent 48%);
}

.login-verse {
  position: absolute;
  top: 48px;
  left: 44px;
  z-index: 1;
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
  font-family: var(--font-brush);
  font-size: 24px;
  line-height: 1.25;
  letter-spacing: 6px;
  color: rgba(42, 37, 34, 0.62);
  writing-mode: vertical-rl;
  animation: login-fade 1.2s ease 0.2s both;
}

.login-verse span:last-child {
  margin-top: 36px;
}

.login-stage {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45%;
  min-width: 460px;
  height: 100%;
}

.login-box {
  position: relative;
  width: 372px;
  padding: 6px 0 4px;
  background:
    var(--corner-tl) left 8px top 8px / 22px 22px no-repeat,
    var(--corner-tr) right 8px top 8px / 22px 22px no-repeat,
    var(--corner-bl) left 8px bottom 8px / 22px 22px no-repeat,
    var(--corner-br) right 8px bottom 8px / 22px 22px no-repeat,
    rgba(255, 253, 248, 0.9);
  border: 1px solid rgba(201, 164, 92, 0.55);
  border-radius: 6px;
  box-shadow:
    inset 0 0 0 5px rgba(255, 253, 248, 0.6),
    inset 0 0 0 6px rgba(201, 164, 92, 0.28),
    0 30px 60px -24px rgba(60, 40, 20, 0.45),
    0 2px 6px rgba(60, 40, 20, 0.08);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  animation: login-rise 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

@keyframes login-rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes login-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.login-box .logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0 4px;
}

.login-box .seal {
  display: block;
  width: 68px;
  height: 68px;
  margin-bottom: 10px;
  filter: drop-shadow(0 3px 6px rgba(150, 44, 35, 0.25));
}

.login-box .name {
  font-family: var(--font-brush);
  font-size: 34px;
  line-height: 1.2;
  letter-spacing: 8px;
  padding-left: 8px;
  color: #2a2522;
}

.login-box .sub {
  margin-top: 6px;
  font-family: var(--font-title);
  font-size: 14px;
  letter-spacing: 4px;
  color: #8f857b;
}

.login-box .body {
  position: relative;
  padding: 6px 40px 8px;
}

.login-box .body .tips {
  display: flex;
  align-items: center;
  margin: 12px 0 20px;
  font-family: var(--font-title);
  font-size: 17px;
  letter-spacing: 4px;
  color: #b83a2f;
}

.login-box .body .tips::before,
.login-box .body .tips::after {
  content: "";
  flex: 1;
  height: 1px;
  margin: 0 12px;
  background: linear-gradient(90deg, transparent, rgba(201, 164, 92, 0.75));
}

.login-box .body .tips::after {
  background: linear-gradient(90deg, rgba(201, 164, 92, 0.75), transparent);
}

.login-box .el-form-item {
  margin-bottom: 20px;
}

.login-box .el-input__inner {
  height: 44px;
  line-height: 44px;
  padding-left: 38px;
  background: rgba(255, 253, 248, 0.85);
  border-color: #dccfb8;
}

.login-box .el-input__prefix {
  left: 10px;
  color: #a88340;
  font-size: 16px;
}

.login-box .el-input__icon {
  line-height: 44px;
}

.login-box .el-button--primary {
  height: 46px;
  font-family: var(--font-title);
  font-size: 19px;
  letter-spacing: 10px;
  text-indent: 10px;
}

.login-box .foot {
  padding: 0 0 22px;
  font-family: var(--font-title);
  font-size: 13px;
  letter-spacing: 4px;
  text-align: center;
  color: rgba(143, 133, 123, 0.85);
}

/* 窄屏（手机）：画面取古街一侧，登录框居中 */
@media (max-width: 760px) {
  .login {
    justify-content: center;
    background-position: 72% center;
  }
  .login::before {
    background: linear-gradient(180deg, rgba(29, 40, 51, 0.15), rgba(29, 40, 51, 0.35));
  }
  .login-verse {
    display: none;
  }
  .login-stage {
    width: 100%;
    min-width: 0;
    padding: 0 16px;
  }
  .login-box {
    width: 100%;
    max-width: 380px;
    background-color: rgba(255, 253, 248, 0.94);
  }
  .login-box .body {
    padding: 6px 28px 8px;
  }
}
</style>
