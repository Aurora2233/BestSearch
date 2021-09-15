interface data {
    login_token: string,
    search_phrase:string
}
interface infoParamType {
    login_token: string,
    id:number
}
export let getData = (data:data) => {
    return fetch("http://3.141.23.218:5000/interview/keyword_search", {
        method: 'POST',
        body:JSON.stringify(data)
    })
}

export let getProductList = (data:data) => {
    return fetch("http://3.141.23.218:5000/interview/keyword_search", {
        method: 'POST',
        body:JSON.stringify(data)
    })
}
export let getProductInfo = (data:infoParamType) => {
    return fetch("http://3.141.23.218:5000/interview/get_product_by_id", {
        method: 'POST',
        body:JSON.stringify(data)
    })
}