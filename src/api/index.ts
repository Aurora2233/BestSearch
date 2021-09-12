interface data {
    login_token: string,
    search_phrase:string
}
export let getData = (data:data) => {
    return fetch("http://3.141.23.218:5000/interview/keyword_search", {
        method: 'POST',
        body:JSON.stringify(data)
    })
}