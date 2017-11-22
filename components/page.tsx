import * as React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import Clock from './clock'

@inject('store') @observer
class Page extends React.Component<any, any> {
  componentDidMount () {
    this.props.store.start()
  }

  componentWillUnmount () {
    this.props.store.stop()
  }

  handleClick = () => {
    this.props.store.add()
  }

  render () {
    return (
      <div>
        <button onClick={this.handleClick}>{this.props.title}</button>
        {this.props.store.num}
        <Clock lastUpdate={this.props.store.lastUpdate} light={this.props.store.light} />
      </div>
    )
  }
}

export default Page
