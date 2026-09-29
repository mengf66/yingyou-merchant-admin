<template>
  <div class="left-box">
    <div class="logo" @click="$router.push('/dashboard/welcome')">
      <span class="seal"><img src="@/assets/images/seal-logo.png" alt="应游晋游" /></span>
      <div class="brand">
        <div class="name">应游晋游</div>
        <div class="sub">古城商户后台</div>
      </div>
    </div>
    <div class="menu-wrap">
      <el-menu
        class="sidebar"
        background-color="transparent"
        text-color="#c3cbd4"
        active-text-color="#ffffff"
        :unique-opened="true"
        :default-active="currentPagePath"
        @open="handleOpen"
        :router="true"
        @close="handleClose"
      >
        <el-menu-item index="/dashboard/welcome">
          <i class="fa fa-tachometer"></i>
          <span>后台主页</span>
        </el-menu-item>
        <el-menu-item index="/dashboard/order">
          <i class="fa fa-large fa-reorder"></i>
          <span>订单列表</span>
        </el-menu-item>
        <el-submenu index="goods">
          <template slot="title">
            <i class="fa fa-shopping-bag"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/dashboard/goods">
            <i class="fa fa-circle"></i>
            <span>商品列表</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/nature">
            <i class="fa fa-circle"></i>
            <span>商品设置</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/dashboard/shopcart">
          <i class="fa fa-large fa-shopping-cart"></i>
          <span>购物车</span>
        </el-menu-item>
        <el-menu-item index="/dashboard/user">
          <i class="fa fa-large fa-users"></i>
          <span>用户列表</span>
        </el-menu-item>
        <el-submenu index="settings">
          <template slot="title">
            <i class="fa fa-large fa-wrench"></i>
            <span>店铺设置</span>
          </template>
          <el-menu-item index="/dashboard/settings/showset">
            <i class="fa fa-circle"></i>
            <span>显示设置</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/ad">
            <i class="fa fa-circle"></i>
            <span>广告列表</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/notice">
            <i class="fa fa-circle"></i>
            <span>公告管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/freight">
            <i class="fa fa-circle"></i>
            <span>运费模板</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/shipper">
            <i class="fa fa-circle"></i>
            <span>快递设置</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/admin">
            <i class="fa fa-circle"></i>
            <span>管理员</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item @click="logout">
          <i class="fa fa-large fa-sign-out"></i>
          <span>退出</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPagePath: this.$route.path,
      loginInfo: null,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.$confirm("是否要退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        localStorage.clear();
        this.$router.replace({ name: "login" });
      });
    },
    checkLogin() {
      this.axios.get("index/checkLogin").then((response) => {
        console.log(response.data);
        if (response.data.errno === 401) {
          localStorage.clear();
          this.$router.replace({ name: "login" });
        }
      });
    },
  },
  watch: {
    $route(to) {
      this.currentPagePath = to.path;
    },
  },
  mounted() {
    this.checkLogin();
    if (!this.loginInfo) {
      this.loginInfo = JSON.parse(
        window.localStorage.getItem("userInfo") || null
      );
    }
  },
};
</script>
<style>
/* 侧栏：黛青底 + 祥云暗纹 + 朱红选中 + 鎏金细线，与景区端一致 */
.left-box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  overflow: hidden;
  background:
    var(--cloud-light) right -30px bottom 200px / 110px 55px no-repeat,
    var(--cloud-light) left -38px bottom 150px / 96px 48px no-repeat,
    radial-gradient(120% 60% at 0% 0%, rgba(201, 164, 92, 0.14), transparent 60%),
    linear-gradient(180deg, #2e3e4f 0%, #243241 55%, #1d2833 100%);
  box-shadow: 2px 0 14px rgba(0, 0, 0, 0.18);
}

/* 右缘一道金线 */
.left-box::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(180deg, rgba(232, 207, 148, 0.05), rgba(232, 207, 148, 0.45) 30%, rgba(232, 207, 148, 0.45) 70%, rgba(232, 207, 148, 0.05));
  pointer-events: none;
}

/* 底部远山剪影 */
.left-box::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 140px;
  opacity: 0.14;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 140' preserveAspectRatio='none'%3E%3Cpath d='M0 90 L30 60 L55 78 L90 38 L120 70 L150 50 L185 80 L220 55 V140 H0Z' fill='%23c9a45c'/%3E%3Cpath d='M0 115 L40 95 L70 108 L110 88 L150 104 L190 92 L220 100 V140 H0Z' fill='%23c9a45c' opacity='.6'/%3E%3C/svg%3E")
    bottom / 100% 100% no-repeat;
}

.left-box .logo {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 82px;
  padding: 0 16px;
  flex-shrink: 0;
  cursor: pointer;
}

/* logo 下方回纹金带 */
.left-box .logo::after {
  content: "";
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 0;
  height: 10px;
  opacity: 0.55;
  background: var(--huiwen-light) left top / 16px 10px repeat-x;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
}

/* 印章：宣纸底座托着朱印 */
.left-box .seal {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  background: #f6efe0;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px rgba(201, 164, 92, 0.55), 0 3px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.left-box .seal img {
  display: block;
  width: 40px;
  height: 40px;
}

.left-box .logo:hover .seal {
  transform: rotate(-4deg);
}

.left-box .brand .name {
  font-family: var(--font-brush);
  font-size: 22px;
  letter-spacing: 2px;
  line-height: 1.1;
  white-space: nowrap;
  color: #f0d9a2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
}

.left-box .brand .sub {
  margin-top: 4px;
  font-family: var(--font-title);
  font-size: 12px;
  letter-spacing: 2px;
  white-space: nowrap;
  color: rgba(233, 223, 200, 0.6);
}

.left-box .menu-wrap {
  position: relative;
  z-index: 1;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 14px 0 12px;
}

.left-box .menu-wrap::-webkit-scrollbar-thumb {
  background: rgba(232, 207, 148, 0.25);
}

.left-box .sidebar {
  width: 200px;
  border-right: none;
  background: transparent;
}

.left-box .el-menu-item,
.left-box .el-submenu__title {
  position: relative;
  height: 44px;
  line-height: 44px;
  margin: 2px 10px;
  padding-left: 16px !important;
  border-radius: 3px;
  font-family: var(--font-title);
  font-size: 15px;
  letter-spacing: 2px;
  color: #c9d0d8 !important;
  transition: background 0.2s ease, color 0.2s ease;
}

.left-box .el-menu-item:hover,
.left-box .el-submenu__title:hover,
.left-box .el-menu-item:focus {
  background: rgba(232, 207, 148, 0.09) !important;
  color: #f3e3bd !important;
}

.left-box .el-menu-item.is-active {
  color: #fff !important;
  background: linear-gradient(90deg, #bf3f33, #9a3027) !important;
  box-shadow: inset 0 0 0 1px rgba(240, 217, 162, 0.28), 0 6px 14px -4px rgba(150, 44, 35, 0.55);
}

/* 选中项左侧金签 */
.left-box .el-menu-item.is-active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  bottom: 10px;
  width: 3px;
  border-radius: 0 2px 2px 0;
  background: #f0d9a2;
}

.left-box .el-submenu.is-opened > .el-submenu__title,
.left-box .el-submenu.is-active > .el-submenu__title {
  color: #f0d9a2 !important;
}

.left-box .el-submenu .el-menu {
  margin: 0 10px;
  background: rgba(0, 0, 0, 0.12) !important;
  border-radius: 3px;
}

.left-box .el-submenu .el-menu-item {
  min-width: 0;
  height: 38px;
  line-height: 38px;
  margin: 2px 0;
  padding-left: 38px !important;
  font-size: 14px;
  letter-spacing: 1px;
}

.left-box .el-submenu__title .el-submenu__icon-arrow {
  color: rgba(232, 207, 148, 0.6);
}

.left-box .fa {
  width: 18px;
  margin-right: 10px;
  font-size: 15px;
  text-align: center;
  color: #d9b36a;
  transition: color 0.2s;
}

.left-box .el-menu-item.is-active .fa {
  color: #f6e2ae;
}

/* 子菜单前的小圆点改成金色小菱形 */
.left-box .el-submenu .el-menu-item .fa-circle {
  width: 5px;
  height: 5px;
  margin: 0 12px 0 0;
  font-size: 0;
  vertical-align: middle;
  background: #c9a45c;
  transform: rotate(45deg);
  opacity: 0.75;
}

.left-box .el-submenu .el-menu-item.is-active .fa-circle {
  background: #f6e2ae;
  opacity: 1;
}
</style>
