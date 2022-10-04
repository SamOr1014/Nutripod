function locateToken() {
  const token =
    localStorage.getItem("userLocalToken") === null
      ? sessionStorage.getItem("userSessionToken")
      : localStorage.getItem("userLocalToken");

  return token as string;
}

export default locateToken;
