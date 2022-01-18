<p align="center">
   <img src="https://i.imgur.com/TxDpLkU.png"/>
</p>

<h1 align="center">
   Travel App
</h1>

###### Project 03 Submission for the General Assembly SEI bootcamp

## App Features
TravelApp is a responsive, mobile-friendly app that allows travelers to create and share stories  about their recent travel experiences. The app also allows would-be travelers to search information about the locations to help prepare for their visits. User can search content by location, as well as edit and delete posts they create.

* Heroku link: [Frontend](https://blooming-plains-76036.herokuapp.com/); [Backend](https://enigmatic-anchorage-22310.herokuapp.com/posts)
* Git Hub: [Frontend](https://github.com/mwelongo/project-app_front); [Backend](https://github.com/dommentee/projectApp_back)
<!-- * Trello Board: https://trello.com/b/KqqwlxWa/gaproject-02 -->

## Main Components of the App:
* Authentication: User will be able to create an account, enter basic profile info, and login
* CREATE: User will be able to create a new post - category tag, location, photo, some content about the location (recommendations, cons).
* READ: User will be able to read their post. The posts will have a comment box
  * Div that holds the content will be a scroll box
  * User is able to filter posts based on specific tags
* UPDATE: - user will be able to edit posts
* DELETE: - user will be able to delete posts

## Technology
* **Frontend**: ReactJS
* **Backend**: Node.js/Express, Mongoose
* **Styling**: SkeletonCSS. Responsive, mobile-first design
* Follows MVC file structure (Model-View-Controller), full CRUD functionality

#### Installs and dependencies
```
   npx create-react-app
   axios
```


## C.R.U.D Functionalities - Cread, Read, Update, Delete

* Create: User is able to create a new post by clicking on the CREATE button
* Read/Find: User is able to view details about the post by clicking on the OPEN POST button
* Updated/Edit: User is able to update/edit post by clicking on the EDIT button
* Delete: User is able delete post by clicking on the DELETE button

## Work in Progress
* Complete the comment section
* Add user login and authentication
