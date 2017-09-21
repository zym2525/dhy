import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {api} from '../../util/common';
import { Upload,Button,Icon } from 'antd';
import {getCookie} from  '../../util/cookie';
import { postData } from '../../fetch/postData';
const styleUpload={
  marginTop:'20px'
}

const username=getCookie('loginName');
class UploadForms extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          files:[]
        };
    }

    render() {
        const type=this.props.params.type;
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
                type==1
                ?<div className="upload-wrapper" style={styleUpload}>
                  <Upload name="file" action={api+"/dhy/background/fileOperate/upload"} listType="text" data={this.getRecordData.bind(this)}>
                    <Button>
                      <Icon type="upload" />上传备案表
                    </Button>
                  </Upload>
                </div>
                :''
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
      postData(api+'/dhy/background/fileOperate/list',{type:12},(result)=>{
        this.setState({
          files:result.uploads
        });
      });
    }
    getRecordData(){
      return{
        fileType:2,
        loginName:username
      };
    }
    downloadFiles(){

        //for(let i=0;i<result.uploads.length;i++){
        //  let file=result.uploads[i];
        //  let oA=document.createElement('a');
        //  oA.href=`${api}/dhy/background/fileOperate/download?fileId=${file['id']}`;
        //  oA.download=file['fileName'];
        //  oA.click();
        //}

    }
}

export default UploadForms;
