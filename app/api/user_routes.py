from flask import Blueprint, request
from ..models import db, User
from ..config import Config

import jwt

user_routes = Blueprint("users", __name__)

@user_routes.route('', methods=['PUT'])
def update_user():
    data = request.json
    user = User.query.filter(User.id == data["id"]).first()
    old_user = user.to_dict()
    if user.username != data["username"]:
        if User.query.filter(User.username == data['username']).first():
            return {"error": 'Username already exists'}, 401
        user.username = data["username"]
    if user.email != data["email"]:
        if User.query.filter(User.email == data['email']).first():
            return {"error": 'Email already exists'}, 401
        user.email = data["email"]
    if user.full_name != data["full_name"]:
        user.full_name = data["full_name"]
    if user.bio != data["bio"]:
        user.bio = data["bio"]
    db.session.commit()

    old_keys = set(old_user.values())
    new_keys = set(user.to_dict().values())

    print(len(old_keys.intersection(new_keys)))
    print(len(old_keys.intersection(new_keys)))
    if len(old_keys.intersection(new_keys)) == 6:
        return {"error": "No changes made"}, 401

    access_token = jwt.encode({'email': user.email}, Config.SECRET_KEY, algorithm="HS256")
    return {'access_token': access_token.decode('UTF-8'), 'user': user.to_dict()}


@user_routes.route('/<id>/resetImg')
def resetImg(id):
    user = User.query.filter(User.id == id).first()

    user.profile_image_url = 'https://slickpics.s3.us-east-2.amazonaws.com/uploads/FriJul171300242020.png'
    db.session.commit()

    return user.to_dict()
