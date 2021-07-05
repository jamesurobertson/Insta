from datetime import datetime
from flask import Blueprint, request

from ..models import db, Post, User, Follow, Like, Comment
from flask_login import current_user

note_routes = Blueprint("note", __name__)


@note_routes.route("/scroll/<length>")
def index(length):
    split = length.split("+")
    count_obj = {
        "comment": int(split[0]),
        "follow": int(split[1]),
        "post_like": int(split[2]),
        "comment_like": int(split[3]),
    }

    user = User.query.filter(User.id == current_user.id).first()
    user_posts = Post.query.filter(Post.user_id == user.id).all()
    user_comments = Comment.query.filter(Comment.user_id == user.id).all()

    note_list = []

    while len(note_list) < 20:
        follow = (
            Follow.query.filter(Follow.user_followed_id == user.id)
            .order_by(Follow.created_at.desc())
            .offset(count_obj["follow"])
            .first()
        )
        comment = (
            Comment.query.filter(Comment.post.has(Post.user_id == user.id))
            .order_by(Comment.created_at.desc())
            .offset(count_obj["comment"])
            .first()
        )

        post_like = (
            Like.query.filter(
                Like.post_id.in_(list(map(lambda post: post.id, user_posts)))
            )
            .order_by(Like.created_at.desc())
            .offset(count_obj["post_like"])
            .first()
        )
        comment_like = (
            Like.query.filter(
                Like.comment_id.in_(
                    list(map(lambda comment: comment.id, user_comments))
                )
            )
            .order_by(Like.created_at.desc())
            .offset(count_obj["comment_like"])
            .first()
        )

        obj = {
            "follow": follow,
            "comment": comment,
            "post_like": post_like,
            "comment_like": comment_like,
        }

        if not any(obj.values()):
            return {"notes": note_list, "count": count_obj}

        max = None
        for (k, v) in obj.items():
            if not v:
                continue
            elif not max:
                max = k
            elif v.created_at > obj[max].created_at:
                max = k
        res = obj[max].to_dict()
        res["type"] = max
        count_obj[max] += 1
        print(count_obj)
        note_list.append(res)

    return {"notes": note_list, "count": count_obj}
