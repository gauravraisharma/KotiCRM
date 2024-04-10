import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from "@coreui/react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { UserLogin } from "../../../models/userAccount/login";
import { ToastContainer } from "react-toastify";
import { loginRequest, startLoading, workerLoader } from "../../../redux-saga/modules/auth/action";
import CIcon from "@coreui/icons-react";
import "react-toastify/dist/ReactToastify.css";
import "../../../css/style.css"
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const fetchLoader = useSelector(
  //   (state: any) => state.authReducer.isLoading
  // );
  // console.log("", fetchLoader)

  const [user, setUser] = useState({
    userName: "",
    password: "",
    rememberMe: false,
  });
  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleLoginClick = async () => {
    setLoading(true);
    const userLogin: UserLogin = {
      userName: user.userName,
      password: user.password,
      rememberMe: user.rememberMe,
    };
    try {
      await dispatch(loginRequest(userLogin, navigate));
      // await dispatch(workerLoader(true))
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };


  return (
    <>
      {/* {loading ?  <div className="spinner-backdrop">
        <CSpinner className="spinner" color="primary" />
      </div>: ''} */}
      {/* <CSpinner color="primary" /> */}
      

      {/* <div className="bg-light min-vh-100 d-flex flex-row align-items-center"> */}
      <div className="login-bg">
      <div className="login-bg-image min-vh-100 d-flex flex-row align-items-center">
        <ToastContainer />
        <CContainer>
    
            <CRow className="justify-content-center">
              <CCol md={8}>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm>
                        <h1>Login</h1>
                        <p className="text-medium-emphasis">
                          Sign In to your account
                        </p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Username"
                            autoComplete="username"
                            name="userName"
                            onChange={handleChange}
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            name="password"
                            onChange={handleChange}
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CFormCheck
                            type="checkbox"
                            id="rememberMe"
                            label="Remember Me"
                            name="rememberMe"
                            checked={user.rememberMe}
                            onChange={(e) =>
                              setUser({ ...user, rememberMe: e.target.checked })
                            }
                          />
                        </CInputGroup>
                        <CRow>
                          <CCol xs={6}>
                            <CButton
                              color="primary"
                              className="px-4"
                              onClick={handleLoginClick}
                              // disabled={loading}
                            >
                              {/* {loading ? "Logging in..." : ""} */}
                              Login
                            </CButton>
                          </CCol>
                          <CCol xs={6} className="text-right">
                            <CButton color="link" className="px-0">
                              Forgot password?
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                  <CCard
                    className="text-white bg-primary py-5"
                    style={{ width: "44%" }}
                  >
                    <CCardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                        <Link to="/register">
                          <CButton
                            color="primary"
                            className="mt-3"
                            active
                            tabIndex={-1}
                          >
                            Register Now!
                          </CButton>
                        </Link>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
    
        </CContainer>
      </div>
      </div>
    </>
  );
};

export default Login;