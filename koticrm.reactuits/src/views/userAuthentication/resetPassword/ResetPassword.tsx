import { useNavigate, useSearchParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../../css/style.css'; // Ensure your custom CSS file is imported
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ResetUserPassword } from '../../../redux-saga/modules/userManagement/apiService';

import { useEffect, useState } from 'react';

const ResetPassword: React.FC = () => {

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const navigate = useNavigate();

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);

    // Define validation schema using Yup
    const validationSchema = Yup.object({
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    // Initial form values
    const initialValues = {
        password: '',
        confirmPassword: '',
    };
    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true);
        try {
            const response = await ResetUserPassword({ email, token, password: values.password });
            if (response) {
                toast.success('Your password has been changed successfully.');
                setShowConfirmation(true);
                setTimeout(() => {
                    navigate('/login');
                }, 2000); 
            } else {
                toast.error('Password reset failed.');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error('Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };


    useEffect(() => {
        // If token or email are not present in the query params, show an error or redirect
        if (!token || !email) {
            toast.error('Invalid password reset link');
        }
    }, [token, email]);



    return (
        <>

            <div className="reset-password-container">
                <div className="reset-password-card">
                    <h2>Password Reset</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''
                                            }`}
                                    />
                                    <ErrorMessage name="password" component="div" className="error-message" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password:</label>
                                    <Field
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className={`form-control ${errors.confirmPassword && touched.confirmPassword
                                                ? 'is-invalid'
                                                : ''
                                            }`}
                                    />
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="div"
                                        className="error-message"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Resetting...' : 'Reset Password'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
                {showConfirmation && (
                    <div className="modal-background">
                        <div className="modal-content">
                            <h3>Password Reset Successful</h3>
                            <p>Your password has been successfully updated.</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setShowConfirmation(false);
                                    navigate('/login');
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                <ToastContainer />


            </div>
        </>
    );
};

export default ResetPassword;
