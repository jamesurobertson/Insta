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
    comments = db.relationship("Comment", back_populates="post")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "image_url": self.image_url,
            "caption": self.caption,
            "created_at": self.created_at,
        }
