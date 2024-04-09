import axios from "axios";
import { HOST } from "../host";
import UserSingleton from "../user-singleton";
import { saveTokenToLocalStorage } from "../auth/token-services"

export default class User {
    constructor(id, name) {
      this.id = id;
      this.name = name;
    }

    static async login(username, password) {
      let url = `http://192.168.110.59:5050/api/auth/login`;
      console.log(url)
      let body = { username: username, password: password};
      try {
        const response = await axios.post(url, body);
        const { ok, data } = response.data;

        console.log(ok, data)
        if (ok) {
          const { token } = data;
          const { payload } = data;
          const user = new User(payload.id, payload.username)
          // Lưu token vào AsyncStorage
          console.log(saveTokenToLocalStorage)
          console.log(token)
          await saveTokenToLocalStorage(token);
          
          await UserSingleton.getInstance().setUser(user);
          console.log('Token saved successfully:', user);
          return true;
        } else {
          console.error('Login failed:', data);
          return false;
        }
      } catch (error) {
        console.error("Error while making request:", error);
      }

    }

    static async register(username, password, email) {
      let url = `${HOST}/api/user`;
      let body = { username: username, password: password, email: email };

      try {
          const response = await axios.post(url, body);
          return response.data;
      } catch (error) {
          console.error("Error while making request:", error);
          return response.data;
      }
  }




}  


