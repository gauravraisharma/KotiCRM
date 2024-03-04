import React, { useState, useEffect, FormEvent } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import "../../css/style.css";
import { useDispatch } from "react-redux";
import { createAccountRequest, getAccountOwner, getAccountStatus, getAccountType, getIndustry } from "../../redux-saga/action";
import { useSelector } from "react-redux";
import { Account } from "../../models/account/Account";

const initialValues={
  accountOwner: "",
  industry: "",
  type: "",
  status: "",
  annualRevenue: "",
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
const validationSchema = Yup.object().shape({
  accountOwner: Yup.string().required("Required"),
  industry: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
  annualRevenue: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  fax: Yup.string().required("Required"),
  website: Yup.string().required("Required"),
  billingStreet: Yup.string().required("Required"),
  billingCity: Yup.string().required("Required"),
  billingState: Yup.string().required("Required"),
  billingCode: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const MyForm: React.FC = () => {

  const dispatch = useDispatch();
  const [account, setAccount] = useState({
    accountOwner: '', industry: 0, type : 0,status:0,annualRevenue:'',phone:'',fax:'',
    website:'', billingStreet: '', billingCity:'',billingState:'',billingCode:'',country:'',description:''
  })
  const handleChangeData = (e:any) => {
    setAccount({ ...account, [e.target.name]: e.target.value })
  }

  const handleCreateAccountClick = () => {
debugger
    const accountDetail : Account = {
      ownerId : account.accountOwner,
      industryId : parseInt(account.industry.toString(), 10),
      type : parseInt(account.type.toString(), 10),
      status: parseInt(account.status.toString(), 10),
      annualRevenue : account.annualRevenue,
      phone: account.phone,
      fax : account.fax,
      website : account.website,
      billingStreet :account.billingStreet,
      billingCity : account.billingCity,
      billingState: account.billingState,
      billingCode : account.billingCode,
      country: account.country,
      description : account.description,
      createdBy : account.accountOwner,
      createdOn : '2024-03-04T18:17:12.146Z',
      modifiedBy : account.accountOwner,
      modifiedOn : '2024-03-04T18:17:12.146Z',
      isactive :true,
      isdelete : false,   
    };
    dispatch(createAccountRequest(accountDetail));
  };





  useEffect(() => {
    dispatch(getAccountOwner());
    dispatch(getAccountStatus());
    dispatch(getAccountType()); 
    dispatch(getIndustry());
  }, [dispatch]);

  const accountOwner =  useSelector((state: any) => state.reducer.accountOwner);
  const industry =  useSelector((state: any) => state.reducer.industry);
  const accountStatus =  useSelector((state: any) => state.reducer.accountStatus);
  const accountType =  useSelector((state: any) => state.reducer.accountType);

  const {handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleCreateAccountClick


  })

  return (
    <div>
      <h6>Account Form</h6> 
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleCreateAccountClick}
      >
        {({ isSubmitting ,handleChange}) => (
          <div className="card">
             <div className="card-body">
              <h4>Create Account</h4>
          <Form >
            <div className="form-group row">
              <label htmlFor="accountOwner"className="col-sm-3 col-form-label">Account Owner</label>
              <div className="col-sm-9">
              <Field as="select" name="accountOwner"  onChange={(e:any) => { handleChangeData(e); handleChange(e) }}
>
                <option value="">Select Account Owner</option>
                {accountOwner?.map((owner : any) => (
                  <option key={owner.id} value={owner.id}
                  >
                    {owner.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="accountOwner" component="div" className="error" />
            </div>
            </div>
            <div className="form-group row">
              <label htmlFor="industry" className="col-sm-3 col-form-label">Industry</label>
              <div className="col-sm-9">
              <Field as="select" name="industry" onChange={(e:any) => { handleChangeData(e); handleChange(e) }}
>
                <option value="">Select Industry</option>
                {industry?.map((industry :any) => (
                  <option key={industry.id} value={industry.id}>
                    {industry.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="industry" component="div" className="error" />
            </div>
            </div>

            <div className="form-group row">
              <label htmlFor="type" className="col-sm-3 col-form-label">Type</label>
              <div className="col-sm-9">
              <Field as="select" name="type"   onChange={(e:any) => { handleChangeData(e); handleChange(e) }}
>
                <option value="">Select Type</option>
                {accountType?.map((type:any) => (
                  <option key={type.value} value={type.value}>
                    {type.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="type" component="div" className="error" />
            </div>
            </div>

            <div className="form-group row">
              <label htmlFor="status" className="col-sm-3 col-form-label">Status</label>
              <div className="col-sm-9">
              <Field as="select" name="status" onChange={(e:any) => { handleChangeData(e); handleChange(e) }}
>
                <option value="">Select Status</option>
                {accountStatus?.map((status:any) => (
                  <option key={status.value} value={status.value}>
                    {status.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="status" component="div" className="error" />
            </div>
            </div>

            <div className="form-group row">
              <label htmlFor="annualRevenue" className="col-sm-3 col-form-label">Annual Revenue</label>
              <div className="col-sm-9">
              <Field type="annualRevenue" name="annualRevenue" onChange={(e:any) => { handleChangeData(e); handleChange(e) }}/>
              <ErrorMessage
                name="annualRevenue"
                component="div"
                className="error"
              />
            </div>
            </div>
            <div className="form-group row">
              <label htmlFor="phone" className="col-sm-3 col-form-label">Phone</label>
              <div className="col-sm-9">
              <Field type="phone" name="phone" onChange={(e:any) => { handleChangeData(e); handleChange(e) }}/>
              <ErrorMessage name="phone" component="div" className="error" />
            </div>
            </div>
            <div className="form-group row">
              <label htmlFor="fax" className="col-sm-3 col-form-label">Fax</label>
              <div className="col-sm-9">
              <Field type="fax" name="fax" onChange={(e:any) => { handleChangeData(e); handleChange(e) }}/>
              <ErrorMessage name="fax" component="div" className="error" />
            </div>
            </div>
            <div className="form-group row">
              <label htmlFor="website" className="col-sm-3 col-form-label">Website</label>
              <div className="col-sm-9">
              <Field type="website" name="website"onChange={(e:any) => { handleChangeData(e); handleChange(e) }}/>
              <ErrorMessage name="website" component="div" className="error" />
            </div>
            </div>
           
            <div className="form-group row">
              <label htmlFor="billingStreet" className="col-sm-3 col-form-label">Billing Street</label>
              <div className="col-sm-9">
              <Field type="billingStreet" name="billingStreet"onChange={(e:any) => { handleChangeData(e); handleChange(e) }}/>
              <ErrorMessage
                name="billingStreet"
                component="div"
                className="error"
              />
            </div>
            </div>
            <div className="form-group row">
              <label htmlFor="billingCity"className="col-sm-3 col-form-label" >Billing City</label>
              <div className="col-sm-9">
              <Field type="billingCity" name="billingCity" onChange={(e:any) => { handleChangeData(e); handleChange(e) }}/>
              <ErrorMessage
                name="billingCity"
                component="div"
                className="error"
              />
            </div>
            </div>
            <div className="form-group row">
              <label htmlFor="billingState"className="col-sm-3 col-form-label">Billing State</label>
              <div className="col-sm-9">
              <Field type="billingState" name="billingState"onChange={(e:any) => { handleChangeData(e); handleChange(e) }}/>
              <ErrorMessage
                name="billingState"
                component="div"
                className="error"
              />
            </div>
            </div>
            <div className="form-group row">
              <label htmlFor="billingCode" className="col-sm-3 col-form-label">Billing Code</label>
              <div className="col-sm-9">
              <Field type="billingCode" name="billingCode" onChange={(e:any) => { handleChangeData(e); handleChange(e) }}/>
              <ErrorMessage
                name="billingCode"
                component="div"
                className="error"
              />
            </div>
            </div>
            <div className="form-group row" >
              <label htmlFor="country" className="col-sm-3 col-form-label">Country</label>
              <div className="col-sm-9">
              <Field type="country" name="country"onChange={(e:any) => { handleChangeData(e); handleChange(e) }} />
              <ErrorMessage name="country" component="div" className="error"/>
            </div>
            </div>
            <div className="form-group row">
              <label htmlFor="description" className="col-sm-3 col-form-label">Description</label>
              <div className="col-sm-9">
              <Field type="description" name="description"onChange={(e:any) => { handleChangeData(e); handleChange(e) }}/>
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />
            </div>
            </div>

            <div>
            <button type="submit" className="btn btn-primary" onClick={(e:any)=>handleSubmit}>Submit</button>
             {/* <button type="reset" className="btn btn-secondary" >Reset</button> */}
            </div>
          </Form>
          </div>
          </div>
          )}
          </Formik>
    </div>
  );
};

export default MyForm;
