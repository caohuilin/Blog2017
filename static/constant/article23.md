# React Hooks -- 实现 useListStore

列表页是开发业务过程中最常见的需求之一，封装其相关逻辑当然是必不可少的。

今天通过实现一个 useListStore 来学习一下如何实现自定义 Hooks。

首先先来简单讲讲 Hooks，Hooks 可以在写函数组件的时候使用 React 的 state、生命周期等特性。Hooks 以 use 开头， 在使用时需满足：
1. 只能在 React 函数组件中使用 Hooks
2. 只能在函数顶层使用 Hooks

React 本身提供了很多 Hooks， 比如 useState, useEffect 等等，我们什么时候需要自定义 Hooks 呢？List 是个典型的例子，当需要在超过一个组件中实现相同的逻辑的时候，我们可以把相同的逻辑提取出来进行封装，这样既能提高代码效率也能减少犯错的机会。封装逻辑其实也是一个函数，当然可以使用 Hooks 的一些特性和已有的 Hooks 进行封装，这个就是自定义Hooks。

接下来我们分析一个 List 这个 Hooks 中需要实现哪些功能呢？
1. 维护 Table 基本信息， current（当前页数）, pageSize(每一页对象数目)，sort(排序字段)，order(排序顺序)，total(当前对象总数)。
2. 维护对象当前数据(data)， 当上述条件变化时重新获取或计算数据，我这里以重新获取为例， 分页、排序的计算逻辑交由请求数据方处理。
3. 维护 loading 状态，当前获取数据过程中，需要维护加载中状态。

根据需求来看看这个 Hooks 应该怎么实现
1. Table 的基本信息可以通过 useState 去保存和更改
2. 当前数据也可以通过 useState 操作，获取数据的方式需要通过外部获取，所以需要一个参数 listData。
3. Table 状态变化重新获取数据可以使用 useEffect 实现。
4. loading 状态当然也使用 useState 维护。
5. Hooks 需要将 (data)数据, loading 状态，Table 信息及更改 Table 信息返回，提供给使用者。

接下来上代码：
```
interface IListParams {
  sort: string
  order: 'asc' | 'desc'
  pageNo: number
  pageSize: number
}
// T 为泛型，用来推断 data 中每一项数据的类型
function useListStore<T>(listData: (params: IListParams) => Promise<{ result: T[], total: number}> {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sort, setSort] = useState('updateTime')
  const [order, setOrder] = useState(OrderShortType.Descend)
  const [total, setTotal] = useState(0)
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  
  const searchParams = useMemo(
    () => ({
      sort,
      order,
      pageNo: current,
      pageSize
    }),
    [sort, order, current, pageSize]
  )
  
// tableOrder 和 tablePagination 的计算使为了方便 Antd table 的使用，不需要在组件中重新计算，如果你使用其他组件库，按照需求来决定是否需要
  const tableOrder = useMemo(
    () => ({
      [sort]: order
    }),
    [sort, order]
  )
  
  const tablePagination = useMemo(
    () => ({
      current,
      pageSize,
      total,
      showSizeChanger: true,
      pageSizeOptions: defaultPageSizeOptions
    }),
    [current, pageSize, total]
  )
  
  const listDataFunc = useCallback(async () => {
    setLoading(true)
    try {
      const { results, total } = await listData(searchParams)
      setLoading(false)
      setData(results)
      setTotal(total)
    } catch (e) {
      setLoading(false)
      // 抛出错误提示信息
      toaster.error(e.Message || e.message)
    }
  }, [searchParams, listData])
  
  const handleTableChange = useCallback(
    (
      pagination: { current: number; pageSize: number },
      _filter: IKeyValues,
      sorter: { columnKey: string; order: OrderType }
    ) => {
      setCurrent(pagination.current)
      setPageSize(pagination.pageSize)
      setSort(sorter.columnKey)
      setOrder(sorter.order)
    },
    []
  )  
  
  useEffect(() => {
    listDataFunc()
  }, [listDataFunc])
  
  return {
    loading,
    data,
    tableOrder,
    tablePagination,
    handleTableChange
  }
}
```

这样，一个 list 的自定义  Hooks 就实现了。

接下来我们看看 组件内部如何使用：
```
// 获取数据函数，根据业务需求实现
function listFunc() {
  return Promise.resolve({ result: [], total: 0})
}
function List() {
    const {
    data,
    loading,
    tableOrder,
    tablePagination,
    handleTableChange
    // IData 根据业务需求定义
  } = useListStore<IData>({
    listData: listFunc
  })
  
  return (
   <Table 
     dataSource={data} 
     pagination={tablePagination}
     onChange={handleTableChange} 
     loading={loading}
     {...otherAttrs}
   />
  )
}
```
使用起来是不是简单了很多，table 相关逻辑将不在组件内部维护，从而使组件更加精干，易于开发和维护。

自定义 Hooks 是不是超级简单，赶快看看自己的代码中哪里可以实现，动手写一个吧！React Hooks -- 实现 useListStore