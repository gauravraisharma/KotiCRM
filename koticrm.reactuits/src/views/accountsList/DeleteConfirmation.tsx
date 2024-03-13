import React from "react";
// import {
//  CModal,
//   CButton,
//   CModalHeader,
//   CModalTitle,
//   CModalBody,
//   CModalFooter,

// } from "@coreui/react";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { deleteAccountRequest } from "../../redux-saga/action";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  id: any;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  id,
}) => {
  const dispatch = useDispatch();
  const DeleteAccount = () => {
    dispatch(deleteAccountRequest(id));
    onConfirm();
  };

  return isOpen ? (
    <div className="backdrop">
      {" "}
      <div className="delete-confirmation-modal card">
        <div className="modal-content">
          <div className="modal-header flex-column">
          {/* <div className="icon-box">
                    <i className="material-icons">&#xE5CD;</i>
                </div> */}
          <TiDeleteOutline className="deleteicon"/>

            <h4 className="modal-title w-100 ">Are you sure?</h4>
          </div>
          <div className="modal-body">
            <p>Do you really want to delete these records?</p>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={DeleteAccount}
            >
              Delete
            </button>
          </div>
        </div>
        {/* <CModal>
  <CModalHeader>
    <CModalTitle>React Modal title</CModalTitle>
  </CModalHeader>
  <CModalBody>
    <p>React Modal body text goes here.</p>
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary"onClick={onCancel}>Close</CButton>
    <CButton color="danger"onClick={DeleteAccount}>Delete</CButton>
  </CModalFooter>
</CModal> */}
      </div>{" "}
    </div>
  ) : (
    <React.Fragment />
  );
};

export default DeleteConfirmationModal;
