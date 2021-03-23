import axios from "axios"; 

export const headers = {
    "Content-Type": "application/json",
};

export const profileDefaultImage = "/assets/images/profile.jpg";

axios.defaults.baseURL = process.env.NODE_ENV  !== "development" 
    ? "http://localhost:5000" : "https://mernprofiles.herokuapp.com";
