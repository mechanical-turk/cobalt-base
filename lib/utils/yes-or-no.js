const prompt = require('prompt-sync')();

module.exports = (
  promptMessage,
  {
    logInvalidInputMessage = true,
    invalidInputMessage = 'Invalid input. Please answer (y/n)',
  }
) => {
  const correctedPromptMessage = `${promptMessage} (y/n): `;
  let response = prompt(correctedPromptMessage);
  let interpretedResponse = interpretResponse(response);
  while (!isResponseInterpreted(interpretedResponse)) {
    if (!isResponseInterpreted(interpretedResponse)) {
      if (logInvalidInputMessage) {
        console.log(invalidInputMessage);
      }
    }
    response = prompt(correctedPromptMessage);
    interpretedResponse = interpretResponse(response);
  }
  return interpretedResponse;
};

function interpretResponse(response) {
  const lowercaseResponse = response.toLowerCase();
  if (
    lowercaseResponse === 'yes' ||
    lowercaseResponse === 'y'
  ) {
    return true;
  } else if (
    lowercaseResponse === 'no' ||
    lowercaseResponse === 'n'
  ) {
    return false;
  } else {
    return null;
  }
}

function isResponseInterpreted(interpretedResponse) {
  return (
    interpretedResponse === true ||
    interpretedResponse === false
  );
}
