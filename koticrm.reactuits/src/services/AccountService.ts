import axiosInstance from "../api/axiosInterceptor";
import { Account } from "../models/account/Account";


export default class AccountService {
	static async GetAccountsList(): Promise<Account[]> {
	  try {
		const response : Account[] = await axiosInstance.get(`Account/GetAccountList`);
		if (response.status !== 200) {
		  throw new Error('Failed to fetch accounts');
		}
		return response.data as Account[];
	  } catch (error) {
		console.error('Error fetching accounts:', error);
		throw error; 
	  }
	}
}