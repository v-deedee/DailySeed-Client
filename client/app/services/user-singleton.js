export default class UserSingleton {
    #currentUser = null;
  
    constructor() {
      if (!UserSingleton.instance) {
        UserSingleton.instance = this;
      }
  
      return UserSingleton.instance;
    }
  
    static getInstance() {
      if (!UserSingleton.instance) {
        UserSingleton.instance = new UserSingleton();
      }
  
      return UserSingleton.instance;
    }
  
    setUser(user) {
      this.#currentUser = user;
    }
  
    getUser() {
      return this.#currentUser;
    }
  
    getUserName() {
      return this.#currentUser?.name;
    }
  
    getUserEmail() {
      return this.#currentUser?.email;
    }
  }
  