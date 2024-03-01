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

	static async GetAccountDetails(id:number): Promise<Account> {
		try {
		  const response  = await agent.Account.getById(id);
		  console.log(response)
		  return response;
		  }
		catch (error) {
		  console.error('Error fetching accounts:', error);
		  throw error; 
		}
	  }
}