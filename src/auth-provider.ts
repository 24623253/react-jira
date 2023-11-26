//  在真实环境中，如果使用 firebase 这种第三方auth 服务的话，本文件不需要开发者开发

import { User } from 'screens/project-list/search-panel'
const apiurl = process.env.REACT_APP_APP_URL

const localStorageKey = '__auth__provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handlerUserResponse = ({user}:{user:User}) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: {username: string, password: string}) => {
  return fetch(`${apiurl}/login`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async (response)=>{
    if(response.ok){
      // return Promise.resolve(res)
      return handlerUserResponse(await response.json())
    }else{
      return Promise.reject(await response.json())
    }
  })
}

export const register = (data: {username: string, password: string}) => {
  return fetch(`${apiurl}/register`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async (res: Response)=>{
    if(res.ok){
      return handlerUserResponse(await res.json())
    }else{
      return Promise.reject(await res.json())
    }
  })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey) 