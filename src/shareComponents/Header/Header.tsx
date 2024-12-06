import { header } from '../../interfaces/interfaces'
import styles from './header.module.css'

 const Header:React.FC<header> = ({title,img,svg,from}) =>{
return <>

<div className={styles.headerWrapper}>
<div className="d-flex justify-content-between align-items-center position-relative ">
<h2>
    {title}
</h2>
    <div className={from == 'dashboard' ? 'd-flex align-items-center ' :'svgWrapper'}>
    <div className={from !='dashboard' ? `${styles.headerSvg}` : `${styles.headerSvgDashboard}`}>
    {svg}
    </div>
    <img src={img} alt="" />
    </div>
</div>

</div>
</>
}
export default Header