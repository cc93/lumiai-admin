/**
 * Created by congcong on 16/8/23.
 */

var UserBox = React.createClass({
    getInitialState: function () {
        return {
            user: {}
        }
    },
    logOut: function () {
        $.ajax({
            type: "GET",
            url: 'http://127.0.0.1:3000/lumiai-admin/api/logout',
            //dataType: 'json',
            xhrFields: {
                withCredentials: true   //支持跨域发送cookies
            },
            crossDomain: true,
            success: function (data) {
                //清空用户信息
                this.setState({
                    user: {}
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('xhr = ' + JSON.stringify(xhr), 'status = ' + status, 'err = ' + JSON.stringify(err));
            }.bind(this)
        });
    },
    componentDidMount: function () {
        //request the user
        $.ajax({
            type: "GET",
            url: 'http://127.0.0.1:3000/lumiai-admin',
            //dataType: 'json',
            xhrFields: {
                withCredentials: true   //支持跨域发送cookies
            },
            crossDomain: true,
            success: function (data) {
                //获取当前用户信息
                if (data.user) {
                    this.setState({
                        user: data.user
                    });
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('xhr = ' + JSON.stringify(xhr), 'status = ' + status, 'err = ' + JSON.stringify(err));
            }.bind(this)
        });
    },
    render: function () {
        return (
            <ul className="user-box nav navbar-nav navbar-right">
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                       aria-expanded="false">用户中心 <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                        <li><a href="#">{this.state.user ? ('欢迎您:' + this.state.user.username) : '请登陆'}</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" className="divider"></li>
                        <li><a href="#" onClick={this.logOut}>注销</a></li>
                    </ul>
                </li>
            </ul>
        )
    }
});
var HeadLogo = React.createClass({
    render: function () {
        return (
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                </button>
                <a className="navbar-brand" href="index.html" style={{padding:'10px'}}>
                    <img src="img/lumiai-logo.png" alt="lumiai-logo" style={{height:'30px'}}/>
                </a>
            </div>
        );
    }
});

var HeadLink = React.createClass({
    render: function () {
        return (
            <ul className="nav navbar-nav">
                <li className="active"><a href="#">消息 <span className="sr-only">(current)</span></a></li>
                <li><a href="#">页面</a></li>
                <li><a href="#">城市</a></li>
                <li><a href="#">影院</a></li>
                <li><a href="#">影院特色</a></li>
                <li><a href="#">充值</a></li>
                <li><a href="#">电影票</a></li>
                <li><a href="#">优惠券</a></li>
                <li><a href="#">用户管理</a></li>
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                       aria-expanded="false">Dropdown <span className="caret"/></a>
                    <ul className="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" className="divider"/>
                        <li><a href="#">Separated link</a></li>
                        <li role="separator" className="divider"/>
                        <li><a href="#">One more separated link</a></li>
                    </ul>
                </li>
            </ul>
        );
    }
});

var HeadSearchBox = React.createClass({
    render: function () {
        return (
            <form className="navbar-form navbar-left" role="search">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search"/>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
        );
    }
});

var HeadCollapse = React.createClass({
    render: function () {
        return (
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <HeadLink/>
                <HeadSearchBox/>
                <UserBox/>
            </div>
        );
    }
});

var Head = React.createClass({
    render: function () {
        return (
            <div className="navbar navbar-default navbar-static-top" role="navigation">
                <div className="container-fluid">
                    <HeadLogo/>
                    <HeadCollapse/>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <Head />,
    document.getElementById('head')
);