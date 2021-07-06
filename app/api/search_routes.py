from flask import Blueprint, request
from ..models import User


search_routes = Blueprint("query", __name__)


@search_routes.route("")
def query():
    query = request.args.get("query")

    users = list(
        map(
            lambda user: user.to_dict(),
            User.query.filter(User.username.ilike(f"%{query}%")).all(),
        )
    )

    return {"results": users}
