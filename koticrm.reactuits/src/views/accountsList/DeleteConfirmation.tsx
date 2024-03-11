import React from 'react';
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from 'react-redux';
import { deleteAccountRequest } from '../../redux-saga/action';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  id: any;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onCancel, onConfirm, id }) => {

  const dispatch = useDispatch();
  const DeleteAccount=()=>{
    dispatch(deleteAccountRequest(id));
    onConfirm();
  }

  return ( isOpen? <div className='backdrop'> <div className="delete-confirmation-modal card">
      <h6 className="confirmation-message">Are you sure you want to delete?</h6>
      <TiDeleteOutline  className='deleteMessage'/>
      <div className="confirmation-buttons">
        <button className='btn btn-primary' onClick={DeleteAccount}>Yes</button>
        <button className='btn btn-secondary' onClick={onCancel}>No</button>
      </div>
    </div> </div>: <React.Fragment />
  );
};

export default DeleteConfirmationModal;