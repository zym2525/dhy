import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router';
import {api} from '../../util/common';
import { postData } from '../../fetch/postData';
import {setCookies,getCookie} from  '../../util/cookie';

import './login.less'
class Login extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            checked: false,
            isLogin:false,
            username:'',
            password:'',
            accountType:getCookie('accountType'),
        }
    }

    render() {
        return (
            <div className="login">
                <MuiThemeProvider>
                    <TextField
                        className="user"
                        hintText="Email"
                        floatingLabelText="用户名"
                        floatingLabelStyle={{
                            color:'#333',
                        }}
                        inputStyle={{
                            color:'#333',
                        }}
                        floatingLabelShrinkStyle={{
                            fontSize:'16px'
                        }}
                        underlineFocusStyle={{
                            borderColor:'#333'
                        }}
                        style={{
                            width:'100%'
                        }}
                        onChange={this.changUser.bind(this)}
                    />
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <TextField
                        className="user"
                        hintText="Password"
                        floatingLabelText="密码"
                        floatingLabelStyle={{
                            color:'#333',
                        }}
                        inputStyle={{
                            color:'#333',
                        }}
                        underlineFocusStyle={{
                            borderColor:'#333'
                        }}
                        style={{
                            width:'100%'
                        }}
                        type="password"
                        onChange={this.changPassword.bind(this)}
                    />
                </MuiThemeProvider>
                <div className="login-btn">
                    <MuiThemeProvider>
                        <Checkbox
                            label="记住我"
                            style={{
                                width:'100px',
                                'marginTop':'6px'
                            }}
                            labelStyle={{
                                'fontSize':'12px'
                            }}
                            iconStyle={{
                                fill:'#333'
                            }}
                            checked={this.state.checked}
                            onCheck={this.updateCheck.bind(this)}
                        />
                    </MuiThemeProvider>
                    <MuiThemeProvider>
                        <FlatButton
                            label="登录"
                            style={{
                                width:'auto',
                                'border':'1px solid #333',
                                'marginTop':'6px',
                                'lineHeight':'34px'
                            }}
                            onClick={this.loginFn.bind(this)}
                        />
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }
    updateCheck() {
        this.setState((oldState) => {
            return {
                checked: !oldState.checked,
            };
        });
    }
    loginFn(){
        let {
            username,
            password,
            checked
        }=this.state;
        if(username==''&&password==''){
            alert('请输入用户名密码！');
            return;
        }else if(username==''){
            alert('请输入用户名！');
            return;
        }else if(password==''){
            alert('请输入密码！');
            return;
        }
        let data={
            loginName:username,
            password:password
        };
        postData(api+'/dhy/user/login',data,(result)=>{
            this.setState((oldState)=>{
                if(result.accountType==1){
                    hashHistory.push('/annonce/create');
                }else{
                    hashHistory.push('/');
                }
                if(checked){
                    setCookies({
                        username:result.loginName,
                        accountType:result.accountType
                    });
                }
                setCookies({
                    accountCode:result.accountCode,
                    loginName:result.loginName,
                    accountType:result.accountType
                });
                return {
                    isLogin:true,
                    accountType:result.accountType
                };
            })
        });
    }
    changUser({target}){
        this.setState({
            username:target.value
        });
    }
    changPassword({target}){
        this.setState({
            password:target.value
        });
    }
    componentDidUpdate(){
        let {username,isLogin,accountType}=this.state;
        this.props.handleLogin(isLogin,username,accountType);
    }
}
export default Login
