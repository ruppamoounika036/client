
const ModalPopup = (props) => {

  return (
    <div className={`modal-outer ${props.modalClassName} ${props.hideClassName} ${props.gameOverClassName}`}> 
      {props.children}
    </div>
  );
}

export default ModalPopup;