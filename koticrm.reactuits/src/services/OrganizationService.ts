import agent from "../api/agent";
import { OrganizationBankModel, OrganizationModel } from "../models/commonModels/SharedModels";

export default class OrganizationService {

static async GetOrganizationList(): Promise<OrganizationBankModel[]> {
    try {
    const response  = await agent.Organization.getOrganization();
    return response;
    }catch (error) {
    console.error('Error fetching organizations:', error);
    throw error; 
    }
  }

  static async UpdateOrganization( id: any, org: any): Promise<OrganizationModel> {
		try {
		  const response  = await agent.Organization.updateOrganization(id,org);
		  console.log(response)
		  
		  return response;
		  }
		catch (error) {
		  console.error('Error updating organization :', error);
		  throw error; 
		}
	  }

  static async GetOrganizationDetails(id: number, organization:any): Promise<OrganizationModel| null> {
    try {
      const response = await agent.Organization.updateOrganization(id, organization);
      console.log("Orgaanization detail")
      console.log(response)
      return response;
    } catch (error) {
      console.error(`Error fetching organization with ID ${id}:`, error);
      return null; // or throw error; depending on your error handling strategy
    }
  }


}
