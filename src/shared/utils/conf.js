import axios from "axios"; 

export const headers = {
    "Content-Type": "application/json",
};

export const profileDefaultImage = "/assets/images/profile.jpg";

axios.defaults.baseURL = process.env.NODE_ENV  === "development" 
    ? "http://localhost:5000" : "https://main-mernpro-w7spw4c86a96vqot-gtw.qovery.io";
