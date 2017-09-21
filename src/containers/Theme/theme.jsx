import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import News from '../../containers/News'
import { postData } from '../../fetch/postData';
import {api} from '../../util/common';
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;

class Theme extends React.Component {
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
            <News total={this.state.total} list={this.state.themes} papeChange={this.papeChange.bind(this)} current={this.state.currentPage+1}/>
          </div>
        );
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
        });
    }
}
export default Theme;
