import { lazy } from 'react';
import { Route } from './models/commonModels/CommonModels';
// App routing

// Containers
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'))
// Pages
const Login = lazy(() => import('./views/pages/login/Login'))
const Register = lazy(() => import('./views/pages/register/Register'))
const Page404 = lazy(() => import('./views/pages/page404/Page404'))
const Page500 = lazy(() => import('./views/pages/page500/Page500'))


//settings

const Settings = lazy(() => import('./views/settings/Settings'))

const Dashboard = lazy(() => import('./views/dashboard/Dashboard'))
const Colors = lazy(() => import('./views/theme/colors/Colors'))
const Typography = lazy(() => import('./views/theme/typography/Typography'))
// Account routes
const AccountList = lazy(() => import('./views/accountsList/AccountList'))
const AccountDetails = lazy(() => import('./views/accountDetails/AccountDetails'))
const NewAccount = lazy(() => import('./views/account/NewAccount'))
// Contact routes
const Contacts = lazy(() => import('./views/contacts/Contacts'))
const contactDetails = lazy(() => import('./views/contacts/ContactDetails'))
const CreateContact = lazy(() => import('./views/contacts/CreateOrEditContact'))

//Invoices Routes
const Invoices = lazy(() => import('./views/invoice/Invoice'))
const CreateInvoice = lazy(() => import('./views/invoice/NewInvoice'))


// Base
const Accordion = lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = lazy(() => import('./views/base/cards/Cards'))
const Carousels = lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = lazy(() => import('./views/base/navs/Navs'))
const Paginations = lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = lazy(() => import('./views/base/popovers/Popovers'))
const Progress = lazy(() => import('./views/base/progress/Progress'))
const Spinners = lazy(() => import('./views/base/spinners/Spinners'))
const Tables = lazy(() => import('./views/base/tables/Tables'))
const Tooltips = lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = lazy(() => import('./views/forms/layout/Layout'))
const Range = lazy(() => import('./views/forms/range/Range'))
const Select = lazy(() => import('./views/forms/select/Select'))
const Validation = lazy(() => import('./views/forms/validation/Validation'))

const Charts = lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = lazy(() => import('./views/icons/flags/Flags'))
const Brands = lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = lazy(() => import('./views/notifications/badges/Badges'))
const Modals = lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = lazy(() => import('./views/widgets/Widgets'))

export const appRoutes: Route[] = [
    // App routing
    { path: "/login", name: "Login Page", element: Login, isAuth:false },
    { path: "/register", name: "Register Page", element: Register, isAuth: false },
    { path: "/404", name: "Page 404", element: Page404, isAuth: false },
    { path: "/500", name: "Page 500", element: Page500, isAuth: false },
    { path: "*", name: "Home", element: DefaultLayout, isAuth: true },
]

const routes: Route[] = [
    // { path: '/', name: 'Home', element: null, isAuth: false},
    { path: '/dashboard', name: 'Dashboard', element: Dashboard, isAuth: true },
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
    { path: '/icons', name: 'Icons', element: CoreUIIcons, isAuth: false },
    { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons, isAuth: false },
    { path: '/icons/flags', name: 'Flags', element: Flags, isAuth: false },
    { path: '/icons/brands', name: 'Brands', element: Brands, isAuth: false },
    { path: '/notifications', name: 'Notifications', element: Alerts, isAuth: false },
    { path: '/notifications/alerts', name: 'Alerts', element: Alerts, isAuth: false },
    { path: '/notifications/badges', name: 'Badges', element: Badges, isAuth: false },
    { path: '/notifications/modals', name: 'Modals', element: Modals, isAuth: false },
    { path: '/notifications/toasts', name: 'Toasts', element: Toasts, isAuth: false },
    { path: '/widgets', name: 'Widgets', element: Widgets, isAuth: false },
    { path: '/accountsList', name: 'Account List', element: AccountList, isAuth: true, modulePermission: 'Accounts' },
    { path: '/accountDetails/:accountId', name: 'Account Details', element: AccountDetails, isAuth: true, modulePermission: 'Accounts' },
    { path: '/account', name: 'Account', element: NewAccount, isAuth: true, modulePermission: 'Accounts' },

    { path: '/contacts', name: 'Contacts', element: Contacts, isAuth: true, modulePermission: 'Contacts' },
    { path: '/contacts/:contactId', name: 'contactDetails', element: contactDetails, isAuth: true, modulePermission: 'Contacts' },
    { path: '/contacts/createContact', name: 'CreateContact', element: CreateContact, isAuth: true, modulePermission: 'Contacts' },
    { path: '/contacts/editContact/:contactId', name: 'CreateContact', element: CreateContact, isAuth: true, modulePermission: 'Contacts' },
    { path: '/newAccount', name: 'NewAccount', element: NewAccount, isAuth: true, modulePermission: 'Accounts' },
    { path: '/invoices', name: 'Invoices', element: Invoices, isAuth: true, modulePermission: 'Invoices' },
    { path: '/invoices/createInvoice', name: 'CreateInvoice', element: CreateInvoice, isAuth: true, modulePermission: 'Invoices' },
    { path: '/settings', name: 'Settings', element: Settings, isAuth: true },


]

export default routes