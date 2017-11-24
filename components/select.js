import * as React from 'react';
import Link from 'next/link';
import { Motion, spring } from 'react-motion';
import { inject, observer } from 'mobx-react';
import * as _ from 'lodash';

const selects = [
  {
    id: 0,
    value: 'HTML'
  },
  {
    id: 1,
    value: 'CSS'
  },
  {
    id: 2,
    value: 'ALL'
  },
  {
    id: 3,
    value: 'JavaScript'
  },
  {
    id: 4,
    value: 'HTTP'
  },
  {
    id: 5,
    value: 'React'
  },
  {
    id: 6,
    value: '其他'
  }
]
@inject('store')
@observer
class Select extends React.Component {
  getPosition = id => {
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
  };
  showMenu = () => {
    this.props.store.showMenu()
  }

  hideMenu = () => {
    this.props.store.hideMenu()
  }
  handleScroll = e => {
    e.preventDefault()
    e.stopPropagation()
    const y = e.deltaY
    const currentMenu = this.props.store.currentMenu
    let nextMenu = currentMenu;
    if (y > 100) {
      nextMenu = nextMenu + 1 === selects.length ? 0 : nextMenu + 1
    }
    if (y < 100) {
      nextMenu = nextMenu - 1 === -1 ? selects.length - 1 : nextMenu - 1
    }
    if (nextMenu !== currentMenu) {
      this.props.store.changeCurrentMenu(nextMenu)
    }
  }
  handleKeyDown = e => {
    const code = e.keyCode
    const currentMenu = this.props.store.currentMenu
    const showSelectMenu = this.props.store.showSelectMenu
    let nextMenu = currentMenu;
    if (showSelectMenu) {
      if (code === 38) {
        nextMenu = nextMenu + 1 === selects.length ? 0 : nextMenu + 1
      }
      if (code === 40) {
        nextMenu = nextMenu - 1 === -1 ? selects.length - 1 : nextMenu - 1
      }
      if (nextMenu !== currentMenu) {
        this.props.store.changeCurrentMenu(nextMenu)
      }
    }
  }
  throttledScroll = _.throttle(this.handleScroll, 500, { trailing: false });
  throttledKeyDown = _.throttle(this.handleKeyDown, 100, { trailing: false });
  componentDidMount() {
    window.addEventListener('keydown', this.throttledKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.throttledKeyDown);
  }
  render() {
    const { showSelectMenu, currentMenu } = this.props.store;
    return (
      <div className="menu">
        <div className="selected">
          <ul onMouseOut={this.hideMenu} onWheel={this.throttledScroll}>
            {selects.map(item => {
              let k = item.id - currentMenu;
              const t1 = selects.length + item.id - currentMenu;
              const t2 = item.id - selects.length - currentMenu;
              k = k > 2 && t2 <= 2 ? t2 : k;
              k = k < -2 && t1 >= 0 ? t1 : k;
              const height = 50 - Math.abs(k) * 10;
              const fontSize = 30 - Math.abs(k) * 5;
              const opacity = 1 - Math.abs(k) * 0.2;
              const translate = showSelectMenu ? this.getPosition(k) : 0;
              const filter = Math.abs(k) / 5.0;
              return (
                <Motion key={item.id} style={{ x: spring(translate) }}>
                  {({ x }) => {
                    const style = {
                      height: height,
                      lineHeight: `${height}px`,
                      fontSize: fontSize,
                      opacity: opacity,
                      transform: `translateY(${x}px)`,
                      textShadow: `0 0 ${filter}px rgba(94, 94, 94, 1)`
                    };
                    return (
                      <li
                        key={item.id}
                        className={`item-${Math.abs(k)}`}
                        style={style}
                        onMouseOver={this.showMenu}
                      >
                        <span>{item.value}</span>
                        {k === 0 && showSelectMenu && <i className="iconfont">&#xe607;</i>}
                        {k === 0 && !showSelectMenu && <i className="iconfont">&#xe608;</i>}
                      </li>
                    );
                  }}
                </Motion>
              );
            })}
          </ul>
        </div>
        <span className="line" />
      </div>
    );
  }
}

export default Select;