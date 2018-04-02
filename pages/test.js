import * as React from 'react'
import JSONFormatter from 'json-formatter-js'

export default class Home extends React.Component {
  // componentDidMount() {
  //   const dom = document.getElementById('test')
  //   const myJSON = {ans: 42};
  //   const formatter = new JSONFormatter(myJSON);
  //   console.log(dom)
  //   dom.appendChild(formatter.render())
  // }
  render() {
    return (
      <div id='test'></div>
    )
  }
}
