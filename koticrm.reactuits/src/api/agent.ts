import { AxiosResponse } from 'axios';
import { Account } from '../models/account/Account';
import axiosInstance from './axiosInterceptor';
import { Contact } from '../models/contact/Contact';
import { Invoice } from '../models/invoice/Invoice';
import { Note } from '../models/notes/notes';
import { UserLogin } from '../models/userAccount/login';
import { SharedModel } from '../models/commonModels/SharedModels';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get:  <T>(url: string) => axiosInstance.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axiosInstance.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axiosInstance.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axiosInstance.delete<T>(url).then(responseBody),
}

const Login = {
    loginUser : (userLogin: UserLogin) => requests.post<UserLogin>(`/UserAccount/LoginUser`, userLogin)

}

const Account = {
    get: () => requests.get<Account[]>(`/Account/GetAccountList`),
    create: (account : Account) => requests.post<Account>(`/Account/CreateAccount`, account),
    update: (id : number,account: Account) => requests.put<Account>(`/Account/UpdateAccount/${id}`, account),
    getById: (id : number) => requests.get<Account>(`/Account/GetAccountDetails/${id}`),
    delete: (id : number) => requests.del<Account>(`/Account/DeleteAccount/${id}`)  
}
  
  

const Contact = {
    get: () => requests.get<Contact[]>(`/Contact/GetContactList`),
    create: (contact : Contact) => requests.post<Contact>(`/Contact/CreateContact`, contact),
    update: (id : number,contact: Contact) => requests.put<Contact>(`/Contact/UpdateContact/${id}`, contact),
    getById: (id : number) => requests.get<Contact>(`/Contact/GetContactDetails/${id}`),
    delete: (id : number) => requests.del<Contact>(`/Contact/DeleteContact/${id}`)  
}
const Invoice = {
    get: () => requests.get<Invoice[]>(`/Invoice/GetInvoiceList`),
    create: (invoice : Invoice) => requests.post<Invoice>(`/Invoice/CreateInvoice`, invoice),
    update: (id : number,invoice: Invoice) => requests.put<Invoice>(`/Invoice/UpdateInvoice/${id}`, invoice),
    getById: (id : number) => requests.get<Invoice>(`/Invoice/GetInvoiceDetails/${id}`),
    delete: (id : number) => requests.del<Invoice>(`/Invoice/DeleteInvoice/${id}`)  
}
const Notes = {
    get: () => requests.get<Note[]>(`/Notes/GetNoteList`),
    create: (note : Note) => requests.post<Note>(`/Notes/CreateNote`, note),
    update: (id : number,note: Note) => requests.put<Note>(`/Notes/UpdateNote/${id}`, note),
    getById: (id : number) => requests.get<Note>(`/Notes/GetNoteDetails/${id}`),
    delete: (id : number) => requests.del<Note>(`/Notes/DeleteNote/${id}`)  
}

const SharedData = {
    getIndustry: () => requests.get<SharedModel[]>(`/Shared/GetIndustryList`),
    getAccountOwner: () => requests.get<SharedModel[]>(`/Shared/GetAccountOwner`),
    getInvoiceStatus: () => requests.get<SharedModel[]>(`/Shared/InvoiceStatus`),
    getAccountStatus: () => requests.get<SharedModel[]>(`/Shared/AccountStatus`),
    getAccountType: () => requests.get<SharedModel[]>(`/Shared/AccountType`),

}


const agent = {
    Login,
    Account,
    Contact,
    Invoice,
    Notes,
    SharedData
}

export default agent;