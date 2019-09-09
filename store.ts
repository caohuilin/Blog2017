import { action, observable } from 'mobx'

export class Store {
	@observable showSelectMenu = false
	@observable currentMenu = 2
	@observable disableScroll = false
	@observable likeArticleList: number[] = []

	constructor(
		showSelectMenu: boolean,
		currentMenu: number,
		disableScroll: boolean,
		likeArticleList: number[]
	) {
		this.showSelectMenu = showSelectMenu
		this.currentMenu = currentMenu
		this.disableScroll = disableScroll
		this.likeArticleList = likeArticleList
	}

	@action showMenu = () => {
		this.showSelectMenu = true
		this.disableScroll = true
	}

	@action hideMenu = () => {
		this.showSelectMenu = false
		this.disableScroll = false
	}

	@action changeCurrentMenu = (id: number) => {
		this.currentMenu = id
	}

	@action setLikeArticleList = (list: number[]) => {
		this.likeArticleList = list
	}
}

export function initStore(
	isServer: boolean,
	showSelectMenu = false,
	currentMenu = 2,
	disableScroll = false,
	likeArticleList = []
) {
  let store = null
	if (isServer) {
		return new Store(showSelectMenu, currentMenu, disableScroll, likeArticleList)
	} else {
		if (store === null) {
			store = new Store(showSelectMenu, currentMenu, disableScroll, likeArticleList)
		}
		return store
	}
}
