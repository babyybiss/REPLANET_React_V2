import axios from "axios";
import { GET_CONTINU } from "../modules/CampaignModule";





export async function CampaignAPI(url, params) {
    const requestURL = 'https://jsonplaceholder.typicode.com/users';
    try {
        const response = await axios.get(requestURL).then(res => console.log(res.data));
    } catch (error) {
        console.log(error);
    }
}

/* function getCampaigns(){
    axios.get(requestURL)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
}

getCampaigns();

*/