import React, { useEffect, useState } from "react";
import { CButton } from "@coreui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import Select from "react-select";
import "../../css/style.css";

interface Owner {
  id: string;
  name: string;
}

interface FormValues {
  accountOwner: string;
  accountSite: string;
  parentAccount: string;
  accountNumber: string;
  accountType: string;
  industry: string;
  annualRevenue: string;
  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingCode: string;
  billingCountry: string;
  rating: string;
  phone: string;
  fax: string;
  website: string;
  ownership: string;
  discription: string;
}

const NewAccount: React.FC<{ backToAccountList: () => void }> = ({
  backToAccountList,
}) => {
  const handleSave = () => {
    backToAccountList();
  };

  const validationSchema = Yup.object().shape({
    // Define validation rules for your form fields
  });

  const [owners, setOwners] = useState<Owner[]>([]);

  useEffect(() => {
    fetchOwnersFromBackend();
  }, []);

  const fetchOwnersFromBackend = () => {
    fetch("your_backend_api_endpoint")
      .then((response) => response.json())
      .then((data: Owner[]) => {
        setOwners(data);
      })
      .catch((error) => {
        console.error("Error fetching owners:", error);
      });
  };

  const initialValues: FormValues = {
    accountOwner: "",
    accountSite: "",
    parentAccount: "",
    accountNumber: "",
    accountType: "",
    industry: "",
    annualRevenue: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingCode: "",
    billingCountry: "",
    rating: "",
    phone: "",
    fax: "",
    website: "",
    ownership: "",
    discription: "",
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">Create Account</h5>
            </div>
            <div>
              <button
                type="button"
                id="cancel"
                className="btn btn-outline-dark"
              >
                Cancel
              </button>
              <button type="button" id="save" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            {/* Left Form */}
            <h6>Account Information</h6>
            <Col md={6}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                <Form id="leftForm">
                  <div className="form-group row">
                    <label
                      htmlFor="accountOwner"
                      className="col-sm-3 col-form-label"
                    >
                      Account Owner
                    </label>
                    <div className="col-sm-9">
                      <Field name="accountOwner">
                        {({ field, form }) => (
                          <Select
                            {...field}
                            value={owners.find(
                              (owner) => owner.id === form.values.accountOwner
                            )}
                            onChange={(option) =>
                              form.setFieldValue("accountOwner", option.id)
                            }
                            options={owners.map((owner) => ({
                              value: owner.id,
                              label: owner.name,
                            }))}
                          />
                        )}
                      </Field>
                    </div>
                  </div>

                  {/* Add other form fields similarly */}

                </Form>
              </Formik>
            </Col>
            {/* End Left Form */}

            {/* Right Form */}
            <Col md={6}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                <Form id="rightForm">
                  {/* Add form fields here */}
                </Form>
              </Formik>
            </Col>
            {/* End Right Form */}
          </Row>
        </CardBody>
      </Card>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default NewAccount;
