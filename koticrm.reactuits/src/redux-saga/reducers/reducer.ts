import {
    LOGIN_SUCCESS,
    GET_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_SUCCESS,
    GET_ACCOUNT_DETAIL_SUCCESS,
    GET_ACCOUNT_OWNER_SUCCESS,
    GET_ACCOUNT_STATUS_SUCCESS,
    GET_ACCOUNT_TYPE_SUCCESS,
    GET_CONTACTS_SUCCESS,
    GET_INDUSTRY_SUCCESS,
    GET_INVOICE_STATUS_SUCCESS,
    LOGOUT,
    SIDEBAR_TOGGLE,
    DELETE_ACCOUNT_SUCCESS,
    UPDATE_ACCOUNT_SUCCESS,
    GET_NOTES_SUCCESS,
    GET_CONTACT_DETAIL_SUCCESS,
    CREATE_CONTACT_SUCCESS
} from "../../constants/reduxConstants";

const initialState = {
    reducer: {
        token: null,
        modulePermission: [],
        loggedIn: false,
        accounts: [],
        response: null,
        account: null,
        accountOwner: [],
        industry: [],
        accountStatus: [],
        accountType: [],
        invoiceStatus: [],
        deleteResponse: null,
        updateAccount: null,
        contacts: [],
        contact: null,
        notes: [],
    }
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            if (action.payload != null && action.payload != undefined && action.payload.status == 'SUCCEED') {
                localStorage.setItem('accessToken', action.payload.token);
                return {
                    ...state,
                    token: action.payload.token,
                    modulePermission: action.payload.modulePermission,
                    loggedIn: true,
                };
            }
            return {
                ...state,
                token: null,
                modulePermission: null,
                loggedIn: false,
            };

        case LOGOUT:
            return {
                ...initialState
            }

        case SIDEBAR_TOGGLE:
            return {
                ...state,
                sidebarToggle: action.sidebarShow

            }
        case GET_ACCOUNT_SUCCESS:
            return {
                ...state,
                accounts: action.accounts,
            }

        case CREATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                response: action.response,
            }

        case GET_ACCOUNT_DETAIL_SUCCESS:
            return {
                ...state,
                account: action.account,
            }

        case DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                deleteResponse: action.response
            }
        case UPDATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                updateAccount: action.account
            }

        case GET_ACCOUNT_OWNER_SUCCESS:
            return {
                ...state,

                accountOwner: action.accountOwners,
            }
        case GET_INDUSTRY_SUCCESS:
            return {
                ...state,
                industry: action.industry,
            }
        case GET_ACCOUNT_STATUS_SUCCESS:
            return {
                ...state,
                accountStatus: action.accountStatus,
            }

        case GET_ACCOUNT_TYPE_SUCCESS:
            return {
                ...state,
                accountType: action.accountType,
            }

        case GET_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: action.contacts,
            }

        case GET_CONTACT_DETAIL_SUCCESS:
            return {
                ...state,
                contact: action.contact,
            }

        case CREATE_CONTACT_SUCCESS:
            return {
                ...state,
                response: action.response,
            }

        case GET_NOTES_SUCCESS:
            return {
                ...state,
                notes: action.notes,
            }


        case GET_INVOICE_STATUS_SUCCESS:
            return {
                ...state,
                invoiceStatus: action.invoiceStatus,
            }

        default:
            // console.error("No action matched");
            console.error("Unhandled action type:", action.type);
            return state;
    }
};

export default reducer