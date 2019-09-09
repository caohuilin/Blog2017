import * as React from 'react'
import classnames from 'classnames'
import { Motion, spring } from 'react-motion'
import { inject, observer } from 'mobx-react'
import * as _ from 'lodash'
import { Store } from '../store';
import selects from '../static/constant/selects'

interface ISelectProps{
  store?: Store
}
@inject('store')
@observer
class Select extends React.Component<ISelectProps, {}> {
  timer: any = null
  timer2: any = null
  getPosition = (id: number) => {
    switch (id) {
      case 0:
        return 0
      case 1:
        return 50
      case 2:
        return 90
      case -1:
        return -40
      case -2:
        return -70
      default:
        return 0
    }
  }
  showMenu = () => {
    this.props.store!.showMenu()
  }

  hideMenu = () => {
    this.timer2 = setTimeout(this.props.store!.hideMenu, 500)
  }

  handleMouseOver = () => {
    if (this.timer2) clearTimeout(this.timer2)
    this.timer = setTimeout(this.showMenu, 500)
  }
  handleMouseOut = () => {
    if (this.timer) clearTimeout(this.timer)
    this.hideMenu()
  }
  handleScroll = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const y = e.deltaY
    const currentMenu = this.props.store!.currentMenu
    let nextMenu = currentMenu
    if (y > 100) {
      nextMenu = nextMenu + 1 === selects.length ? 0 : nextMenu + 1
    }
    if (y < 100) {
      nextMenu = nextMenu - 1 === -1 ? selects.length - 1 : nextMenu - 1
    }
    if (nextMenu !== currentMenu) {
      this.props.store!.changeCurrentMenu(nextMenu)
    }
  }
  handleKeyDown = (e: any) => {
    const code = e.keyCode
    const currentMenu = this.props.store!.currentMenu
    const showSelectMenu = this.props.store!.showSelectMenu
    let nextMenu = currentMenu
    if (showSelectMenu) {
      if (code === 38) {
        nextMenu = nextMenu + 1 === selects.length ? 0 : nextMenu + 1
      }
      if (code === 40) {
        nextMenu = nextMenu - 1 === -1 ? selects.length - 1 : nextMenu - 1
      }
      if (nextMenu !== currentMenu) {
        this.props.store!.changeCurrentMenu(nextMenu)
      }
    }
  }
  handleClick = (id: number) => {
    this.props.store!.changeCurrentMenu(id)
  }
  throttledScroll = _.throttle(this.handleScroll, 500, { trailing: false })
  throttledKeyDown = _.throttle(this.handleKeyDown, 100, { trailing: false })
  componentDidMount() {
    if (window) window.addEventListener('keydown', this.throttledKeyDown)
  }
  componentWillUnmount() {
    if (window) window.removeEventListener('keydown', this.throttledKeyDown)
    if (this.timer) clearTimeout(this.timer)
    if (this.timer2) clearTimeout(this.timer2)
  }
  render() {
    const { showSelectMenu, currentMenu } = this.props.store!
    return (
      <div className="menu">
        <div className="selected">
          <ul onWheel={this.throttledScroll}>
            {selects.map(item => {
              let k = item.id - currentMenu
              const t1 = selects.length + item.id - currentMenu
              const t2 = item.id - selects.length - currentMenu
              k = k > 2 && t2 <= 2 ? t2 : k
              k = k < -2 && t1 >= 0 ? t1 : k
              const height = 50 - Math.abs(k) * 10
              const fontSize = 30 - Math.abs(k) * 5
              const opacity = (showSelectMenu && k <= 2) || k === 0 ? 1 - Math.abs(k) * 0.2 : 0
              const translate = showSelectMenu ? this.getPosition(k) : 0
              const filter = Math.abs(k) / 5.0
              return (
                <Motion key={item.id} style={{ x: spring(translate), y: spring(opacity) }}>
                  {({ x, y }) => {
                    const style = {
                      height: height,
                      lineHeight: `${height}px`,
                      fontSize: fontSize,
                      opacity: y,
                      transform: `translateY(${x}px)`,
                      WebkitTransform: `translateY(${x}px)`,
                      msTransform: `translateY(${x}px)`,
                      textShadow: `0 0 ${filter}px rgba(94, 94, 94, 1)`
                    }
                    return (
                      <li
                        key={item.id}
                        className={`item-${Math.abs(k)}`}
                        style={style}
                        onMouseOver={this.handleMouseOver}
                        onMouseOut={this.handleMouseOut}
                        onClick={this.handleClick.bind(null, item.id)}
                      >
                        <span><a>{item.value}</a></span>
                        {k === 0 && (
                          <i
                            className={classnames({
                              iconfont: true,
                              'rotate-180': showSelectMenu,
                              'iconfont-transition': true
                            })}
                          >
                            &#xe607;
                          </i>
                        )}
                      </li>
                    )
                  }}
                </Motion>
              )
            })}
          </ul>
        </div>
        <span className="line" />
      </div>
    )
  }
}

export default Select
