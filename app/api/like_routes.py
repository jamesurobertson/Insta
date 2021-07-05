from flask import Blueprint, request, jsonify
from sqlalchemy.orm import joinedload
from ..models import db, User, Like, Post, Comment
from flask_login import current_user


like_routes = Blueprint("like", __name__)


@like_routes.route("/user/<id>")
def getUserLikes(id):
    likes = list(
        map(
            lambda like: like.to_user_dict(),
            Like.query.filter(Like.user_id == id).all(),
        )
    )
    return {"likes": likes}


@like_routes.route("/<type>/<id>")
def getLikes(type, id):
    print(current_user)
    likes = list(
        map(
            lambda like: like.to_dict(),
            Like.query.filter(Like.comment_id == id).all()
            if type == "comment"
            else Like.query.filter(Like.post_id == id).all(),
        )
    )

    return {"likes": likes}


@like_routes.route("/<type>/<id>", methods=["POST"])
def post_like(type, id):
    like = (
        Like(user_id=current_user.id, comment_id=id)
        if type == "comment"
        else Like(user_id=current_user.id, post_id=id)
    )
    db.session.add(like)
    db.session.commit()

    return {"like": like.to_content_dict()}


@like_routes.route("/<type>/<id>", methods=["DELETE"])
def delete_like(type, id):
    like = (
        Like.query.filter(
            Like.user_id == current_user.id, Like.post_id == int(id)
        ).first()
        if type == "post"
        else Like.query.filter(
            Like.user_id == current_user.id, Like.comment_id == id
        ).first()
    )
    if like:
        db.session.delete(like)
        db.session.commit()
        return {"like": like.to_content_dict()}
    else:
        return {"message": "Like does not exist"}
