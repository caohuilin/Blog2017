import { action, observable } from 'mobx'

let store = null

class Store {
  @observable lastUpdate = 0
  @observable light = false
  @observable num = 1

  constructor(isServer, lastUpdate, num) {
    this.lastUpdate = lastUpdate
    this.num = num
  }

  @action start = () => {
    this.timer = setInterval(() => {
      this.lastUpdate = Date.now()
      this.light = true
    })
  }

  @action add = () => {
    this.num = this.num + 1
  }

  stop = () => clearInterval(this.timer)
}

export function initStore(isServer, lastUpdate = Date.now(), num = 1) {
  if (isServer) {
    return new Store(isServer, lastUpdate, num)
  } else {
    if (store === null) {
      store = new Store(isServer, lastUpdate, num)
    }
    return store
  }
}
