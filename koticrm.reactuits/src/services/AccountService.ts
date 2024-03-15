import { toast } from "react-toastify";
import agent from "../api/agent";
import { Account } from "../models/account/Account";


export default class AccountService {
	static async GetAccountsList(): Promise<Account[]> {
	  try {
		const response  = await agent.Account.get();
		console.log(response)
		return response;
		}
	  catch (error) {
		console.error('Error fetching accounts:', error);
		toast.error('Error fetching accounts')
		throw error; 
	  }
	}

	static async CreateAccount(account: any): Promise<Account> {
		try {
		  const response  = await agent.Account.create(account.payload);
		  toast.success('Account created successfully')

		  return response;
		  }
		catch (error) {
		  console.error('Error creating account :', error);
		  toast.error('Cannot create account. Please try again later')
		  throw error; 
		}
	  }

	static async GetAccountDetails(id:any): Promise<Account> {
		try {
		  const response  = await agent.Account.getById(id.payload);
		  return response;
		  }
		catch (error) {
		  console.error('Error fetching accounts:', error);
		  toast.error('Error fetching account')
		  throw error; 
		}
	  }

	  static async UpdateAccount(account: any, id: any): Promise<Account> {
		try {
		  const response  = await agent.Account.update(id,account);
		  toast.success('Account updated successfully')
		  return response;
		  }
		catch (error) {
		  console.error('Error updating account :', error);
		  toast.error('Account not found')
		  throw error; 
		}
	  }

	  static async DeleteAccount(id: any): Promise<Account> {
		try {
		  const response  = await agent.Account.delete(id.payload);
		  toast.success('Account deleted successfully')  
		  return response;
		  }
		catch (error) {
		  console.error('Error deleting account :', error);
		  toast.error('Account not found')
		  throw error; 
		}
	  }
}