import agent from "../api/agent";
import { Attachment, CreateAttachment } from "../models/attachment/Attachment";
import { DbResponse } from "../models/commonModels/SharedModels";

class AttachmentService {
    static async GetAttachmentsList(): Promise<Attachment[]> {
        try {
            const response = await agent.Attachment.get();
            return response;
        }
        catch (error) {
            console.error('Error fetching attachments in service:', error);
            throw error;
        }
    }

    static async CreateAttachment(createAttachment: CreateAttachment): Promise<DbResponse> {
        try {
            const response = await agent.Attachment.create(createAttachment);

            return response;
        }
        catch (error) {
            console.error('Error creating contact in Service:', error);
            throw error;
        }
    }
}

export default AttachmentService;