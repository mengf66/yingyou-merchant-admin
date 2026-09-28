<template>
  <div class="left-box">
    <div class="logo" @click="$router.push('/dashboard/welcome')">
      <span class="seal">晋</span>
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
/* 侧栏：黛青底 + 朱红选中，与景区端一致 */
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
  background: linear-gradient(180deg, rgba(201, 164, 92, 0.08), transparent 160px),
    linear-gradient(180deg, #2b3a4a 0%, #1f2b37 100%);
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.12);
}

.left-box::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 130px;
  opacity: 0.12;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 140' preserveAspectRatio='none'%3E%3Cpath d='M0 90 L30 60 L55 78 L90 38 L120 70 L150 50 L185 80 L220 55 V140 H0Z' fill='%23c9a45c'/%3E%3Cpath d='M0 115 L40 95 L70 108 L110 88 L150 104 L190 92 L220 100 V140 H0Z' fill='%23c9a45c' opacity='.6'/%3E%3C/svg%3E")
    bottom / 100% 100% no-repeat;
}

.left-box .logo {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 72px;
  padding: 0 18px;
  flex-shrink: 0;
  cursor: pointer;
  border-bottom: 1px solid rgba(201, 164, 92, 0.18);
}

.left-box .seal {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  font-family: "STXingkai", "STKaiti", "KaiTi", serif;
  font-size: 24px;
  color: #fff6e6;
  background: linear-gradient(135deg, #c9483a, #962c23);
  border-radius: 4px;
  box-shadow: inset 0 0 0 2px rgba(255, 246, 230, 0.35), 0 2px 6px rgba(0, 0, 0, 0.25);
}

.left-box .brand .name {
  font-family: "STXingkai", "STKaiti", "KaiTi", serif;
  font-size: 21px;
  letter-spacing: 4px;
  line-height: 1.1;
  color: #f0d9a2;
}

.left-box .brand .sub {
  margin-top: 3px;
  font-size: 11px;
  letter-spacing: 2px;
  color: rgba(233, 223, 200, 0.55);
}

.left-box .menu-wrap {
  position: relative;
  z-index: 1;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px 0;
}

.left-box .sidebar {
  width: 200px;
  border-right: none;
  background: transparent;
}

.left-box .el-menu-item,
.left-box .el-submenu__title {
  height: 44px;
  line-height: 44px;
  margin: 2px 10px;
  border-radius: 4px;
}

.left-box .el-menu-item:hover,
.left-box .el-submenu__title:hover {
  background: rgba(201, 164, 92, 0.1) !important;
}

.left-box .el-menu-item.is-active {
  background: linear-gradient(90deg, #b83a2f, #9a3027) !important;
  box-shadow: 0 4px 10px rgba(150, 44, 35, 0.35);
}

.left-box .el-submenu .el-menu {
  background: transparent !important;
}

.left-box .el-submenu .el-menu-item {
  min-width: 0;
  height: 40px;
  line-height: 40px;
  padding-left: 46px !important;
}

.left-box .el-submenu__title i {
  color: #8f9aa6;
}

.left-box .fa {
  width: 18px;
  margin-right: 10px;
  font-size: 15px;
  text-align: center;
  color: #d9b36a;
}

.left-box .el-menu-item.is-active .fa {
  color: #f6e2ae;
}

.left-box .el-submenu .el-menu-item .fa {
  width: 10px;
  margin-right: 8px;
  font-size: 6px;
  opacity: 0.7;
}
</style>
