import agent from "../api/agent";
import { Contact } from "../models/contact/Contact";


export default class ContactService {
    static async GetContactsList(): Promise<Contact[]> {
        try {
            const response = await agent.Contact.get();
            // console.log("Contacts on Service:")
            // console.log(response)
            return response;
        }
        catch (error) {
            console.error('Error fetching accounts:', error);
            throw error;
        }
    }

    static async GetContactDetails(id: any): Promise<Contact> {
        try {
            const response = await agent.Contact.getById(id.payload);
            return response;
        }
        catch (error) {
            console.error('Error fetching contacts:', error);
            throw error;
        }
    }

    static async CreateContact(contact: any): Promise<Contact> {
        try {
            const response = await agent.Contact.create(contact.payload);

            return response;
        }
        catch (error) {
            console.error('Error creating contact in :', error);
            throw error;
        }
    }
}