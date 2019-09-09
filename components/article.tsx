import * as React from 'react'
import { inject, observer } from 'mobx-react'
import * as _ from 'lodash'
import marked from 'marked'
import classnames from 'classnames'
import articleList from '../static/constant/articleList'
import { Store } from '../store';

interface IArticleProps {
  store?: Store
  id: number
}

interface IArticleState {
  ready: boolean,
  width: number,
  pageWidth: number
}
@inject('store')
@observer
class Article extends React.Component<IArticleProps, IArticleState> {
  constructor(props: IArticleProps) {
    super(props)
    this.state = {
      ready: false,
      width: 0,
      pageWidth: 0
    }
  }
  getCurrentId = (id: number) => {
    const { currentMenu } = this.props.store!
    const currentList = articleList.filter(item => currentMenu === 2 || item.tag === currentMenu)
    let currentId = 0
    currentList.map((item, i) => {
      if (item.id === id) {
        currentId = i
      }
      return null
    })
    return currentId
  }
  likeArticle = (id: number) => {
    const likeArticleList = window ? window.localStorage.getItem('likeArticleList') : null
    let list =  likeArticleList ? JSON.parse(likeArticleList) : []
    if (list.indexOf(id) !== -1) {
      list = list.filter((item: number) => item !== id)
    } else {
      list.push(id)
    }
    localStorage.setItem('likeArticleList', JSON.stringify(list))
    this.props.store!.setLikeArticleList(list)
  }
  componentDidMount() {
    const likeArticleList = window ? window.localStorage.getItem('likeArticleList') : null
    const list = likeArticleList ? JSON.parse(likeArticleList) : []
    this.props.store!.setLikeArticleList(list)
    setTimeout(() => {
      this.setState({ ready: true })
    }, 100)
    const width = (document.getElementsByClassName('move-title-span')[0] as any).offsetWidth
    const pageWidth = (document.getElementsByClassName('page')[0] as any).offsetWidth
    this.setState({ width, pageWidth })
  }
  render() {
    const { likeArticleList } = this.props.store!
    const id = +this.props.id
    const currentId = this.getCurrentId(id)
    const article = articleList[articleList.length - id - 1]
    const k = Math.floor(currentId / 2)
    const top = `${392 + 250 * k}px`
    const width = this.state.width
    const pageWidth = this.state.pageWidth
    const left = currentId % 2 ? '50%' : '0px'
    const transformX = pageWidth < 420 ? 0 : (currentId % 2 ? `calc(-${width / 2}px)` : `calc(50% - ${width / 2}px)`)
    const translateStyle = this.state.ready
      ? {
          transform: `translate(${transformX}, -${392 + 250 * k}px)`,
          top: top,
          left: left
        }
      : {
          top: top,
          left: left
        }
    const displayStyle: any = this.state.ready
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
          <div className="date"><i className="iconfont">&#xe61b;</i>{article.date}</div>
        </div>
      </div>
    )
  }
}

export default Article
