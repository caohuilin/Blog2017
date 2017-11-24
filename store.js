import { action, observable } from 'mobx'

let store = null

class Store {
  @observable showSelectMenu = false
  @observable currentMenu = 2

  constructor(isServer, showSelectMenu, currentMenu) {
    this.showSelectMenu = showSelectMenu
    this.currentMenu = currentMenu
  }

  @action showMenu = () => {
    this.showSelectMenu = true
  }

  @action hideMenu = () => {
    this.showSelectMenu = false
  }

  @action changeCurrentMenu = (id) => {
    this.currentMenu = id
  }

}

export function initStore(isServer, showSelectMenu = false, currentMenu = 2) {
  if (isServer) {
    return new Store(isServer, showSelectMenu, currentMenu)
  } else {
    if (store === null) {
      store = new Store(isServer, showSelectMenu, currentMenu)
    }
    return store
  }
}
