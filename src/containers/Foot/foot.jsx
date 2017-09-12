import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './foot.less';
class Foot extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="foot">
                <p>Copyright ©2016 Corporation, All Rights Reserved</p>
                <p className="p2">
                    <span>baicai</span>
                    <a href="" className="a1">版权所有</a>
                    <a href="" target="_blank">京ICP证</a>
                </p>
            </div>
        );
    }
}
export default Foot;