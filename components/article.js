import * as React from 'react'
import Link from 'next/link'
import { Motion, spring } from 'react-motion'
import { inject, observer } from 'mobx-react'
import * as _ from 'lodash'
import marked from 'marked'
import articleList from '../static/constant/articleList'

@inject('store')
@observer
class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      width: 0,
      pageWidth: 0
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ ready: true })
    }, 100)
    const width = document.getElementsByClassName('move-title-span')[0].offsetWidth
    const pageWidth = document.getElementsByClassName('page')[0].offsetWidth
    this.setState({ width, pageWidth })
  }
  render() {
    const id = this.props.id
    const article = articleList[articleList.length - id - 1]
    const k = Math.floor(id / 2)
    const left = id % 2 ? 'calc(60px + 50%)' : '60px'
    const top = `${152 + 250 * k}px`
    const width = this.state.width + (id % 2 ? this.state.pageWidth / 2 : 0)
    const translateStyle = this.state.ready ? {
      transform: `translate(calc(50% - ${width}px), -${152 + 250 * k}px)`,
      left: left,
      top: top
    }: {
      left: left,
      top: top
    }
    const displayStyle = this.state.ready ? {
      opacity: 1,
    }: null
    return (
      <div className="article">
        <h3 className="title move-title" style={translateStyle}>
          <span className="move-title-span">{article.title}</span>
        </h3>
        <div className="content" style={displayStyle} dangerouslySetInnerHTML={{__html:marked(article.content)}}>
        </div>
        <div className="information" style={displayStyle}>
          <div className="like">
            <i className="iconfont">&#xe60b;</i>
          </div>
          <div className="date">{article.date}</div>
        </div>
      </div>
    );
  }
}

export default Article;
