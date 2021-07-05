from flask import Blueprint, request
from ..models import db, User
from flask_login import current_user



user_routes = Blueprint("users", __name__)


@user_routes.route("", methods=["PUT"])
def update_user():
    data = request.json
    user = User.query.filter(User.id == current_user.id).first()
    if user.username != data["username"]:
        user.username = data["username"]
    if user.email != data["email"]:
        user.email = data["email"]
    if user.full_name != data["full_name"]:
        user.full_name = data["full_name"]
    if user.bio != data["bio"]:
        user.bio = data["bio"]

    db.session.commit()

    return {"user": user.to_dict()}


@user_routes.route("/<id>/resetImg")
def resetImg(id):
    user = User.query.filter(User.id == id).first()

    user.profile_image_url = (
        "https://isntgramaa.s3.us-east-2.amazonaws.com/default+user.png"
    )

    db.session.commit()

    return user.to_dict()
