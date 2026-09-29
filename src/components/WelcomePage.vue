<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item>后台主页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content-main clearfix">
            <div class="hero">
                <div class="hero-text">
                    <h2>{{ greeting }}，{{ username || '掌柜' }}</h2>
                    <p>今日也请用心经营 · 让古城烟火气传得更远</p>
                </div>
                <div class="hero-date"><span class="hero-date-seal">晋</span>{{ today }}</div>
            </div>
            <div class="header clearfix">
                <el-card class="box-card stat-card" shadow="hover" style="--c: #b83a2f">
                    <router-link class="link-color" :to="{ path: '/dashboard/order' }">
                        <div class="stat-title">待发货订单</div>
                        <h1 class="stat-num">{{infoData.orderToDelivery || 0}}</h1>
                        <div class="stat-foot"><span>点击查看详情</span><i class="el-icon-arrow-right"></i></div>
                    </router-link>
                </el-card>
                <el-card class="box-card stat-card" shadow="hover" style="--c: #3f7a5f">
                    <router-link class="link-color" :to="{ path: '/dashboard/goods' }">
                        <div class="stat-title">上架中的商品</div>
                        <h1 class="stat-num">{{infoData.goodsOnsale || 0}}</h1>
                        <div class="stat-foot"><span>点击查看详情</span><i class="el-icon-arrow-right"></i></div>
                    </router-link>
                </el-card>
                <el-card class="box-card stat-card" shadow="hover" style="--c: #a88340">
                    <router-link class="link-color" :to="{ path: '/dashboard/user' }">
                        <div class="stat-title">总用户数</div>
                        <h1 class="stat-num">{{infoData.user || 0}}</h1>
                        <div class="stat-foot"><span>点击查看详情</span><i class="el-icon-arrow-right"></i></div>
                    </router-link>
                </el-card>
            </div>
            <div class="main">
                <el-tabs class="o-tab" v-model="activeName2" type="card" @tab-click="handleClick">
                    <el-tab-pane label="今天" name="first"></el-tab-pane>
                    <el-tab-pane label="昨天" name="second"></el-tab-pane>
                    <el-tab-pane label="最近7天" name="third"></el-tab-pane>
                    <el-tab-pane label="最近30天" name="fourth"></el-tab-pane>
                </el-tabs>
                <div class="tab-content clearfix">
                    <el-card class="box-card2">
                        <div slot="header" class="clearfix">
                            <span class="card-head" style="line-height: 36px;">顾客</span>
                            <el-popover
                                    placement="right"
                                    v-model="related_pop"
                            >
                                <el-tabs class="user-tab" v-model="userTab" type="card" @tab-click="userTabClick">
                                    <el-tab-pane label="新增" name="first"></el-tab-pane>
                                    <el-tab-pane label="老客户" name="second"></el-tab-pane>
                                </el-tabs>
                                <el-table :data="userData" style="width: 100%" height="550" border stripe>
                                    <el-table-column label="头像" width="80">
                                        <template slot-scope="scope">
                                            <img :src="scope.row.avatar" alt="" style="width: 50px;height: 50px">
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="nickname" label="昵称" width="140"></el-table-column>
                                    <el-table-column prop="gender" label="性别" width="50">
                                        <template slot-scope="scope">
                                            {{ scope.row.gender == 2 ? '女' : '男' }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="register_time" label="注册时间" width="170">
                                    </el-table-column>
                                    <el-table-column prop="last_login_time" label="最近登录" width="170">
                                    </el-table-column>
                                </el-table>
                                <el-button class="float-right" slot="reference" size="mini" type="primary" @click="seeClick">查看</el-button>
                            </el-popover>
                        </div>
                        <div class="text item">
                            <span>新增</span>
                            <h3 style="float: right;">{{mainInfo.newUser || 0}}</h3>
                        </div>
                        <div class="text item">
                            <span>老顾客</span>
                            <h3 style="float: right;">{{mainInfo.oldUser || 0}}</h3>
                        </div>
                    </el-card>
                    <el-card class="box-card2">
                        <div slot="header" class="clearfix">
                            <span class="card-head" style="line-height: 36px;">下单</span>
                        </div>
                        <div class="text item">
                            <span>加入购物车</span>
                            <h3 style="float: right;">{{mainInfo.addCart || 0}}</h3>
                        </div>
                        <div class="text item">
                            <span>提交订单数/金额</span>
                            <h3 style="float: right;">{{mainInfo.addOrderNum || 0}} / {{mainInfo.addOrderSum || 0}}</h3>
                        </div>
                    </el-card>
                    <el-card class="box-card2">
                        <div slot="header" class="clearfix">
                            <span class="card-head" style="line-height: 36px;">支付</span>
                        </div>
                        <div class="text item">
                            <span>成交订单数</span>
                            <h3 style="float: right;">{{mainInfo.payOrderNum || 0}}</h3>
                        </div>
                        <div class="text item">
                            <span>成交金额</span>
                            <h3 style="float: right;">{{mainInfo.payOrderSum || 0}}</h3>
                        </div>
                    </el-card>
                </div>
                <div class="line clearfix"></div>
                <div class="block-4">
                    <el-card class="box-card">
                        <div class="text item">
                            <span>客单价</span>
                            <p style="float: right;">{{ ratio(mainInfo.payOrderSum, mainInfo.payOrderNum) | moneyFilter }}</p>
                        </div>
                        <p class="tips">成交金额/成交订单数</p>
                    </el-card>
                    <el-card class="box-card">
                        <div class="text item">
                            <span>下单转化率</span>
                            <p style="float: right;">
                                {{ ratio(mainInfo.addOrderNum, visitorNum) | percentFilter }}</p>
                        </div>
                        <p class="tips">下单人数/访问人数</p>
                    </el-card>
                    <el-card class="box-card">
                        <div class="text item">
                            <span>下单-支付转化率</span>
                            <p style="float: right;">{{ ratio(mainInfo.payOrderNum, mainInfo.addOrderNum) | percentFilter }}</p>
                        </div>
                        <p class="tips">支付人数/下单人数</p>
                    </el-card>
                    <el-card class="box-card">
                        <div class="text item">
                            <span>支付转化率</span>
                            <p style="float: right;">
                                {{ ratio(mainInfo.payOrderNum, visitorNum) | percentFilter }}</p>
                        </div>
                        <p class="tips">支付人数/访问人数</p>
                    </el-card>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                infoData: {},
                activeName2: 'first',
                userTab:'first',
                mainInfo: {},
                loginInfo: null,
                username: '',
                label:'',
                userData:[],
                newData:[],
                oldData:[],
                related_pop:false,

            }
        },
        methods: {
            // 安全除法：分母为 0 或数据未返回时返回 0，避免页面出现 NaN / Infinity
            ratio(a, b) {
                const x = Number(a), y = Number(b);
                if (!isFinite(x) || !isFinite(y) || y === 0) return 0;
                return x / y;
            },
            seeClick(){
                this.userData = this.userTab === 'first' ? this.newData : this.oldData;
            },
            getInfo() {
                this.axios.get('index').then((response) => {
                    this.infoData = (response.data && response.data.data) || {};
                }).catch(() => {
                    this.$message.error('首页统计数据加载失败，请检查后端服务是否启动');
                })
            },
            handleClick(tab, event) {
                this.related_pop = false;
                this.userTab = 'first';
                console.log(tab._data.index);
                let pindex = tab._data.index;
                console.log('pindex:' + pindex);
                this.getMainInfo(pindex);
            },
            userTabClick(tab, event){
                let pindex = tab._data.index;
                console.log(pindex);
                if(pindex == 0){
                    this.userData = this.newData;
                    console.log(this.userData);
                }
                else{
                    this.userData = this.oldData;
                    console.log(this.userData);
                }
            },
            getMainInfo(index) {
                this.axios.get('index/main', {
                    params: {
                        pindex: index
                    }
                }).then((response) => {
                    const data = (response.data && response.data.data) || {};
                    this.mainInfo = data;
                    this.newData = data.newData || [];
                    this.oldData = data.oldData || [];
                    this.userData = this.newData;
                }).catch(() => {
                    this.mainInfo = {};
                })
            },
        },
        computed: {
            greeting() {
                const h = new Date().getHours();
                return h < 11 ? '早上好' : h < 14 ? '中午好' : h < 18 ? '下午好' : '晚上好';
            },
            today() {
                return new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
            },
            // 访问人数 = 新增顾客 + 老顾客
            visitorNum() {
                return Number(this.mainInfo.newUser || 0) + Number(this.mainInfo.oldUser || 0);
            }
        },
        mounted() {
            this.getInfo();
            this.getMainInfo(0);
            if(!this.loginInfo){
                this.loginInfo = JSON.parse(window.localStorage.getItem('userInfo') || null);
                this.username = (this.loginInfo && this.loginInfo.username) || '';
            }
        },

        filters: {
            numFilter(value) {
                const v = Number(value);
                return isFinite(v) ? Number(v.toFixed(2)) : 0;
            },
            moneyFilter(value) {
                const v = Number(value);
                return '¥' + (isFinite(v) ? v.toFixed(2) : '0.00');
            },
            percentFilter(value) {
                const v = Number(value);
                return (isFinite(v) ? (v * 100).toFixed(2) : '0.00') + '%';
            }
        }
    }
</script>

<style scoped>
    /* 首页横幅：宣纸底青绿山水长卷，左侧留白写问候语 */
    .hero {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 132px;
        padding: 0 32px;
        margin: -4px -6px 24px;
        overflow: hidden;
        border: 1px solid #e3d6bf;
        border-radius: 4px;
        background:
            linear-gradient(90deg, rgba(250, 244, 230, 0.96) 0%, rgba(250, 244, 230, 0.82) 34%, rgba(250, 244, 230, 0.15) 70%, rgba(250, 244, 230, 0.05) 100%),
            url("~@/assets/images/banner-mountains.webp") right 62% / cover no-repeat,
            #f5ecd8;
        box-shadow: inset 0 0 0 4px rgba(255, 253, 248, 0.55), inset 0 0 0 5px rgba(201, 164, 92, 0.28);
    }
    /* 底部回纹金带 */
    .hero::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 6px;
        height: 10px;
        opacity: 0.5;
        background: var(--huiwen) left top / 16px 10px repeat-x;
        -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 40%, transparent 75%);
        mask-image: linear-gradient(90deg, #000 0%, #000 40%, transparent 75%);
    }
    .hero-text {
        position: relative;
        z-index: 1;
    }
    .hero h2 {
        margin: 0 0 10px;
        font-family: var(--font-brush);
        font-size: 32px;
        font-weight: normal;
        letter-spacing: 4px;
        color: #2a2522;
    }
    .hero p {
        margin: 0;
        font-family: var(--font-title);
        font-size: 14px;
        letter-spacing: 3px;
        color: #7a6a58;
    }
    .hero-date {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 10px;
        align-self: flex-start;
        margin-top: 20px;
        padding: 6px 14px 6px 8px;
        font-size: 13px;
        letter-spacing: 1px;
        color: #3d352f;
        background: rgba(255, 253, 248, 0.82);
        border: 1px solid rgba(201, 164, 92, 0.45);
        border-radius: 3px;
        -webkit-backdrop-filter: blur(4px);
        backdrop-filter: blur(4px);
    }
    .hero-date-seal {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        font-family: var(--font-brush);
        font-size: 15px;
        color: #fff6e6;
        background: linear-gradient(135deg, #c9483a, #962c23);
        border-radius: 2px;
    }

    /* 三张统计卡：顶部色带 + 角花 + 细金线内框 */
    .header {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-bottom: 26px;
    }
    .header .box-card {
        width: auto;
        float: none;
        margin: 0;
    }
    .box-card.stat-card {
        position: relative;
        overflow: hidden;
        border-color: #e3d6bf;
        background:
            var(--corner-bl) left 5px bottom 5px / 16px 16px no-repeat,
            var(--corner-br) right 5px bottom 5px / 16px 16px no-repeat,
            radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--c) 9%, transparent), transparent 60%),
            linear-gradient(180deg, #fffdf8, #fffaf1);
        box-shadow: inset 0 0 0 3px #fffdf8, inset 0 0 0 4px rgba(201, 164, 92, 0.18), 0 1px 2px rgba(80, 60, 30, 0.05);
    }
    .box-card.stat-card:hover {
        transform: translateY(-3px);
        box-shadow: inset 0 0 0 3px #fffdf8, inset 0 0 0 4px rgba(201, 164, 92, 0.32), 0 14px 26px -14px rgba(80, 60, 30, 0.35);
    }
    .box-card.stat-card::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--c), color-mix(in srgb, var(--c) 30%, #e8cf94));
    }
    /* 右上角回纹方印（装饰） */
    .box-card.stat-card::after {
        content: '';
        position: absolute;
        right: 18px;
        top: 22px;
        width: 46px;
        height: 46px;
        opacity: 0.12;
        border: 6px solid var(--c);
        border-left-color: transparent;
        box-sizing: border-box;
        box-shadow: inset 0 0 0 6px #fffdf8, inset 0 0 0 12px var(--c);
        transition: opacity 0.25s ease, transform 0.4s ease;
    }
    .box-card.stat-card:hover::after {
        opacity: 0.22;
        transform: rotate(90deg);
    }
    .box-card.stat-card .link-color {
        display: block;
        color: #2a2522;
    }
    .stat-title {
        font-family: var(--font-title);
        font-size: 17px;
        letter-spacing: 2px;
        padding-bottom: 12px;
        color: #5c534c;
    }
    .stat-num {
        font-family: var(--font-num);
        font-size: 38px;
        font-weight: 600;
        line-height: 1.1;
        margin: 6px 0 18px;
        color: var(--c);
    }
    .stat-foot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        letter-spacing: 1px;
        color: #8f857b;
        padding-top: 12px;
        border-top: 1px dashed #e6dccb;
        transition: color 0.2s;
    }
    .box-card.stat-card:hover .stat-foot {
        color: var(--c);
    }
    .box-card2 h3,
    .block-4 .item p {
        font-family: var(--font-num);
        font-size: 20px;
        font-weight: 600;
        color: #b83a2f;
    }
    /* 四个转化率指标排成一行 */
    .block-4 {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
    }
    .block-4 .box-card {
        width: auto;
        float: none;
        margin: 0;
        background:
            var(--corner-tl) left 4px top 4px / 14px 14px no-repeat,
            var(--corner-br) right 4px bottom 4px / 14px 14px no-repeat,
            linear-gradient(180deg, #fffdf8, #fcf7ee);
    }
    .block-4 .box-card:hover {
        transform: translateY(-2px);
    }
    .block-4 .item span {
        font-family: var(--font-title);
        font-size: 15px;
        letter-spacing: 1px;
        color: #4a423c;
    }
    /* 顾客 / 下单 / 支付 三栏 */
    .tab-content {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-bottom: 20px;
    }
    .tab-content .box-card2 {
        width: auto;
        float: none;
        margin: 0;
    }
    .box-card2 .card-head {
        font-family: var(--font-title);
        font-size: 18px;
        letter-spacing: 3px;
        color: #2a2522;
    }
    .box-card2 .card-head::before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        margin: 0 12px 0 3px;
        vertical-align: 2px;
        border-radius: 1px;
        transform: rotate(45deg);
        background: linear-gradient(135deg, #cf4b3d, #962c23);
        box-shadow: 0 0 0 2px #fffdf8, 0 0 0 3px rgba(184, 58, 47, 0.35);
    }
    .box-card2 .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px dashed #efe6d6;
    }
    .box-card2 .item:last-child {
        border-bottom: none;
    }
    .box-card2 .item h3 {
        float: none !important;
        margin: 0;
    }
    .box-card2 .item span {
        color: #5c534c;
    }
    .main .o-tab {
        margin-bottom: 4px;
    }

    .float-right {
        float: right;
    }
    .tips {
        color: #a39a8f;
        font-size: 12px;
        letter-spacing: 1px;
    }

    .text {
        font-size: 14px;
    }

    .item {
        padding: 10px 0;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both;
    }
    /* 这两个容器改成了 grid 布局，清浮动用的伪元素会占掉一个格子，需要去掉 */
    .header.clearfix:before,
    .header.clearfix:after,
    .tab-content.clearfix:before,
    .tab-content.clearfix:after {
        display: none;
    }

    .line {
        margin: 24px 0;
        height: 10px;
        border: none;
        opacity: 0.4;
        background: var(--huiwen) left top / 16px 10px repeat-x;
        -webkit-mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
        mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
    }

    @media (max-width: 1200px) {
        .block-4 {
            grid-template-columns: repeat(2, 1fr);
        }
        .hero-date {
            display: none;
        }
    }
</style>
