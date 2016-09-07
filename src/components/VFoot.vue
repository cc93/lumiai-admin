<style>
    .foot {
        width: 100%;
        background-color: #fff;
        font-size: 12px;
        box-shadow: 0 0 0 1px #fff, 0 0 0 2px #ddd, 0 0 5px 3px #eee;
        border-bottom: 1px solid #eee;
    }

    .foot-wrapper {
        width: 1177px;
        margin: 0 auto;

    }

    .foot-p1 {
        width: 880px;
        margin: 0 auto;
        padding: 16px 0;
    }

    .foot-p1 li {
        float: left;
        width: 220px;
        font-weight: normal;
        line-height: 24px;
        color: #232323;
    }

    .foot-p1 span {
        cursor: pointer;
    }

    .foot-p1 a:hover, span:hover {
        color: #F75B1C;
    }

    .foot-p1 > ul > li {
        font-weight: bold;
        color: black;
    }

    .foot-p2 {
        clear: both;
        text-align: center;
        padding: 16px 0;
    }

    .foot-p2 li {
        display: inline-block;
    }

    .foot-p2 span {
        cursor: pointer;
    }

    .foot-p2 span:hover {
        color: #F75B1C;
    }

</style>
<template>
    <div class="foot">
        <div class="foot-wrapper">
            <div class="foot-p1">
                <ul>
                    <li>新手上路
                        <ul>
                            <li><a href="http://www.lumiai.com/Services/app" target="_blank">APP下载</a></li>
                            <li><span @click="showLoginOrRegister()">注册与登陆</span></li>
                        </ul>
                    </li>
                    <li>购票指南
                        <ul>
                            <li>会员网络购票条款与隐私政策</li>
                            <li>如何快速购票</li>
                            <li>观影须知</li>
                        </ul>
                    </li>
                    <li>影城介绍
                        <ul>
                            <li><span v-link="{path:'/cinemas'}" @click="delayEaseScrollTo(0)">品牌影厅</span></li>
                            <li><span v-link="{path:'/cinemas'}" @click="delayEaseScrollTo(711)">影城列表</span></li>
                        </ul>
                    </li>
                    <li>在线帮助
                        <ul>
                            <li><span v-link="{path:'/help'}" @click="delayEaseScrollTo(0)">帮助中心</span></li>
                            <li><span v-link="{path:'/help'}" @click="delayEaseScrollTo(0)">联系客服</span></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="foot-p2">
                <ul class="foot-p2-l1">
                    <li><span>招聘信息</span> |</li>
                    <li><span v-link="{path:'/contact'}" @click="delayEaseScrollTo(0)">联系我们</span> |</li>
                    <li><span>创始人介绍</span> |</li>
                    <li><span>企业宗旨</span> |</li>
                    <li><span v-link="{path:'/about'}" @click="delayEaseScrollTo(0)">关于卢米埃</span></li>
                </ul>
                <ul class="foot-p2-l2">
                    <li><span>Recruitment</span> |</li>
                    <li><span v-link="{path:'/contact'}" @click="delayEaseScrollTo(0)">Contact</span> |</li>
                    <li><span>Founders</span> |</li>
                    <li><span>Tenet</span> |</li>
                    <li><span v-link="{path:'/about'}" @click="delayEaseScrollTo(0)">About</span></li>
                </ul>
                <div class="footer-p2-l3">北京卢米埃时代电影院线有限公司 &copy;1999-2013 版权所有 京ICP备 13046287号-1</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props: {account: null, login: null},
        methods: {
            showLoginOrRegister: function () {
                var me = this;
                setTimeout(function () {
                    me.easeScrollTo(0, 400);
                }, 200);
                setTimeout(function () {
                    if (!me.account) {
                        me.login.showLogin();
                    } else {
                        me.login.showProfile();
                    }
                }, 500);
            },
            delayEaseScrollTo: function(y){
                setTimeout(function () {
                    this.easeScrollTo(y, 400);
                }.bind(this), 100);
            },
            easeScrollTo: function (y, duration) {
                var easeInOut = function (t, b, c, d) {
                    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                    return -c / 2 * ((--t) * (t - 2) - 1) + b;
                };
                var b = document.body.scrollTop || document.documentElement.scrollTop;
                var c = y - b;
                var d = Math.ceil(duration / 10);   // t++/10ms, d=100 -> 1s, duration (ms) = 10 * d (ms);
                var t = 0;
                var intervalId = setInterval(function () {
                    if (t < d) {
                        document.body.scrollTop = Math.ceil(easeInOut(t, b, c, d));
                        document.documentElement.scrollTop = Math.ceil(easeInOut(t, b, c, d));
                        t++;
                    } else {
                        clearInterval(intervalId);
                    }
                }, 10);
            }
        }
    }
</script>