import toast from "react-hot-toast"

export const notify=(msg:any)=> toast.success(msg,{duration:300})
export const failure=(msg:any)=> toast.error(msg)