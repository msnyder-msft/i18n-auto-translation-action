const core = require('@actions/core');
const childProcess = require('child_process');

try {
  const provider = core.getInput('provider');
  const subscriptionKey = core.getInput('subscriptionKey');
  const location = core.getInput('location');
  const filePath = core.getInput('filePath');
  const dirPath = core.getInput('dirPath');
  const from = core.getInput('from');
  const to = core.getInput('to');
  const languages = to.split(',');
  const debug = core.getBooleanInput('debug');

  console.log(`Starting translation using the ${provider} provider from ${from} to ${to} (${languages.length} language${languages.length > 0 ? 's' : ''}) using the source(s) at ${dirPath || filePath}`);

  if (debug) {
    console.log(`Parameters:`);
    console.log(`    provider: ${provider}`);
    console.log(`    subscriptionKey: ${subscriptionKey}`);
    console.log(`    location: ${location}`);
    console.log(`    filePath: ${filePath}`);
    console.log(`    dirPath: ${dirPath}`);
    console.log(`    from: ${from}`);
    console.log(`    to: ${to}`);
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
  }

  languages.forEach((language) => {
    console.log(`Translating ${language.trim()}`);
    let command = `i18n-auto-translation -f ${from} -t ${language.trim()} -a ${provider} -k ${subscriptionKey}`;
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
    // inherit so we can see the output in the builds
    childProcess.execSync(command, { stdio: 'inherit' });
  });
  console.log(`Finished translation.`);
} catch (error) {
  core.setFailed(error.message);
}