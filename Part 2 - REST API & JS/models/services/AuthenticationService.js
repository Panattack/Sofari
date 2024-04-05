const { v4: uuidv4 } = require('uuid');
const Initializer = require('../dao/Initializer');
const initializer = new Initializer();

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
      .catch(error => {
        if (error instanceof CustomError) {
          throw error;
        } else {
          throw new CustomError(error.message, 500);
        }
      });
  }
}

module.exports = AuthenticationService;