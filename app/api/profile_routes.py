from flask import Blueprint, request, jsonify
from sqlalchemy.orm import joinedload
from ..models import db, Post, User, Follow, Like, Comment

profile_routes = Blueprint("profile", __name__)


@profile_routes.route("/<id>")
def index(id):
    posts = list(
        map(
            lambda post: post.to_profile_dict(),
            Post.query.filter(Post.user_id == id)
            .order_by(Post.created_at.desc())
            .all(),
        )
    )

    user = User.query.filter(User.id == id).first().to_profile_dict()

    return {"user": user, "posts": posts}
