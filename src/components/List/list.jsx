import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import { Link } from 'react-router'


import './list.less';

class MenuList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="list">
                <MuiThemeProvider>
                    <List>
                        <Link to="/annonce/create">
                            <ListItem primaryText="发布公告"/>
                        </Link>
                        <Link to="/manage">
                            <ListItem primaryText="公告管理"  />
                        </Link>
                        <Link to="/audit">
                            <ListItem primaryText="项目审核"  />
                        </Link>
                        <Link to="/history">
                            <ListItem primaryText="历史记录"  />
                        </Link>
                        <Link to="/Finance">
                            <ListItem primaryText="财务管理"  />
                        </Link>
                        <Link to="/FileUpload">
                            <ListItem primaryText="发布模板文件"  />
                        </Link>
                    </List>
                </MuiThemeProvider>
            </div>
        )
    }
}
export default MenuList;