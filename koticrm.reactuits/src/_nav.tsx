import CIcon from '@coreui/icons-react'
import {cilSpeedometer,cilBook,cilContact,cibMarketo,cibEventStore,cibPaypal,
  cibMarkdown,cilApplications,cilSettings,cilMoney, cilUser,
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
    name: 'Leads',
    to: '/theme/typography',
    icon: <CIcon icon={cibMarketo} customClassName="nav-icon" />,
    moduleName : 'Leads'

  },
  {
    component: CNavItem,
    name: 'Events',
    to: '/theme/typograph',
    icon: <CIcon icon={cibEventStore} customClassName="nav-icon" />,
    moduleName : 'Events'

  },
  {
    component: CNavItem,
    name: 'Leaves',
    to: '/theme/typography',
    icon: <CIcon icon={cilApplications} customClassName="nav-icon" />,
    moduleName : 'Leaves'

  },
  {
    component: CNavItem,
    name: 'Payroll',
    to: '/theme/typography',
    icon: <CIcon icon={cibPaypal} customClassName="nav-icon" />,
    moduleName : 'Payroll'

  },
  {
    component: CNavItem,
    name: 'Attendance',
    to: '/theme/typography',
    icon: <CIcon icon={cibMarkdown} customClassName="nav-icon" />,
    moduleName : 'Attendance'

  },
  {
    component: CNavItem,
    name: 'Settings',
    to: '/theme/typography',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    moduleName : 'Settings'

  },
  {
    component: CNavItem,
    name: 'Manage Roles',
    to: '/roles',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    moduleName : 'ManagePermission'

  },
  ]

export default _nav
