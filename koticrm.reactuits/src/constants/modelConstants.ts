import { Account } from "../models/account/Account";

const dummyAccounts: Account[] = [
    {
        id: 1,
        ownerId: 1,
        industryId: 1,
        annualRevenue: '100000',
        billingCity: 'New York',
        billingCode: '10001',
        billingState: 'NY',
        billingStreet: '123 Main St',
        country: 'USA',
        createdBy: 'Admin',
        createdOn: '2023-01-01',
        fax: '123-456-7890',
        isactive: true,
        isdelete: false,
        modifiedBy: 'Admin',
        modifiedOn: '2023-01-01',
        phone: '123-456-7890',
        status: 'Active',
        type: 'Type A',
        website: 'www.example.com'
    },
    {
        id: 2,
        ownerId: 2,
        industryId: 2,
        annualRevenue: '200000',
        billingCity: 'Los Angeles',
        billingCode: '90001',
        billingState: 'CA',
        billingStreet: '456 Oak St',
        country: 'USA',
        createdBy: 'Admin',
        createdOn: '2023-01-02',
        fax: '234-567-8901',
        isactive: true,
        isdelete: false,
        modifiedBy: 'Admin',
        modifiedOn: '2023-01-02',
        phone: '234-567-8901',
        status: 'Active',
        type: 'Type B',
        website: 'www.example.org'
    }
];

export { dummyAccounts };