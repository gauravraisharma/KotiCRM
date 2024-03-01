// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const MyForm = () => {
//   return (
//     <div>
//       <h1>My Form</h1>
//       <Formik
//         initialValues={{
//           email: '',
//           password: ''
//         }}
//         validationSchema={Yup.object({
//           email: Yup.string().email('Invalid email address').required('Required'),
//           password: Yup.string().required('Required')
//         })}
//         onSubmit={(values, { setSubmitting }) => {
//           setTimeout(() => {
//             alert(JSON.stringify(values, null, 2));
//             setSubmitting(false);
//           }, 400);
//         }}
//       >
//         <Form>
//         <div>
//             <label htmlFor="accountOwner">Account Owner </label>
//             <Field type="accountOwner" id="accountOwner" name="accountOwner" />
//             <ErrorMessage name="accountOwner" />
//           </div>
//           <div>
//             <label htmlFor="accountName">Account Name</label>
//             <Field type="accountName" id="accountName" name="accountName" />
//             <ErrorMessage name="accountName" />
//           </div>
//           <div>
//             <label htmlFor="accountSite">Account Site </label>
//             <Field type="accountSite" id="accountSite" name="accountOwner" />
//             <ErrorMessage name="accountSite" />
//           </div>
//           <div>
//             <label htmlFor="accountOwner">Account Owner </label>
//             <Field type="accountOwner" id="accountOwner" name="accountOwner" />
//             <ErrorMessage name="accountOwner" />
//           </div>
          

//           <div>
//             <label htmlFor="password">Password</label>
//             <Field type="password" id="password" name="password" />
//             <ErrorMessage name="password" />
//           </div>

//           <button type="submit">Submit</button>
//         </Form>
//       </Formik>
//     </div>
//   );
// };

// export default MyForm;

import { FC } from 'react'

interface Props {
  backToAccountList: () => void;
}

const NewAccount: FC<Props> = ({ backToAccountList }) => {
  const handleSave = () => {
    backToAccountList();
  };

  return (
    <div>
      new charts
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default NewAccount;