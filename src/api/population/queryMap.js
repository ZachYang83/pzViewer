import request from "utils/request.js"

export function postPopData(url,data){
    return request({
        url,
        method:'post',
        data,
    })
}

export function postOccuData(url,data){
    console.log(data,'data')
    return request({
        url,
        method:'post',
        data,
    })
}

export function postHjData(url,data){
    return request({
        url,
        method:'post',
        data,
    })
}

export function postNlData(url,data){
    return request({
        url,
        method:'post',
        data,
    })
}

export function postWorkLive(url,data){
    return request({
        url,
        method:'post',
        data,
    })
}




