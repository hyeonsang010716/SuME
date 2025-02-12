from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from api.models.user import User
import logging


auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

auth_bp.logger = logging.getLogger('auth')
auth_bp.logger.setLevel(logging.DEBUG)

# 콘솔 출력 핸들러 추가
if not auth_bp.logger.handlers:
    handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s"))
    auth_bp.logger.addHandler(handler)


@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    return jsonify({"msg": "Welcome", 'user_id': current_user_id}), 200

@auth_bp.route('/register', methods=['POST'])
def register_user():
    try:
        auth_bp.logger.info("Register: Start")
        data = request.get_json()
        auth_bp.logger.info("Access Json Data")

        if not data or 'name' not in data or 'email' not in data or 'password' not in data:
            raise ValueError("Username, email, and password are required fields.")

        if User.get_user_by_email(data['email']):
            auth_bp.logger.error(f"The email is already registered")
            return jsonify({'message': 'The email is already registered. Please enter a different email.'}), 400

        new_user = User.create(data['name'], data['email'], data['password'])
        auth_bp.logger.info("Create User Success")
        return jsonify({'message': 'Registration successful.'}), 200
    except ValueError as ve:
            auth_bp.logger.error(f"Value Error: {str(ve)}")
            return jsonify({'message': 'Username, email, and password are required fields.'}), 400
    except Exception as e:
        auth_bp.logger.error(f"Unexpected Error: {str(e)}")
        return jsonify({'message': 'Registration failed due to an unexpected error.'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        auth_bp.logger.info("Register: Start")
        data = request.get_json()
        if not data or 'email' not in data or 'password' not in data:
            raise ValueError("email, and password are required fields.")
        
        email, password = data.get('email'), data.get('password')
        auth_bp.logger.info("Access Json Data")

        user = User.get_user_by_email(email)

        if not user.check_password(password):
            auth_bp.logger.error(f'message: wrong password {data}')
            return jsonify({'message': 'wrong password'}), 400
        
    
        access_token = create_access_token(identity=str(user.id))
        return jsonify(access_token=access_token), 200
    except ValueError as ve:
            auth_bp.logger.error(f"Value Error: {str(ve)}")
            return jsonify({'message': 'email, and password are required fields.'}), 400
    except Exception as e:
        auth_bp.logger.error(f"Unexpected Error: {str(e)}")
        return jsonify({'message': 'Registration failed due to an unexpected error.'}), 500
