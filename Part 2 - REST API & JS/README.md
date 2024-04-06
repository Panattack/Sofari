<div align="center">
    <img src="../../media/logo_svg.svg" width="200" >
</div>

# REST API & JS

## Description 📌
In this part of the project we create a full stack web application. We exploit the frontend from the Task 5 from Part 1 and expand it with more pages. Also we introduce our server, which follows the principles of a REST API, written in Javascript. Now the users are able to select their favorite projects from each category as the application will store them in a real database using MongoDB, structured in NoSQL.

## Interact with Sofari 💻📱
### Execution Guide
1. Open the command line from the root directory of the project
2. Write `nodemon index.js` followed by these arguments:
* To use with Memory Storage
> For example: `nodemon index.js`
* To use with MongoDB
    * username : `sofari`
    * password : `qwerty1234567`
    * host : `sofari.7brfe1w.mongodb.net/`
> For example: `nodemon index.js sofari qwerty1234567 sofari.7brfe1w.mongodb.net/`
3. Open your Web Browser and in the search tab/bar write `localhost:8080`

## Implementation Details 📜
### External API
- Ads are dynamically loaded from an external API that provides access to categories and subcategories of ads as well as ads of selected categories through appropriate requests.
- For each API call, an `HTTP GET` request is sent to the server https://wiki-ads.onrender.com.
- The following calls are supported, and their results are in JSON format:
    - GET /categories
    - GET /categories/:id/subcategories
    - GET /subcategories
    - GET /ads?subcategory={id}
    - GET /ads?category={id}

### Internal API
The following calls are supported, and their results are in JSON format:
#### *POST /login*
**Login Service - LS** : Receives necessary user identification information (username, password) from the client. The service returns an appropriate response code in case of successful authentication, along with a JSON object containing a unique session identifier in the following format:
{ "sessionId": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed" }

**Status codes returned**:
- 200 OK: Login was successful and the sessionId is returned
- 401 Unauthorized: The identification information (username, password) was incorrect
- 500 Internal Server Error

#### *POST /favourites/add*
**Add to Favourites Service - AFS** : Receives necessary information from the client for adding an advertisement to the favourite list of the respective user. The provided details should include: advertisement code, title, description, cost, URL of the advertisement image, username, and sessionId. The service verifies whether the given username corresponds to the session identifier (sessionId) assigned during their authentication, ensuring the addition of favourites is prevented for unauthorized users. Additionally, the service prevents the duplicate registration of advertisements in a user's favourites. The service returns an appropriate response code based on its outcome.

**Status codes returned**:
- 201 Created: The favourite list was successfully created (the user added an advertisement for the first time)
- 204 No Content: The advertisement was added successfully
- 401 Unauthorized: The user hasn't logged in 
- 409 Conflict: The user tried adding an advertisement that already exists in the favourite list
- 500 Internal Server Error

#### *GET /favourites/retrieve*
**Retrieval Service – FRS** : Receives necessary information from the client (username, sessionId) for displaying favourite advertisements. The service verifies whether the provided username corresponds to the session identifier (sessionId) to prevent unauthorized access to favourite advertisements. In case of successful execution, the service returns the list of favourite advertisements in JSON format.

**Status codes returned**:
- 200 OK: The favourite list is successfully returned
- 401 Unauthorized: The user hasn't logged in 
- 404 Not Found: The user's favourite list has not been initialized yet (the usr has never added any advertisements)
- 500 Internal Server Error

### Supported Features
1. Filtering of advertisements is supported according to their subcategory.
2. Connection with MongoDB is supported. The relevant Database is `Sofari`, with two collections `User` and `FavoriteBucket`. The `User` collection contains some predefined users for testing purposes. The `FavoriteBucket` collection is left empty. Indexes were established on both collections to ensure uniqueness and to enhance the performance. More specifically:

    1. **User**: A unique index is created on the (username, password) tuple using the following code snippet: 

    ```js
    use('Sofari');
    db.getCollection("User").createIndex({ username: 1, password: 1 },{ unique: true, name: "uniqueUserCredentials" } );
    ```

    2. **FavoriteBucket** : A unique index is created on the (username, password) tuple using the following code snippet:

    ```js
    use('Sofari');
    db.getCollection("FavoriteBucket").createIndex({ username: 1, password: 1 },{ unique: true, name: "uniqueUserCredentials" } );
    ```
