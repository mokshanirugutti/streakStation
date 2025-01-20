
import express from 'express';
import * as dotenv from 'dotenv';
import { getGithubStreak } from './helpers/getGithubStreak';
import cors from 'cors';
import { getLeetCodeStreak } from './helpers/leetcode/getLeetcodeStreak';
// import { getLeetCodeCsrf } from './helpers/leetcode/getLeetcodeCsrf';

const app = express();
dotenv.config();

app.use(cors());

app.get('/', async (req, res) => {
    
    res.send({'message':'hit /githubstreak with username and authtoken'});
});

app.get('/githubstreak', async (req, res) => {
    console.log('got call for github streak')
    const gitUsername : string = req.headers.githubusername as string;
    const gitToken : string = req.headers.gittoken as string;
    console.log('github username and token')
    console.log(gitUsername, gitToken);
    if(!gitUsername || !gitToken){
        res.send({'message':'githubusername or gittoken is missing'});
    }
    // console.log(gitUsername, gitToken);
    const data =  await  getGithubStreak(gitUsername, gitToken);
    res.send({'streak':data});
})

app.get('/leetcodestreak', async (req, res) => {
    console.log('got call for leetcode streak')

    const CSRF_TOKEN : string = req.headers.githubusername as string;
    const AUTH_TOKEN : string = req.headers.gittoken as string;;
    console.log(req.headers);
    console.log(CSRF_TOKEN, AUTH_TOKEN);
    // console.log('CALLING LEETCODE CSRF TOKEN')
    // getLeetCodeCsrf();
    if(!CSRF_TOKEN || !AUTH_TOKEN){
        res.send({'message':'CSRF_TOKEN or AUTH_TOKEN is missing'});
    }
    const data =  await  getLeetCodeStreak({CSRF_TOKEN, AUTH_TOKEN});
    console.log(`res.send data = ` )
    console.log(data)
    res.send({'streak':data});
})


app.listen(3000, () => {
  console.log('Server started on the port 3000');
});
