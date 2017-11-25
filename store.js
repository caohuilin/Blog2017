import { action, observable } from 'mobx'

let store = null

class Store {
  @observable showSelectMenu = false
  @observable currentMenu = 2
  @observable disableScroll = false

  constructor(isServer, showSelectMenu, currentMenu, disableScroll) {
    this.showSelectMenu = showSelectMenu
    this.currentMenu = currentMenu
    this.disableScroll = disableScroll
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

}

export function initStore(isServer, showSelectMenu = false, currentMenu = 2, disableScroll = false) {
  if (isServer) {
    return new Store(isServer, showSelectMenu, currentMenu, disableScroll)
  } else {
    if (store === null) {
      store = new Store(isServer, showSelectMenu, currentMenu, disableScroll)
    }
    return store
  }
}
