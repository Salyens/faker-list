import { fakerEN_US, fakerHR, fakerFR } from "@faker-js/faker";

function createRandomUser(fakerInstance, country, seed) {
  fakerInstance.seed(seed);
  const name = `${fakerInstance.person.firstName()} ${fakerInstance.person.lastName()}`;
  const address = `${country} ${fakerInstance.location.city()} ${fakerInstance.location.streetAddress()} ${fakerInstance.number.int(
    { max: 100 }
  )}`;
  const phoneNumber = fakerInstance.phone.number();

  return {
    name,
    address,
    phoneNumber,
    _id: fakerInstance.string.uuid(),
  };
}

function getRandomErrorType(strLength) {
  const minAllowedLength = Math.floor(strLength * 0.9);
  const maxAllowedLength = Math.floor(strLength * 1.1);

  const availableErrors =
    strLength <= minAllowedLength + 1
      ? [1, 2]
      : strLength > maxAllowedLength
      ? [0, 2]
      : [0, 1, 2];

  return availableErrors[Math.floor(Math.random() * availableErrors.length)];
}

function applySingleError(str) {
  switch (getRandomErrorType(str.length)) {
    case 0:
      return deleteRandomChar(str);
    case 1:
      return addRandomChar(str);
    case 2:
      return str.length > 2 ? swapAdjacentChars(str) : str;
    default:
      return str;
  }
}

function deleteRandomChar(str) {
  const index = Math.floor(Math.random() * str.length);
  return str.slice(0, index) + str.slice(index + 1);
}

function addRandomChar(str) {
  const index = Math.floor(Math.random() * str.length);
  const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
  return str.slice(0, index) + randomChar + str.slice(index);
}

function swapAdjacentChars(str) {
  const index = Math.floor(Math.random() * (str.length - 1));
  return `${str.slice(0, index)}${str.charAt(index + 1)}${str.charAt(
    index
  )}${str.slice(index + 2)}`;
}

function applyErrorsToUserProperty(user, prop, errors) {
  for (let i = 0; i < errors; i++) {
    user[prop] = applySingleError(user[prop]);
  }
}

function createRandomUserWithErrors(seed, country, errors, amountOfUsers) {
  const fakerInstances = {
    USA: fakerEN_US,
    Croatia: fakerHR,
    France: fakerFR,
  };

  const fakerInstance = fakerInstances[country] || fakerEN_US;
  const users = [];

  for (let i = 0; i < amountOfUsers; i++) {
    const user = createRandomUser(fakerInstance, country, seed + i);
    const properties = ["name", "address", "phoneNumber"];

    const wholeErrors = Math.floor(errors);
    for (let j = 0; j < wholeErrors; j++) {
      applyErrorsToUserProperty(
        user,
        properties[Math.floor(Math.random() * 3)],
        1
      );
    }

    const fractionalErrorChance = errors - wholeErrors;
    if (fractionalErrorChance > 0 && Math.random() < fractionalErrorChance) {
      applyErrorsToUserProperty(
        user,
        properties[Math.floor(Math.random() * 3)],
        1
      );
    }

    users.push({
      _id: user._id,
      name: user.name,
      address: user.address,
      phoneNumber: user.phoneNumber,
    });
  }
  return users;
}

export default createRandomUserWithErrors;
