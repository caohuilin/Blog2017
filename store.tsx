import { action, observable } from 'mobx'

let store: any = null

class Store {
  @observable lastUpdate: any = 0
  @observable light: boolean = false
  @observable num: number = 1

  private timer: any
  constructor(isServer: boolean, lastUpdate: any, num: number) {
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

  public stop = () => clearInterval(this.timer)
}

export function initStore(isServer: boolean, lastUpdate = Date.now(), num = 1) {
  if (isServer) {
    return new Store(isServer, lastUpdate, num)
  } else {
    if (store === null) {
      store = new Store(isServer, lastUpdate, num)
    }
    return store
  }
}
