import { getData,getProductList,getProductInfo } from 'src/api/index'
import { GET_DATA,SHOW_INPUT,SET_VALUE,GET_PRODUCTS,GET_PRODUCTINFO } from "src/store/searchSlice";
import type { AppDispatch} from '../index'
export const getdata = async (dispatch: AppDispatch, value: string) => {
        let params ={
            "login_token": "INTERVIEW_SIMPLY2021",
            "search_phrase": value
        }
        let data = await getData(params)
    let { data: { product_trends } } = await data.json()
    product_trends.forEach((item:any) => {
        let created = new Date(item.created_at).toDateString().split(" ")
        let updated = new Date(item.created_at).toDateString().split(" ")
        item.created_at=created[1] +created[3]
        item.updated_at=updated[1] +updated[3]
    })
        await dispatch(SET_VALUE(value))
        await dispatch(GET_DATA(product_trends))
}
export const getProducts = async (dispatch: AppDispatch, value: string) => {
    let params ={
        "login_token": "INTERVIEW_SIMPLY2021",
        "search_phrase": value
    }
    let datajson = await getProductList(params)
    let { data: { products } } = await datajson.json()
    products.forEach((item:any) => {
        item.Time = ~~((new Date().getTime() - new Date(item.published_at).getTime())/(1000 * 3600 * 24))
    })
    await dispatch(SET_VALUE(value))
    await dispatch(GET_PRODUCTS(products))
}
export const getInfo = async (dispatch: AppDispatch, value: string) => {
    let param ={
        "login_token": "INTERVIEW_SIMPLY2021",
        "id": value
    }
    let json = await getProductInfo(param)
    let { data } = await json.json()
    console.log(data,'info');
    
    await dispatch(SET_VALUE(value))
    await dispatch(GET_PRODUCTINFO(data))
}
export const showInput = async (dispatch: AppDispatch, value: string) => {
    await dispatch(SHOW_INPUT(!!value))
}