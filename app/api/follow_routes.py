from flask import Blueprint, request, jsonify
from sqlalchemy.orm import joinedload
from flask_login import current_user
from ..models import User, Follow, db

follow_routes = Blueprint("follow", __name__)

# users who follow user of <id>
@follow_routes.route("/<id>/followers")
def getFollows(id):
    followers = list(
        map(
            lambda follow: follow.user_id,
            User.query.filter(User.id == id).first().followers,
        )
    )
    return {"followers": followers}


@follow_routes.route("<id>/following")
def getFollowing(id):
    following = list(
        map(
            lambda follow: follow.user_followed_id,
            User.query.filter(User.id == id).first().following,
        )
    )
    return {"following": following}


@follow_routes.route("/<id>", methods=["POST"])
def followUser(id):
    exists = int(id) in list(
        map(lambda follow: follow.user_followed_id, current_user.following)
    )
    if exists:
        return {"error": "Already Follow!"}, 400
    follow = Follow(user_id=current_user.id, user_followed_id=id)
    db.session.add(follow)
    db.session.commit()
    return follow.to_following_dict()


@follow_routes.route("/<id>", methods=["DELETE"])
def deleteFollow(id):
    exists = int(id) in list(
        map(lambda follow: follow.user_followed_id, current_user.following)
    )
    if not exists:
        return {"error": "Doesn't follow!"}
    follow = Follow.query.filter(
        Follow.user_id == current_user.id, Follow.user_followed_id == id
    ).first()
    db.session.delete(follow)
    db.session.commit()
    return follow.to_following_dict()
