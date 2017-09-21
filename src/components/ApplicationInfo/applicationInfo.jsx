import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Form from '../Form/form.jsx'
import {api,showSuccess} from '../../util/common';
import { postData } from '../../fetch/postData';
import {getCookie} from  '../../util/cookie';
import {Button} from 'antd';


const arrTypeUrl=['/dhy/application/getApplicationInfo','/dhy/record/getRecordInfo','/dhy/open/getOpenInfo'];
const arrTypeStatusUrl=['/dhy/application/updateApplicationStaus','/dhy/record/updateRecordStaus','/dhy/open/updateOpenStaus'];
const arrTypName=['application','record','open'];
class Application extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          applicationInfo:{}
        }
    }
    render() {
        return (
          <div>
            <Form values={this.state.applicationInfo} isPreview={true} />
          {
            getCookie('accountType')==1&&this.state.applicationInfo.status==0&&
            <div style={{textAlign:'right'}}>
              <a className="fl" target="_bank">下载附件</a>
              <Button style={{marginRight:'20px'}} type="primary" onClick={this.pass.bind(this)}>通过</Button>
              <Button style={{marginRight:'10px'}} type="primary" onClick={this.noPass.bind(this)}>不通过</Button>
            </div>
          }
          </div>
        );
    }
  componentDidMount(){
    let id=this.props.params.id;
    let type=this.props.params.type;
    let data=createData(type,id);
    postData(api+arrTypeUrl[type],data,(result)=> {
      let values = result[arrTypName[type]];
      this.setState({
        applicationInfo:values
      })
    });
  }
  pass(){
    let id=this.props.params.id;
    let type=this.props.params.type;
    let data=createData(type,id);
    data['status']=1;
    postData(api+arrTypeStatusUrl[type],data,(result)=> {
      showSuccess('更改成功');
    });
  }
  noPass(){
    let id=this.props.params.id;
    let type=this.props.params.type;
    let data=createData(type,id);
    data['status']=2;
    postData(api+arrTypeStatusUrl[type],data,(result)=> {
      showSuccess('更改成功');
    });
  }
}
export default Application

function createData(type,id){
  if(type==0){
    return {
      applicationCode:id
    };
  }else if(type==1){
    return {
      recordCode:id
    };
  }else if(type==2){
    return {
      openCode:id
    };
  }
}
