import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import deleteConfirm from '../../assets/images/nodata.png';
import React from 'react';

interface deleteItem {
    show :boolean,
    handleClose:()=>void,
    title:string,
    DeletedItem:()=>void


}

 const DeleteConfirm : React.FC<deleteItem> =({show,handleClose,title,DeletedItem})=> {



  return <>
  
  <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        
        </Modal.Header>
        <Modal.Body >
            <div className="modal-container text-center ">
              <img src={deleteConfirm} alt="no data" />
              <h4>{title}</h4>
              <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
            </div>

        </Modal.Body>
        <Modal.Footer>
     
          <Button  variant="danger" onClick={DeletedItem}>
                Delete
          
          </Button>
        </Modal.Footer>
      </Modal>
  </>
}
export default DeleteConfirm