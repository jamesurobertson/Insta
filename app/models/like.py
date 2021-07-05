from ..models import db
from sqlalchemy import func


class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"))
    created_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = db.Column(
        db.DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    user = db.relationship("User", back_populates="likes")
    post = db.relationship("Post", back_populates="likes")
    comment = db.relationship("Comment", back_populates="likes")

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_dict(),
            "content_type": "post" if self.post_id else "comment",
            "content": self.post.to_like_dict()
            if self.post
            else self.comment.to_like_dict()
            if self.comment
            else None,
            "created_at": self.created_at,
        }

    def to_user_dict(self):
        return {
            "id": self.id,
            "content_type": "post" if self.post_id else "comment",
            "content": self.post.to_like_dict()
            if self.post
            else self.comment.to_like_dict()
            if self.comment
            else None,
            "created_at": self.created_at,
        }

    def to_content_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_dict(),
            "created_at": self.created_at,
        }

