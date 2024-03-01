import axios from "axios";
import { accountBaseUrl } from "src/constant";

export default class AccountService{
    static async GetAccountsList() {
		return await axios.get(`${accountBaseUrl}GetAccountList`).then((res) => res).catch((error) => {
			console.error(error)
		})
	}
}