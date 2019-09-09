import React from 'react'
import { get, toNumber } from 'lodash'
import { Provider } from 'mobx-react'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router';
import Layout from '../components/layout'
import Article from '../components/article'
import { initStore, Store } from '../store'
import articleList from '../static/constant/articleList'
import style from '../styles/main.css'

interface IArticleProps extends WithRouterProps {
  isServer:boolean
  showSelectMenu: boolean
  currentMenu: number
}

export class Content extends React.Component<IArticleProps, {}> {
  store: Store
  constructor(props: IArticleProps) {
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
    const { query } = this.props.router
    const id = toNumber(get(query, 'id'))
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

export default withRouter<IArticleProps>(Content as any)
