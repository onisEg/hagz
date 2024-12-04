import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CourtSlider() {
    interface courtInfo  {
        title : string,
        image : string
    }
    const [courts, setCourts] = useState([])

    const getNewCourts = ()=>{
        axios.get(`http://localhost:3000/newCourts`).then((resp)=>{
            setCourts(resp.data)
        }).catch((err)=>{
            console.log(err);
            
        })
    }

    useEffect(()=>{
        getNewCourts()
    },[])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows:false,
      
    


        
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                arrows : false
              }
            },
            {
              breakpoint: 2000,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                arrows : false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 2,               
                 arrows : false

              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,     
                           arrows : false

              }
            }
          ]
      };
return <>
<div className="courtSlider   container  mx-0">
    <h4>Newly added courts</h4>
<Slider  {...settings}>
    {
        courts.map((court :courtInfo , index)=>      <div key={index} className="addedCourt  ">
        <div className="d-flex align-items-center courtFlex ">
            <div className="courtImage me-3">
            <img src={court.image} alt=""  />

            </div>
        <p>{court.title}</p>
        </div>
      </div>)
    }



    </Slider>
</div>
</>
}
