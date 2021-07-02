from flask import Blueprint, request
from sqlalchemy.orm import joinedload
from ..models import db, Post, User, Follow, Like, Comment

note_routes = Blueprint("note", __name__)


@note_routes.route('/<id>/scroll/<length>')
def index(id, length):
    length = int(length)

    follows_list = []
    likes_list = []
    comments_list = []

    user = User.query.filter(User.id == id).first()
    user_post_ids = list(map(lambda post: post.id, user.posts))
    user_comment_ids = list(map(lambda comment: comment.id, user.comments))

    follows = Follow.query.filter(Follow.user_followed_id == id).order_by(Follow.created_at.desc()).all()

    for follow in follows:
        follows_dict = follow.to_dict()
        user = follow.user.to_dict()
        follows_dict['user'] = user
        follows_dict['type'] = "follow"
        follows_list.append(follows_dict)


    all_likes_list = Like.query.filter(Like.likeable_id.in_(user_comment_ids)).order_by(Like.created_at.desc()).all()
    
    for like in all_likes_list:
        like_dict = like.to_dict()
        user = like.user.to_dict()
        print("!!!!!!!!!!!!!!", like_dict['likeable_id'])
        if like_dict['likeable_type'] == 'post':
            post = Post.query.filter(Post.id == like_dict['likeable_id']).first()
        else:
            post = Post.query.filter(Comment.id == like_dict['likeable_id']).first()
        like_dict['user'] = user
        like_dict['post'] = post.to_dict()
        like_dict['type'] = "like"
        likes_list.append(like_dict)

    # sorted_likes = sorted(likes_list, key = lambda like: like['created_at'])
    # print(sorted_likes)

    comments = Comment.query.filter(Comment.post_id.in_(user_post_ids)).order_by(Comment.created_at.desc()).all()

    for comment in comments:
        comment_dict = comment.to_dict()
        user = comment.user.to_dict()
        post = comment.post.to_dict()
        comment_dict['user'] = user
        comment_dict['post'] = post 
        comment_dict['type'] = "comment"
        comments_list.append(comment_dict)

    note_list = follows_list + likes_list + comments_list
    
    sorted_note_list = sorted(note_list, key=lambda note: note['created_at'])
    sorted_note_list.reverse()

    return {"notes": sorted_note_list[length: length + 20]}
