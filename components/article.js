import * as React from 'react'
import Link from 'next/link'
import { Motion, spring } from 'react-motion'
import { inject, observer } from 'mobx-react'
import * as _ from 'lodash'
import marked from 'marked'
import classnames from 'classnames'
import articleList from '../static/constant/articleList'

@inject('store')
@observer
class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      width: 0,
    }
  }
  likeArticle = id => {
    const likeArticleList = window ? window.localStorage.getItem('likeArticleList') : null
    const list = likeArticleList ? JSON.parse(likeArticleList) : []
    list.push(id)
    localStorage.setItem('likeArticleList', JSON.stringify(list))
    this.props.store.setLikeArticleList(list)
  }
  componentDidMount() {
    const likeArticleList = window ? window.localStorage.getItem('likeArticleList') : null
    const list = likeArticleList ? JSON.parse(likeArticleList) : []
    this.props.store.setLikeArticleList(list)
    setTimeout(() => {
      this.setState({ ready: true })
    }, 100)
    const width = document.getElementsByClassName('move-title-span')[0]
      .offsetWidth
    this.setState({ width })
  }
  render() {
    const { likeArticleList } = this.props.store
    const id = this.props.id
    const article = articleList[articleList.length - id - 1]
    const k = Math.floor(id / 2)
    const top = `${152 + 250 * k}px`
    const width = this.state.width / 2
    const translateStyle = this.state.ready
      ? {
          transform: `translate(calc(50% - ${width}px), -${152 + 250 * k}px)`,
          top: top
        }
      : {
          top: top
        }
    const displayStyle = this.state.ready
      ? {
          opacity: 1
        }
      : null
    return (
      <div className="article">
        <h3 className="title move-title" style={translateStyle}>
          <span className="move-title-span">{article.title}</span>
        </h3>
        <div
          className="content"
          style={displayStyle}
          dangerouslySetInnerHTML={{ __html: marked(article.content) }}
        />
        <div className="information" style={displayStyle}>
          <div className="like">
            <i
              className={classnames({
                iconfont: true,
                red: likeArticleList.indexOf(article.id) !== -1
              })}
              onClick={this.likeArticle.bind(null, article.id)}
            >
              &#xe60b;
            </i>
          </div>
          <div className="date">{article.date}</div>
        </div>
      </div>
    )
  }
}

export default Article
