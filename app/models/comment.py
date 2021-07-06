from ..models import db
from sqlalchemy import func


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    content = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = db.Column(
        db.DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    user = db.relationship("User", back_populates="comments")
    post = db.relationship("Post", back_populates="comments")
    likes = db.relationship("Like", back_populates="comment")

    def to_like_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_dict(),
            "post": self.post.to_comment_dict(),
            "created_at": self.created_at,
            "content": self.content,
        }

    def to_post_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_dict(),
            "created_at": self.created_at,
            "content": self.content,
        }

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_dict(),
            "post": self.post.to_comment_dict(),
            "created_at": self.created_at,
            "content": self.content,
        }
