import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilAccountLogout,
  cilSettings,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { logout } from '../../redux-saga/action';
import avatar8 from './../../assets/images/avatars/8.jpg'
import { useNavigate } from 'react-router-dom'
//import { useAuth } from '../../utils/AuthProvider'
import { useDispatch } from 'react-redux'

const AppHeaderDropdown = () => {
  const navigate = useNavigate();
   // const auth = useAuth();
    const dispatch = useDispatch();
  const handleLogout=()=>{
    localStorage.removeItem('accessToken')  
     // auth?.logout()
    dispatch(logout());
    navigate('/login')
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
              <CDropdownItem href="javascript:;">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="javascript:;">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
