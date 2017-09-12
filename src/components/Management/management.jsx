import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import News from '../../containers/News'
import { postData } from '../../fetch/postData';
import {getCookie} from  '../../util/cookie';
import { hashHistory } from 'react-router';
import {api} from '../../util/common';
import { Modal, Button } from 'antd';
const confirm = Modal.confirm;

class Manage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            themes:[],
            currentPage:0,
            pageSize:10,
            total:0
        };
    }

    render() {
        return (
            <News total={this.state.total} show={true} list={this.state.themes} handeDel={this.handeDel.bind(this)} papeChange={this.papeChange.bind(this)} current={this.state.currentPage+1}/>
        )
    }
    componentWillMount(){
        if(getCookie('accountType')!=1){
            hashHistory.push('/');
        }
    }
    componentDidMount(){
        this.getList();
    }
    papeChange(page){
        this.setState({
            currentPage:page-1
        },()=>{
            this.getList();
        });
    }
    handeDel(themeCode){
        let _this=this;
        confirm({
            title: '提示',
            content: '确定要删除吗?',
            onOk() {
                let data={
                    themeCode:themeCode
                };
                postData(api+'/dhy/theme/deleteTheme',data,(result)=>{
                    _this.getList();
                });
            },
            okType: 'danger'
        });
    }
    getList(){
        let {
            currentPage,
            pageSize
            }=this.state;
        let data={
            type:11,
            currentPage:currentPage,
            pageSize:pageSize
        };
        postData(api+'/dhy/theme/list',data,(result)=>{
            let themes=result.themes;
            this.setState({
                themes:themes,
                total:result.total
            });
            console.log(result)
        });
    }
}
export default Manage;