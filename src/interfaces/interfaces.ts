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
    rank : string,
    image : string,
    IdNumber : string,
    playedMatches : number
    cancelledMatches : number,
    id:string
}
 export interface request  {
    rank : string,
    image : string,
    title:string

}
