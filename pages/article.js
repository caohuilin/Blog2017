import React from 'react'
import { Provider } from 'mobx-react'
import Layout from '../components/layout'
import Article from '../components/article'
import { initStore } from '../store'
import articleList from '../static/constant/articleList'
import style from '../styles/main.css'

export default class Content extends React.Component {
  constructor(props) {
    super(props)
    this.store = initStore(
      props.isServer,
      props.showSelectMenu,
      props.currentMenu
    )
  }

  static getInitialProps({ req }) {
    const isServer = !!req
    const store = initStore(isServer)
    return {
      isServer,
      showSelectMenu: store.showSelectMenu,
      currentMenu: store.currentMenu
    }
  }

  render() {
    const id = this.props.url.query.id
    const article = articleList[articleList.length - id - 1]
    return (
      <Provider store={this.store}>
        <Layout title={`caohuilin's blog - ${article.title}`}>
          <style dangerouslySetInnerHTML={{ __html: style }} />
          <Article id={id}/>
        </Layout>
      </Provider>
    )
  }
}
