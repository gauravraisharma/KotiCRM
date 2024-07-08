import { CREATE_ACCOUNT_SUCCESS, DELETE_ACCOUNT_SUCCESS, GET_ACCOUNTS_FETCH, GET_ACCOUNT_DETAIL_FETCH, GET_ACCOUNT_DETAIL_SUCCESS, GET_ACCOUNT_OWNER_SUCCESS, GET_ACCOUNT_STATUS_SUCCESS, GET_ACCOUNT_SUCCESS, GET_ACCOUNT_TYPE_SUCCESS, UPDATE_ACCOUNT_SUCCESS } from "../../../constants/reduxConstants";

import { Account } from '../../../models/account/Account';
import { actionPayloadModel } from "../../../models/actionModel/actionModel";
import { AppAction } from "../../../models/redux/action/ActionModel";
import { accountState } from "../../../models/reduxState/accountState";
import { Reducer } from "react";
const INITIAL_STATE: accountState = {
    accounts: [],
    account: null as Account | null,
    createAccountResponse: null as Account | null,
    updateAccountResponse: null as Account | null,
    refreshList: false,
    accountOwner: null,
    accountStatus: null,
    accountType: null,
    isLoading :false,
};


const accountReducer: Reducer<accountState, AppAction> = (state: accountState = INITIAL_STATE, action: AppAction): accountState => {
    switch (action.type) {
        case GET_ACCOUNTS_FETCH:
            return {
                ...state,
                isLoading : true
            }
        case GET_ACCOUNT_SUCCESS:
            return {
                ...state,
                accounts: (action as actionPayloadModel).payload,
                isLoading :false
            }
        case CREATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                createAccountResponse: (action as actionPayloadModel).payload
            }
        case GET_ACCOUNT_DETAIL_FETCH :
            return{
                ...state,
                isLoading :true
            }
        case GET_ACCOUNT_DETAIL_SUCCESS:
            return {
                ...state,
                account: (action as actionPayloadModel).payload,
                isLoading :false

            }
        case DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                refreshList: true
            }

        case UPDATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                updateAccountResponse: (action as actionPayloadModel).payload
            }
        case GET_ACCOUNT_OWNER_SUCCESS:
            return {
                ...state,
                accountOwner: (action as actionPayloadModel).payload,
            }
        case GET_ACCOUNT_STATUS_SUCCESS:
            return {
                ...state,
                accountStatus: (action as actionPayloadModel).payload,
            }

        case GET_ACCOUNT_TYPE_SUCCESS:
            return {
                ...state,
                accountType: (action as actionPayloadModel).payload,
            }

        default:
            return state;
    }
};

export default accountReducer;