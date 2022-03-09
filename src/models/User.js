const {getJSON, saveJSON} = require('../utils/fileHelpers');

class User {
  constructor() {
    this.saveData = saveJSON;
    this.fetchData = getJSON;
  }

  async find(id) {
    try {
      // fetch the users
      let users = await this.fetchData('users');
      // found the user
      let user = users.find(user => user.id === id);
      //   if found return the user
      if (user) {
        return user;
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(new Error(`User with id ${id} not found`));
    }
  }

  async create(user) {
    // fetch the users
    let users = await this.fetchData('users');
    // append the user to all the users
    users.push(user);
    // save the users
    this.saveData(users);
    // return the saved user
    return user;
  }
};

module.exports = new User();
