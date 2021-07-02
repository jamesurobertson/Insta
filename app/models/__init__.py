from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .comment import Comment
from .conversation import Conversation
from .follow import Follow
from .like import Like
from .message import Message
from .post import Post
from .saved_post import Saved_Post
from .tag import Tag
from .user_conversation import User_Conversation
from .user import User
