from flask import Blueprint, request, jsonify
from sqlalchemy import desc
from sqlalchemy.orm import joinedload
from sqlalchemy.sql.expression import join
from ..models import db, Post, User, Follow, Like, Comment


post_routes = Blueprint("posts", __name__)


@post_routes.route("/scroll/<length>")
def index(length):
    length = int(length)
    post_list = []
    posts = []
    posts = Post.query.offset(length).limit(3).all()
    for post in posts:
        print(f"{length}: {post.id}")
        post_dict = post.to_dict()
        likes = Like.query.filter(
            Like.likeable_id == post_dict["id"] and Like.likeableType == "post"
        ).count()
        comments = Comment.query.filter(Comment.post_id == post_dict["id"]).count()
        post_dict["like_count"] = likes
        post_dict["comment_count"] = comments
        post_list.append(post_dict)
    return {"posts": post_list}


@post_routes.route("/<id>/scroll/<length>")
def home_feed(id, length):
    length = int(length)
    post_list = []
    followed_users = Follow.query.filter(Follow.user_followed_id == id).all()
    follow_list = []
    for followed in followed_users:
        followed_dict = followed.to_dict()
        follow_list.append(followed_dict["user_id"])
    posts = (
        Post.query.filter(Post.user_id.in_(follow_list))
        .order_by(desc(Post.created_at))
        .offset(length)
        .limit(3)
        .all()
    )

    for post in posts:
        post_dict = post.to_dict()
        user = post.user
        post_dict["user"] = user.to_dict()

        likes = (
            Like.query.filter(Like.likeable_id == post.id)
            .filter(Like.likeable_type == "post")
            .all()
        )

        likes_list = []
        for like in likes:
            likes_list.append(like.to_dict())

        post_dict["likes"] = likes_list

        comments = post.comments

        comments_list = []

        for comment in comments:
            comment_dict = comment.to_dict()
            comment_dict["user"] = comment.user.to_dict()
            comments_list.append(comment_dict)

        post_dict["comments"] = comments_list
        post_list.append(post_dict)
        if len(post_list) == 3:
            return {"posts": post_list}
    return {"posts": post_list}


@post_routes.route("/<post_id>")
def get_post(post_id):

    post = Post.query.filter(Post.id == post_id).first()

    post_dict = post.to_dict()

    post_dict["user"] = post.user.to_dict()
    comments = post.comments
    comments_list = []

    for comment in comments:
        comment_dict = comment.to_dict()
        comment_dict["user"] = comment.user.to_dict()
        comments_list.append(comment_dict)

    post_dict["comments"] = comments_list

    likes = Like.query.filter(
        Like.likeable_type == "post", Like.likeable_id == post_id
    ).all()

    likeList = []
    for like in likes:
        likeList.append(like.to_dict())
    post_dict["likes"] = likeList

    return {"post": post_dict}
