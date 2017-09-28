import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {getLocalTime} from '../../util/common'
import {getCookie} from  '../../util/cookie';
import { hashHistory } from 'react-router';
import {api} from '../../util/common';
import { postData } from '../../fetch/postData';
import { Pagination,Modal } from 'antd';

import {textFieldStyle} from '../../config/style.js'
import './finance.less'
import '../../static/css/commonList.less'
class Finance extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            feeList:[],
            currentPage:0,
            pageSize:4
        };
    }

    render() {
        return (
            <div className="finance">
                <ul className="finance-title">
                    <li className="finance-big-cell">编号</li>
                    <li className="finance-big-cell">项目名</li>
                    <li className="finance-sm-cell time">发布时间</li>
                    <li className="finance-sm-cell">状态</li>
                </ul>
                <div className="finance-content">
                    {
                        this.state.feeList.map((item,index)=>
                            <div className="item-box" key={index}>
                                <ul className="item-title has-bottom">
                                    <li className="finance-big-cell">{item.id}</li>
                                    <li className="finance-big-cell">{item.projectName}</li>
                                    <li className="finance-sm-cell time">{getLocalTime(item.createTime)}</li>
                                    <li className="finance-sm-cell">{item.status==0?'待审核':'已审核'}</li>
                                </ul>
                                <ul className="item-content has-bottom">
                                    <li className="finance-big-cell">
                                        <span>经费总额:</span>
                                        <MuiThemeProvider>
                                            <TextField
                                                hintText="待设置*"
                                                floatingLabelStyle={textFieldStyle.floatingLabelStyle}
                                                inputStyle={textFieldStyle.inputStyle}
                                                floatingLabelShrinkStyle={textFieldStyle.floatingLabelShrinkStyle}
                                                style={textFieldStyle.style}
                                                underlineShow={false}
                                                value={item.incomeOne}
                                                disabled={item.disabled}
                                                onChange={this.handleInputChange.bind(this,index,'incomeOne')}
                                                type="number"
                                            />
                                        </MuiThemeProvider>
                                    </li>
                                    <li className="finance-big-cell">
                                        <span>剩余经费:</span>
                                        <MuiThemeProvider>
                                            <TextField
                                                hintText="待设置*"
                                                floatingLabelStyle={textFieldStyle.floatingLabelStyle}
                                                inputStyle={textFieldStyle.inputStyle}
                                                floatingLabelShrinkStyle={textFieldStyle.floatingLabelShrinkStyle}
                                                style={textFieldStyle.style}
                                                underlineShow={false}
                                                value={item.incomeTwo}
                                                disabled={item.disabled}
                                                type="number"
                                                onChange={this.handleInputChange.bind(this,index,'incomeTwo')}
                                            />
                                        </MuiThemeProvider>
                                    </li>
                                  {
                                    item.status==0&&
                                    <li className="finance-sm-cell">
                                      <MuiThemeProvider>
                                        <FlatButton
                                          label="编辑"
                                          style={{
                                                    width:'auto',
                                                     'border':'1px solid #333',
                                                    'marginTop':'6px',
                                                    'lineHeight':'34px'
                                                }}
                                          onClick={this.edit.bind(this,index)}
                                        />
                                      </MuiThemeProvider>
                                    </li>
                                  }
                                  {
                                    item.status==0&&
                                    <li className="finance-sm-cell">
                                      <MuiThemeProvider>
                                        <FlatButton
                                          label="保存"
                                          style={{
                                            width:'auto',
                                             'border':'1px solid #333',
                                            'marginTop':'6px',
                                            'lineHeight':'34px'
                                        }}
                                        onClick={this.save.bind(this,index)}
                                        />
                                      </MuiThemeProvider>
                                    </li>
                                  }
                                </ul>
                            </div>
                        )
                    }
                </div>
                {
                    this.state.feeList.length>0
                        ?<div className="pagination-wrapper">
                      <Pagination current={this.state.currentPage+1} total={this.state.total} pageSize={this.state.pageSize} onChange={this.handleChange.bind(this)}/>
                      </div>
                        :<div>没有你要的数据</div>
                }
            </div>
        )
    }
    componentDidMount(){
        if(getCookie('accountType')!=1){
            hashHistory.push('/');
            return;
        }
        this.getList();
    }
    handleChange(page){
        this.setState({
            currentPage:page-1
        },()=>{
            this.getList();
        });
    }
    getList(){
        let {
            currentPage,
            pageSize
            }=this.state;
        let data={
            supplyName:getCookie('loginName'),
            currentPage:currentPage,
            pageSize:pageSize
        };
        postData(api+'/dhy/fee/list',data,(result)=>{
            result.fees.map(x=>x.disabled=true);
            this.setState({
                feeList:result.fees,
                total:result.total
            });
            console.log(result.fees)
        });
    }
    edit(index){
      this.setState((oldState)=>{
        oldState.feeList[index].disabled=false;
        let newList=[...oldState.feeList];
        return {
          feeList:newList
        }
      });
    }
    handleInputChange(index,key,ev,value){
      if(value!=''){
        this.setState((oldState)=>{
          oldState.feeList[index][key]=value;
          let newList=[...oldState.feeList];
          return {
            feeList:newList
          }
        });
      }
    }
    save(index){
      let {feeList}=this.state;
      let fee=feeList[index];
      delete fee.disabled;
      postData(api+'/dhy/fee/updateFee',fee,(result)=>{

        let modal = Modal.success({
          title: '提示',
          content: '修改成功'
        });
        setTimeout(() => modal.destroy(), 800);
      });
    }
}
export default Finance;
