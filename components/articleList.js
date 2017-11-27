import * as React from 'react'
import { Link, Router } from '../routes'
import classnames from 'classnames'
import { Motion, spring } from 'react-motion'
import { inject, observer } from 'mobx-react'
import * as _ from 'lodash'
import selects from '../static/constant/selects'
import articleList from '../static/constant/articleList'

@inject('store')
@observer
class Article extends React.Component {
  likeArticle = (id) => {
    const likeArticleList = window ? window.localStorage.getItem('likeArticleList') : null
    const list =  likeArticleList ? JSON.parse(likeArticleList) : []
    list.push(id)
    localStorage.setItem('likeArticleList', JSON.stringify(list))
    this.props.store.setLikeArticleList(list)
  }
  componentDidMount () {
    const likeArticleList = window ? window.localStorage.getItem('likeArticleList') : null
    const list =  likeArticleList ? JSON.parse(likeArticleList) : []
    this.props.store.setLikeArticleList(list)
  }
  render() {
    const { currentMenu, showSelectMenu, likeArticleList } = this.props.store
    const blurClass = classnames({
      blur: showSelectMenu,
      unblur: !showSelectMenu
    })
    return (
      <nav className="content">
        <ul>
          {articleList
            .filter(item => currentMenu === 2 || item.tag === currentMenu)
            .map((item, i) => {
              return (
                <li key={i}>
                  <Link route='article' params={{ id: item.id, path: item.path }}>
                    <h3 className={`title ${blurClass}`}>
                      {item.title}
                      <span />
                    </h3>
                  </Link>
                  <div className={`introduction ${blurClass}`}>
                    {item.description}
                  </div>
                  <div className={`information ${blurClass}`}>
                    <div className="like">
                      <i className={classnames({
                        iconfont: true,
                        red: likeArticleList.indexOf(item.id) !== -1
                      })} onClick={this.likeArticle.bind(null, item.id)}>&#xe60b;</i>
                    </div>
                    <div className="date">{item.date}</div>
                  </div>
                </li>
              )
            })}
        </ul>
      </nav>
    )
  }
}

export default Article
