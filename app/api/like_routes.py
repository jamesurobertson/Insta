from flask import Blueprint, request, jsonify
from sqlalchemy.orm import joinedload
from ..models import db, User, Like, Post, Comment


like_routes = Blueprint("like", __name__)


@like_routes.route("/user/<id>")
def getUserLikes(id):
    likeList = []
    likes = Like.query.filter(Like.user_id == id).all()
    for like in likes:
        likeList.append(like.to_dict())
    return {"likes": likeList}


@like_routes.route("/<likeableType>/<id>")
def getLikes(likeableType, id):
    likes = (
        Like.query.filter(Like.likeable_id == id)
        .filter(Like.likeable_type == likeableType)
        .all()
    )
    likeList = []
    for like in likes:
        likeList.append(like.to_dict())

    return {"likes": likeList}


@like_routes.route("", methods=["POST"])
def post_like():
    data = request.json
    print(data)
    content = {}
    like = Like(
        user_id=data["userId"],
        likeable_id=data["id"],
        likeable_type=data["likeableType"],
    )
    db.session.add(like)
    db.session.commit()

    likes = (
        Like.query.filter(Like.likeable_id == data["id"])
        .filter(Like.likeable_type == data["likeableType"])
        .all()
    )
    likeList = []
    for like in likes:
        likeList.append(like.to_dict())
    print(likeList)
    return {"like": like.to_dict(), "likeList": likeList}


@like_routes.route("", methods=["DELETE"])
def delete_like():
    data = request.json
    print(data)
    like = Like.query.filter(Like.id == data["id"]).first()

    db.session.delete(like)
    db.session.commit()

    
    return like.to_dict()
   
