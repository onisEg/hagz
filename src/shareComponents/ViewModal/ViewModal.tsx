import { IoDocumentOutline } from "react-icons/io5";
import Modal from 'react-bootstrap/Modal';
import { BsImage } from "react-icons/bs";

  interface pendingRequest {
    show:boolean|undefined ,
    handleClose:()=>void,
    ownerName:string,
    courtName:string,
    idNum:string,
    courtImage:string
  }

const ViewModal:React.FC<pendingRequest> = ({show,handleClose,ownerName,courtName,idNum,courtImage}) => {
return <>
  <Modal aria-labelledby="contained-modal-title-vcenter"
      centered  size="xl" show={show} onHide={handleClose}>
      <Modal.Header className="justify-content-center headerInfo pb-1 " >
        <Modal.Title className="modalTitle"><span className="titleOfHeader position-relative">Request details</span></Modal.Title>
        <span onClick={handleClose} className="position-absolute  cancelModal"><i className="fa-solid fa-xmark fa-1x"></i></span>
      </Modal.Header>
      <Modal.Body >
<div className="d-flex  justify-content-between gap-5">
<div className="inputs d-flex flex-column justify-content-between w-50">
<div className="coolinput">
  <label htmlFor="input" className="text">Name:</label>
  <input disabled type="text" value={ownerName}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">CourtName:</label>
  <input disabled type="text" value={courtName}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">Submit date:</label>
  <input disabled type="text" value={'9/7/2024'}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">Location:</label>
  <input disabled type="text" value={'Alseeb,oman'}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">National number:</label>
  <input disabled type="text" value={'#2356589'}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">Id number:</label>
  <input disabled type="text" value={idNum}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">Registration number:</label>
  <input disabled type="text" value={'95432687125'}  className="form-control modalInputs"/>
</div>
</div>

<div className="owner d-flex flex-column align-items-center">
<div className="ownerImg">
<img src={courtImage} alt="" />
</div>
<div className="ownerBtns d-flex gap-2 ">
<button className="btn border modalBtn"><IoDocumentOutline />
View Document
</button>
<button className="btn border modalBtn"><BsImage />

View court photos
</button>
</div>

<div className="recject-accept d-flex flex-row ">
<button className="btn btn-outline-danger" >Rejcet request</button>
<button className="btn acceptBtn" >Accept request</button>
</div>
</div>
</div>

        
      </Modal.Body>

    </Modal>
</>
}

export default ViewModal
