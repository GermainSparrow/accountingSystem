let p =[
    {
        cost:10,
        collection:5
    },
    {
        cost:20,
        collection:5
    },
    {
        cost:30,
        collection:5
    }
]
console.log(p.reduce((previous,current)=>{return previous+=current.collection-current.cost},0));