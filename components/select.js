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
];
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
  };

  hideMenu = () => {
    this.props.store.hideMenu()
  };
  handleScroll = (e) => {
    console.log('aa');
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
  throttledScroll = _.throttle(this.handleScroll, 500, { trailing: false })
  render() {
    const { showSelectMenu, currentMenu } = this.props.store;
    console.log('bb', currentMenu);
    return (
      <div className="menu">
        <div className="selected">
          {/* <label onMouseOver={this.showMenu()}>
            <span>{selects[currentMenu].value}</span> <i className="iconfont">&#xe605;</i>
          </label> */}
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
              console.log('li', item.id, item.value, k, translate);
              return (
                <Motion key={item.id} style={{ x: spring(translate) }}>
                  {({ x }) => {
                    const style = {
                      height: height,
                      lineHeight: `${height}px`,
                      fontSize: fontSize,
                      opacity: opacity,
                      transform: `translateY(${x}px)`,
                    };
                    return (
                      <li
                        key={item.id}
                        className={`item-${Math.abs(k)}`}
                        style={style}
                        onMouseOver={this.showMenu}
                      >
                        <span>{item.value}</span>
                        {k === 0 && <i className="iconfont">&#xe605;</i>}
                      </li>
                    );
                  }}
                </Motion>
              );
            })}
          </ul>
        </div>
        <span className='line'/>
      </div>
    );
  }
}

export default Select;
