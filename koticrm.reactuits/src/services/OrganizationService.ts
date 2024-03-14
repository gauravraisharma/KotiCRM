import agent from "../api/agent";
import { OrganizationBankModel } from "../models/commonModels/SharedModels";

export default class OrganizationService {

static async GetOrganizationList(): Promise<OrganizationBankModel[]> {
    debugger
    try {
    const response  = await agent.Organization.getOrganization();
    return response;
    }
    catch (error) {
    console.error('Error fetching organizations:', error);
    throw error; 
    }
  }
}