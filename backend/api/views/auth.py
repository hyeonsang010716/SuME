from flask import Blueprint, request, jsonify
from api.models.user import User
import logging


auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

# 로거 설정
auth_bp.logger = logging.getLogger('Register')  # 블루프린트에 로거 추가
auth_bp.logger.setLevel(logging.INFO)  # 로그 레벨 설정

@auth_bp.route('/register', methods=['POST'])
def create_user():
    try:
        auth_bp.logger.info("Start")
        data = request.get_json()
        auth_bp.logger.info("Access Json Data")
        name, email, password = data['name'], data['email'], data['password']

        if User.get_user_by_email(email):
            return jsonify({'message': 'The email is already registered. Please enter a different email.'}), 400

        new_user = User.create(name, email, password)
        auth_bp.logger.info("Create User Success")
        return jsonify({'message': 'Registration successful.'}), 200
    except ValueError as ve:
            auth_bp.logger.error(f"Value Error: {str(ve)}")
            return jsonify({'message': 'Username, email, and password are required fields.'}), 400
    except Exception as e:
        auth_bp.logger.error(f"Unexpected Error: {str(e)}")
        return jsonify({'message': 'Registration failed due to an unexpected error.'}), 500