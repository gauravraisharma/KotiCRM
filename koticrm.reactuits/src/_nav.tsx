import CIcon from '@coreui/icons-react'
import {cilSpeedometer,cilBook,cilContact,
  cibMarkdown,cilSettings,cilMoney,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'
import { NavItem } from './models/commonModels/CommonModels'

const _nav:NavItem[] = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    moduleName : 'Dashboard'
  },
  {
    component: CNavItem,
    name: 'Accounts',
    to: '/accountsList',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
    moduleName : 'Accounts'

  },
  {
    component: CNavItem,
    name: 'Contacts',
    to: '/contacts',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
    moduleName : 'Contacts'

  },
  {
    component: CNavItem,
    name: 'Invoices',
    to: '/invoices',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    moduleName : 'Invoices'

  },

  

  {
    component: CNavItem,
    name: 'Settings',
    to: '/theme/typography',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    moduleName : 'Settings'

  },

  ]

export default _nav
