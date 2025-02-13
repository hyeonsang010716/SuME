from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
import logging

from api.models.event import Event

calendar_bp = Blueprint('calendar', __name__, url_prefix='/calendar')

# 로거 설정
calendar_bp.logger = logging.getLogger('calendar_bp')  # 블루프린트에 로거 추가
calendar_bp.logger.setLevel(logging.DEBUG)  # 로그 레벨 설정

# 콘솔 출력 핸들러 추가
if not calendar_bp.logger.handlers:
    handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s"))
    calendar_bp.logger.addHandler(handler)

@calendar_bp.route('/events', methods=['GET'])
def get_user_events():
    try:
        calendar_bp.logger.info('캘린더 데이터를 가져오는 중 입니다.')
        user_id = request.args.get('user_id')
        start_date = request.args.get('start')
        end_date = request.args.get('end')
        calendar_bp.logger.info('입력 데이터 이상 없음')

        if not user_id or not start_date or not end_date:
            raise ValueError("user id, start date, end date is required")
        
        events = Event.get_user_events(user_id, start_date, end_date)
        if not events:
            calendar_bp.logger.error(f'요청하신 조건에 부합하는 이벤트를 찾지 못했습니다')
            return jsonify({'message': "Can't find events"})
        return jsonify([
            {
                'id': event.id,
                'title': event.title,
                'description': event.description,
                'start_time': event.start_time,
                'end_time': event.end_time
            }
            for event in events
        ])

    except ValueError as ve:
        calendar_bp.logger.error(f'요청에 데이터가 누락되어 있습니다.{str(ve)}')
        return jsonify({'error': str(ve)})
    except Exception as e:
        calendar_bp.logger.error(f'Error message: {str(e)}')
        return jsonify({'error': str(e)})

@calendar_bp.route('/events', methods=["POST"])
def create_event():
    try:
        calendar_bp.logger.info('Event 생성을 시작합니다')
        data = request.json
        if 'title' not in data or 'description' not in data or 'start' not in data or 'end' not in data or'user_id' not in data:
            raise ValueError("user id, start date, end date, description, user_id is required")
        new_event = Event.create(
            title=data['title'],
            description=data.get('description', ''),
            start_time=data['start'],
            end_time=data['end'],
            user_id=data['user_id']
        )
        return jsonify({"message": "Event created", "id": new_event.id}), 201
    except ValueError as ve:
        calendar_bp.logger.error(f'요청에 데이터가 누락되어 있습니다. \n {data}')
        return jsonify({'error': str(ve)})
    except Exception as e:
        calendar_bp.logger.error(f'Error message: {str(e)}')
        return jsonify({'error': str(e)})



@calendar_bp.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    try:
        Event.delete(event_id)
        return jsonify({"message": "Event deleted"})
    except ValueError as ve:
        calendar_bp.logger.errer(f'요청에 데이터가 누락되어 있습니다.{str(ve)}')
        return jsonify({"error": str(ve)}), 404
    except Exception as e:
        calendar_bp.logger.errer(f'Error message: {str(e)}')
        return jsonify({'message': str(e)})