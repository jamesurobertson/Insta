import secrets
import datetime

from dotenv import load_dotenv

load_dotenv()
from app import app, db

from app.models import Comment

from app.models import Post
from app.models import Like
from app.models import Follow
from app.models import User

from faker import Faker
from random import *
from dotenv import load_dotenv

load_dotenv()


fake = Faker()

# Regardless of the lint error you receive,
# load_dotenv must run before running this
# so that the environment variables are
# properly loaded.

defaultPic = "https://randomuser.me/api/portraits/"

with app.app_context():
    db.drop_all()
    db.create_all()

    users = [
        User(
            full_name="Mylo James",
            username="mylojames",
            password="Test@1234",
            email="mjames114@gmail.com",
            profile_image_url="https://isntgramaa.s3.us-east-2.amazonaws.com/mylo.jpg",
        ),
        User(
            full_name="Demo User",
            username="DemoUser",
            password="Test@1234",
            email="demo@isntgram.com",
            profile_image_url="https://isntgramaa.s3.us-east-2.amazonaws.com/default+user.png",
        ),
    ]
    for i in range(1, 50):
        name = fake.name()
        username = f"{name.replace(' ', '')}{randint(1,1000)}"
        email = f"{username}@isntgram.com"
        men_or_women = "men" if randint(1, 2) % 2 == 0 else "women"
        userPic = f"{defaultPic}{men_or_women}/{i}.jpg"
        user = User(
            full_name=name,
            username=username,
            password="Test@1234",
            email=email,
            profile_image_url=userPic,
            bio=fake.text(),
        )
        users.append(user)

    follows = []
    for i in range(1, 50):
        followsNum = randint(30, 40)
        followed_set = set()
        while len(followed_set) < followsNum:
            followed_user_id = randint(1, 50)
            if followed_user_id == i:
                continue
            followed_set.add(followed_user_id)
        for j in followed_set:
            year = randint(2017, 2020)
            date = datetime.datetime(
                year,
                randint(1, 12) if year == 2019 else randint(1, 6),
                randint(1, 28),
                randint(0, 23),
                randint(0, 59),
                randint(0, 59),
            )
            follows.append(Follow(user_id=i, user_followed_id=j, created_at=date))

    posts = []

    for i in range(1, 50):
        num_posts = randint(10, 20)
        for j in range(1, num_posts):
            year = randint(2017, 2020)
            date = datetime.datetime(
                year,
                randint(1, 12) if year == 2019 else randint(1, 6),
                randint(1, 28),
                randint(0, 23),
                randint(0, 59),
                randint(0, 59),
            )
            image = f"https://picsum.photos/seed/{secrets.token_hex(10)}/1000/1000"
            posts.append(
                Post(user_id=i, caption=fake.text(), image_url=image, created_at=date)
            )

    comments = []

    for i in range(1, 50):
        comment_count = randint(10, 40)
        for j in range(1, comment_count):
            year = randint(2017, 2020)
            date = datetime.datetime(
                year,
                randint(1, 12) if year == 2019 else randint(1, 6),
                randint(1, 28),
                randint(0, 23),
                randint(0, 59),
                randint(0, 59),
            )
            postId = randint(1, len(posts))
            comments.append(
                Comment(user_id=i, content=fake.text(), post_id=postId, created_at=date)
            )

    likes = []

    count = len(posts) if len(posts) < len(comments) else len(comments)

    for i in range(1, len(users)):

        like_set = set()

        while len(like_set) < 20:
            like_set.add(randint(1, count))
        while len(like_set):
            year = randint(2017, 2020)
            date = datetime.datetime(
                year,
                randint(1, 12) if year == 2019 else randint(1, 6),
                randint(1, 28),
                randint(0, 23),
                randint(0, 59),
                randint(0, 59),
            )
            likes.append(Like(user_id=i, post_id=like_set.pop(), created_at=date))

            likes.append(Like(user_id=i, comment_id=like_set.pop(), created_at=date))

    for user in users:
        db.session.add(user)

    for post in posts:
        db.session.add(post)

    for like in likes:
        db.session.add(like)

    for comment in comments:
        db.session.add(comment)

    for follow in follows:
        db.session.add(follow)

    db.session.commit()
