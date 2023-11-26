import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useState,useEffect} from 'react'
import { cleanObj,useMount,useDebounce } from "utils"
import qs from "qs"

const apiurl = process.env.REACT_APP_APP_URL
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name:'',
    personId:'',
  })
  const [list, setList] = useState([])

  const debouncedParam = useDebounce(param, 500)

  useEffect(()=>{
    fetch(`${apiurl}/projects?${qs.stringify(cleanObj(debouncedParam))}`).then(async (res)=>{
      if(res.ok){
        setList(await res.json())
      }
    })
  }, [debouncedParam])

  useMount(()=>{
    fetch(`${apiurl}/users`).then(async (res)=>{
      if(res.ok){
        setUsers(await res.json())
      }
    })
  })

  return <div>
    <SearchPanel users={users} param = {param} setParam={setParam}  />
    <List users={users} list={list} />
  </div>
}