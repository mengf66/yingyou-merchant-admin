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
                <div class="hero-date">{{ today }}</div>
            </div>
            <div class="header clearfix">
                <el-card class="box-card stat-card" shadow="hover" style="--c: #b83a2f">
                    <router-link class="link-color" :to="{ path: '/dashboard/order' }">
                        <div class="stat-title">待发货订单</div>
                        <h1 class="stat-num">{{infoData.orderToDelivery || 0}}</h1>
                        <div class="stat-foot"><span>待发货订单</span><span>{{infoData.orderToDelivery || 0}}</span></div>
                    </router-link>
                </el-card>
                <el-card class="box-card stat-card" shadow="hover" style="--c: #3f7a5f">
                    <router-link class="link-color" :to="{ path: '/dashboard/goods' }">
                        <div class="stat-title">上架中的商品</div>
                        <h1 class="stat-num">{{infoData.goodsOnsale || 0}}</h1>
                        <div class="stat-foot"><span>上架中的商品</span><span>{{infoData.goodsOnsale || 0}}</span></div>
                    </router-link>
                </el-card>
                <el-card class="box-card stat-card" shadow="hover" style="--c: #a88340">
                    <router-link class="link-color" :to="{ path: '/dashboard/user' }">
                        <div class="stat-title">总用户数</div>
                        <h1 class="stat-num">{{infoData.user || 0}}</h1>
                        <div class="stat-foot"><span>总用户数</span><span>{{infoData.user || 0}}</span></div>
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
    .hero {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 96px;
        padding: 0 28px;
        margin-bottom: 20px;
        overflow: hidden;
        color: #f0d9a2;
        border-radius: 6px;
        background:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 96' preserveAspectRatio='xMaxYMax slice'%3E%3Cg fill='%23c9a45c' opacity='.18'%3E%3Cpath d='M300 96 V70 H600 V96Z'/%3E%3Cpath d='M380 70 L400 52 H520 L540 70Z'/%3E%3Crect x='410' y='40' width='100' height='14'/%3E%3Cpath d='M396 42 L420 26 H500 L524 42Z'/%3E%3Crect x='456' y='14' width='8' height='14'/%3E%3C/g%3E%3C/svg%3E") right bottom / auto 100% no-repeat,
            linear-gradient(120deg, #2b3a4a 0%, #1f2b37 60%, #3a2a24 100%);
    }
    .hero h2 {
        margin: 0 0 6px;
        font-family: 'STXingkai', 'STKaiti', 'KaiTi', serif;
        font-size: 26px;
        font-weight: normal;
        letter-spacing: 3px;
    }
    .hero p {
        margin: 0;
        font-size: 13px;
        letter-spacing: 2px;
        color: rgba(233, 223, 200, 0.65);
    }
    .hero-date {
        position: relative;
        z-index: 1;
        font-size: 13px;
        color: rgba(233, 223, 200, 0.8);
    }
    .box-card.stat-card {
        position: relative;
        overflow: hidden;
        border-color: #e6dccb;
    }
    .box-card.stat-card::before {
        content: '';
        position: absolute;
        left: 0;
        top: 18px;
        bottom: 18px;
        width: 3px;
        border-radius: 0 2px 2px 0;
        background: var(--c);
    }
    .box-card.stat-card::after {
        content: '';
        position: absolute;
        right: 16px;
        bottom: 16px;
        width: 48px;
        height: 48px;
        opacity: 0.1;
        border: 6px solid var(--c);
        border-left-color: transparent;
        box-sizing: border-box;
        box-shadow: inset 0 0 0 6px #fffdf8, inset 0 0 0 12px var(--c);
    }
    .box-card.stat-card .link-color{
        display: block;
        color: #2a2522;
    }
    .stat-title{
        font-size: 15px;
        font-weight: 600;
        padding-bottom: 14px;
        border-bottom: 1px dashed #e6dccb;
        color: #5c534c;
    }
    .stat-num{
        font-family: 'DIN Alternate', 'Bahnschrift', 'Helvetica Neue', Arial, sans-serif;
        font-size: 34px;
        margin: 20px 0;
        color: var(--c);
    }
    .stat-foot{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #8f857b;
        padding-top: 12px;
        border-top: 1px dashed #e6dccb;
    }
    .box-card2 h3,
    .block-4 .item p {
        font-family: 'DIN Alternate', 'Bahnschrift', 'Helvetica Neue', Arial, sans-serif;
        font-size: 18px;
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
    }
    .box-card2 .card-head {
        font-family: 'STKaiti', 'KaiTi', serif;
        font-size: 17px;
        letter-spacing: 2px;
        color: #2a2522;
    }
    .box-card2 .card-head::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 15px;
        margin-right: 8px;
        vertical-align: -2px;
        border-radius: 1px;
        background: #b83a2f;
    }

    .float-right{
        float:right;
    }
    .tips {
        color: #a39a8f;
        font-size: 13px;
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
        clear: both
    }
    .tab-content{
        margin-bottom: 20px;
    }
    .box-card {
        width: 32%;
        float: left;
        margin:0 20px 14px 0;
    }

    .box-card:last-child {
        margin-right: 0px;
    }


    .box-card .link-color{
        color: #fff;
    }

    .box-card:last-child {
        margin-right: 0;
    }

    .box-card2 {
        width: 32%;
        float: left;
        margin-right: 17px;
    }

    .box-card2:last-child {
        margin-right: 0;
    }

    .header {
        margin-bottom: 30px;
    }

    .line {
        margin: 20px 0;
        border-top: 1px dashed #e0d3bb;
    }

    .card-red {
        background: #e64242;
        border: none;
        color: #fff;
    }

    .card-blue {
        background: #4db3ff;
        border: none;
        color: #fff;
    }
    .card-green{
        background: #11b95c;
        border:none;
        color: #fff;
    }
    .card-black{
        background: #1f2d3d;
        border:none;
        color: #fff;
    }
    .card-gray{
        background: #d1dbe5;
        border:none;

    }
    .card-gray a{
        color: #1f2d3d;
    }
    .card-yellow{
        background: #f8dd66;
        border:none;
        color: #111111;
    }

     .card-yellow .link-color{
        color: #111111;
    }



</style>
