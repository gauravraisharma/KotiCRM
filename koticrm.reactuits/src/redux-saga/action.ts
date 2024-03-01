export const GET_ACCOUNTS_FETCH = 'GET_ACCOUNTS_FETCH';
export const GET_CONTACTS_FETCH = 'GET_CONTACTS_FETCH';
export const GET_SUCCESS = 'GET_SUCCESS';

export const getAccounts = ()=>({
    type: GET_ACCOUNTS_FETCH
})

export const getContacts = ()=>({
    type: GET_CONTACTS_FETCH
})