
import express from 'express';
import * as dotenv from 'dotenv';
import { getGithubStreak } from './helpers/getGithubStreak';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(cors());

app.get('/', async (req, res) => {
    
    res.send({'message':'hit /githubstreak with username and authtoken'});
});

app.get('/githubstreak', async (req, res) => {
    const gitUsername : string = req.headers.githubusername as string;
    const gitToken : string = req.headers.gittoken as string;;
    console.log(gitUsername, gitToken);
    const data =  await  getGithubStreak(gitUsername, gitToken);
    res.send({'streak':data});
})


app.listen(3000, () => {
  console.log('Server started on the port 3000');
});
