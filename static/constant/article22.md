# React Hooks -- 实现一个 Steps 组件 

最近在封装业务相关的基础组件，正好新开坑，趁这个机会试试一直想入坑的 React Hooks。

今天准备以实现一个 Steps 组件为例，讲讲 Hooks 怎么玩。

## 需求：

1. 包装 antd 的 steps 组件，支持其所有功能
2. 支持通过数组的方式传递 steps
3. 增加 ControlButton 功能，支持上一步和下一步按钮
4. 支持根据当前步骤实现判断上一步按钮和下一步按钮的 disable 状态
5. 下一步按钮支持最后一步时自定义按钮文字及点击事件回调

## 组件使用姿势：

### 姿势一
```
import React from 'react'
import Steps from '../steps'

const { Step, ControlButton } = Steps

export default function() {
  const [step, setStep] = React.useState(0)
  const handleSave = () => {
    console.log('save')
  }
  return (
    <Steps current={step}>
      <Step title="第一步" />
      <Step title="第二步" />
      <Step title="第三步" />
      <ControlButton
        lastStepText="保存"
        onStepChange={setStep}
        onStepLast={handleSave}
      />
    </Steps>
  )
}
```

### 姿势二
```
import * as React from 'react'
import Steps from '../steps'

const { ControlButton } = Steps

export default function() {
  const [step, setStep] = React.useState(0)
  const handleSave = () => {
    console.log('save')
  }
  const steps = [{ title: '第一步' }, { title: '第二步' }, { title: '第三步' }]
  return (
    <Steps current={step} steps={steps}>
      <ControlButton
        lastStepText="保存"
        onStepChange={setStep}
        onStepLast={handleSave}
      />
    </Steps>
  )
}
```

整理好需求之后，我们正式开始使用Hooks进行组件的封装。

首先包装一下Antd的steps组件， 这个就很简单了， 直接上代码：
```
import React from 'react'
import AntdSteps, { StepsProps } from 'antd/es/steps'

const Step = AntdSteps.Step

function Steps(props: StepsProps) {
  return <AntdSteps {...props}/>
}

Steps.Step = Step
```

写到这里，你可能会说看起来啥都没干嘛！确实，但是我们已经完成了需求一的任务，为后面的任务做准备。

接下来实现 steps 的 props，也直接上代码：
```
import React from 'react'
import AntdSteps, { StepsProps, StepProps } from 'antd/es/steps'

const Step = AntdSteps.Step

interface IStepsProps extends StepsProps {
  /**
   * 所有步骤
   */
  steps?: StepProps[]
}
function Steps(props: IStepsProps) {
  const { steps = [], ...otherProps } = props
  return (
    <AntdSteps {...otherProps}>
      {steps.map((step, index) => (
        <Step key={index} {...step}></Step>
      ))}
    </AntdSteps>
  )
}

Steps.Step = Step
```

这个也超级简单，换个姿势使用而已。

接下来有意思的就来了，我们要实现 ControlButton。

尝试分析一下 ControlButton 组件完成其功能除了正常的 props 之外，它还需要其他信息吗？如果想不明白，可以先实现一下看看：
```
import React from 'react'
import Button from 'antd/es/button'

interface IControlButtonProps {
  /**
   * 最后一步时下一步的文字
   */
  lastStepText?: string
  /**
   * 下一步按钮在当前步骤下是否禁用
   */
  nextDisabled?: boolean
  /**
   * step 更改回调
   */
  onStepChange?: (current: number) => void
  /**
   * 最后一步点击回调
   */
  onStepLast?: () => void
}
function ControlButton(props: IControlButtonProps) {
  const { lastStepText, nextDisabled, onStepChange, onStepLast } = props
  const handlePreStep = () => {
    // todo
  }
  const handleNextStep = () => {
    // todo
  }
  return (
    <>
      <Button
        onClick={handlePreStep}
      >
        上一步
      </Button>
      <Button
        type="primary"
        onClick={handleNextStep}
      >
        下一步
      </Button>
    </>
  )
}
```

实现到这里应该想到了，需要知道两个信息：
1. 当前处于哪个步骤
2. 当前是否在最后一个步骤

拥有这两个信息才能去实现 button 的 disable 状态及下一步按钮的文字及回调函数。

这两个信息应该从哪里获取呢？

最简单的方式，使用组件的用户当然知道，给 ControlButton 新加两个 props 来通过用户获取当前的步骤及当前步骤总数即可。
除了用户知道之外，其实用户已经告知 Steps 组件，作为有洁癖的你肯定不能忍，Steps 组件已经拥有的信息，为什么还需要再重新给子组件传递一次！！！
这时就需要父子组件的信息共享，但是我们组件的需求，又不能直接通过 props 传递。这时 Context（上下文）登上了舞台。

简单介绍一下 Context，Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。最简答的场景就是需要经过多层组件进行 props 传递的时候，Context 实现了组件之间不用显示的逐层传递 props 进行共享信息。

其实使用 Context 已经很久了，一直觉得很难用是因为经常会找不到 Context 中的值得来源，在遇到问题的时候很难 debugger。直到看到了hooks的用法，突然觉得它很好用。

首先我们来定义 Context:
```
import React from 'react'

interface IStepContext {
  /**
   * 当前步骤长度
   */
  count: number
  /**
   * 当前所处步数
   */
  current: number
}
export const StepsContext = React.createContext<IStepContext>({
  count: 0,
  current: 1
})

const { Provider } = StepsContext

export { Provider }
```

接着我们在 Steps 中使用 Context，将信息传递给子组件， 对应的也整理一下组件，将组件的children 展示出来：
```
import React from 'react'
import AntdSteps, { StepsProps, StepProps } from 'antd/es/steps'
import ControlButton from './ControlButton'
import { Provider } from './context'

interface IStepsProps extends StepsProps {
  /**
   * 所有步骤
   */
  steps?: StepProps[]
}

export default function Steps(props: React.PropsWithChildren<IStepsProps>) {
  const { current, steps = [], children, ...otherProps } = props
  const stepsContextValue = {
      count: steps.length, //？
      current: current || 0
  }
  return (
    <Provider value={stepsContextValue}>
      <AntdSteps
        {...otherProps}
        current={current}
      >
        {steps.map((step, index) => {
          return <Step key={index} {...step}></Step>
        })}
        {children}
      </AntdSteps>
    </Provider>
  )
}

Steps.Step = Step
Steps.ControlButton = ControlButton
```

首先推荐个神器，React.PropsWithChildren<T>，使用该泛型可以自动帮你补充 children的props

上面代码我在 steps.length 那里打了个问号，原因这个值是不准确的，当我们直接使用 Step 组件时，count 应该怎么得到呢？除非 Step 组件自己支持计数，对，包装一下 Step 组件支持计数。
包装之前，我们先使用 Context 把 ControlButton 完善。在 Hooks 中直接通过 useContext 的内置 hooks 进行上下文绑定，非常简单：
```
import React, { useContext } from 'react'
import Button from 'antd/es/button'

interface IControlButtonProps {
  /**
   * 最后一步时下一步的文字
   */
  lastStepText?: string
  /**
   * 下一步按钮在当前步骤下是否禁用
   */
  nextDisabled?: boolean
  /**
   * step 更改回调
   */
  onStepChange?: (current: number) => void
  /**
   * 最后一步点击回调
   */
  onStepLast?: () => void
}
function ControlButton(props: IControlButtonProps) {
  const { lastStepText, nextDisabled, onStepChange, onStepLast } = props
  const { count: stepCount, current } = useContext(StepsContext)
  const isLastStep = current === stepCount - 1
  const handlePreStep = () => {
    if (current > 0 && onStepChange) {
      onStepChange(current - 1)
    }
  }
  const handleNextStep = () => {
    if (isLastStep && onStepLast) {
      onStepLast()
    }
    if (!isLastStep && onStepChange) {
      onStepChange(current + 1)
    }
  }
  return (
    <>
      <Button
        onClick={handlePreStep}
        disabled={current === 0}
      >
        上一步
      </Button>
      <Button
        type="primary"
        onClick={handleNextStep}
        disabled={nextDisabled || (isLastStep && !lastStepText)}
      >
        下一步
      </Button>
    </>
  )
```

我们接下来需要几步：
1. 在 Steps 组件定义统计信息的 state (暂定 stepLength),并定义其增加步骤( incCount )和减少步骤函数( desCount )
> (desCount用于Step组件销毁时调用，保证代码健壮性)
2. 需要将 incCount 和 desCount 函数也挂在 Context 上，用于 Step 组件调用
4. 包装 Step 组件，支持计数逻辑

> 下方代码为增量，需放置组件对应位置

Steps:
```
const [stepLength, setStepLength] = useState(0)

const handleAddSteps = () => {
   setStepLength(prevState => prevState + 1)
}
const handleRemoveSteps = () => {
  setStepLength(prevState => prevState - 1)
}
const stepsContextValue = {
   count: stepLength,
   current: current || 0,
   incCount: handleAddSteps,
   desCount: handleRemoveSteps
}
```
 
这里需注意，每一次 step 的增加和减少都是基于上一次的值进行更改，通过 useState 获取到的stepLength的值不是最新的，需要通过回调函数实现，在每一次操作时先确保拿到最新值。

Context:
```
interface IStepContext {
  ...
  /**
   * 增加步数
   */
  incCount: () => void
  /**
   * 减少步数
   */
  desCount: () => void
}
export const StepsContext = React.createContext<IStepContext>({
  ...,
  incCount: () => undefined,
  desCount: () => undefined
})
```

Step:
```
import React, { useContext, useEffect } from 'react'
import AntdSteps, { StepsProps, StepProps } from 'antd/es/steps'
import { StepsContext } from '../context'

export default function Step(props: StepProps) {
  const { incCount, desCount } = useContext(StepsContext)
  useEffect(() => {
    incCount()
    return () => {
      desCount()
    }
  }, [incCount, desCount])
  return <AntdSteps.Step {...props} />
}
```

这里用到了 Hooks 的 useEffect 进行副作用操作，实现了加载组件是进行 incCount 函数的调用和销毁组件时进行 desCount 函数的调用。

到这里，整个 Steps 组件逻辑就全部实现了，我们使用到了 Hooks 的 useState 进行状态及变更函数定义，使用 useEffect 进行了生命周期操作，使用了 useContext 进行组件之间的信息共享。

接下来再看看组件需要进行哪些优化。

使用函数组件你会发现每一次定义的变量和函数在组件重新渲染时会重新计算，这样加重了组件的计算逻辑，Hooks 还提供了一些内置的 Hooks 进行一些优化。下面针对我们现在的场景具体看看。

### useCallback

useCallback 实现了回调函数仅在某个依赖项改变时才会更新，我们现在的场景里面 Steps 组件的 handleAddSteps 和 handleRemoveSteps 方法可以进行改造：
```
  const handleAddSteps = useCallback(() => {
    setStepLength(prevState => prevState + 1)
  }, [])


  const handleRemoveSteps = useCallback(() => {
    setStepLength(prevState => prevState - 1)
  }, [])
  ```
由于这两个函数没有别的依赖，所以依赖数组为空。

### useMemo

useMemo 实现了变量仅在某个依赖改变时才会更新，Steps 组件计算 contextValue 的逻辑可使用 useMemo 进行优化:
当然这里逻辑比较简单，useMemo 用于计算开销比较大的场景优化会比较明显
```
  const stepsContextValue = useMemo(() => {
    return {
      count: stepLength,
      current: current || 0,
      incCount: handleAddSteps,
      desCount: handleRemoveSteps
    }
  }, [current, stepLength, handleAddSteps, handleRemoveSteps])
  ```
只有当依赖数组中的值变化时，stepsContextValue 的值才会重新计算。

当然代码中还有其他地方可以优化，可以尝试使用上述方式进行优化。

恭喜你，使用 React Hooks 完成了 Steps 组件的封装。
