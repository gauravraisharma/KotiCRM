import agent from "../api/agent";
import { Invoice } from "../models/invoice/Invoice";


export default class InvoiceService {
	static async GetInvoiceList(): Promise<Invoice[]> {
	  try {
		const response  = await agent.Invoice.get();
		console.log(response)
		return response;
		}
	  catch (error) {
		console.error('Error fetching Invoices:', error);
		throw error; 
	  }
	}

	static async CreateInvoice(invoice: any): Promise<Invoice> {
		try {
		  const response  = await agent.Invoice.create(invoice.payload);
		  console.log(response)
		  
		  return response;
		  }
		catch (error) {
		  console.error('Error logging in :', error);
		  throw error; 
		}
	  }

	static async GetInvoiceDetails(id:any): Promise<Invoice> {
		try {
		  const response  = await agent.Invoice.getById(id.payload);
		  return response;
		  }
		catch (error) {
		  console.error('Error fetching Invoices:', error);
		  throw error; 
		}
	  }

	  static async UpdateInvoice(invoice: any, id: any): Promise<Invoice> {
		try {
		  const response  = await agent.Invoice.update(id,invoice);
		  console.log(response)
		  
		  return response;
		  }
		catch (error) {
		  console.error('Error updating Invoice :', error);
		  throw error; 
		}
	  }

	  static async DeleteInvoice(id: any): Promise<Invoice> {
		try {
		  const response  = await agent.Invoice.delete(id.payload);
		  console.log(response)  
		  return response;
		  }
		catch (error) {
		  console.error('Error deleting Invoice :', error);
		  throw error; 
		}
	  }
}