import { useEffect, useState} from 'react'

// unknown 相当于严格版的any
// unknown 不能赋给任何一个值
export const isFalsy = (value: unknown)=> value === 0 ? false : !value

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObj = (object: object) =>{
  const result = {...object}
  Object.keys(object).forEach(key =>{ 
    // @ts-ignore
    const value = result[key]
    if(isFalsy(value)){
    // @ts-ignore
      delete result[key]
    }
  })
  return result
}

// coustem不能在普通函数中使用，需要有大写命名，或者组件和其他hook中运行
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
}

// 防抖
// export const debounce = (fn, wait) =>{
//   let timer = null;
//   return function (...args) {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn.apply(this, args);
//     }, wait);
//   };
// }

// 自定义hooks 防抖写法
// TODO: 需要用泛型来解决any的问题
export const useDebounce = <V>(value: V, delay?: number) =>{ 
  console.log(value)
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() =>{
    // 每次在value变化以后，设置一个定时器
    const temeout = setTimeout(() => setDebounceValue(value), delay)
    // 每次在上一个useEffect处理完以后再运行 
    return () => clearTimeout(temeout)
  },[value, delay])

  return debounceValue
}

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value]
      copy.splice(index,1)
      setValue(copy)
    }
  }
}