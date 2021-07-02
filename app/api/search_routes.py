from flask import Blueprint, request
from ..models import User


search_routes = Blueprint("query", __name__)


@search_routes.route('')
def query():
    query = request.args.get('query')
    print(query)

    userResults = User.query.filter(User.username.ilike(f'%{query}%')).all()
    print(userResults)

    results = []
    
    for user in userResults:
        user_dict = user.to_dict()
        results.append(user_dict)

    return {"results": results}


