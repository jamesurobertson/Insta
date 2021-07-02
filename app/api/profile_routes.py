from flask import Blueprint, request, jsonify
from sqlalchemy.orm import joinedload
from ..models import db, Post, User, Follow, Like, Comment

profile_routes = Blueprint("profile", __name__)


@profile_routes.route('/<id>')
def index(id):
    post_count = Post.query.filter(Post.user_id == id).count()
    followers = Follow.query.filter(Follow.user_followed_id == id).all()
    follows = Follow.query.filter(Follow.user_id == id).all()
    user = User.query.filter(User.id == id).first()
    posts = Post.query.filter(Post.user_id == id).all()
    posts.reverse()
    plist = []

    followersList = []
    followsList = []

    for follower in followers:
        followersList.append(follower.to_dict())

    for follower in follows:
        followsList.append(follower.to_dict())

    for post in posts:
        post_dict = post.to_dict()
        print(post_dict)
        likes = Like.query.filter(Like.likeable_id == post_dict["id"] and Like.likeableType == 'post').count()
        comments = Comment.query.filter(Comment.post_id == post_dict["id"]).count()
        post_dict["like_count"] = likes
        post_dict["comment_count"] = comments
        plist.append(post_dict)
    return {"num_posts": post_count, "posts": plist, "followersList": followersList, "followingList": followsList, "user": user.to_dict() }
