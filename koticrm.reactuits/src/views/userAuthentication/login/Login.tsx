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
import { loginRequest, loginSuccess } from "../../../redux-saga/modules/auth/action";
import CIcon from "@coreui/icons-react";
import "../../../css/style.css"
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const isLoading = useSelector((state: any) => state.authReducer.isLoading);
  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState({
    userName: "",
    password: "",
    rememberMe: false,
  });
  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleLoginClick = async () => {
      const userLogin: UserLogin = {
      userName: user.userName,
      password: user.password,
      rememberMe: user.rememberMe,
    };
    try {
      setLoading(true); 
      dispatch(loginRequest(userLogin, navigate));
    }
    catch(ex){
      console.log(ex)
    }
}


  return (
    <>
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      {loading && isLoading && (
        <div className="spinner-backdrop">
          <CSpinner size="sm"
            color="white"
            style={{ width: '5rem', height: '5rem', borderWidth: '0.60rem', zIndex: '9999' }}
          />
        </div>
      )}
      <ToastContainer />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" type="email" autoComplete="username" name="userName"

                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput type="password" placeholder="Password" autoComplete="current-password" name="password"
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
                        onChange={(e) => setUser({ ...user, rememberMe: e.target.checked })}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12}>
                        <CButtonGroup>
                          <CButton color="primary" className="px-4" onClick={handleLoginClick}>Login</CButton>
                          <CButton color="secondary" className="px-4" onClick={() => navigate('/')}>Cancel</CButton>
                        </CButtonGroup>
                      </CCol>
                      <CCol xs={12} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
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
    </>
  )
}

export default Login;