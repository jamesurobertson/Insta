from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, EqualTo, Email
import re
from app.models import User


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username is already in use.")


def password_validation(form, field):
    # password validation
    password = field.data
    if len(password) < 8:
        raise ValidationError("Password must be at least 8 characters long")
    if not re.search("[a-z]", password):
        raise ValidationError("Password must contain a lowercase letter")
    if not re.search("[A-Z]", password):
        raise ValidationError("Password must contain an uppercase letter")
    if not re.search("[0-9]", password):
        raise ValidationError("Password must contain a number")


class SignUpForm(FlaskForm):
    username = StringField("username", validators=[DataRequired(), username_exists])
    email = StringField("email", validators=[DataRequired(), Email()])
    full_name = StringField("full_name", validators=[DataRequired()])
    password = StringField(
        "password",
        validators=[
            DataRequired(),
            password_validation,
            EqualTo("confirmPassword", message="passwords must match"),
        ],
    )
    confirmPassword = StringField(
        "confirmPassword",
        validators=[],
    )
