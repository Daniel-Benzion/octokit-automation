import { Octokit } from 'octokit';

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN, 
});

async function run() {
    const response = await octokit.request('GET /user');

    console.log('Authenticated as ' + response.data.login);
}

run();