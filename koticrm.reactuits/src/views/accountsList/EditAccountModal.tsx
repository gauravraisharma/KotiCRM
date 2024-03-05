import React, { useState } from 'react';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from './OpenAccountModal'; // Import your modal component

const EditPage: React.FC = () => {

    const validationSchema = Yup.object().shape({
        accountName: Yup.string().required("Required(Account Name)"),
        owner: Yup.string().required("Required (Owner)"),
        phone: Yup.string().required("Required (Phone)"),
        website: Yup.string().required("Required (Website)"),
    });

    const [showModal, setShowModal] = useState(false);

    const handleEditClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <h1>Edit Page</h1>
            <Formik
                initialValues={{
                    accountName: "",
                    owner: "",
                    phone: "",
                    website: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    // You can handle form submission here
                    console.log(values);
                    setSubmitting(false);
                }}
            >
                <Form>
                    <div className="form-group row">
                        <label htmlFor="accountName" className="col-sm-3 col-form-label">Account Name</label>
                        <div className="col-sm-9">
                            <Field type="text" className="form-control" name="accountName" />
                            <ErrorMessage
                                name="accountName"
                                component="div"
                                className="error"
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="owner" className="col-sm-3 col-form-label">Owner</label>
                        <div className="col-sm-9">
                            <Field type="text" className="form-control" name="owner" />
                            <ErrorMessage
                                name="owner"
                                component="div"
                                className="error"
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="phone" className="col-sm-3 col-form-label">Phone</label>
                        <div className="col-sm-9">
                            <Field type="text" className="form-control" name="phone" />
                            <ErrorMessage
                                name="phone"
                                component="div"
                                className="error"
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="website" className="col-sm-3 col-form-label">Website</label>
                        <div className="col-sm-9">
                            <Field type="text" className="form-control" name="website" />
                            <ErrorMessage
                                name="website"
                                component="div"
                                className="error"
                            />
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <button onClick={handleEditClick}>Edit</button>
            {showModal && <Modal onClose={closeModal} />}
        </div>
    );
};

export default EditPage;
