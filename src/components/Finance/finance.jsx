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
import { Pagination,Modal,Table } from 'antd';
import {financeConfig} from '../../config/finance'


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
            pageSize:6
        };
    }

    render() {
        return (
            <div className="finance">
              <Table {...financeConfig} dataSource={this.state.feeList} />
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
            result.fees.map((x,i)=>{
              x.disabled=true;
              x.key=i;
            });
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
