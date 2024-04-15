import axios from "axios";
import { HOST } from "../host";
import UserSingleton from "../user-singleton";
import { saveTokenToLocalStorage, getTokenFromLocalStorage } from "../auth/token-services"

export default class User {
    constructor(id, name) {
      this.id = id;
      this.name = name;
    }

    static async login(username, password) {
      let url = `${HOST}/api/auth/login`;
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
          
          UserSingleton.getInstance().setUser(user);
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


  static async getUserByToken() {
    let token = await getTokenFromLocalStorage();
    let url = `${HOST}/api/user`;
    if(token) {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        data = response.data;
        if(data.ok) {
          const user = new User(data.data.user.id, data.data.user.username);
          UserSingleton.getInstance().setUser(user);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error while fetching user data by token:", error);
        return false;
      }
    }
  }
  



}  


