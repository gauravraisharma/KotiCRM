import { Formik, Form, Field } from 'formik';
import React from 'react';
import { Account } from '../../models/account/Account';

interface ModalProps {
  rowData: Account;
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
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default ModalComponent;