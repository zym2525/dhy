import React from 'react'
import { Router, Route, IndexRoute} from 'react-router'

import App from '../containers/index.jsx'
import Theme from '../containers/Theme/theme.jsx'
import Announce from '../components/Announce/announce.jsx'
import Manage from '../components/Management/management.jsx'
import Audit from '../components/Audit/audit.jsx'
import History from '../components/History/history.jsx'
import Finance from '../components/Finance/finance.jsx'
import FileUpload from '../components/FileUpload/fileUpload.jsx'
import ThemeInfo from '../components/ThemeInfo/ThemeInfo.jsx'
import Formwrapper from '../components/FormWrapper/Formwrapper.jsx'
import Application from  '../components/ApplicationInfo/applicationInfo.jsx'
import UploadForms from '../components/UploadForms/uploadForms.jsx'
import NotFound from '../containers/404.jsx'


class RouteMap extends React.Component {
  render(){
    return (
      <Router history = {this.props.history}>
        <Route path="/" component = {App}>
          <IndexRoute  component = {Theme}/>
          <Route path="/manage" component={Manage}/>
          <Route path="/audit" component={Audit}/>
          <Route path="/history" component={History}/>
          <Route path="/finance" component={Finance}/>
          <Route path="/fileUpload" component={FileUpload}/>
          <Route path="/formwrapper" component={Formwrapper}/>
          <Route path="/uploadForms/:type" component={UploadForms}/>
          <Route path="/annonce/:id" component={Announce}/>
          <Route path="/themeInfo/:id" component={ThemeInfo}/>
          <Route path="/application/:id/:type" component={Application}/>
          <Route path="/*" component={NotFound}/>
        </Route>
      </Router>
    )
  }
}
export default RouteMap
