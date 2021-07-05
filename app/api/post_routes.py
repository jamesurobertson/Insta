from flask import Blueprint, request, jsonify
from sqlalchemy import desc
from sqlalchemy.orm import joinedload
from sqlalchemy.sql.expression import join
from ..models import db, Post, User, Follow, Like, Comment
from flask_login import current_user


post_routes = Blueprint("posts", __name__)


@post_routes.route("/scroll/<length>")
def index(length):
    posts = list(
        map(
            lambda post: post.to_dict(),
            Post.query.order_by(Post.created_at.desc()).offset(length).limit(3).all(),
        )
    )

    return {"posts": posts}


@post_routes.route("/user/scroll/<length>")
def home_feed(length):
    posts = list(
        map(
            lambda post: post.to_dict(),
            (
                Post.query.filter(
                    Post.user_id.in_(
                        list(
                            map(
                                lambda follow: follow.user_followed_id,
                                current_user.following,
                            )
                        )
                    )
                )
                .order_by(Post.created_at.desc())
                .offset(length)
                .limit(3)
                .all()
            ),
        )
    )

    return {"posts": posts}


@post_routes.route("/<post_id>")
def get_post(post_id):

    post = Post.query.filter(Post.id == post_id).first().to_dict()

    return {"post": post}
