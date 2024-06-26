import { PayloadAction } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Contact } from "../models/contact/Contact";


class ContactService {
    static async GetContactsList(): Promise<Contact[]> {
        try {
            const response = await agent.Contact.get();
            // console.log("Contacts on Service:")
            // console.log(response)
            return response;
        }
        catch (error) {
            console.error('Error fetching contacts:', error);
            throw error;
        }
    }

    static async GetContactDetails(id: PayloadAction<number>): Promise<Contact> {
        try {
            const response = await agent.Contact.getById(id.payload);
            console.log("Contact details in service");
            console.log(response);
            return response;
        }
        catch (error) {
            console.error('Error fetching contacts:', error);
            throw error;
        }
    }

    static async CreateContact(contact: Contact): Promise<Contact> {
        try {
            const response = await agent.Contact.create(contact);

            return response;
        }
        catch (error) {
            console.error('Error creating contact in :', error);
            throw error;
        }
    }

    static async UpdateContact(contact: Contact, id: number): Promise<Contact> {
        try {
            const response = await agent.Contact.update(id, contact);
            console.log("Update response in contact service");
            console.log(response)
            return response;
        }
        catch (error) {
            console.error('Error updating contact :', error);
            throw error;
        }
    }
}

export default ContactService;