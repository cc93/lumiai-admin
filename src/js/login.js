/**
 * Created by congcong on 16/8/21.
 */
if (!PRODUCTION) {
    require('raw!../../login.html');
    require('raw!../../css/login.css');
}

var LoginBox = React.createClass({
    getInitialState: function(){
        return {
            errorInfo:''
        }
    },
    handleSubmit: function (e) {
        var username = this._username.value;
        var password = this._password.value;
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: this.props.url,
            dataType: 'json',
            data: {
                'username': username,
                'password': password
            },
            xhrFields: {
                withCredentials: true   //支持跨域发送cookies
            },
            crossDomain: true,
            success: function (data) {
                console.log('message = ' + data.description);
                switch (data.code) {
                    //登陆成功以后跳转页面
                    case 1:
                    {
                        this.setState({errorInfo:''});
                        location.href = 'index.html';
                        break;
                    }
                    //密码错误!
                    case 0:
                    {
                        this.setState({errorInfo:'您输入的用户名或密码不正确! 请重新输入'});
                        break;
                    }
                    //用户名不存在
                    case 2:
                    {
                        this.setState({errorInfo:'您输入的用户名不存在! 请重新输入'});
                        break;
                    }
                    default:
                        break;
                }

            }.bind(this),
            error: function (xhr, status, err) {
                console.error('xhr = ' + JSON.stringify(xhr), 'status = ' + status, 'err = ' + JSON.stringify(err));
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div className="login-box panel panel-info">
                <div className="panel-heading">
                    <div className="panel-title">登陆</div>
                </div>
                <div className="panel-body">
                    <div className="login-error-info">{this.state.errorInfo}</div>
                    <form onSubmit={this.handleSubmit} className="login-form">
                        <div className="form-group">
                            <input type="txt" className="form-control" placeholder="username"
                                   ref={(ref) => {this._username = ref;}}/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="password"
                                   ref={(ref) => {this._password = ref;}}/>
                        </div>
                        <div className="form-group">
                            <label>
                                <input type="checkbox"/>
                                &nbsp;remember for 7 days
                            </label>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="form-control"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
});
ReactDOM.render(
    <LoginBox url="http://127.0.0.1:3000/lumiai-admin/api/login"/>,
    document.getElementById('login-box')
);