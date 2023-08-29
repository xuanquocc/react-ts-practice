const arr = [
    {
        key: "key",
        do: "do"
    },
    {
        key: "key1",
        do: "do1"
    },

]

const obj = {
    key: "dl",
    key1: "ahah",
    do1: "hâh",
    do: "do"
}

arr.map((ok) => {
    console.log(obj[ok.key])
})