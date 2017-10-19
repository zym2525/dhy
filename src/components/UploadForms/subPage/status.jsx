import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Status extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const statusName=['未审核','审核通过','审核未通过'];
    return (
      <h1 style={{marginTop:'20px',fontSize:'20px'}}>{statusName[this.props.status]}</h1>
    )
  }
}

export default Status;
