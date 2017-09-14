import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {api} from '../../util/common';

import './themeInfo.less';
class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let themeInfo=this.props.info;
        return (
          <div className="themeInfo">
            <div className="themeInfo-title common-title">{themeInfo.title}</div>
            <div className="themeInfo-content-wrapper">
              <div className="themeInfo-content">{themeInfo.content}</div>
              <div className="themeInfo-link">
                <span>附件下载:</span>
                <span className="theme-name">{themeInfo.fileName}</span>
                <a href={api+'/dhy/background/fileOperate/download?fileId='+themeInfo.fileId+'&fileType='+themeInfo.type} target="_bank">点击下载</a>
              </div>
            </div>
          </div>
        )
    }

}
export default Info
