export const backendURL =
  process.env.NODE_ENV === "production" ? "https://isntgram.herokuapp.com/api" : `http://localhost:5000/api`;
export const frontendURL =
  process.env.NODE_ENV === "production" ? "https://isntgram.herokuapp.com" : "http://localhost:3000";
