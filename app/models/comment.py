from ..models import db
from sqlalchemy import func


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"),
                        nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(
        "posts.id"), nullable=False)
    content = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now(),
                           nullable=False)

    user = db.relationship("User", back_populates="comments")
    post = db.relationship("Post", back_populates="comments")

    def to_dict(self):
        return {"id": self.id, "user_id": self.user_id, "post_id": self.post_id, "created_at": self.created_at, "content": self.content}
