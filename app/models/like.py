from ..models import db
from sqlalchemy import func


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    likeable_id = db.Column(db.Integer,
                            nullable=False)
    likeable_type = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now(),
                           nullable=False)

    user = db.relationship("User", back_populates="likes")


    def to_dict(self):
        return {"id": self.id, "user_id": self.user_id, "likeable_id": self.likeable_id, "likeable_type": self.likeable_type,
                "created_at": self.created_at}
