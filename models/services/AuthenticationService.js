const { v4: uuidv4 } = require('uuid');
const MemoryInitializer = require('../memorydao/MemoryInitializer');
const initializer = new MemoryInitializer();

class AuthenticationService {
  static generateToken() {
    // Generate a simple token 
    return uuidv4();
  }

  static authenticate(username, password) {
    let sessionId = AuthenticationService.generateToken();
    let promise = initializer.getUserDAO.update(username, password, sessionId);

    return promise
      .then(ack => {
        if (ack) {
          return sessionId;
        }
        else {
          return null;
        }
      })
  }

}

module.exports = AuthenticationService;