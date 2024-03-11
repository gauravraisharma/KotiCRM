import React, { useState } from 'react';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { Account } from '../../models/account/Account';
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react';
import { updateAccountRequest } from '../../redux-saga/action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


interface EditModalProps {
    closeModal: () => void;
    accountData: any,
    onBackToListButtonClickHandler: () => void;
}


const initialValues = {
    accountOwner: "",
    industry: "",
    type: "",
    status: "",
    annualRevenue: "",
    accountName: "",
    phone: "",
    fax: "",
    website: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingCode: "",
    country: "",
    description: "",
}
const EditPage: React.FC<EditModalProps> = ({ closeModal, accountData, onBackToListButtonClickHandler }) => {
    console.log(accountData)
    const dispatch = useDispatch();
    const [touchedFields, setTouchedFields] = useState({
        accountOwner: false,
        industry: false,
        type: false,
        status: false,
        accountName: false,
        annualRevenue: false,
        phone: false,
        fax: false,
        website: false,
        billingStreet: false,
        billingCity: false,
        billingState: false,
        billingCode: false,
        country: false,
        description: false

    });

    const handleInputChange = (fieldName: any) => {
        setTouchedFields((prevFields) => ({
            ...prevFields,
            [fieldName]: true, // Mark the field as touched
        }));
    };

	const validationSchema = Yup.object().shape({
		accountOwner: touchedFields.accountOwner ? Yup.string().required("Required(Account Owner)") : Yup.string(),
		industry: touchedFields.industry ? Yup.string().required("Required (Industry)") : Yup.string(),
		type: touchedFields.type ? Yup.string().required("Required (Type)") : Yup.string(),
		status: touchedFields.status ? Yup.string().required("Required (Status)") : Yup.string(),
		accountName: touchedFields.accountName ? Yup.string().required("Required(Account Name)") : Yup.string(),
		annualRevenue: touchedFields.annualRevenue ? Yup.string().required("Required (Annual Revenue)") : Yup.string(),
		phone: touchedFields.phone ? Yup.string().required("Required (Phone)").matches(/^[0-9]+$/, 'Phone number must be a number')
			.min(10, "Phone number must be at least 10 digits")
			.max(13, 'Phone number must be at most 13 digits with with country calling code') : Yup.string(),
		fax: touchedFields.fax ? Yup.string().required("Required (fax)").matches(/^\d{10}$/, 'Fax number must be exactly 10 digits') : Yup.string(),
		website: touchedFields.website ? Yup.string().required("Required (Website)").url("Website must be a valid URL") : Yup.string(),
		billingStreet: touchedFields.billingStreet ? Yup.string().required("Required (Billing Street)") : Yup.string(),
		billingCity: touchedFields.billingCity ? Yup.string().required("Required (Billing City)") : Yup.string(),
		billingState: touchedFields.billingState ? Yup.string().required("Required (Billing State)") : Yup.string(),
		billingCode: touchedFields.billingCode ? Yup.string().required("Required (Billing Code)").matches(/^\d+$/, "Billing Code must be a number")
			.min(4, "Billing Code must be at least 4 digit")
			.max(10, "Billing Code can have maximum 10 digits") : Yup.string(),
		country: touchedFields.country ? Yup.string().required("Required (Country)") : Yup.string(),
		description: touchedFields.description ? Yup.string().required("Required (Description)") : Yup.string(),
	});



    const [updateAccount, setUpdateAccount] = useState({
        accountOwner: accountData.ownerId, industry: accountData.industryId, type: accountData.type, status: accountData.status,
        accountName: accountData.accountName, annualRevenue: accountData.annualRevenue, phone: accountData.phone, fax: accountData.fax,
        website: accountData.webSite, billingStreet: accountData.billingStreet, billingCity: accountData.billingCity,
        billingState: accountData.billingState, billingCode: accountData.billingCode, country: accountData.country,
        description: accountData.description
    })
    const handleChangeData = (e: any) => {
        setUpdateAccount({ ...updateAccount, [e.target.name]: e.target.value })
    }

    const currentDate: Date = new Date();
    const formattedDateTime: string = currentDate.toISOString().slice(0, -1);

    const handleEditClick = () => {
        const accountDetail: Account = {
            id: accountData.id,
            ownerId: updateAccount.accountOwner,
            industryId: parseInt(updateAccount.industry.toString(), 10),
            type: parseInt(updateAccount.type.toString(), 10),
            status: parseInt(updateAccount.status.toString(), 10),
            accountName: updateAccount.accountName,
            annualRevenue: updateAccount.annualRevenue,
            phone: updateAccount.phone,
            fax: updateAccount.fax,
            webSite: updateAccount.website,
            billingStreet: updateAccount.billingStreet,
            billingCity: updateAccount.billingCity,
            billingState: updateAccount.billingState,
            billingCode: updateAccount.billingCode,
            country: updateAccount.country,
            description: updateAccount.description,
            createdBy: accountData.createdBy,
            createdOn: accountData.createdOn,
            modifiedBy: updateAccount.accountOwner,
            modifiedOn: formattedDateTime,
            isactive: true,
            isdelete: false,
        };
        dispatch(updateAccountRequest(accountDetail, accountData.id));
        closeModal();
    };


    const accountOwner = useSelector((state: any) => state.reducer.accountOwner);
	const industry = useSelector((state: any) => state.reducer.industry);
	const accountStatus = useSelector((state: any) => state.reducer.accountStatus);
	const accountType = useSelector((state: any) => state.reducer.accountType);

    const { handleSubmit } = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleEditClick


    })

    return (
        <div>
            <CCard>
                <CCardHeader className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-0"><strong>Update Account</strong></h5>
                        </div>
                        <div className="text-end">
                            <CButton
                                component="input"
                                type="button"
                                color="primary"
                                value="Back To Accounts"
                                onClick={onBackToListButtonClickHandler}
                            />
                        </div>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleEditClick}

                    >

                        {({ handleChange }) => (

                            <Form >
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label htmlFor="accountOwner" className="col-sm-4 col-form-label">Account Owner</label>
                                            <div className="col-sm-6">
                                                <Field as="select" name="accountOwner" className="form-control form-select"
                                                    onChange={(e: any) => { handleChangeData(e); handleChange(e); handleInputChange('accountOwner'); }}
                                                    value={updateAccount.accountOwner}
                                                >
                                                    <option value="">Select Account Owner</option>
                                                    {accountOwner?.map((owner: any) => (
                                                        <option key={owner.id} value={owner.id}
                                                        >
                                                            {owner.label}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="accountOwner" component="div" className="error form-error" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="industry" className="col-sm-4 col-form-label">Industry</label>
                                            <div className="col-sm-6">
                                                <Field as="select" name="industry" className="form-control form-select"
                                                    onChange={(e: any) => { handleChangeData(e); handleChange(e); handleInputChange('industry'); }}
                                                    value={updateAccount.industry}
                                                >
                                                    <option value="">Select Industry</option>
                                                    {industry?.map((industry: any) => (
                                                        <option key={industry.id} value={industry.id}>
                                                            {industry.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="industry" component="div" className="error form-error" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="type" className="col-sm-4 col-form-label">Type</label>
                                            <div className="col-sm-6">
                                                <Field as="select" name="type" className="form-control form-select"
                                                    onChange={(e: any) => { handleChangeData(e); handleChange(e); handleInputChange('type'); }}
                                                    value={updateAccount.type}>
                                                    <option value="">Select Type</option>
                                                    {accountType?.map((type: any) => (
                                                        <option key={type.value} value={type.value}>
                                                            {type.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="type" component="div" className="error form-error" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="status" className="col-sm-4 col-form-label">Status</label>
                                            <div className="col-sm-6">
                                                <Field as="select" name="status" className="form-control form-select"
                                                    onChange={(e: any) => { handleChangeData(e); handleChange(e); handleInputChange('status'); }}
                                                    value={updateAccount.status}>
                                                    <option value="">Select Status</option>
                                                    {accountStatus?.map((status: any) => (
                                                        <option key={status.value} value={status.value}>
                                                            {status.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="status" component="div" className="error form-error" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="accountName" className="col-sm-4 col-form-label">Account Name</label>
                                            <div className="col-sm-6">
                                                <Field type="text" value={updateAccount.accountName}
                                                    className="form-control" name="accountName"
                                                    onChange={(e: any) => { handleInputChange('accountName'); handleChangeData(e); handleChange(e) }} />
                                                <ErrorMessage
                                                    name="accountName"
                                                    component="div"
                                                    className="error form-error"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="annualRevenue" className="col-sm-4 col-form-label">Annual Revenue</label>
                                            <div className="col-sm-6">
                                                <Field type="number" value={updateAccount.annualRevenue}
                                                    className="form-control" name="annualRevenue" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
                                                <ErrorMessage
                                                    name="annualRevenue"
                                                    component="div"
                                                    className="error form-error"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="number" className="col-sm-4 col-form-label">Phone</label>
                                            <div className="col-sm-6">
                                                <Field type="phone" name="phone" value={updateAccount.phone} className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
                                                <ErrorMessage name="phone" component="div" className="error form-error" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="fax" className="col-sm-4 col-form-label">Fax</label>
                                            <div className="col-sm-6">
                                                <Field type="text" name="fax" value={updateAccount.fax} className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
                                                <ErrorMessage name="fax" component="div" className="error form-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label htmlFor="website" className="col-sm-4 col-form-label">Website</label>
                                            <div className="col-sm-6">
                                                <Field type="text" className="form-control" value={updateAccount.website} name="website" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
                                                <ErrorMessage name="website" component="div" className="error form-error" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="billingStreet" className="col-sm-4 col-form-label">Billing Street</label>
                                            <div className="col-sm-6">
                                                <Field type="text" name="billingStreet" value={updateAccount.billingStreet} className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
                                                <ErrorMessage
                                                    name="billingStreet"
                                                    component="div"
                                                    className="error form-error"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="billingCity" className="col-sm-4 col-form-label" >Billing City</label>
                                            <div className="col-sm-6">
                                                <Field type="text" name="billingCity" value={updateAccount.billingCity} className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
                                                <ErrorMessage
                                                    name="billingCity"
                                                    component="div"
                                                    className="error form-error"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="billingState" className="col-sm-4 col-form-label">Billing State</label>
                                            <div className="col-sm-6">
                                                <Field type="text" name="billingState" value={updateAccount.billingState} className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
                                                <ErrorMessage
                                                    name="billingState"
                                                    component="div"
                                                    className="error form-error"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="billingCode" className="col-sm-4 col-form-label">Billing Code</label>
                                            <div className="col-sm-6">
                                                <Field type="number" name="billingCode" value={updateAccount.billingCode} className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
                                                <ErrorMessage
                                                    name="billingCode"
                                                    component="div"
                                                    className="error form-error"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row" >
                                            <label htmlFor="country" className="col-sm-4 col-form-label">Country</label>
                                            <div className="col-sm-6">
                                                <Field type="text" name="country" value={updateAccount.country} className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
                                                <ErrorMessage name="country" component="div" className="error form-error" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="description" className="col-sm-4 col-form-label">Description</label>
                                            <div className="col-sm-6">
                                                <Field as="textarea" name="description" value={updateAccount.description} className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
                                                <ErrorMessage
                                                    name="description"
                                                    component="div"
                                                    className="error form-error"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-primary" onClick={() => handleSubmit}>Update</button>
                                </div>
                            </Form>

                        )}
                    </Formik>
                </CCardBody>
            </CCard>
        </div>
    );
};

export default EditPage;
