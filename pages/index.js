import React from 'react';
import { Provider } from 'mobx-react';
import Layout from '../components/layout';
import Select from '../components/select';
import Article from '../components/article';
import { initStore } from '../store';
import style from '../styles/main.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.store = initStore(
      props.isServer,
      props.showSelectMenu,
      props.currentMenu
    );
  }

  getInitialProps({ req }) {
    const isServer = !!req;
    const store = initStore(isServer);
    return {
      isServer,
      showSelectMenu: store.showSelectMenu,
      currentMenu: store.currentMenu
    };
  }

  render() {
    const blurStyle = {
      textShadow: `0 0 4px rgba(94, 94, 94, 1)`
    };
    return (
      <Provider store={this.store}>
        <Layout>
          <style dangerouslySetInnerHTML={{ __html: style }} />
          <Select />
          <Article />
        </Layout>
      </Provider>
    );
  }
}
