import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import { Store } from '../store';
import reset from '../styles/reset.css';
import layout from '../styles/layout.css';

interface ILayoutProps {
  store?: Store
  title: string
}
@inject('store')
@observer
export default class Layout extends React.Component<ILayoutProps, {}> {
  handleWheel = (e: any) => {
    if (this.props.store!.disableScroll) {
      e.preventDefault();
    }
  };

  handleKeyDown = (e: any) => {
    if (this.props.store!.disableScroll) {
      e.preventDefault();
    }
  };

  componentDidMount() {
    document.body.addEventListener('wheel', this.handleWheel);
    document.body.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.body.removeEventListener('wheel', this.handleWheel);
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { title, children } = this.props;
    const { showSelectMenu } = this.props.store!;
    const blurStyle = showSelectMenu
      ? {
          filter: `blur(10px)`,
          transition: `0.3s filter linear`
        }
      : {
          filter: `blur(0px)`,
          transition: `0.3s filter linear`
        };
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="body">
          <style dangerouslySetInnerHTML={{ __html: reset }} />
          <style dangerouslySetInnerHTML={{ __html: layout }} />
          <div className="page">
            <header>
              <div id="logo" style={blurStyle}>
                <Link href="/"><a>=CHL</a></Link>
              </div>
              <nav>
                <ul>
                  <li style={blurStyle}>
                    <Link href="/">
                      <a className="nav-link home-link">Home</a>
                    </Link>
                  </li>
                  <li style={blurStyle}>
                    <a
                      href="https://hi-hi.cn/chlresume/"
                      target="_blank"
                      className="nav-link"
                    >
                      Resume
                    </a>
                  </li>
                  <li style={blurStyle}>
                    <a
                      href="https://github.com/caohuilin"
                      target="_blank"
                      className="nav-link"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </nav>
            </header>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
