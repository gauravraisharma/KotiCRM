import { Account } from "../account/Account"


export interface accountState {
    accounts: [],
    account: Account | null,
    createAccountResponse: Account | null,
    updateAccountResponse: Account | null,
    refreshList: boolean,
    accountOwner: any,
    accountStatus: any,
    accountType: any
}