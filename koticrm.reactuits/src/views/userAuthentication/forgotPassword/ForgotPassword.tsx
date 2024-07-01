import React, { useState } from "react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CIcon from "@coreui/icons-react";
import { cilEnvelopeClosed } from "@coreui/icons";
import "../../../css/style.css";
import { Link } from "react-router-dom";
import { UserForgotPassword } from "../../../redux-saga/modules/userManagement/apiService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const forgotPasswordDTO = { email };
    try {
      const result = await UserForgotPassword(forgotPasswordDTO);
      if (result.status === 200) {
        toast.success("Password reset link has been sent successfully");
        // Update state to render ResetPassword component
      } else {
        toast.error(result.data || "Failed to send password reset link");
      }
    } catch (error) {
      toast.error("An error occurred while sending the password reset link");
    }
  };


  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center forgot-password-page">
        <ToastContainer />
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={6}>
              <CCard className="shadow-lg rounded forgot-password-card">
                <CCardBody className="p-4">
                  <CForm onSubmit={handleSubmit}>
                    <h1 className="text-center">Reset Password</h1>
                    <p className="text-medium-emphasis text-center">
                      Enter your email to receive a password reset link.
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText className="bg-primary text-white">
                        <CIcon icon={cilEnvelopeClosed} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        type="email"
                        autoComplete="email"
                        name="email"
                        className="forgot-password-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow className="justify-content-end">
                      <CCol xs={12} className="d-flex justify-content-end">
                        <CButtonGroup>
                          <CButton
                            color="primary"
                            className="px-4"
                            type="submit"
                          >
                            Send Link
                          </CButton>

                          <Link to="/login">
                            <CButton color="secondary" className="px-4">
                              Go Back
                            </CButton>
                          </Link>
                        </CButtonGroup>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>

    </>
  );
};

export default ForgotPassword;
