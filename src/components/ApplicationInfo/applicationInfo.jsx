import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Form from '../Form/form.jsx'
import {api,showSuccess} from '../../util/common';
import { postData } from '../../fetch/postData';
import {getCookie} from  '../../util/cookie';
import {Button} from 'antd';
import DownloadFile from '../../components/DownloadFile/download.jsx';

const arrTypeUrl=['/dhy/application/getApplicationInfo','/dhy/record/getRecordInfo','/dhy/open/getOpenInfo','/dhy/graduation/getGraduationInfo'];
const arrTypeStatusUrl=['/dhy/application/updateApplicationStaus','/dhy/record/updateRecordStaus','/dhy/open/updateOpenStaus','/dhy/graduation/updateGraduationStaus'];
const arrTypName=['application','record','open','graduation'];
class Application extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          applicationInfo:{},
          downloadId:''
        }
    }
    render() {
        let {fileId,fileIdTwo,imgId,imgIdTwo}=this.state.applicationInfo;
        return (
          <div>
            {
              this.props.params.type==0
              ?<Form values={this.state.applicationInfo} isPreview={true} />
              :
                <div>
                  {
                    this.state.applicationInfo.fileId&&
                    <DownloadFile fileName={this.state.applicationInfo.fileName} fileId={this.state.applicationInfo.fileId}/>
                  }
                  {
                    this.state.applicationInfo.fileIdTwo&&
                    <DownloadFile fileName={this.state.applicationInfo.fileNameTwo} fileId={this.state.applicationInfo.fileIdTwo}/>
                  }
                  {
                    this.state.applicationInfo.imgId&&
                    <DownloadFile fileName={this.state.applicationInfo.imgName} fileId={this.state.applicationInfo.imgId}/>
                  }
                  {
                    this.state.applicationInfo.imgIdTwo&&
                    <DownloadFile fileName={this.state.applicationInfo.imgNameTwo} fileId={this.state.applicationInfo.imgIdTwo}/>
                  }
                  {
                    !fileId&&!fileIdTwo&&!fileId&&!fileId&&
                    <div>还没上传附件</div>
                  }
                </div>

            }

          {
            getCookie('accountType')==1&&this.state.applicationInfo.status==0&&
            <div style={{textAlign:'right'}}>
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
        applicationInfo:values,
        downloadId:values.id
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
      id:id
    };
  }else if(type==1){
    return {
      recordCode:id
    };
  }else if(type==2){
    return {
      openCode:id
    };
  }else if(type==3){
    return {
      graduationCode:id
    };
  }
}
