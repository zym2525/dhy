import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {api,getFromUrl} from '../../util/common';
import {getCookie} from  '../../util/cookie';
import { postData } from '../../fetch/postData';
import UploadBtn from '../../components/UploadBtn/uploadBtn.jsx';

const styleUpload={
  marginTop:'20px'
}

const username=getCookie('loginName');
class UploadForms extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          files:[],
          fileData1:{},
          fileData2:{}
        };
    }

    render() {
        const type=this.props.params.type;
        const isGraduate=getFromUrl('isGraduate');
        console.log(isGraduate)
        return (
            <div className="UploadForms">
              <div className="common-title">上传文件</div>
              {
                type==0&&this.state.files.map((item,index)=>
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
                      <UploadBtn name="上传备案表" getData={this.getRecordData} callback={this.}/>
                    </div>
                  }
                  {
                    isGraduate==0&&
                    <div className="upload-wrapper" style={styleUpload}>
                      <UploadBtn name="上传开班学员名单" getData={this.getStudentFormData}/>
                    </div>
                  }
                  {
                    isGraduate==0&&
                    <div className="upload-wrapper" style={styleUpload}>
                      <UploadBtn name="上传开班表" getData={this.getOpenData}/>
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
}



export default UploadForms;
