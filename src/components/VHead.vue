<style>
    .vhead {

    }


</style>
<template>
    <div class="vhead navbar navbar-default navbar-static-top" role="navigation">
        <!-- .container-fluid -->
        <div class="container-fluid">
            <!-- head logo -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/index.html" style="padding: 10px;">
                    <img src="/img/lumiai-logo.png" alt="lumiai-logo" style="height: 30px;"/>
                </a>
            </div>
            <!-- /head logo -->
            <!-- head collapse -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <!-- head link -->
                <ul class="nav navbar-nav">
                    <li :class="{'active': $route.path =='/comments'}"><a v-link="{path:'/comments'}">消息</a></li>
                    <li><a href="#">页面</a></li>
                    <li><a href="#">城市</a></li>
                    <li><a href="#">影院</a></li>
                    <li><a href="#">影院特色</a></li>
                    <li><a href="#">充值</a></li>
                    <li><a href="#">电影票</a></li>
                    <li><a href="#">优惠券</a></li>
                    <li :class="{'active': $route.path =='/users'}"><a v-link="{path:'/users'}">管理员</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                           aria-expanded="false">Dropdown <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">Separated link</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">One more separated link</a></li>
                        </ul>
                    </li>
                </ul>
                <!-- /head link-->
                <!-- head searchbox -->
                <form class="navbar-form navbar-left" role="search">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search"/>
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                </form>
                <!-- /head searchbox -->
                <!-- user dropbox -->
                <ul class="user-box nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                           aria-expanded="false">用户中心 <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                        </ul>
                    </li>
                </ul>
                <!-- /user dropbox -->
            </div>
            <!-- /head collapse-->
        </div>
        <!-- /.container-fluid -->
    </div>
</template>
<script>

</script>