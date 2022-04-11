const core = require('@actions/core');
const github = require('@actions/github');
const childProcess = require('child_process');

try {
  const provider = core.getInput('provider');
  const subscriptionKey = core.getInput('subscriptionKey');
  const location = core.getInput('location');
  const filePath = core.getInput('filePath');
  const dirPath = core.getInput('dirPath');
  const from = core.getInput('from');
  const to = core.getInput('to');
  const debug = core.getInput('debug') === true;
  console.log(`***Starting translation using the ${provider} provider`);

  if (debug) {
    console.log(`provider ${provider}`);
    console.log(`subscriptionKey ${subscriptionKey}`);
    console.log(`location ${location}`);
    console.log(`filePath ${filePath}`);
    console.log(`dirPath ${dirPath}`);
    console.log(`from ${from}`);
    console.log(`to ${to}`);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  }

  const command = `npm run translate -- -k ${subscriptionKey} -f ${from} -t ${to}`;
  if (filePath) {
    command += ` -p ${filePath}`;
  } else if (dirPath) {
    command += ` -d ${dirPath}`
  }
  if (location) {
    command += ` -l ${location}`;
  }
  if (debug) {
    console.log('Executing command');
    console.log(command);
  }
  childProcess.execSync(command);
  // childProcess.execSync(command, { stdio: 'inherit' });
  console.log(`***Finished translation.`);

  // console.log(`Hello ${provider}`);
  // core.setOutput("time", time);
  // const time = (new Date()).toTimeString();
} catch (error) {
  core.setFailed(error.message);
}