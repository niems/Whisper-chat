//returns true if username is in valid format
const isUsernameValid = username => {
  const minUsernameLength = 4;
  const maxUsernameLength = 15;
  const invalidUsernameCharacters = /\W+/; //username must only use [a-zA-Z0-9_]

  //username not within range
  if (
    username.length < minUsernameLength ||
    username.length > maxUsernameLength
  ) {
    console.log('Invalid username: must be 4 - 15 characters long.');
    return false;
  }

  //username contains invalid characters
  else if (invalidUsernameCharacters.test(username)) {
    console.log(
      'Invalid username: can ONLY contain letters, numbers, and an underscores (_)'
    );
    return false;
  }

  return true; //username is valid
};

//returns true if password is in valid format
const isPasswordValid = password => {
  const minPasswordLength = 6;
  const maxPasswordLength = 12;
  const hasLetter = /[a-zA-Z]+/; //must have at least one letter
  const hasNumber = /\d+/; //must have at least one number
  const hasSpaces = /\s+/; //spaces in password are invalid
  const hasSymbol = /\W+/; //MUST have at least one symbol

  //password not within range
  if (
    password.length < minPasswordLength ||
    password.length > maxPasswordLength
  ) {
    console.log('Invalid password: must be 6 - 12 characters long');
    return false;
  }

  //password doesn't have at least 1 letter
  else if (!hasLetter.test(password)) {
    console.log('Invalid password: must include at least 1 letter');
    return false;
  }

  //password doesn't have at least 1 number
  else if (!hasNumber.test(password)) {
    console.log('Invalid password: must include at least 1 number');
    return false;
  }

  //password has spaces D:
  else if (hasSpaces.test(password)) {
    console.log('Invalid password: cannot include spaces');
    return false;
  }

  //password doesn't have a symbol D:
  if (!hasSymbol.test(password)) {
    console.log('Invalid password: MUST include at least 1 symbol');
    return false;
  }

  return true; //password is valid
};

//returns true if both the username and password fields are valid
function areFieldsValid(data) {
  const { username, password } = data;

  //username format is invalid
  if (!isUsernameValid(username)) {
    return false;
  }

  //password format is invalid
  else if (!isPasswordValid(password)) {
    return false;
  }

  return true; //username & password fields valid
}

export default areFieldsValid;
