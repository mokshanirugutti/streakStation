import axios from "axios";

type getStreaksTypes = {
    username: string;
    token : string;
    endpoint:string;
}

type streakType = {
    streak: number; 
    contributedToday: boolean;
  }

export const  getStreaks = async ({username, token, endpoint}:getStreaksTypes): Promise<streakType> => {

    try {
        console.log("seending post reequest");
        const response = await axios.get(`http://localhost:3000/${endpoint}`, {
            headers : {
                githubusername : username,
                gittoken : token
            }
        });
        console.log("post request sent");
        console.log(response.data);
        return response.data.streak;
    } catch (error) {
        console.error('Error making the request:', error);
        throw error;
    }

}