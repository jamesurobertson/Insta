import os
import boto3
import time
from flask import Blueprint, request, jsonify
from ..models import db, User, Post
from flask_login import current_user


aws_routes = Blueprint("aws", __name__)

UPLOAD_FOLDER = 'uploads'
BUCKET = 'isntgramaa'


@aws_routes.route('/', methods=["POST"])
def upload():
    f = request.files['file']
    f.filename = change_name(f.filename)
    upload_file(f, BUCKET)
    user = User.query.filter(User.id == current_user.id).first()
    user.profile_image_url = f'https://isntgramaa.s3.us-east-2.amazonaws.com/{f.filename}'
    db.session.commit()
    return {"img": f'https://isntgramaa.s3.us-east-2.amazonaws.com/{f.filename}'}


@aws_routes.route('/post/<content>', methods=["POST"])
def upload_post(content):
    f = request.files['file']
    f.filename = change_name(f.filename)
    upload_file(f, BUCKET)
    image_url = f'https://isntgramaa.s3.us-east-2.amazonaws.com/{f.filename}'
    if content == 'null':
      content = ''

    try:
        post = Post(user_id=current_user.id, image_url=image_url, caption=content)
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    except AssertionError as message:
        print(str(message))
        return jsonify({"error": str(message)}), 400

def upload_file(file, bucket):
    """
    Function to upload a file to an S3 bucket
    """
    object_name = file.filename
    s3_client = boto3.client('s3')
    response = s3_client.upload_fileobj(file, bucket, object_name)
    return response

def change_name(file_name):
    return f"{time.ctime().replace(' ', '').replace(':', '')}.png"
