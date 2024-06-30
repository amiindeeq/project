import { useState , useEffect } from "react";

export function UselocalStorage<C>(key : string , initialValue : C | (() => C)) {
    const [ Value , SetValue] = useState<C>(() => {
        const jsonValue  = localStorage.getItem(key)
        if(jsonValue != null) {
            return JSON.parse(jsonValue)
        }
        if(typeof initialValue === "function") {
            return (initialValue as () => C)()
        }
        else {
            return initialValue
        }
    })
    useEffect(() => {
        localStorage.setItem(key , JSON.stringify(Value))
    } , [key , Value])
    return [ Value , SetValue] as [ typeof Value , typeof SetValue]
}