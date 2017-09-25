import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {api,getFromUrl,showSuccess,createData} from '../../util/common';
import {getCookie} from  '../../util/cookie';
import { postData } from '../../fetch/postData';
import UploadBtn from '../../components/UploadBtn/uploadBtn.jsx';
import {Button} from 'antd';

const styleUpload={
  marginTop:'20px'
};

const username=getCookie('loginName');
const arrTypName=['application','record','open','graduation'];
const arrTypeUrl=['/dhy/application/getApplicationInfo','/dhy/record/getRecordInfo','/dhy/open/getOpenInfo','/dhy/graduation/getGraduationInfo'];
class UploadForms extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          files:[],
          fileData1:{},
          fileData2:{},
          fileOneId:'',
          fileOneName:'',
          fileTwoId:'',
          fileTwoName:''
        };
    }

    render() {
        const type=this.props.params.type;
        const isGraduate=this.props.location.query['isGraduate'];
        return (
            <div className="UploadForms">
              <div className="common-title">上传文件</div>
              {
                this.state.files.map((item,index)=>
                  <div className="download-record" key={index} style={{marginTop:'10px'}}>
                    <span>{item.fileName}</span>
                    <a href={api+'/dhy/background/fileOperate/download?fileId='+item.id} target="_bank">点击下载</a>
                  </div>
                )
              }
              {
                type==0&&
                <div>
                  {
                    isGraduate==1&&
                    <div className="upload-wrapper" style={styleUpload}>
                      <UploadBtn name="上传备案表" getData={this.getRecordData} callback={this.handeFileOne.bind(this)}/>
                      <Button type="primary" htmlType="submit" style={{marginTop:'20px'}} onClick={this.submitRecord.bind(this)}>提交</Button>
                    </div>
                  }
                  {
                    isGraduate==0&&
                    <div className="upload-wrapper" style={styleUpload}>
                      <UploadBtn name="上传开班学员名单" getData={this.getStudentFormData} callback={this.handeFileOne.bind(this)}/>
                    </div>
                  }
                  {
                    isGraduate==0&&
                    <div className="upload-wrapper" style={styleUpload}>
                      <UploadBtn name="上传开班表" getData={this.getOpenData} callback={this.handeFileTwo.bind(this)}/>
                      <Button type="primary" htmlType="submit" style={{marginTop:'20px'}} onClick={this.submitOpen.bind(this)}>提交</Button>
                    </div>
                  }
                </div>
              }

            </div>
        );
    }
    componentWillMount(){
      if(getCookie('accountType')==1){
        hashHistory.push('/');
      }
    }
    componentDidMount(){
      const type=this.props.params.type;
      if(type==0){
        postData(api+'/dhy/background/fileOperate/list',{type:12},(result)=>{
          this.setState({
            files:result.uploads
          });
        });
      }else if(type==3){

      }else{
        let id=this.props.location.query.id;
        let data=createData(type,id);
        postData(api+arrTypeUrl[type],data,(result)=>{
          let files=[{
            id:result['open'].fileId,
            fileName:result['open'].fileName
          },{
            id:result['open'].fileIdTwo,
            fileName:result['open'].fileNameTwo
          }];
          this.setState({
            files:files
          });
        });
      }

    }
    getRecordData(){
      return{
        fileType:2,
        loginName:username
      };
    }
    getStudentFormData(){
      return{
        fileType:3,
        loginName:username
      };
    }
    getOpenData(){
      return{
        fileType:4,
        loginName:username
      };
    }
    handeFileOne(fileId,fileName){
        this.setState({
          fileOneId:fileId,
          fileOneName:fileName
        });
    }
    handeFileTwo(fileId,fileName){
      this.setState({
        fileTwoId:fileId,
        fileTwoName:fileName
      });
    }
    submitRecord(){

    }
    submitOpen(){
      let {
        fileOneId,
        fileOneName,
        fileTwoId,
        fileTwoName
      }=this.state;
      if(!fileOneId&&!fileTwoId){
        alert('请上传开班学员名单和开班表');
        return;
      }
      if(!fileOneId){
        alert('请上传开班学员名单');
        return;
      }
      if(!fileTwoId){
        alert('请上传开班表');
        return;
      }

      let data={
        projectName:this.props.location.query.projectName,
        supplyName:this.props.location.query.supplyName,
        fileId:fileOneId,
        fileIdTwo:fileTwoId,
        fileName:fileOneName,
        fileNameTwo:fileTwoName
      };
      postData(api+'/dhy/open/saveOpen',data,(result)=>{
        showSuccess('上传成功');
      });
    }
}



export default UploadForms;
