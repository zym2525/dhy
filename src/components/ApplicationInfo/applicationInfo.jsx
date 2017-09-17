import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Form from '../Form/form.jsx'
import {api} from '../../util/common';
import { postData } from '../../fetch/postData';

class Application extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          applicationInfo:{}
        }
    }

    render() {
        return (
          <Form values={this.state.applicationInfo} isPreview={true}></Form>
        );
    }
  componentDidMount(){
    let id=this.props.params.id;
    let data={
      applicationCode:id
    };
    postData(api+'/dhy/application/getApplicationInfo',data,(result)=> {
      let values = result.application;
      console.log(values)
      this.setState({
        applicationInfo:values
      })
    });
  }
}
export default Application
