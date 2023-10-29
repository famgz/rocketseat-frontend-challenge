import { useEffect, useState } from "react";


useEffect(() => {
    //perform localStorage action
    const item = localStorage.getItem('key')
}, [])


export function useLocalStorage<T>(item: string) {
    const [value, setValue] = useState(
        JSON.parse(
            localStorage.getItem(item) ?? ''
        )
    )

    const updateLocalStorage = (newValue: T) => {
        setValue(newValue);
        localStorage.setItem(
            item,
            JSON.stringify(newValue)
        );
    }

    return {
        value,
        updateLocalStorage
    }
}
