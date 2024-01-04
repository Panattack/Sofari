const { v4: uuidv4 } = require('uuid');
const MemoryInitializer = require('../memorydao/MemoryInitializer');
const initializer = new MemoryInitializer();

class AuthenticationService {
  static generateToken() {
    // Generate a simple token 
    return uuidv4();
  }

  static authenticate(username, password) {
    let id = AuthenticationService.generateToken();
    let promise = initializer.getUserDAO.update(username, password, id);

    return promise.
      then(res => {
        if (res.acknowledged) {
          return id;
        }
        else {
          return null;
        }
      })
  }

}

module.exports = AuthenticationService;
