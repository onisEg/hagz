import Modal from 'react-bootstrap/Modal';
import { topUser } from '../../interfaces/interfaces';

const ViewTopUser = ({show,handleClose,name,upComing,idNumber,playedMatches,cancelledMatches,image}:topUser) => {
  return (
    <div>
      
    <Modal aria-labelledby="contained-modal-title-vcenter"
      centered  size="xl" show={show} onHide={handleClose}>
      <Modal.Header className="justify-content-center headerInfo pb-1 " >
        <Modal.Title className="modalTitle"><span className="titleOfHeader position-relative">Request details</span></Modal.Title>
        <span onClick={handleClose} className="position-absolute  cancelModal"><i className="fa-solid fa-xmark fa-1x"></i></span>
      </Modal.Header>
      <Modal.Body >
<div className="d-flex align-items-center gap-5">
<div className="inputs d-flex flex-column justify-content-between w-50">
<div className="coolinput">
  <label htmlFor="input" className="text">Name:</label>
  <input  type="text" defaultValue={name}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">Start date:</label>
  <input  type="text" defaultValue={'9/7/2024'}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">Total upcoming reservations:</label>
  <input  type="text" defaultValue={upComing}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">Location:</label>
  <input  type="text" defaultValue={'Alseeb,oman'}  className="form-control modalInputs"/>
</div>
<div className="coolinput">
  <label htmlFor="input" className="text">Id number:</label>
  <input  type="text" defaultValue={idNumber}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">Total played games:</label>
  <input  type="text" defaultValue={playedMatches}  className="form-control modalInputs"/>
</div>

      <div className="coolinput">
  <label htmlFor="input" className="text">Total cancelled reservations:</label>
  <input  type="text" defaultValue={cancelledMatches}  className="form-control modalInputs"/>
</div>
</div>

<div className="owner d-flex flex-column align-items-center w-75 gap-5">
<div className="ownerImg">
<img src={image} alt="court image" />
</div>

<button className="btn w-100 saveEdit text-white">Save Edits</button>

</div>
</div>

        
      </Modal.Body>

    </Modal>
    </div>
  )
}

export default ViewTopUser
