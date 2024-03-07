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
    CREATE_NOTES_SUCCESS,
    GET_INVOICE_SUCCESS,
    GET_INVOICE_DETAIL_SUCCESS,
    CREATE_INVOICE_SUCCESS,
    UPDATE_INVOICE_SUCCESS,
    DELETE_INVOICE_SUCCESS,
    GET_CONTACT_DETAIL_SUCCESS,
    CREATE_CONTACT_SUCCESS,
    UPDATE_CONTACT_SUCCESS
} from "../../constants/reduxConstants";

const initialState = {
    reducer: {
        token: null,
        modulePermission: [],
        userId: null,
        loggedIn: false,
        accounts: [],
        createAccountResponse:null, 
        account:null,
        accountOwner :[],
        industry:[],
        accountStatus :[],
        accountType :[],
        invoiceStatus : [],
        deleteResponse: null,
        updateAccountResponse: null,
        contacts: [],
        notes: [] ,
        noteResponse:null,
        invoices:[],
        invoice:null,
        createInvoiceResponse:null,
        updateInvoiceResposne:null,
        deleteInvoiceResponse:null,
        contact: null,
    }
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        //login
        case LOGIN_SUCCESS:
            if (action.payload != null && action.payload != undefined && action.payload.status == 'SUCCEED') {
                localStorage.setItem('accessToken', action.payload.token);
                return {
                    ...state,
                    token: action.payload.token,
                    modulePermission: action.payload.modulePermission,
                    userId: action.payload.userId,
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
        //account
            }
        case GET_ACCOUNT_SUCCESS:
            return {
                ...state,
                accounts: action.accounts,
            }

        case CREATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                createAccountResponse: action.account,
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
                updateAccountResponse : action.updatedAccount
            }

        case GET_ACCOUNT_OWNER_SUCCESS:
            return {
                ...state,

                accountOwner: action.accountOwners,
                }
        case GET_INDUSTRY_SUCCESS: 
            return {...state,
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
        //industry
        case GET_INDUSTRY_SUCCESS: 
            return {...state,
                industry: action.industry,
                }

        //contact    
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
                contact: action.createdContact,
                contacts: [...state.reducer.contacts, action.createdContact]
            }

        case UPDATE_CONTACT_SUCCESS:
            return {
                ...state,
                contact: action.updatedContact,
            }

        case GET_NOTES_SUCCESS:
            return {
                ...state,
                notes: action.notes,
            }
        case CREATE_NOTES_SUCCESS:
            return {
                ...state,
                noteResponse: action.notes,
            }    

        //invoice
        case GET_INVOICE_STATUS_SUCCESS:
            return {
                ...state,
                invoiceStatus: action.invoiceStatus,
            }
        case GET_INVOICE_SUCCESS:
            return{
                ...state,
                invoices : action.invoices
            }
        case GET_INVOICE_DETAIL_SUCCESS:
            return{
                ...state,
                invoice: action.invoice
            }
        case CREATE_INVOICE_SUCCESS:
            return{
                ...state,
                createInvoiceResponse: action.invoice
            }
        case UPDATE_INVOICE_SUCCESS:
            return{
                ...state,
                updateInvoiceResposne : action.updatedInvoice
            }
        case DELETE_INVOICE_SUCCESS:
            return{
                ...state,
                deleteInvoiceResponse : action.response
            }

        default:
            // console.error("No action matched");
            console.error("Unhandled action type:", action.type);
            return state;
    }
};

export default reducer