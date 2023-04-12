# About BnB-Ria

BnB-Ria is a web application inspired by Airbnb. [Click here to visit BnB-Ria's live site](https://BnB-Ria.onrender.com/).

<br>

## Wiki Links

- [API routes](https://github.com/Murphyn5/Bnb-RiA/wiki/API-Routes)
- [DB Schema](https://github.com/Murphyn5/Bnb-RiA/wiki/Database-schema-diagram)
- [Redux Store Shape](https://github.com/Murphyn5/Bnb-RiA/wiki/Store-Shape)
- [Feature List](https://github.com/Murphyn5/Bnb-RiA/wiki/MVP-Features-&-Page-Wireframes)

<br>

# Tech Stack

Frameworks, Platforms and Libraries:

[![Javascript][javascript.js]][javascript-url]
[![HTML][html.js]][html-url]
[![CSS][css.js]][css-url]
[![Nodejs][node.js]][node-url]
[![Sequelize][sequelize.js]][sequelize-url]
[![Express][express.js]][express-url]
[![React][react.js]][react-url]
[![Redux][redux.js]][redux-url]

Database:

[![PostgreSQL][postgresql.js]][postgresql-url]

<br>

# Features Directions

## Home Page Demo User

You will be able to test features without signing up by clicking on "Log in as Demo User".
![demo-user-features]

[demo-user-features]: ./assets/demo-user-features.png

## Create Spot as Logged-In User

Logged-in users will be able to create a new spot.
![create-spot-form]

[create-spot-form]: ./assets/create-spot-form.png

## Spot Details Viewing Available For Anyone

Spot details can be accessed by anyone with additional features for logged in users, such as writing a review for someone else's spot.
![spot-details]

[spot-details]: ./assets/spot-details.png

## Roadmap

- <input type="checkbox" checked> User Authentication
- <input type="checkbox" checked> Spots (CRUD)
- <input type="checkbox"> Reviews (CRUD)
  - <input type="checkbox" checked> Create user reviews
  - <input type="checkbox" checked> Read user reviews
  - <input type="checkbox"> Update user reviews
  - <input type="checkbox" checked> Delete user reviews
- <input type="checkbox"> Spot Images (CRUD)
  - <input type="checkbox" checked> Create spot images
    - <input type="checkbox" checked> Create spot images in new spot form
    - <input type="checkbox"> Create individual spot images
  - <input type="checkbox" checked> Read spot images
  - <input type="checkbox"> Update spot images
  - <input type="checkbox"> Delete spot images
    - <input type="checkbox" checked> Delete spot images during spot deletion
    - <input type="checkbox"> Delete individual spot images
- <input type="checkbox"> Bookings (CRUD)

<br>

# Get Started

To run this project locally, please perform the following steps:

1. Clone the repository
   ```sh
   git clone https://github.com/Murphyn5/Bnb-Ria.git
   ```
2. Install npm packages at the root directory, and in both frontend and backend folders
   ```sh
   npm install
   ```
3. Create a local database file by running the following command in the backend folder
   ```sh
   npm run reset-db
   ```
4. Start both the frontend and backend servers by opening two terminals, one for each, and running the following command
   ```sh
   npm start
   ```
5. The localhost:3000 port will be available to view and interact with the application to test out the features.

<br>

# Contact

Email: nlimurphy@gmail.com

Portfolio: https://murphyn5.github.io/

LinkedIn: https://linkedin.com/in/nicholas-murphy-1167b226b

<!-- References and Icons -->

[html.js]: https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white
[html-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[css.js]: https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white
[css-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[postgresql.js]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[postgresql-url]: https://www.postgresql.org/
[sequelize.js]: https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue
[sequelize-url]: https://sequelize.org/
[express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[express-url]: https://expressjs.com/
[javascript.js]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[javascript-url]: https://www.javascript.com/
[redux.js]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[redux-url]: https://redux.js.org/
[node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/en/
