export default function login(flag = false, action) {
    switch (action.type) {
        case 'login':
            return {flag:true,user:action.user}
        case 'out':
            return {flag:false}
        default:
            return {flag:false}
    }
}