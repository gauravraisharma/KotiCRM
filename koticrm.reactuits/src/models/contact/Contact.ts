export interface Contact {
    id: number;
    ownerId: number;
    firstName: string | null;
    lastName: string | null;
    accountId: number;
    email: string | null;
    phone: string | null;
    otherPhone: string | null;
    mobile: string | null;
    title: string | null;
    department: string | null;
    dateOfBirth: Date | null;
    homePhone: string | null;
    skypeId: string;
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
  