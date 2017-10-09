import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {api} from '../../util/common';
import { Upload,Button,Icon } from 'antd';

class UploadBtn extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
          <Upload name="file" action={api+"/dhy/background/fileOperate/upload"} listType="text" data={this.props.getData.bind(this)} onChange={this.handleChange.bind(this)}>
            <Button>
              <Icon type="upload" />{this.props.name}
            </Button>
          </Upload>
        );
    }
    handleChange(files){
      console.log(files)
      if(files.file.status=='done'){
        let data=files.file.response.data;
        let id=data.id;
        let name=data.fileName;
        this.props.callback(id,name,files.fileList);
      }
    }
}
export default UploadBtn;
