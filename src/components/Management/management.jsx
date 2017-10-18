import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import News from '../../containers/News'
import { postData } from '../../fetch/postData';
import {getCookie} from  '../../util/cookie';
import { hashHistory } from 'react-router';
import {api} from '../../util/common';
import { Modal, Button ,Tabs} from 'antd';
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;

class Manage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            themes:[],
            currentPage:0,
            pageSize:10,
            total:0,
            newsType:'0'
        };
    }

    render() {
        return (
          <div>
            <Tabs activeKey={this.state.newsType} onChange={this.tab.bind(this)}>
              <TabPane tab="通知公告" key="0"/>
              <TabPane tab="管理制度" key="1"/>
            </Tabs>
            <News total={this.state.total} show={true} list={this.state.themes} handeDel={this.handeDel.bind(this)} papeChange={this.papeChange.bind(this)} current={this.state.currentPage+1}/>
          </div>
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
    tab(key){
      this.setState({
        currentPage:0,
        newsType:key
      },()=>{
        this.getList();
      });
    }
    getList(){
        let {
            currentPage,
            pageSize,
            newsType
            }=this.state;
        let data={
            type:newsType,
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
