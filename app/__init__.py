import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
#import routes
from .api.auth_routes import auth_routes
from .api.user_routes import user_routes
from .api.profile_routes import profile_routes
from .api.follow_routes import follow_routes
from .api.like_routes import like_routes
from .api.post_routes import post_routes
from .api.note_routes import note_routes
from .api.comment_routes import comment_routes
from .api.search_routes import search_routes
from .api.aws_routes import aws_routes

from .config import Config


app = Flask(__name__)

#Setup Login Manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

#config
app.config.from_object(Config)
db.init_app(app)
migrate = Migrate(app, db)

#register routes
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(user_routes,url_prefix='/api/user')
app.register_blueprint(profile_routes, url_prefix='/api/profile')
app.register_blueprint(follow_routes, url_prefix='/api/follow')
app.register_blueprint(like_routes,url_prefix='/api/like')
app.register_blueprint(post_routes,url_prefix='/api/post')
app.register_blueprint(note_routes,url_prefix='/api/note')
app.register_blueprint(comment_routes,url_prefix='/api/comment')
app.register_blueprint(search_routes,url_prefix='/api/search')
app.register_blueprint(aws_routes,url_prefix='/api/aws')

#Security
# CORS(app)

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)

@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
