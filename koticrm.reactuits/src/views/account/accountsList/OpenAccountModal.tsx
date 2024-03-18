import React from 'react';
import { Formik, Form, Field } from 'formik';

interface ModalProps {
  onClose: () => void;
  rowData: {
    id: number;
    phone: string;
    country: string;
  };
  handleSave: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, rowData, handleSave }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
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
            handleSave();
            onClose(); // Close modal after saving
          }}
        >
          {() => (
            <Form>
              <label htmlFor="phone">Phone:</label>
              <Field type="text" id="phone" name="phone" />
              <label htmlFor="country">Country:</label>
              <Field type="text" id="country" name="country" />
              <button type="submit">Save</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Modal;
