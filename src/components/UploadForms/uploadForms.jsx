import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {api} from '../../util/common';
import { Upload,Button,Icon } from 'antd';
import {getCookie} from  '../../util/cookie';
const styleUpload={
  marginTop:'20px'
}

class UploadForms extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="UploadForms">
              <div className="common-title">上传文件</div>
              <div className="download-record">
                <span>下载项目模板</span>
                <a href={api+'/dhy/background/fileOperate/list?type=12'} target="_bank">点击下载</a>
              </div>
              <div className="upload-wrapper" style={styleUpload}>
                <Upload name="file" action={api+"/dhy/background/fileOperate/upload"} listType="text" data={this.getData.bind(this)}>
                  <Button>
                    <Icon type="upload" />上传备案表
                  </Button>
                </Upload>
              </div>
            </div>
        );
    }
    componentWillMount(){
      if(getCookie('accountType')==1){
        hashHistory.push('/');
      }
    }
    getData(){

    }
}

export default UploadForms;
