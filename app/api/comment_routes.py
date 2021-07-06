from flask import Blueprint, request
from ..models import Comment, User, Like, db
from flask_login import current_user


comment_routes = Blueprint("comment", __name__)


@comment_routes.route("", methods=["POST"])
def postComment():
    data = request.json
    comment = Comment(
        user_id=current_user.id, post_id=data["postId"], content=data["content"]
    )

    db.session.add(comment)
    db.session.commit()

    return {"comment": comment.to_post_dict()}


@comment_routes.route("/<id>", methods=["PUT"])
def editComment(id):
    data = request.json
    comment = Comment.query.filter(
        Comment.user_id == current_user.id,
        Comment.id == int(id),
    ).first()
    if comment:
        comment.content = data["content"]
        db.session.add(comment)
        db.session.commit()
        return {"comment": comment.to_post_dict()}
    else:
        return {"message": "comment does not exist"}


@comment_routes.route("/<id>", methods=["DELETE"])
def deleteComment(id):
    data = request.json
    comment = Comment.query.filter(
        Comment.user_id == current_user.id,
        Comment.id == int(id),
    ).first()
    if comment:
        comment.content = data["content"]
        db.session.delete(comment)
        db.session.commit()
        return {"comment": comment.to_post_dict()}
    else:
        return {"message": "comment does not exist"}
