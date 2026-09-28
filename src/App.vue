<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "admin",
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  background: #f6f1e7;
}

a,
a:hover {
  text-decoration: none;
}

/* 顶部面包屑栏样式见 styles/jin-theme.scss（原紫色渐变已替换为宣纸色） */
.content-nav {
  display: flex;
  align-items: center;
}

.content-nav .breadcrumb {
  height: 40px;
  line-height: 40px;
  flex: 1;
  color: #8492a6;
}

.content-nav .operation-nav {
  width: auto;
  display: flex;
  align-items: center;
}

.content-main {
  padding: 20px;
  background: #fff;
}

.filter-box {
  height: auto;
  overflow: hidden;
}

.page-box {
  margin-top: 20px;
  text-align: right;
}

.form-table-box .el-input__inner {
  max-width: 240px;
}

.form-table-box .el-textarea {
  width: 400px;
}

.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}

.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}

.form-table-box .el-form {
  margin-top: 40px;
}

.form-tip {
  color: #888;
  font-size: 12px;
  line-height: 30px;
}
</style>
