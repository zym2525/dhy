import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Audit from '../Audit/audit.jsx'

class History extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }

    render() {
        return (
           <Audit/>
        )
    }

}
export default History;