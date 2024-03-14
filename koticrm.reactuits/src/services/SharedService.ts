import agent from "../api/agent";
import { SharedModel, SharedOwnerModel } from "../models/commonModels/SharedModels";


  export default class SharedService {
	static async GetAccountOwnerList(): Promise<SharedOwnerModel[]> {
	  try {
		const response  = await agent.SharedData.getAccountOwner();
		return response;
		}
	  catch (error) {
		console.error('Error fetching accounts:', error);
		throw error; 
	  }
	}

  static async GetInvoiceOwnerList(): Promise<SharedOwnerModel[]> {
	  try {
		const response  = await agent.SharedData.getInvoiceOwner();
		return response;
		}
	  catch (error) {
		console.error('Error fetching accounts:', error);
		throw error; 
	  }
	}
    static async GetIndustryList(): Promise<SharedModel[]> {
        try {
          const response  = await agent.SharedData.getIndustry();
          return response;
          }
        catch (error) {
          console.error('Error fetching accounts:', error);
          throw error; 
        }
      }
      static async GetInvoiceStatus(): Promise<SharedModel[]> {
        try {
          const response  = await agent.SharedData.getInvoiceStatus();
          return response;
          }
        catch (error) {
          console.error('Error fetching accounts:', error);
          throw error; 
        }
      }
      static async GetAccountStatus(): Promise<SharedModel[]> {
        try {
          const response  = await agent.SharedData.getAccountStatus();
          return response;
          }
        catch (error) {
          console.error('Error fetching accounts:', error);
          throw error; 
        }
      }
      static async GetAccountType(): Promise<SharedModel[]> {
        try {
          const response  = await agent.SharedData.getAccountType();
          return response;
          }
        catch (error) {
          console.error('Error fetching accounts:', error);
          throw error; 
        }
      } 
}
