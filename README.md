

# Isntgram
*By James Robertson, Mylo James, and Aaron Pierskalla - [Visit Isntgram](http://isntgram.herokuapp.com/)*

**Table of Contents**
* [Technologies Used](#technologies-used)
* [Key Features](#key-features)
* [Isntgram Intro](#Isntgram)
* [Software Arcitecture](#software-architecture)
* [Frontend Technologies](#frontend-overview)
* [Backend Technologies](#backend-overview)
* [Conclusion](#conclusion-and-next-steps)
* [Future Implementations](#future-implementations)

## Technologies Used
* React
* Postgress
* Flask
* SQLAlchemy
* AWS S3
* JSON Web Tokens

## Key Features

1. Create a user account
    - Auth protected. Must be logged in to navigate to any page other than login/sign up.
    - Encrypted Password
    - Once registered ability to change info

2. Share Images
    - Post images to your page
    - Your images show up in the photo feed

3. Photo feed
    - Home pages shows feed of all images from users you follow organized by date posted

4. Likes
    - Ability to like posts and comments.


6. Follow Users
    - Ability to follow and be followed.
    - Your feed is made up of posts from users you follow



## Isntgram Intro
Isn'tgram is a fullstack photo sharing app modeled after Instagram that is built with a React frontend and a Flask Python backend.
Users can share and upload photos, follow other users


## Software Architecture
Isntgram was developed with Javascript and React on the frontend and Python, Flask and Postgres on the backend. The data needed for this application is solely dependent on user input and uploading of photos. The inputs are stored in Postgres and rendered to the appropriate pages. The backend is responsible for handling all frontend requests through the servers, the servers then pull data from Postgres, and relay the information to the frontend.

The backend serves the frontend, responds to frontend requests, acts as an intermediary to serve Spotify data to the frontend, and fetches data from the MongoDB database.

### Frontend Technologies:
#### React
Isntgram is a application that uses JSX, a React feature that makes it easier to render HTML with Javscript. JSX made it simple to recycle components and to render data dynamically. React also helps store components in an organized manner. Reacts ability to manipulate state of each components through hooks is another advantage. React hooks is a simple solution to controlling the varying information.


##### Infinite Scroll implementation
```jsx
const fetchMore = () => {
    if (!currentUserId) return;

    (async ()=>{
       const len = toRender.length;
      try {
      const res = await fetch(`/api/post/scroll/${len * 3}`, {
        Authorization: localStorage.getItem("Isntgram_access_token"),
      })
      const obj = await res.json();

      let photoArray = obj.posts

      if(photoArray.length < 3) {
        setHasMore(false)
      }

      const componentToRender = getTemplate(len, photoArray);
       setToRender([...toRender, ...componentToRender]);
    } catch {
       setHasMore(false);
       setToRender([]);
       setLoading(false);
    }

    })()

  }

  if (!toRender || !currentUserId) return null;
  return (
    <ExploreGridWrapper key="gridWrapper">
      <InfiniteScroll initialLoad={true} pageStart={4} loadMore={fetchMore} hasMore={hasMore}>
        {toRender}
      </InfiniteScroll>
      <LoadingWrapper
        style={{ animationName: `${loading ? "fadeIn" : "fadeOut"}` }}
        >
        <Loading />
      </LoadingWrapper>
    </ExploreGridWrapper>
  );
};


```
#### Infinite Scrolll
The [Infinite Scroll](https://www.npmjs.com/package/react-toastify) infinite scroll is a popular Javascript plug-in that automatically renders the next pages without the user having to refresh the page to see more content. The library for infinite scroll is robust and thorough which makes it easy to incorporate into Isntgram.

Another great feature of inifite scroll is the ability to navigate of the page and return to find their position is still maintained, which is perfect feature for a social media site.

#### Toasts
React [toast](https://www.npmjs.com/package/react-toastify) is a small library that renders small popup notifications with a little message for the user. A toast only lasts a couple seconds but gives the user insight on whether their action was successfully or unsuccessfully completed.


## Backend
Isntgram uses a Python server with Postgres as the database. Compared to previous projects, the backend for Isntgram is much more complex due to the numerous relationships tables had with one another. Although, the backend is more complex, it was made easier using Python and Flask. Below is a more detailed description of our experience working on the backed.

### Backend Technologies
##### Code for Python Backend
```Python
@bp.route('/<post_id>')
def get_post(post_id):

    post = Post.query.filter(Post.id == post_id).first()
    post_dict = post.to_dict()
    post_dict["user"] = post.user.to_dict()
    comments = post.comments
    comments_list = []

    for comment in comments:
        comment_dict = comment.to_dict()

        comment_likes = Like.query.filter(Like.likeable_type == "comment").filter(Like.likeable_id == comment.id).all()
        user_list = []
        for like in comment_likes:
            user = like.user.to_dict()
            user_list.append(user)

        comment_dict['likes_comment'] = user_list

        user = comment.user
        comment_dict["username"] = user.to_dict()
        comments_list.append(comment_dict)

    likes = Like.query.filter(Like.likeable_type == "post").filter(Like.likeable_id == post_id).all()
    user_list = []

    for like in likes:
        user = like.user.to_dict()
        user_list.append(user)


    return {"post": post_dict, "comments": comments_list, "likes_post": user_list}
```
#### Python
[Python](https://docs.python.org/3/) was the perfect option for the server-side framework. The syntax for Python is simple to read and write which allows developers to build backends faster. With Python, the structure of building models and relationships allows the developer to easily write routes without having query the database multiple times. The light-weight nature of Python made writing the backend fast and efficient.

#### Flask
Python also supports the [Flask](https://flask.palletsprojects.com/en/1.1.x/) framework. Flask is light-weight framework that is intended to get projects up and running quickly and efficiently. Building the server using Flask was much faster when compared to other backend frameworks and languages.

#### Postgres
[Postgres](https://www.mongodb.com/) was perfect for this project because its collections of JSON-like records made it very easy to store the artist information, which is in JSON object form.


## Conclusion
The technologies used to create Instgram were challenging, complex and fun. Building this amazing app as a great team is something we are all proud of. Check out the app and feel free to reach out to any of us!


## Future Implementations
1. Save Posts
    - Save posts for ability to go back and look at posts you've saved

2. Searchable tags
    - adding a string after a '#' allows that post to be searchable by that hashtag.
    - adding a string after a '@' allows user ability to tag another user.

3. Direct Messaging
    - Slide into those Dm's
