# food_routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import db, User, InventoryItem, FoodRequest, Food
from datetime import datetime

food_bp = Blueprint("food", __name__, url_prefix="/foods")


@food_bp.route("/<int: id>/claim", methods=["GET"])
@jwt_required()
def claim_food(id):
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    food = Food.query.get(id)

    if not food:
        return jsonify({"error": "Food not found"}), 404

    # Check if the food is available for claim
    if food.status != "available":
        return jsonify({"error": "Food is not available for claim"}), 400

    # Update the food status to "claimed"
    food.status = "claimed"
    db.session.commit()

    return jsonify({"message": "Food claimed successfully"}), 200
