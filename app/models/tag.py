from ..models import db
from sqlalchemy import func


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(2000), nullable=False)
    taggable_id = db.Column(db.Integer, nullable=False)
    taggable_type = db.Column(db.String(10), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now(),
                           nullable=False)
