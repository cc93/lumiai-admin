/**
 * Created by congcong on 16/8/11.
 */
if (!PRODUCTION) {
    require('raw!../index.html');
    require('raw!../css/index.css');
}

var TweetBox = React.createClass({
    getInitialState: function(){
        return {
            inputText: '',
            isPhotoAdded: false
        }
    },
    handleInputText: function(e){
        this.setState({
            inputText: e.target.value
        });
    },
    togglePhotoAdded: function(e){
        this.setState({
            isPhotoAdded:!this.state.isPhotoAdded
        });
    },
    remainingCharacters:function(){
        if(this.state.isPhotoAdded){
            return 140 - this.state.inputText.length - 23;
        }else {
            return 140 - this.state.inputText.length;
        }
    },
    overflowAlert: function(){
        if(this.remainingCharacters() < 0){
            var overflowText,beforeOverflow;
            if(this.state.isPhotoAdded){
                overflowText =  this.state.inputText.substring(141-23);
                beforeOverflow = this.state.inputText.substring(141-23-10,141-23);
            }else{
                overflowText =  this.state.inputText.substring(141);
                beforeOverflow = this.state.inputText.substring(141-10,141);
            }
            return (
                <div className="alert alert-warning">
                    <strong>Oops! Too long:</strong>
                    &nbsp;...{beforeOverflow}
                    <strong className="bg-danger">{overflowText}</strong>
                </div>
            )
        }else{
            return '';
        }

    },
    render: function(){
        return (
            <div className="well clearfix">
                {this.overflowAlert()}
                <textarea className="form-control" onChange={this.handleInputText} value={this.state.inputText}>
                </textarea>
                <br />
                <button className="btn btn-default pull-right" disabled={this.state.inputText.length === 0 && !this.state.isPhotoAdded}>Tweet</button>
                <div className="pull-right" style={{height:'34px',lineHeight:'34px',paddingRight:'16px'}}>{this.remainingCharacters()}</div>
                <button className="btn btn-default pull-left" onClick={this.togglePhotoAdded}>{this.state.isPhotoAdded? '✓ Photo Added':'Add Photo' }</button>
            </div>
        )
    }
});

ReactDOM.render(
    <TweetBox />,
    document.getElementById('tweet-box')
);