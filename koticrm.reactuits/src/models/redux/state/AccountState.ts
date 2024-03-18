import { Account } from "../../account/Account";

export interface AccountState {
    accounts: Account[];
    account: Account | null;
    createAccountResponse: Account | null;
    updateAccountResponse: Account | null;
    refreshList: boolean;
    accountOwner?: any;
    accountStatus?: any;
    accountType?: any;
}