import { Formik, Form, Field } from 'formik';
import React from 'react';

interface RowData {
  id: string;
  name: string;
  owner: string;
  phone: string;
  country: string;
}

interface ModalProps {
  rowData: RowData;
  closeModal: () => void;
  backToAccountList: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({ rowData, closeModal, backToAccountList }) => {
  const handleSave = () => {
    backToAccountList();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Edit Row</h2>
        <Formik
          initialValues={{
            id: rowData.id,
            name: rowData.name,
            owner: rowData.owner,
            phone: rowData.phone,
            country: rowData.country,
          }}
          onSubmit={(values) => {
            console.log('Form submitted with values:', values);
            closeModal();
          }}
        >
          {() => (
            <Form>
              <label htmlFor="name">Name:</label>
              <Field type="text" id="name" name="name" />
              <label htmlFor="owner">Owner:</label>
              <Field type="text" id="owner" name="owner" />
              <label htmlFor="phone">Phone:</label>
              <Field type="text" id="phone" name="phone" />
              <label htmlFor="name">Country:</label>
              <Field type="text" id="country" name="country" />
              <button type="submit">Save</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ModalComponent;
