import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Login from '../../components/Login/login.jsx';
import MenuList from '../../components/List/list.jsx';
import UseMenu from '../../components/UseMenu/UseMenu.jsx';
import {getCookie,removeCookies} from  '../../util/cookie';
import { postData } from '../../fetch/postData';
import {api} from '../../util/common';
import { hashHistory } from 'react-router';

import './left.less';

class Left extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            isLogin:false,
            username:'',
            accountType:getCookie('accountType')
        };
    }
    render() {
        return (
            <div className="left">
                {
                    this.state.isLogin
                    ? <div className="user clearfix">
                        <span className="fl">{this.state.username}</span>
                        <b className="fl" onClick={this.logout.bind(this)}>注销</b>
                    </div>
                    :  <h2 className="title">登录</h2>
                }
                {
                    this.state.isLogin
                    ? this.state.accountType==1
                        ?<MenuList/>
                        :<UseMenu/>
                    : <Login handleLogin={this.handleLogin.bind(this)}/>
                }
            </div>
        )
    }
    handleLogin(isLogin,username,accountType){
        if(isLogin){
            this.setState({
                isLogin:true,
                username:username,
                accountType:accountType
            });
        }else{
            this.setState({
                isLogin:false,
                username:'',
                accountType:1
            });
        }
    }
    logout(){
        this.setState({
            isLogin:false,
            username:''
        },()=>{
            hashHistory.push('/');
        });
        removeCookies(['username','accountType','accountCode','loginName']);
    }
    componentWillMount(){
        let username= getCookie('username');
        let accountType= getCookie('accountType');
        if(username==null||username==''){
        }else{
            this.setState({
                isLogin:true,
                username:username,
                accountType:accountType
            });
        }
    }
}
export default Left;
