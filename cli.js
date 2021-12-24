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

    const content = Buffer.from(readme.content, 'base64').toString();

    const updated = bumpBoopCounter(content);

    console.log(updated);

    const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: 'daniel-benzion',
        repo: 'daniel-benzion',
        path: 'README.md',
        message: 'BOOP',
        content: Buffer.from(updated, 'utf-8').toString('base64'),
        sha: readme.sha
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