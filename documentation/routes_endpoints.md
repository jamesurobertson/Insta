# Routes and Endpoints

## API - Backend

1. Users - url_prefix = /api/user
    - GET /:id - returns user info
    - POST / - creates new user account
    - PUT /:id - updates uer info
    - DELETE /:id - deletes a user account

2. Profile - url_prefix = /api/profile
    - GET /:id - returns info to show in profile page of user :id

2. Posts - url_prefix = /api/post
    - GET / - get all posts from users that logged in user follows + their posts
    - GET /:id - get all posts from user with :id
    - GET /explore - get all posts randomized for explore page
    - POST / - posts a post for the current logged in user
    - DELETE /:id - deletes a post for the current logged in user

3. Follows - url_prefix = /api/follow
    - Get /:id/follows - gets a list of everyone that follows user with :id
    - GET /:id/following - gets a list of everyone that user :id is following
    - POST /:id - logged in user follows user with :id
    - DELETE /:id - if logged in user unfollows user with :id

4. Comments - url_prefix = /api/comment
    - Get /:id - get all comments for post of :id
    - POST /:id - posts a comment to post of :id
    - DELETE /:id - removes a comment to post of :id

5. Likes - url_prefix = /api/like
    - GET /:type/:id - get list of users who liked :type and :id
    - POST /:type/:id - like the content of :type and :id
    - DELETE /:type/:id - unlike the content of :type and :id


6. Saved - url_prefix = /api/save
    - Get / - get all posts that current user has saved
    - POST /:id - saves a post with :id to saved posts
    - DELETE /:id - unsaves a post of post :id


7. Messages - url_prefix = /api/message
    - POST /:conversationId - sends a message to a conversation
    - DELETE /:id - deletes a message

8. Conversations - url_prefix =/api/conversation
    - GET / - gets all conversations that logged in user belongs to
    - GET /:id - gets all messages in a conversation
    - POST / - creates a new conversation / sends message to a user
    - PUT /:conversationId/:archive - 'archives'/'unarchives' a conversation

9. Tags - url_prefix = /api/tag
    - GET /:type/content - gets all posts/users of :type and :content
    - POST /:type/:id/:content - adds taggable of :type, :id, :content
    - Delete /:type/:id/:content - removes tag if the comment or post is removed


## Frontend

1. /Login
    - Login Page

2. /Register
    - Register Page

3. /
    - home page showing main feed

4. /profile/:id
    - profile page
    - /tagged - see posts user is tagged in
    - /saved - only for your profile - see posts you've saged

5. /explore
    - browse all photos, searchable by hashtag

6. /post/:id
    - individual post's page

7. /account
    - Edit profile page

8. /direct/inbox
    - Direct Messages page with inbox
    - /c/:id conversation page
