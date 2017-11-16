import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Form from '../Form/form.jsx'
import {api,showSuccess,createData} from '../../util/common';
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
              (this.props.params.type==0||this.props.params.type==9)
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
              <Button style={{marginRight:'20px'}} type="primary" onClick={this.pass.bind(this,1)}>通过</Button>
              <Button style={{marginRight:'10px'}} type="primary" onClick={this.pass.bind(this,2)}>不通过</Button>
            </div>
          }
          </div>
        );
    }
  componentDidMount(){
    let id=this.props.params.id;
    let type=this.props.params.type;
    console.log(type)
    if(type==9){
      let flag=this.props.location.query.flag;
      let data={
        id:id
      };
      postData(api+'/dhy/open/getInfo',data,(result)=> {
        if(flag==0){
          var values = result.application;
        }else{
          var values = result.record;
        }
        this.setState({
          applicationInfo:values,
          downloadId:values.id
        })
      });
    }else{
      let data=createData(type,id);
      postData(api+arrTypeUrl[type],data,(result)=> {
        let values = result[arrTypName[type]];
        this.setState({
          applicationInfo:values,
          downloadId:values.id
        })
      });
    }

  }
  pass(status){
    let id=this.props.params.id;
    let type=this.props.params.type;
    let data=createData(type,id);
    data['status']=status;
    postData(api+arrTypeStatusUrl[type],data,(result)=> {
      showSuccess('更改成功');
      //申请表
      if(type==0&&status==1){
        let dataOpen=this.state.applicationInfo;
        dataOpen.applicationId=id,
        postData(api+'/dhy/open/saveOpen',dataOpen,(result)=> {

        })
      }
      //备案表
      if(type==1&&status==1){
        let dataOpen=this.state.applicationInfo;
        dataOpen.recordCode=id,
          postData(api+'/dhy/open/saveOpen',dataOpen,(result)=> {

          })
      }
      //开班表
      if(type==2&&status==1){
        let {projectName,supplyName}=this.state.applicationInfo;
        let dataG={
          projectName:projectName,
          supplyName:supplyName,
          applicationCode:result.applicationCode
        };
        postData(api+'/dhy/graduation/saveGraduation',data,(result)=>{
        });
      }
    });
  }
}
export default Application


