import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {api} from '../../util/common';
import { postData } from '../../fetch/postData';
import Form from '../Form/form.jsx'

class Formwrapper extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          values:{}
        };
    }

    render() {
        return (
            <Form/>
        );
    }

    componentDidMount() {

    }
}
export default Formwrapper;
