import { action, observable } from 'mobx'

let store = null

class Store {
  @observable showSelectMenu = false
  @observable currentMenu = 2
  @observable disableScroll = false
  @observable likeArticleList = []

  constructor(isServer, showSelectMenu, currentMenu, disableScroll, likeArticleList) {
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

  @action changeCurrentMenu = (id) => {
    this.currentMenu = id
  }

  @action setLikeArticleList = (list) => {
    this.likeArticleList = list
  }

}

export function initStore(isServer, showSelectMenu = false, currentMenu = 2, disableScroll = false, likeArticleList = []) {
  if (isServer) {
    return new Store(isServer, showSelectMenu, currentMenu, disableScroll, likeArticleList)
  } else {
    if (store === null) {
      store = new Store(isServer, showSelectMenu, currentMenu, disableScroll, likeArticleList)
    }
    return store
  }
}
