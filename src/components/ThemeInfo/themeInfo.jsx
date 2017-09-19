import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Info from '../Info/info.jsx'
import {api} from '../../util/common';
import { postData } from '../../fetch/postData';

class ThemeInfo extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          themeInfo:{}
        }
    }

    render() {
      return (
        <Info info={this.state.themeInfo} />
      );
    }
    componentDidMount(){
        let id=this.props.params.id;
        let data={
          themeCode:id
        };
        postData(api+'/dhy/theme/getThemeInfo',data,(result)=>{
          this.setState({
            themeInfo:result.themes[0]
          });
        });
      }
}
export default ThemeInfo;
