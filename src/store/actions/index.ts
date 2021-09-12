import { getData } from '../../api/index'
import { GET_DATA,SHOW_INPUT,SET_VALUE } from "../counterSlice";

export const getdata = async (dispatch: any, value: string) => {
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
export const showInput = async (dispatch: any, value: string) => {
    await dispatch(SHOW_INPUT(!!value))
}