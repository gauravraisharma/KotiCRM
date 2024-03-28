export interface Contact {
  id: number;
  ownerId: string;
  firstName: string;
  lastName: string | null;
  accountID: number;
  email: string | null;
  phone: string;
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
  city: string;
  state: string | null;
  zipCode: string | null;
  country: string | null;
  description: string | null;
}

export class ContactClass implements Contact {
  id: number;
  ownerId: string;
  firstName: string;
  lastName: string | null;
  accountID: number;
  email: string | null;
  phone: string;
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
  city: string;
  state: string | null;
  zipCode: string | null;
  country: string | null;
  description: string | null;

  constructor() {
    this.id = 0;
    this.ownerId = "";
    this.firstName = '';
    this.lastName = '';
    this.accountID = 0;
    this.email = null;
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
    this.secondaryEmail = null;
    this.mailingStreet = '';
    this.city = '';
    this.state = '';
    this.zipCode = '';
    this.country = '';
    this.description = '';
  }
}