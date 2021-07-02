from flask import Blueprint, request
from ..models import Comment, User, Like, db


comment_routes = Blueprint("comment", __name__)


@comment_routes.route('', methods=["POST"])
def postComment():
    data = request.json
    comment = Comment(user_id=data['userId'], post_id=data['postId'], content=data['content'])
    
  
    db.session.add(comment)
    db.session.commit()
    comment_dict = comment.to_dict()
    comment_dict['user'] = comment.user.to_dict();
   
    likes = Like.query.filter(Like.likeable_id == comment.id).filter(Like.likeable_type == 'comment').all()
    likes_comment = []

    for like in likes:
        likes_comment.append(like.to_dict())
    comment_dict['likes'] = likes_comment
    return comment_dict
