import React from 'react'
import { Provider } from 'mobx-react'
import Layout from '../components/layout'
import Select from '../components/select'
import ArticleList from '../components/articleList'
import { initStore } from '../store'
import { Store } from '../store';
import style from '../styles/main.css'

interface IHomeProps {
  isServer: boolean
  showSelectMenu: boolean
  currentMenu: number
}
export default class Home extends React.Component<IHomeProps, {}> {
  store: Store
  constructor(props: IHomeProps) {
    super(props)
    this.store = initStore(
      props.isServer,
      props.showSelectMenu,
      props.currentMenu
    )
  }

  static getInitialProps({ req }: any) {
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
        <Layout title="caohuilin's blog">
          <style dangerouslySetInnerHTML={{ __html: style }} />
          <Select />
          <ArticleList />
        </Layout>
      </Provider>
    )
  }
}
