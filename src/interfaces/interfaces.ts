export interface LoginFormData {
    email: string;
    password: string;
  }

  export interface ForgetPasswordData {
    email : string

  }
  export interface resetPasswordData extends LoginFormData  {
    otp : string,
    confirmPassword : string
  }