# Web-Dev

## To run the nodemon you have to:
### Execution Guide
1. Open the command line from the root directory of the project
2. Write `nodemon index.js` with these arguments
* With memory storage
    * *factoryPath* : `../memorydao/MemoryDAOFactory`
> For example: `nodemon index.js ../memorydao/MemoryDAOFactory`
* With MongoDB
    * *factoryPath* : `../mongodao/MongoDAOFactory`
    * *username* : `sofari`
    * *password* : `qwerty1234567`
    * *host* : `sofari.7brfe1w.mongodb.net/`
> For example: `nodemon index.js ../mongodao/MongoDAOFactory sofari qwerty1234567 sofari.7brfe1w.mongodb.net/`