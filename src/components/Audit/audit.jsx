import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import '../../static/css/commonList.less'
import { Pagination,Tabs } from 'antd';
import '../../static/css/commonList.less'
import {getCookie} from  '../../util/cookie';
import {api,getLocalTime} from '../../util/common';
import { postData } from '../../fetch/postData';
import { hashHistory } from 'react-router';
const TabPane = Tabs.TabPane;

import './audit.less';
const arrFormAdd=['application','record','open'];
const arrFormData=['applications','records','opens'];
const arrStatus=['未审核','通过','未通过'];
const arrTypeCode=['applicationCode','recordCode','openCode'];

class Audit extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            currentPage:0,
            pageSize:10,
            applicationList:[],
            total:0,
            newsType:'0'
        };
    }

    render() {
        return (
            <div>
                <Tabs activeKey={this.state.newsType} onChange={this.tab.bind(this)}>
                  <TabPane tab="申请表" key="0"/>
                  <TabPane tab="备案表" key="1"/>
                  <TabPane tab="开班表" key="2"/>
                </Tabs>
                <dl className="news audit">
                    <dt>
                        <div className="new-left">编号</div>
                        <div className="new-mid">项目名</div>
                        <div className="new-right">发布时间</div>
                        <div className="proposer">申请人</div>
                        <div className="status">状态</div>
                    </dt>
                    {
                        this.state.applicationList.map((item,index)=>
                            <dd key={index}>
                                <div className="new-left">{item.id}</div>
                                <div className="new-mid" onClick={this.handeClick.bind(this,item[arrTypeCode[this.state.newsType]])}>{item.projectName}</div>
                                <div className="new-right">{getLocalTime(item.createTime)}</div>
                                <div className="proposer">{item.supplyName}</div>
                                <div className="status">{arrStatus[item.status]}</div>
                            </dd>
                        )
                    }
                </dl>
                {
                    this.state.applicationList.length>0
                    ? <div className="pagination-wrapper">
                        <Pagination current={this.state.currentPage+1} total={this.state.total} pageSize={this.state.pageSize} onChange={this.handleChange.bind(this)}/>
                    </div>
                    :<div>没有你要的数据</div>
                }

            </div>
        )
    }
    handeClick(id){
      hashHistory.push('/application/'+id+'/'+this.state.newsType);
    }
    handleChange(page){
        this.setState({
            currentPage:page-1
        },()=>{
            this.getList();
        });
    }
    componentDidMount(){
        this.getList();
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
            supplyName:getCookie('loginName'),
            currentPage:currentPage,
            pageSize:pageSize
        };
        let address='';
        this.props.isHistory?address='/listHistory':address='/list';
        postData(api+'/dhy/'+arrFormAdd[newsType]+address,data,(result)=>{
            let applications=result[arrFormData[newsType]];
            this.setState({
                applicationList:applications,
                total:result.total
            });
        });
    }
}
export default Audit;
