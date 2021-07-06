from ..models import db
from sqlalchemy import func


class Follow(db.Model):
    __tablename__ = "follows"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_followed_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = db.Column(
        db.DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    following = db.relationship(
        "User", foreign_keys="[Follow.user_id]", back_populates="following"
    )
    followers = db.relationship(
        "User", foreign_keys="[Follow.user_followed_id]", back_populates="followers"
    )

    def to_follower_dict(self):
        return {
            "id": self.id,
            "follower_id": self.user_id,
            "created_at": self.created_at,
        }

    def to_following_dict(self):
        return {
            "id": self.id,
            "following_id": self.user_followed_id,
            "created_at": self.created_at,
        }

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.following.to_dict(),
            "user_followed_id": self.user_followed_id,
            "created_at": self.created_at,
        }
