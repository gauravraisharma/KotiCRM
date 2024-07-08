import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { deleteAccountRequest } from "../../../redux-saga/modules/account/action";
import { deleteInvoiceRequest } from "../../../redux-saga/modules/invoice/action";
import { deleteContact } from "../../../redux-saga/modules/contact/action";
import { DeleteEmployee } from "../../../redux-saga/modules/userManagement/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DeleteRole } from "../../../redux-saga/modules/permissionManagement/apiService";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  accountId?: any;
  invoiceId?: any;
  contactId?:number;
  userId?:string;
  roleId?:string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  accountId,
  invoiceId,
  contactId,
  userId,
  roleId
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (accountId != null) {
      dispatch(deleteAccountRequest(accountId));
    } else if (invoiceId != null) {
      dispatch(deleteInvoiceRequest(invoiceId));
    } else if (contactId) {
      dispatch(deleteContact(contactId));
    }else if(userId){
      try {
        await DeleteEmployee(userId);
        toast.success("Employee deleted successfully");
    } catch (error) {
        toast.error('Cannot delete employee, please try again later');
    }      navigate("/users");
    }
    else if(roleId){
      try {
        const response = await DeleteRole(roleId);
        if (response.status == 200) {
          toast.success("Role deleted successfully");
          onConfirm();
          return true;
        } else {
          toast.warn("Role is assigned to user, can not be deleted");
        }
      } 
      catch (error) {
        toast.error('Cannot delete role, please try again later');
      }      
    }
    onConfirm();
  };

  return isOpen ? (
    <div className="backdrop">
      <div className="delete-confirmation-modal card">
        <div className="modal-content">
          <div className="modal-header flex-column">
            <TiDeleteOutline className="deleteicon" />

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
      </div>
    </div>
  ) : (
    <React.Fragment />
  );
};

export default DeleteConfirmationModal;
