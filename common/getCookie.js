import cookieCutter from 'cookie-cutter'

const getCookie = (cookieName='') => {
    let status = ''
    if(typeof document!=='undefined'){
        status = cookieCutter.get(cookieName)
        return status
       
    };
    return status
}

export default getCookie