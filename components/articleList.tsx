import * as React from 'react'
import classnames from 'classnames'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import * as _ from 'lodash'
import articleList, { IArticle } from '../static/constant/articleList'
import { Store } from '../store'

interface IArticleListProps {
	store?: Store
}
@inject('store')
@observer
class ArticleList extends React.Component<IArticleListProps, {}> {
	likeArticle = (id: number) => {
		const likeArticleList = window.localStorage.getItem('likeArticleList')
		let list = likeArticleList ? JSON.parse(likeArticleList) : []
		if (list.indexOf(id) !== -1) {
			list = list.filter((item: number) => item !== id)
		} else {
			list.push(id)
		}
		localStorage.setItem('likeArticleList', JSON.stringify(list))
		this.props.store!.setLikeArticleList(list)
	}
	componentDidMount() {
		const likeArticleList = window.localStorage.getItem('likeArticleList')
		const list = likeArticleList ? JSON.parse(likeArticleList) : []
		this.props.store!.setLikeArticleList(list)
	}
	render() {
		const { currentMenu, showSelectMenu, likeArticleList } = this.props.store!
		const blurClass = classnames({
			blur: showSelectMenu,
			unblur: !showSelectMenu,
		})
		const textShadowClass = classnames({
			shadow: showSelectMenu,
			unshadow: !showSelectMenu,
		})
		return (
			<nav className="content">
				<ul>
					{articleList
						.filter(item => currentMenu === 2 || item.tag === currentMenu)
						.map((item: IArticle, i) => {
							return (
								<li key={i}>
									<Link href={`article?id=${item.id}&path=${item.path}`}>
										<h3 className={`title ${textShadowClass}`}>
											<a href={`article?id=${item.id}&path=${item.path}`}>{item.title}</a>
											<span />
										</h3>
									</Link>
									<div className={`introduction ${blurClass}`}>{item.description}</div>
									<div className={`information ${blurClass}`}>
										<div className="like">
											<i
												className={classnames({
													iconfont: true,
													red: likeArticleList.indexOf(item.id) !== -1,
												})}
												onClick={this.likeArticle.bind(null, item.id)}
											>
												&#xe60b;
											</i>
										</div>
										<div className="date">
											<i className="iconfont">&#xe61b;</i>
											{item.date}
										</div>
									</div>
								</li>
							)
						})}
				</ul>
			</nav>
		)
	}
}

export default ArticleList
