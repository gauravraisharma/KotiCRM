import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import {
  CreateAttachment,
  CreateAttachmentClass,
} from "../../models/attachment/Attachment";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { createAttachment } from "../../redux-saga/modules/attachment/action";
import GetModulePermissions from "../../utils/Shared/GetModulePermissions";

interface Props {
  accountId: number;
  isVisible: boolean;
  handleClose: () => void;
}

const CreateNewAttachment = ({ accountId, isVisible, handleClose }: Props) => {
  const dispatch = useDispatch();
  const [newAttachment, setNewAttachment] = useState<CreateAttachment>(
    new CreateAttachmentClass()
  );
  const [submitting, setSubmitting] = useState(false);
  const accountsPermissions = GetModulePermissions("Accounts");

  const resetForm = () => {
    setNewAttachment(new CreateAttachmentClass());
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setNewAttachment({
          ...newAttachment,
          file,
        });
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const formDataToSend = new FormData();
      formDataToSend.append("userId", newAttachment.userID);
      formDataToSend.append("accountID", accountId.toString());
      formDataToSend.append("file", newAttachment.file as Blob);

      dispatch(createAttachment(formDataToSend));
      resetForm();
      handleClose();
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CModal
      alignment="center"
      scrollable
      visible={isVisible}
      onClose={handleClose}
      aria-labelledby="VerticallyCenteredScrollableExample"
      size="lg"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredScrollableExample">
          Create Attachment
        </CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleFormSubmit}>
        <CModalBody>
          <CRow className="justify-content-between">
            <CCol xs={12}>
              <CFormInput
                type="file"
                id="file"
                name="file"
                onChange={(event) => handleFileChange(event)}
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleClose}>
            Close
          </CButton>
          <CButton type="submit" color="primary" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  );
};

export default CreateNewAttachment;
