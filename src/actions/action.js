export function addFn() {
    return { type:'ADD' }
}
export function minusFn() {
    return { type:'MINUS' }
}

/*该action接收参数，在dispatch当前action的时候可以传递参数*/
export function changeCityFn(name) {
    return { type:'CHOOSECITY',city:name }
}


export function loginin(user){
    return { type:'login',user:user }
}
export function loginout(){
    return { type:'out' }
}