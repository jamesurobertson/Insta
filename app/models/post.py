from ..models import db
from sqlalchemy import func


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    image_url = db.Column(db.String(2000), nullable=False)
    caption = db.Column(db.String(2000), nullable=True)
    created_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = db.Column(
        db.DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    user = db.relationship("User", back_populates="posts")
    saved = db.relationship("Saved_Post", back_populates="post")
    comments = db.relationship(
        "Comment", back_populates="post", order_by="Comment.created_at.asc()"
    )
    likes = db.relationship("Like", back_populates="post")

    def to_like_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_dict(),
            "image_url": self.image_url,
            "caption": self.caption,
            "created_at": self.created_at,
            "comments": list(
                map(lambda comment: comment.to_post_dict(), self.comments)
            ),
        }

    def to_comment_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_dict(),
            "image_url": self.image_url,
            "caption": self.caption,
            "created_at": self.created_at,
        }

    def to_profile_dict(self):
        return {
            "id": self.id,
            "image_url": self.image_url,
            "caption": self.caption,
            "created_at": self.created_at,
            "comments": list(
                map(lambda comment: comment.to_post_dict(), self.comments)
            ),
            "likes": list(map(lambda like: like.to_content_dict(), self.likes)),
        }

    def to_dict(self):
        return {
            "id": self.id,
            "image_url": self.image_url,
            "caption": self.caption,
            "created_at": self.created_at,
            "user": self.user.to_dict(),
            "comments": list(
                map(lambda comment: comment.to_post_dict(), self.comments)
            ),
            "likes": list(map(lambda like: like.to_content_dict(), self.likes)),
        }
