import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {api,getFromUrl,showSuccess,createData,showInfo} from '../../util/common';
import {getCookie} from  '../../util/cookie';
import { postData } from '../../fetch/postData';
import UploadBtn from '../../components/UploadBtn/uploadBtn.jsx';
import {Button} from 'antd';
import Graduation from '../../components/Graduation/graduation.jsx';

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
          info:{},
          files:[],
          images:[],
          fileData1:{},
          fileData2:{},
          fileOneId:'',
          fileOneName:'',
          fileTwoId:'',
          fileTwoName:'',
          graduation:{}
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
              {
                type==2&&
                <div style={{marginTop:'20px'}}>
                  <Graduation values={this.state.graduation} callBackSubmit={this.submitGraduation.bind(this)}/>
                </div>
              }
              {
                type==3&&
                <div className="upload-wrapper" style={styleUpload}>
                  <UploadBtn name="上传文件" getData={this.getRecordData} callback={this.handeFileOne.bind(this)}/>
                  <Button type="primary" htmlType="submit" style={{marginTop:'20px'}} onClick={this.handleReOpen.bind(this)}>重新开班</Button>
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
      if(type==0||type==1){
        postData(api+'/dhy/background/fileOperate/list',{type:12},(result)=>{
          this.setState({
            files:result.uploads
          });
        });
      }else if(type==3){
        postData(api+arrTypeUrl[type],{graduationCode:this.props.location.query.id},(result)=>{
          let files=[{
            id:result['graduation'].fileId,
            fileName:result['graduation'].fileName
          },{
            id:result['graduation'].fileIdTwo,
            fileName:result['graduation'].fileNameTwo
          },{
            id:result['graduation'].imgId,
            fileName:result['graduation'].imgName
          },{
            id:result['graduation'].imgIdTwo,
            fileName:result['graduation'].imgNameTwo
          }];
          this.setState({
            files:files,
            graduation:result.graduation
          });
        });
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
            files:files,
            info:result['open']
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
    //重新开班
    handleReOpen(){
      let {fileOneId,fileOneName}=this.state;
      let {graduationCode,supplyName}=this.state.graduation;
      let data={
        graduationCode:graduationCode,
        supplyName:supplyName
      };
      if(fileOneId) data.fileId=fileOneId;
      if(fileOneId) data.fileName=fileOneName;
      postData(api+'/dhy/record/newOpening',data,()=>{
        showSuccess('开班成功');
      });
    }
    submitRecord(){

    }
    //上传结业表
    submitGraduation(values){
      let {info}=this.state;
      if(!values.uploadForms) return;
      if(!values.uploadImages) return;
      if(values.uploadForms.length!=2){
        showInfo('请上传两个文件');
        return;
      }
      if(values.uploadImages.length!=2){
        showInfo('请上传两张照片');
        return;
      }
      let file1=values.uploadForms[0].response.data;
      let file2=values.uploadForms[1].response.data;
      let img1=values.uploadImages[0].response.data;
      let img2=values.uploadImages[1].response.data;
      let data={
        applicationCode:info.applicationCode,
        projectName:info.projectName,
        supplyName:info.supplyName,
        fileId:file1.id,
        fileIdTwo:file2.id,
        imgId:img1.id,
        imgIdTwo:img2.id,
        fileName:file1.fileName,
        fileNameTwo:file2.fileName,
        imgName:img1.fileName,
        imgNameTwo:img2.fileName,
        incomeOne:values.incomeOne,
        pratnerIncome:values.pratnerIncome,
        schoolIncome:values.schoolIncome,
        costPay:values.costPay
      }
      postData(api+'/dhy/graduation/saveGraduation',data,(result)=>{
        showSuccess('上传成功');
      });
    }
    //上传开班表
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
        applicationCode:this.props.location.query.code,
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
