from flask import Blueprint, current_app

bp = Blueprint("main", __name__)


@bp.route("/")
def hello():
    cache = current_app.config["CACHE"]

    count = cache.incr("visit")
    return f"Hello World! You have visited {count} times"