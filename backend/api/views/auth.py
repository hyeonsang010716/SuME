from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from api.models.user import User
import logging


auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

# 로거 설정
auth_bp.logger = logging.getLogger('auth')  # 블루프린트에 로거 추가
auth_bp.logger.setLevel(logging.INFO)  # 로그 레벨 설정

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
        
    
        access_token = create_access_token(identity=user.email)
        return jsonify(access_token=access_token), 200
    except ValueError as ve:
            auth_bp.logger.error(f"Value Error: {str(ve)}")
            return jsonify({'message': 'email, and password are required fields.'}), 400
    except Exception as e:
        auth_bp.logger.error(f"Unexpected Error: {str(e)}")
        return jsonify({'message': 'Registration failed due to an unexpected error.'}), 500
