import agent from "../api/agent";
import { UserLogin } from "../models/userAccount/login";


export default class LoginService {
	static async LoginUser(userLogin: any): Promise<UserLogin> {
	  try {
		debugger
		const response  = await agent.Login.loginUser(userLogin.payload);
		console.log(response)
        
		return response;
		}
	  catch (error) {
		console.error('Error logging in :', error);
		throw error; 
	  }
	}
}