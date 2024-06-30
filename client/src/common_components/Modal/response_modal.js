import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MyVerticallyCenteredModal=({
    props,
    message='',
    
})=> {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Message 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ${message}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal