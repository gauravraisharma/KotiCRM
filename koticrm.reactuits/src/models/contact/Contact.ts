export interface Contact {
  id: number;
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
  linkedinURL: string | null;
  twitterURL: string | null;
  secondaryEmail: string | null;
  mailingStreet: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  description: string | null;
}

export class ContactClass implements Contact {
  id: number;
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
  linkedinURL: string | null;
  twitterURL: string | null;
  secondaryEmail: string | null;
  mailingStreet: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  description: string | null;

  constructor() {
    this.id = 0;
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
    this.linkedinURL = '';
    this.twitterURL = '';
    this.secondaryEmail = '';
    this.mailingStreet = '';
    this.city = '';
    this.state = '';
    this.zip = '';
    this.country = '';
    this.description = '';
  }
}