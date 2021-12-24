const { Octokit } =  require('octokit');

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN, 
});

async function run() {
    const response = await octokit.request('GET /user');

    console.log('Authenticated as ' + response.data.login);
}

run();

function bumpBoopCounter(content) {
    return content.replace(
        /<!-- boop-counter -->(\d+)<!-- \/boop-counter -->/,
        (_content, counter) =>
            `<!-- boop-counter -->${Number(counter) + 1}<!-- /boop-counter -->`,
    );
}