const core = require('@actions/core');
const github = require('@actions/github');

try {
  const provider = core.getInput('provider');
  const subscriptionKey = core.getInput('subscriptionKey');
  const location = core.getInput('location');
  const filePath = core.getInput('filePath');
  const dirPath = core.getInput('dirPath');
  const from = core.getInput('from');
  const to = core.getInput('to');
  console.log(`provider ${provider}!`);
  console.log(`subscriptionKey ${subscriptionKey}!`);
  console.log(`location ${location}!`);
  console.log(`filePath ${filePath}!`);
  console.log(`dirPath ${dirPath}!`);
  console.log(`from ${from}!`);
  console.log(`to ${to}!`);

  // console.log(`Hello ${provider}!`);
  // const time = (new Date()).toTimeString();
  // core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}