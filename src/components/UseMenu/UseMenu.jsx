import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import { Link } from 'react-router'

import '../List/list.less';
class UseMenu extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        return (
            <div className="list">
                <MuiThemeProvider>
                    <List>
                        <Link to="/">
                            <ListItem primaryText="公告"/>
                        </Link>
                        <Link to="/form">
                            <ListItem primaryText="填表"  />
                        </Link>
                        <Link to="/history">
                            <ListItem primaryText="历史记录"  />
                        </Link>
                    </List>
                </MuiThemeProvider>
            </div>
        )
    }
}
export default UseMenu
