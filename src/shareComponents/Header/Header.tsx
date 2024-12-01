import styles from './header.module.css'
export default function Header({title,img,svg}) {
return <>

<div className={styles.headerWrapper}>
<div className="d-flex justify-content-between align-items-center">
<h2>
    {title}
</h2>
    <div className='d-flex align-items-center'>
    <div className={styles.headerSvg}>
    {svg}
    </div>
    <img src={img} alt="" />
    </div>
</div>

</div>
</>
}
