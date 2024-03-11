import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilBook,
  cilContact,
  cibMarketo,
  cibEventStore,
  cibPaypal,
  cibMarkdown,
  cilGroup,
  cilApplications,
  cilSettings,
  cilMoney,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'
import { NavItem } from './models/commonModels/CommonModels'

const _nav:NavItem[] = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    //badge: {
    //  color: 'info',
    //  text: 'NEW',
    //},
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
    name: 'Employees',
    to: '/theme/typography',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    moduleName : 'Employees'

  },
  {
    component: CNavItem,
    name: 'Events',
    to: '/theme/typography',
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
  ]

export default _nav
