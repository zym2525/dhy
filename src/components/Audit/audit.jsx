import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import '../../static/css/commonList.less'
import { Pagination } from 'antd';
import '../../static/css/commonList.less'
import {getCookie} from  '../../util/cookie';
import {api} from '../../util/common';
import { postData } from '../../fetch/postData';
import {getLocalTime} from '../../util/common';
import { hashHistory } from 'react-router';


import './audit.less'
class Audit extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            currentPage:0,
            pageSize:10,
            applicationList:[],
            total:0
        };
    }

    render() {
        return (
            <div>
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
                                <div className="new-mid" onClick={this.handeClick.bind(this,item.applicationCode)}>{item.projectName}</div>
                                <div className="new-right">{getLocalTime(item.createTime)}</div>
                                <div className="proposer">{item.supplyName}</div>
                                <div className="status">{item.status==0?'待审核':'已审核'}</div>
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
      hashHistory.push('/application/'+id);
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
        postData(api+'/dhy/application/list',data,(result)=>{
            let applications=result.applications;
            this.setState({
                applicationList:applications,
                total:result.total
            });
            console.log(result)
        });
    }
}
export default Audit;
