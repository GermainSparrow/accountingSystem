let p ={
    a:'123',
    b:'456',
    c:'789'
}
let temp = ''
for(let key in p){
    temp+=`'${key}' = '${p[key]}' `
}
console.log(temp,0-'100')