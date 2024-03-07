export interface CreateContact {
    ownerId: number;
    firstName: string | null;
    lastName: string | null;
    accountID: number;
    email: string | null;
    phone: string | null;
    otherPhone: string | null;
    mobile: string | null;
    title: string | null;
    department: string | null;
    dateOfBirth: Date | null;
    homePhone: string | null;
    skypeID: string;
    linkedinUrl: string | null;
    twitterUrl: string | null;
    secondaryEmail: string | null;
    mailingStreet: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    country: string | null;
    description: string | null;
}

export class CreateContactClass implements CreateContact {
    ownerId: number;
    firstName: string | null;
    lastName: string | null;
    accountID: number;
    email: string | null;
    phone: string | null;
    otherPhone: string | null;
    mobile: string | null;
    title: string | null;
    department: string | null;
    dateOfBirth: Date | null;
    homePhone: string | null;
    skypeID: string;
    linkedinUrl: string | null;
    twitterUrl: string | null;
    secondaryEmail: string | null;
    mailingStreet: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    country: string | null;
    description: string | null;

    constructor() {
        this.ownerId = 0;
        this.firstName = '';
        this.lastName = '';
        this.accountID = 0;
        this.email = '';
        this.phone = '';
        this.otherPhone = '';
        this.mobile = '';
        this.title = '';
        this.department = '';
        this.dateOfBirth = null;
        this.homePhone = '';
        this.skypeID = '';
        this.linkedinUrl = '';
        this.twitterUrl = '';
        this.secondaryEmail = '';
        this.mailingStreet = '';
        this.city = '';
        this.state = '';
        this.zip = '';
        this.country = '';
        this.description = '';
    }
}