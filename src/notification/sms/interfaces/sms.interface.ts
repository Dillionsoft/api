
export interface ISmsInput{
    to:string
    message:string
}


export interface ISmsService{
    sendBulk: (data:ISmsInput[])=>void
    send: (data:ISmsInput)=>void
}