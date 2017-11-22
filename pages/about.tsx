import * as React from 'react'
import Layout from '../components/layout'
import 'isomorphic-unfetch'

export default class About extends React.Component<any, any> {
  async getInitialProps() {
    // eslint-disable-next-line no-undef
    const res = await fetch('https://api.github.com/repos/developit/preact')
    const json = await res.json()
    return { stars: json.stargazers_count }
  }

  render() {
    return (
      <Layout>
        <p>Preact has {this.props.stars} ⭐️</p>
      </Layout>
    )
  }
}
