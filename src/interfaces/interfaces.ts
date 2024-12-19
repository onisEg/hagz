import { ReactElement } from "react";

export interface LoginFormData {
    email: string;
    password: string;
  }
  export interface RegisterData extends LoginFormData {
    country :string,
    phoneNumber : number|string,
    confirmPassword : string,
    userName : string
  }

  export interface ForgetPasswordData {
    email : string

  }
  export interface resetPasswordData extends LoginFormData  {
    otp : string,
    confirmPassword : string
  }



  export interface info  {
    title : string,
    id : number,
    icon : string,
    number : number
}
 export interface topUser  {
    rank? : string,
    image : string,
    idNumber : string,
    playedMatches : string
    cancelledMatches : string,
    id:string,
    upComing:string,
    name:string,
    show:boolean,
    handleClose:()=>void

}

 export interface pendingRequestInfo  {
  courtName : string,
    image : string,
    
    Price:string,

    Description:string,
    ownerName : string,
    category : string,
    status : string,
    idNumber : string,
    id :number,
    userName:string,
    amountPaid:string,
    date:string,
    playedTimes:string,
    appProfit:string,
    invoices:string

}

export interface header {
  title : string,
  img : string,
  svg: ReactElement,
  from?:string
}


export interface CourtDet {
  userName:string,
  idNumber : string,
  amountPaid : string,
  date:string,
  appProfit:string,
  playedTimes:string,courtName:string,
  registrationNumber:string,
  location:string

}