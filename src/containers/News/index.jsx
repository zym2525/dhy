import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getLocalTime} from '../../util/common'
import { Pagination } from 'antd';
import { hashHistory } from 'react-router';

import '../../static/css/commonList.less'


class News extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render(){
        return(
            <div>
                <dl className="news">
                    <dt>
                        <div className="new-left">公告编号</div>
                        <div className="new-mid">公告名</div>
                        <div className="new-right">发布时间</div>
                        {
                            this.props.show&&<div className="operation">可执行操作</div>
                        }
                    </dt>
                    {
                        this.props.list.map((item,index)=>
                            <dd key={index}>
                                <div className="new-left">{item.id}</div>
                                <div className="new-mid" onClick={this.handeClick.bind(this,item.themeCode)}>{item.title}</div>
                                <div className="new-right">{getLocalTime(item.createTime)}</div>
                                {
                                    this.props.show&&<div className="operation clearfix">
                                        <div className="fl modification" onClick={this.handeModification.bind(this,item.themeCode)}>修改</div>
                                        <div className="fl del" onClick={this.handeDel.bind(this,item.themeCode)}>删除</div>
                                    </div>
                                }
                            </dd>
                        )
                    }

                </dl>
                {
                    this.props.list.length>0
                    ? <div className="pagination-wrapper">
                        <Pagination current={this.props.current||1} total={this.props.total} pageSize={this.props.pageSize||10} onChange={this.handleChange.bind(this)}/>
                        </div>
                    :<div>没有你要的数据</div>
                }
            </div>
        )
    }
    handeClick(id){
        hashHistory.push('/themeInfo/'+id);
    }
    handeDel(themeCode){
        this.props.handeDel(themeCode);
    }
    handleChange(page, pageSize){
        this.props.papeChange(page, pageSize);
    }
    handeModification(themeCode){
        hashHistory.push('/annonce/'+themeCode);
    }
}
export default News
