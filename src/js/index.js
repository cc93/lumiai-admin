/**
 * Created by congcong on 16/8/11.
 */
if (!PRODUCTION) {
    require('raw!../../index.html');
    require('raw!../../css/index.css');
}

var TweetBox = React.createClass({
    getInitialState: function () {
        return {
            inputText: '',
            isPhotoAdded: false,
            user:''
        }
    },
    handleInputText: function (e) {
        this.setState({
            inputText: e.target.value
        });
    },
    handleSubmit: function (e) {
        var text = this.state.inputText;
        var author = this.state.isPhotoAdded;
        var time = new Date();
        $.ajax({
            type: "POST",
            url: this.props.url,
            dataType: 'json',
            data: {
                text: text,
                author: author,
                time: time
            },
            xhrFields: {
                withCredentials: true   //支持跨域发送cookies
            },
            crossDomain: true,
            success: function (data) {
                //提交成功以后清空输入
                this.setState({
                    inputText: '',
                    isPhotoAdded: false
                });
                //获取当前用户信息
                if(data.user){
                    this.setState({
                        user:data.user.username
                    });
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('xhr = ' + JSON.stringify(xhr), 'status = ' + status, 'err = ' + JSON.stringify(err));
            }.bind(this)
        });
    },
    togglePhotoAdded: function (e) {
        this.setState({
            isPhotoAdded: !this.state.isPhotoAdded
        });
    },
    remainingCharacters: function () {
        if (this.state.isPhotoAdded) {
            return 140 - this.state.inputText.length - 23;
        } else {
            return 140 - this.state.inputText.length;
        }
    },
    overflowAlert: function () {
        if (this.remainingCharacters() < 0) {
            var overflowText, beforeOverflow;
            if (this.state.isPhotoAdded) {
                overflowText = this.state.inputText.substring(141 - 23);
                beforeOverflow = this.state.inputText.substring(141 - 23 - 10, 141 - 23);
            } else {
                overflowText = this.state.inputText.substring(141);
                beforeOverflow = this.state.inputText.substring(141 - 10, 141);
            }
            return (
                <div className="alert alert-warning">
                    <strong>Oops! Too long:</strong>
                    &nbsp;...{beforeOverflow}
                    <strong className="bg-danger">{overflowText}</strong>
                </div>
            )
        } else {
            return '';
        }

    },
    render: function () {
        return (
            <div className="well clearfix">
                {this.overflowAlert()}
                <textarea className="form-control" onChange={this.handleInputText} value={this.state.inputText}>
                </textarea>
                <br />
                <button className="btn btn-default pull-right"
                        disabled={this.state.inputText.length === 0 && !this.state.isPhotoAdded}
                        onClick={this.handleSubmit}>
                    Tweet
                </button>
                <div className="pull-right"
                     style={{height:'34px',lineHeight:'34px',paddingRight:'16px'}}>
                    {this.remainingCharacters()}
                </div>
                <div className="current-user pull-right">user: {this.state.user}</div>
                <button className="btn btn-default pull-left"
                        onClick={this.togglePhotoAdded}>
                    {this.state.isPhotoAdded ? '✓ Photo Added' : 'Add Photo' }
                </button>
            </div>
        );
    }
});
var Comment = React.createClass({
    render: function () {
        return (
            <li className="comment list-group-item">
                <div className="comment-header clearfix">
                    <h4 className="comment-author list-group-item-heading pull-left">{this.props.author}</h4>
                    <span className="comment-time pull-right">{new Date(this.props.time).toLocaleString()}</span>
                </div>
                <p className="comment-text list-group-item-text">{this.props.text}</p>
            </li>
        );
    }
});

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment, index) {
            return (
                <Comment key={index} author={comment.author} text={comment.text} time={comment.time}> </Comment>
            )
        });
        return (
            <ul className="comment-list list-group">
                {commentNodes}
            </ul>
        );
    }
});

var CommentBox = React.createClass({
    getInitialState: function () {
        return {
            user:'',
            data: []
        }
    },
    requestComments: function () {
        $.ajax({
            type: "GET",
            url: this.props.url,
            dataType: 'json',
            xhrFields: {
                withCredentials: true   //支持跨域发送cookies
            },
            crossDomain: true,
            success: function (data) {
                this.setState({data: data.data,user:data.user});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('xhr = ' + JSON.stringify(xhr), 'status = ' + status, 'err = ' + JSON.stringify(err));
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.requestComments();
        setInterval(this.requestComments, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="comment-box">
                <TweetBox url="http://127.0.0.1:3000/lumiai-admin/api/comments"/>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="panel-title">COMMENTS user = {this.state.user.username}</div>
                    </div>
                    <CommentList data={this.state.data}/>
                </div>
            </div>
        )
    }
});
ReactDOM.render(
    <CommentBox url="http://127.0.0.1:3000/lumiai-admin/api/comments" pollInterval={20000}/>,
    document.getElementById('comment-box')
);