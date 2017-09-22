import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {api} from '../../util/common';

class DownloadFile extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
          <div style={{marginBottom:'20px'}}>
            <span>{this.props.fileName}</span>
            <a href={api+'/dhy/background/fileOperate/download?fileId='+this.props.fileId} target="_bank">下载附件</a>
          </div>
        );
    }
}
export default DownloadFile;
