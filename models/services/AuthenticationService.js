const { v4: uuidv4 } = require('uuid');
const MemoryInitializer = require('../memorydao/MemoryInitializer'); 
const initializer = new MemoryInitializer();

class AuthenticationService {
  static generateToken(user) {
    // Generate a simple token 
    return uuidv4();
  }

  static authenticate(username, password) {
    const user = initializer.getUserDAO.findUserByUsernameAndPassword(username, password);

    if (user !== undefined) {
      const sessionId = AuthenticationService.generateToken(user);
      user.setSessionId = sessionId;
      initializer.getUserDAO.save(user);
      return { sessionId };
    }

    return null; // Authentication failed
  }

  // You can add more authentication-related methods here based on your needs
}

module.exports = AuthenticationService;
