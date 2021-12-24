const { Octokit } =  require('octokit');

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN, 
});

async function run() {
    const { data: user } = await octokit.request('GET /user');

    console.log('Authenticated as ' + user.login);

    const { data: readme } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'daniel-benzion',
        repo: 'daniel-benzion',
        path: 'README.md'
    });

    console.log(readme.sha);

    const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: 'daniel-benzion',
        repo: 'daniel-benzion',
        path: 'README.md',
        message: 'BOOP',
        content: 'boop boop'
    });
    console.dir(response.data);
}

run();

function bumpBoopCounter(content) {
    return content.replace(
        /<!-- boop-counter -->(\d+)<!-- \/boop-counter -->/,
        (_content, counter) =>
            `<!-- boop-counter -->${Number(counter) + 1}<!-- /boop-counter -->`,
    );
}