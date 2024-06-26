import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { deleteAccountRequest, deleteInvoiceRequest } from "../../redux-saga/action";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  accountId: any;
  invoiceId :any;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  accountId,
  invoiceId
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    debugger  
    if(accountId != null){
    dispatch(deleteAccountRequest(accountId));
    }
    else if(invoiceId != null){
      dispatch(deleteInvoiceRequest(invoiceId))
    }
    onConfirm();
  };

  return isOpen ? (
    <div className="backdrop">
      {" "}
      <div className="delete-confirmation-modal card">
        <div className="modal-content">
          <div className="modal-header flex-column">
          <TiDeleteOutline className="deleteicon"/>

            <h4 className="modal-title w-100 ">Are you sure?</h4>
          </div>
          <div className="modal-body">
            <p>Do you really want to delete the record?</p>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-secondary mx-2"
              onClick={onCancel}
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>{" "}
    </div>
  ) : (
    <React.Fragment />
  );
};

export default DeleteConfirmationModal;
