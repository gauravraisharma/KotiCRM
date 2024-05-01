import { lazy } from 'react';
import { Route } from './models/commonModels/CommonModels';
// App routing

// Containers
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'))
// Pages
const Login = lazy(() => import('./views/userAuthentication/login/Login'))
const Home = lazy(()=>import ('./views/userAuthentication/home/Home'))
const Register = lazy(() => import('./views/userAuthentication/register/Register'))
const Page404 = lazy(() => import('./views/userAuthentication/page404/Page404'))
const Page500 = lazy(() => import('./views/userAuthentication/page500/Page500'))


//settings

const Settings = lazy(() => import('./views/settings/Settings'))
const Dashboard = lazy(() => import('./views/dashboard/Dashboard'))
const Colors = lazy(() => import('./theme/colors/Colors'))
const Typography = lazy(() => import('./theme/typography/Typography'))
// Account routes
const AccountList = lazy(() => import('./views/account/accountsList/AccountList'))
const AccountDetails = lazy(() => import('./views/account/accountDetails/AccountDetails'))
const NewAccount = lazy(() => import('./views/account/createAccount/NewAccount'))
const EditAccount = lazy(()=> import('./views/account/accountsList/EditAccountModal'))
// Contact routes
const Contacts = lazy(() => import('./views/contacts/Contacts'))
const contactDetails = lazy(() => import('./views/contacts/ContactDetails'))
const CreateContact = lazy(() => import('./views/contacts/CreateOrEditContact'))

//Invoices Routes
const Invoices = lazy(() => import('./views/invoice/Invoices'))
const CreateInvoice = lazy(() => import('./views/invoice/NewInvoice'))
const EditInvoice = lazy(() => import('./views/invoice/EditInvoice'))
const InvoicePDF = lazy(()=> import('./pdf-template/InvoiceTemplate'))

//Manage Users Routes
const Users = lazy(() => import('./views/userManagement/Users'))
const UserDetail = lazy(() => import('./views/userManagement/UserDetail'))
const CreateOrUpdateUser = lazy(() => import('./views/userManagement/CreateOrUpdateUser'))

//Manage Permissions and Roles
const Roles = lazy(() => import('./views/roleManagement/Roles'))
const CreateOrUpdateRole = lazy(() => import('./views/roleManagement/CreateOrUpdateRole'))

// Base
const Accordion = lazy(() => import('./components/base/accordion/Accordion'))
const Breadcrumbs = lazy(() => import('./components/base/breadcrumbs/Breadcrumbs'))
const Cards = lazy(() => import('./components/base/cards/Cards'))
const Carousels = lazy(() => import('./components/base/carousels/Carousels'))
const Collapses = lazy(() => import('./components/base/collapses/Collapses'))
const ListGroups = lazy(() => import('./components/base/list-groups/ListGroups'))
const Navs = lazy(() => import('./components/base/navs/Navs'))
const Paginations = lazy(() => import('./components/base/paginations/Paginations'))
const Placeholders = lazy(() => import('./components/base/placeholders/Placeholders'))
const Popovers = lazy(() => import('./components/base/popovers/Popovers'))
const Progress = lazy(() => import('./components/base/progress/Progress'))
const Spinners = lazy(() => import('./components/base/spinners/Spinners'))
const Tables = lazy(() => import('./components/base/tables/Tables'))
const Tooltips = lazy(() => import('./components/base/tooltips/Tooltips'))

// Buttons
const Buttons = lazy(() => import('./components/buttons/buttons/Buttons'))
const ButtonGroups = lazy(() => import('./components/buttons/button-groups/ButtonGroups'))
const Dropdowns = lazy(() => import('./components/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = lazy(() => import('./components/forms/checks-radios/ChecksRadios'))
const FloatingLabels = lazy(() => import('./components/forms/floating-labels/FloatingLabels'))
const FormControl = lazy(() => import('./components/forms/form-control/FormControl'))
const InputGroup = lazy(() => import('./components/forms/input-group/InputGroup'))
const Layout = lazy(() => import('./components/forms/layout/Layout'))
const Range = lazy(() => import('./components/forms/range/Range'))
const Select = lazy(() => import('./components/forms/select/Select'))
const Validation = lazy(() => import('./components/forms/validation/Validation'))

const Charts = lazy(() => import('./components/charts/Charts'))

// Icons
// const CoreUIIcons = lazy(() => import('./components/icons/coreui-icons/CoreUIIcons'))
// const Flags = lazy(() => import('./components/icons/flags/Flags'))
// const Brands = lazy(() => import('./components/icons/brands/Brands'))

// Notifications
const Alerts = lazy(() => import('./components/notifications/alerts/Alerts'))
const Badges = lazy(() => import('./components/notifications/badges/Badges'))
const Modals = lazy(() => import('./components/notifications/modals/Modals'))
const Toasts = lazy(() => import('./components/notifications/toasts/Toasts'))

const Widgets = lazy(() => import('./components/widgets/Widgets'))

export const appRoutes: Route[] = [
    // App routing
    { path: "/login", name: "Login Page", element: Login, isAuth:false },
    { path: "/",name :" Home Page", element:Home,isAuth:false},
    { path: "/register", name: "Register Page", element: Register, isAuth: false },
    { path: "/404", name: "Page 404", element: Page404, isAuth: false },
    { path: "/500", name: "Page 500", element: Page500, isAuth: false },
    { path: "*", name: "Home", element: DefaultLayout, isAuth: true },
]

const routes: Route[] = [
    // { path: '/', name: 'Home', element: null, isAuth: false},
    { path: '/dashboard', name: 'Dashboard', element: Dashboard, isAuth: true },
    // { path: '/dashboard', name: 'Dashboard', element: Dashboard, isAuth: true },

    { path: '/theme', name: 'Theme', element: Colors, isAuth: false },
    { path: '/theme/colors', name: 'Colors', element: Colors, isAuth: false },
    { path: '/theme/typography', name: 'Typography', element: Typography, isAuth: false },
    { path: '/base', name: 'Base', element: Cards, isAuth: false },
    { path: '/base/accordion', name: 'Accordion', element: Accordion, isAuth: false },
    { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs, isAuth: false },
    { path: '/base/cards', name: 'Cards', element: Cards, isAuth: false },
    { path: '/base/carousels', name: 'Carousel', element: Carousels, isAuth: false },
    { path: '/base/collapses', name: 'Collapse', element: Collapses, isAuth: false },
    { path: '/base/list-groups', name: 'List Groups', element: ListGroups, isAuth: false },
    { path: '/base/navs', name: 'Navs', element: Navs, isAuth: false },
    { path: '/base/paginations', name: 'Paginations', element: Paginations, isAuth: false },
    { path: '/base/placeholders', name: 'Placeholders', element: Placeholders, isAuth: false },
    { path: '/base/popovers', name: 'Popovers', element: Popovers, isAuth: false },
    { path: '/base/progress', name: 'Progress', element: Progress, isAuth: false },
    { path: '/base/spinners', name: 'Spinners', element: Spinners, isAuth: false },
    { path: '/base/tables', name: 'Tables', element: Tables, isAuth: false },
    { path: '/base/tooltips', name: 'Tooltips', element: Tooltips, isAuth: false },
    { path: '/buttons', name: 'Buttons', element: Buttons, isAuth: false },
    { path: '/buttons/buttons', name: 'Buttons', element: Buttons, isAuth: false },
    { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns, isAuth: false },
    { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups, isAuth: false },
    { path: '/charts', name: 'Charts', element: Charts, isAuth: false },
    { path: '/forms', name: 'Forms', element: FormControl, isAuth: false },
    { path: '/forms/form-control', name: 'Form Control', element: FormControl, isAuth: false },
    { path: '/forms/select', name: 'Select', element: Select, isAuth: false },
    { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios, isAuth: false },
    { path: '/forms/range', name: 'Range', element: Range, isAuth: false },
    { path: '/forms/input-group', name: 'Input Group', element: InputGroup, isAuth: false },
    { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels, isAuth: false },
    { path: '/forms/layout', name: 'Layout', element: Layout, isAuth: false },
    { path: '/forms/validation', name: 'Validation', element: Validation, isAuth: false },
    // { path: '/icons', name: 'Icons', element: CoreUIIcons, isAuth: false },
    // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons, isAuth: false },
    // { path: '/icons/flags', name: 'Flags', element: Flags, isAuth: false },
    // { path: '/icons/brands', name: 'Brands', element: Brands, isAuth: false },
    { path: '/notifications', name: 'Notifications', element: Alerts, isAuth: false },
    { path: '/notifications/alerts', name: 'Alerts', element: Alerts, isAuth: false },
    { path: '/notifications/badges', name: 'Badges', element: Badges, isAuth: false },
    { path: '/notifications/modals', name: 'Modals', element: Modals, isAuth: false },
    { path: '/notifications/toasts', name: 'Toasts', element: Toasts, isAuth: false },
    { path: '/widgets', name: 'Widgets', element: Widgets, isAuth: false },
    { path: '/accountsList', name: 'Account List', element: AccountList, isAuth: true, modulePermission: 'Accounts' },
    { path: '/accountsList/accountDetails/:accountId', name: 'Account Details', element: AccountDetails, isAuth: true, modulePermission: 'Accounts' },
    // { path: '/account', name: 'Account', element: NewAccount, isAuth: true, modulePermission: 'Accounts' },

    { path: '/contacts', name: 'Contacts', element: Contacts, isAuth: true, modulePermission: 'Contacts' },
    { path: '/contacts/:contactId', name: 'contactDetails', element: contactDetails, isAuth: true, modulePermission: 'Contacts' },
    { path: '/contacts/createContact', name: 'CreateContact', element: CreateContact, isAuth: true, modulePermission: 'Contacts' },
    { path: '/contacts/editContact/:contactId', name: 'CreateContact', element: CreateContact, isAuth: true, modulePermission: 'Contacts' },
    { path: '/accountsList/createAccount', name: 'CreateAccount', element: NewAccount, isAuth: true, modulePermission: 'Accounts' },
    { path: '/accountsList/editAccount/:accountId', name: 'EditAccount', element: EditAccount, isAuth: true, modulePermission: 'Accounts' },

    { path: '/invoices', name: 'Invoices', element: Invoices, isAuth: true, modulePermission: 'Invoices' },
    { path: '/invoices/createInvoice', name: 'CreateInvoice', element: CreateInvoice, isAuth: true, modulePermission: 'Invoices' },
    { path: '/invoices/editInvoice/:invoiceId', name: 'EditInvoice', element: EditInvoice, isAuth: true, modulePermission: 'Invoices' },
    { path: '/invoices/viewInvoicePdf/:invoiceId', name: 'ViewInvoicePDF', element: InvoicePDF, isAuth: true, modulePermission: 'Invoices' },

    { path: '/settings', name: 'Settings', element: Settings, isAuth: true },

    { path: '/users', name: 'Users', element: Users, isAuth: true, modulePermission: 'ManageUsers' },
    { path: '/users/userDetail/:userId/:employeeId', name: 'UserDetail', element: UserDetail, isAuth: true, modulePermission: 'ManageUsers' },
    { path: '/users/updateUser/:id', name: 'UpdateUser', element: CreateOrUpdateUser, isAuth: true, modulePermission: 'ManageUsers' },
    { path: '/users/createOrUpdateUser', name: 'CreateUser', element: CreateOrUpdateUser, isAuth: true, modulePermission: 'ManageUsers' },

    { path: '/roles', name: 'Roles', element: Roles, isAuth: true, modulePermission: 'ManagePermission' },
    { path: '/roles/createRole', name: 'CreateRole', element: CreateOrUpdateRole, isAuth: true, modulePermission: 'ManagePermission' },
    { path: '/roles/updateRole/:id', name: 'UpdateRole', element: CreateOrUpdateRole, isAuth: true, modulePermission: 'ManagePermission' },
]

export default routes