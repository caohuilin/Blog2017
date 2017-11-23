import Head from 'next/head';
import React from 'react';
import Link from './link';
import reset from '../styles/reset.css';
import layout from '../styles/layout.css';

export default ({ children, title = "caohuilin's blog" }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="body">
      <style dangerouslySetInnerHTML={{ __html: reset }} />
      <style dangerouslySetInnerHTML={{ __html: layout }} />
      <div className="page">
        <header>
          <div id="logo">=CHL</div>
          <nav>
            <ul>
              <li>
                <Link href="/">
                  <a className="nav-link home-link">Home</a>
                </Link>
              </li>
              <li>
                <Link href="https://hi-hi.cn/chlresume/">
                  <a className="nav-link">Resume</a>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </div>
    </div>
  </div>
);
