export const hideString = (str) => {
  if (!str) return str; // Return the original string if it's empty or null

  const length = str.length;
  const thirdLength = Math.floor(length / 3);
  const startThird = thirdLength;
  const endThird = length - thirdLength;

  // For strings of length less than 3, replace the entire string with '*'
  if (length < 3) {
    return "*".repeat(length);
  }

  // Construct the new string
  const firstPart = str.substring(0, startThird);
  let middlePart = "";
  for (let i = startThird; i < endThird; i++) {
    middlePart += str[i] === " " ? " " : "*";
  }
  const lastPart = str.substring(endThird);

  return firstPart + middlePart + lastPart;
};
