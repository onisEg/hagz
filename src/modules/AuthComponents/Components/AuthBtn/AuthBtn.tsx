
interface test {
  isSubmitting:boolean,
  title : string
}



const AuthBtn:React.FC<test> = ({isSubmitting ,title }) => {
  return (
    <button disabled={isSubmitting} className='authBtnStyle'>{isSubmitting ? <i className="fa-solid fa-spinner"></i>:title}</button>

  )
}

export default AuthBtn
