import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import News from '../containers/News'
import Foot from '../containers/Foot/foot.jsx'
import Left from '../containers/Left/left.jsx'
import {getCookie} from  '../util/cookie';
import { hashHistory } from 'react-router';


import './index.less';
class App extends React.Component {
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      initDone: false
    }
  }
  render(){
    console.log(this.props.location.pathname)
    let paddingStyle='20px 30px 10px';
    if(this.props.location.pathname=='/Finance'){
      paddingStyle='20px 0 10px';
    }
    return(
      <div className="wapper">
        <nav className="Logo">继续教育培训管理系统</nav>
        <div className="content clearfix">
            <Left/>
            <div className="right">
                <div className="right-box" style={{padding:paddingStyle}}>
                    {
                        this.state.initDone
                            ? this.props.children
                            :<div> Loading </div>
                    }
                </div>
            </div>
        </div>
        <Foot/>
      </div>
    )
  }
    componentWillMount(){
        let username= getCookie('username');
        if(username==null||username=='') {
            hashHistory.push('/');
        }
    }
  componentDidMount(){
    this.setState({initDone:true})
  }
}

export default App
