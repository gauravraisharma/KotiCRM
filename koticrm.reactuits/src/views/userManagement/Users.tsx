import { CButton } from '@coreui/react';
import React from 'react'
import { Link } from 'react-router-dom';

const Users = () => {
  return (
    <div>
      this is user
      <Link to={`/users/createOrUpdateUser`}>
                        <CButton
                          component="input"
                          type="button"
                          color="secondary"
                          value="Create"
                        />
                      </Link>
    </div>
  )
}

export default Users;
