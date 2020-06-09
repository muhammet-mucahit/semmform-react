const formatUsernameWithDot = (username) => {
  return username.replace("|", ".");
};

export const truncate = (str) => {
  return str.length > 20 ? str.substring(0, 20) + "..." : str;
};

export const generateRandomStringId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export default formatUsernameWithDot;
