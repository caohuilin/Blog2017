# 错误边界(Error Boundaries)

先说一个好消息，今年终于拥抱 React16 了！
尝试了无数次的升级老项目没成功（原因是项目中有太多依赖是公司基础库），今年终于有机会脱离基础库重构整个项目，果断拥抱 React16 和 TypeScript。

今天介绍一个 React16 的新概念 —— 错误边界。
在 React 之前的版本，组件内 JavaScript 发生错误时会破坏 React 内部状态并导致它在下一次渲染时发出莫名其妙的错误，比如 [“Cannot read property 'getHostNode' of null”](https://github.com/facebook/react/issues/8579)，需要通过刷新页面的方式恢复并且无法追踪到之前发生的错误信息及堆栈。其实部分 UI 的 JavaScript 错误不应该导致整个应用崩溃，因此 React16 引入了“错误边界(Error Boundaries)”这个概念。

## 官方定义

错误边界是一种 React 组件，这种组件可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI，而不是渲染那些崩溃了的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。

## 关键点

-   组件：它可以是当前定义的任何一个组件，也可以是新建组件，定义之后像常规组件一样使用即可。当一个组件定义了生命周期方法中的任何一个（或两个）static getDerivedStateFromError() 或 componentDidCatch()，那么它就成了一个错误边界。
-   子组件树：该组件仅可以捕获所有子组件的错误，无法捕获自身的错误，如果组件出现问题自身无法处理会一直冒泡到上层的错误边界。
-   捕获错误：使用生命周期函数 componentDidCatch 捕获错误，并将错误及其堆栈信息通过参数的方式返回。该函数可以有副作用，可以通过该函数将错误信息展示出来、上报到服务器等等。
-   渲染备用 UI: 使用 static getDerivedStateFromError 生命周期， 该函数将抛出的错误作为参数，并返回一个值以更新 state， 从而使 render 函数渲染备用 UI。该函数用于渲染阶段，不允许出现副作用。
-   注意：自 React 16 起，任何未被错误边界捕获的错误将会导致整个 React 组件树被卸载。这要求我们需要去做错误边界的相关处理，不然在发生错误的时候展示给用户的是一个空白页面。当然带来的好处也非常多，用户可以不受影响的使用其他组件；我们可以通过错误堆栈信息获得更好地为用户解决问题。

## 官方使用方式

-   定义一个 ErrorBoundary 组件

```
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // 更新 state
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

-   在组件 ErrorBoundary 组件嵌套在正常组件外面使用

```
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

该使用方式如果只在最外层的组件外面包裹，会导致内部组件发生错误时整个页面都使用备用 UI，如果每个组件外面都包裹一层的话，代码写的累赘很多，可以考虑使用 hoc 的方式将 ErrorBoundary 组件包裹在需要的组件外面。

## hoc 使用方式

-   定义 hoc (我使用的 TypeScript)

```
import React, { ErrorInfo } from 'react'
interface IErrorState {
  hasError: boolean
}
/**
* Component 自己定义的组件
* fallback 备用UI
**/
export default function errorBoundary<T, S>(
  Component?: React.ComponentClass<T, S> | React.FunctionComponent<T>,
  fallback?: string | React.ReactNode
) {
  return class extends React.Component<T, IErrorState> {
    state = {
      hasError: false
    }
    static getDerivedStateFromError() {
      return { hasError: true }
    }
    componentDidCatch(error: Error, info: ErrorInfo) {
       console.log(error, errorInfo)
    }
    render() {
      if (this.state.hasError) {
        return fallback ? fallback : null
      }
      return Component ? (
        <Component {...this.props} />
      ) : (
        this.props.children
      )
    }
  }
}
```

-   使用 hoc

```
errorBoundary(MyComponent, <ErrorFallBack />)
```

## 获取其他错误信息

-   捕获事件处理器内部的错误

错误边界是无法捕获事件处理器内部的错误，我们需要使用 try/catch 进行错误捕获，如果忘记捕获错误依旧会发生一些莫名其妙的现象。对于这种情况我们可以监听“error”事件捕获相关异常。

```
window.addEventListener('error', event => {
  console.log(event)
}, true)
```

-   捕获异步任务异常，如 setTiemout，Promise 请求异常等

错误边界也无法捕获异步任务异常，仍需我们手动捕获对应的错误信息，比如 Promise 可使用.catch 的方式捕获对应的错误信息，当然也可以全局监听”unhandledrejection“事件捕获未捕获的异常。

```
window.addEventListener('unhandledrejection', event => {
   console.log(event)
})
```

这些异常的捕获可以放到 hoc 的 componentDidMount 生命周期函数中去监听，组件销毁的时候别忘了取消事件监听哦。

## 结束语

错误处理和业务代码一样重要，优雅的错误处理不仅能提高用户的使用体验，还能加强用户对产品和团队的信任。获取到的错误信息能够让我们更方便、更及时的为用户解决问题。
去看看你的 React 项目，有没有优雅的处理错误呢，如果没有，行动起来吧。
