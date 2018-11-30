# Birds Nest fullstack capstone

Link to live NODE application: https://birds-nest.herokuapp.com/

# Goal & Use Case

This is a simple two in one travel planner and logger app for families who love to travel.

My family loves to travel and we would take notes to capture our memories. We always bring out small notebooks and diaries for our trips. I wanted to make an app that will make our load lighter.

# Screenshots

- Screenshot 1.Landing Page
  ![screenshot1](https://github.com/PeterAndreas77/birds-nest-node-capstone/blob/master/github-pictures/landing-page.png)
- Screenshot 2. Sign In Page
  ![screenshot2](https://github.com/PeterAndreas77/birds-nest-node-capstone/blob/master/github-pictures/sign-in-page.png)
- Screenshot 3. Sign Up Page
  ![screenshot3](https://github.com/PeterAndreas77/birds-nest-node-capstone/blob/master/github-pictures/sign-up-page.png)
- Screenshot 4. User Main Page / Flight Plans Page
  ![screenshot4](https://github.com/PeterAndreas77/birds-nest-node-capstone/blob/master/github-pictures/user-main-page.png)
- Screenshot 5. Menu
  ![screenshot5](https://github.com/PeterAndreas77/birds-nest-node-capstone/blob/master/github-pictures/top-menu.png)
- Screenshot 6. Form for plan creation
  ![screenshot6](https://github.com/PeterAndreas77/birds-nest-node-capstone/blob/master/github-pictures/create-plan-form.png)
- Screenshot 7. Form forr plan update
  ![screenshot7](https://github.com/PeterAndreas77/birds-nest-node-capstone/blob/master/github-pictures/update-plan-form.png)
- Screenshot 8. Flight Logs Pagee
  ![screenshot8](https://github.com/PeterAndreas77/birds-nest-node-capstone/blob/master/github-pictures/flight-logs-page.png)
- Screenshot 9. Plan Selection Page
  ![screenshot9](https://github.com/PeterAndreas77/birds-nest-node-capstone/blob/master/github-pictures/plan-selection.png)
- Screenshot 10. Form for log creation
  ![screenshot10](https://github.com/PeterAndreas77/birds-nest-node-capstone/blob/master/github-pictures/create-log-form.png)
- Screenshot 11. Form for log update
  ![screenshot11](https://github.com/PeterAndreas77/birds-nest-node-capstone/blob/master/github-pictures/update-log-form.png)
- Screenshot 12. How To Use Page
  ![screenshot12](https://github.com/PeterAndreas77/birds-nest-node-capstone/blob/master/github-pictures/how-to-page.png)

# User Stories & Initial UX

**Landing Screen**
Picture 1. Initial landing page explains what app is for. When the user clicks starts, they will be directed to the next screen.
![sketch1](https://github.com/PeterAndreas77/birds-nest-node-capstone/blob/master/github-pictures/landing-view.jpg)

**Sign In & Log In Screen**
Picture 2. Sign in form asks the user to create a new username and password to use this app. Log in form asks the user to log in to their account if they have one.
![sketch2](https://github.com/PeterAndreas77/birds-nest-node-capstone/blob/master/github-pictures/signin-login-view.jpg)

**User Main Screen**
Picture 3. If the user login is successful, they will go to this user main screen, where they can add their own story and search other people stories.
![sketch3](https://github.com/PeterAndreas77/birds-nest-node-capstone/blob/master/github-pictures/user-main-view.jpg)

**Add & Search Screens**
Picture 4. In add story screen, a user can submit their own story (title and content only), with a date set at the current time of input.
In Search screen, the user can search for either the other stories by username or their title.
![sketch4](https://github.com/PeterAndreas77/birds-nest-node-capstone/blob/master/github-pictures/add-search-view.jpg)

**Stories Screens**
Picture 5. This story screen will pop up when a user clicks one of the stories, either their own or others.
If the story is their own, then the menu will be edit and delete.
If the story is another user story, then the menu will be a comment and like.
![sketch5](https://github.com/PeterAndreas77/birds-nest-node-capstone/blob/master/github-pictures/stories-view.jpg)

# Technical stack

**Front-end**

- HTML5
- CSS3
- JavaScript
- jQuery

**Back-end**

- NodeJS
- Mongoose / MongoDB
- Heroku (hosting)

**Testing**

- Mocha & Chai
- TravisCI

**Responsiveness**

- The site is fully responsive on most devices, with focus on mobile.
- Tested on Chrome, Firefox & Safari.

**Security**

- Passport
- Bcryptjs

## NODE command lines

- npm install ==> install all node modules in package.json
- nodemon server.js ==> run node server
- npm test ==> run the tests (using mocha and chai's should)

# Development Roadmap

### Version 1.1

\*Users can download their travel plans and travel logs as pdf.
