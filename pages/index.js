import React from 'react'
import { Provider } from 'mobx-react'
import Layout from '../components/layout'
import Select from '../components/select'
import ArticleList from '../components/articleList'
import { initStore } from '../store'
import style from '../styles/main.css'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.store = initStore(
      props.isServer,
      props.showSelectMenu,
      props.currentMenu
    )
  }

  getInitialProps({ req }) {
    const isServer = !!req
    const store = initStore(isServer)
    return {
      isServer,
      showSelectMenu: store.showSelectMenu,
      currentMenu: store.currentMenu
    }
  }

  render() {
    return (
      <Provider store={this.store}>
        <Layout>
          <style dangerouslySetInnerHTML={{ __html: style }} />
          <Select />
          <ArticleList />
        </Layout>
      </Provider>
    )
  }
}
