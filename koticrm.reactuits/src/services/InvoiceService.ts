import { toast } from "react-toastify";
import agent from "../api/agent";
import { Invoice, InvoiceCreationModel } from "../models/invoice/Invoice";


export default class InvoiceService {
	static async GetInvoiceList(): Promise<InvoiceCreationModel[]> {
	  try {
		const response  = await agent.Invoice.get();
		console.log(response)
		return response;
		}
	  catch (error) {
		console.error('Error fetching Invoices:', error);
		toast.error('Error fetching Invoices')
		throw error; 
	  }
	}

	static async CreateInvoice(invoice: any): Promise<InvoiceCreationModel> {
		try {
		  const response  = await agent.Invoice.create(invoice.payload);
		  console.log(response)
		  toast.success('Invoice created successfully')
		  return response;
		  }
		catch (error) {
			toast.error('Cannot you create Invoice. Please try again later')
			throw error; 
		}
	  }

	static async GetInvoiceDetails(id:any): Promise<InvoiceCreationModel> {
		try {
		  const response  = await agent.Invoice.getById(id.payload);
		  return response;
		  }
		catch (error) {
		  console.error('Invalid Invoice Id:', error);
		  toast.error('Invalid Invoice Id')

		  throw error; 
		}
	  }

	  static async UpdateInvoice(invoice: any, id: any): Promise<Invoice> {
		try {
		  const response  = await agent.Invoice.update(id,invoice);
		  console.log(response)
		  toast.success('Invoice updated successfully')
		  return response;
		  }
		catch (error) {
			toast.error('Invoice not found')
		  throw error; 
		}
	  }

	  static async DeleteInvoice(id: any): Promise<InvoiceCreationModel> {
		try {
		  const response  = await agent.Invoice.delete(id.payload);
		  toast.success('Invoice deleted successfully')
		  return response;
		  }
		catch (error) {
		toast.error('Invoice not found')
		  throw error; 
		}
	  }
}