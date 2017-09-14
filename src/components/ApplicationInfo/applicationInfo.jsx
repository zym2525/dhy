import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Info from '../Info/info.jsx'
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
          <Info info={this.state.applicationInfo} />
        );
    }
  componentDidMount(){
      let id=this.props.params.id;
      let data={
        applicationCode:id
      };
      postData(api+'/dhy/application/getApplicationInfo',data,(result)=>{
        this.setState({
          applicationInfo:result.application
        });
        console.log(result)
      });
  }
}
export default Application
