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
		throw error; 
	  }
	}

	static async CreateAccount(account: any): Promise<Account> {
		try {
		  debugger
		  const response  = await agent.Account.create(account.payload);
		  console.log(response)
		  
		  return response;
		  }
		catch (error) {
		  console.error('Error logging in :', error);
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
		  throw error; 
		}
	  }

	  static async UpdateAccount(account: any, id: any): Promise<Account> {
		try {
		  debugger
		  const response  = await agent.Account.update(id,account);
		  console.log(response)
		  
		  return response;
		  }
		catch (error) {
		  console.error('Error updating account :', error);
		  throw error; 
		}
	  }

	  static async DeleteAccount(id: any): Promise<Account> {
		try {
		  debugger
		  const response  = await agent.Account.delete(id.payload);
		  console.log(response)  
		  return response;
		  }
		catch (error) {
		  console.error('Error deleting account :', error);
		  throw error; 
		}
	  }
}