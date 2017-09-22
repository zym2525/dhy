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
        let id=files.file.response.data.id;
        console.log(id)
      }
    }
}
export default UploadBtn;
