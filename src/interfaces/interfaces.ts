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