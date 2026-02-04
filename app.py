from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from datetime import datetime
import json
import os

app = Flask(__name__, static_folder='static', static_url_path='/static')
CORS(app)

# File to store proposal responses
RESPONSES_FILE = 'proposal_responses.json'

def load_responses():
    """Load existing responses from file"""
    if os.path.exists(RESPONSES_FILE):
        with open(RESPONSES_FILE, 'r') as f:
            return json.load(f)
    return []

def save_responses(responses):
    """Save responses to file"""
    with open(RESPONSES_FILE, 'w') as f:
        json.dump(responses, f, indent=2)

@app.route('/')
def index():
    """Serve the index.html file"""
    return send_from_directory('.', 'index.html')

@app.route('/static/<path:path>')
def serve_static(path):
    """Serve static files"""
    return send_from_directory('static', path)

@app.route('/proposal', methods=['POST'])
def handle_proposal():
    """Handle proposal response"""
    try:
        data = request.json
        response = data.get('response')
        timestamp = data.get('timestamp')
        
        # Load existing responses
        responses = load_responses()
        
        # Add new response
        new_response = {
            'response': response,
            'timestamp': timestamp,
            'date_received': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        responses.append(new_response)
        
        # Save updated responses
        save_responses(responses)
        
        print(f"\n✨ Proposal Response Received! ✨")
        print(f"Response: {response}")
        print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("-" * 50)
        
        return jsonify({
            'status': 'success',
            'message': f"Proposal response received: {response}",
            'total_responses': len(responses)
        }), 200
    
    except Exception as e:
        print(f"Error processing proposal: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/responses', methods=['GET'])
def get_responses():
    """Get all stored proposal responses"""
    try:
        responses = load_responses()
        return jsonify({
            'status': 'success',
            'responses': responses,
            'total': len(responses)
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/stats', methods=['GET'])
def get_stats():
    """Get proposal statistics"""
    try:
        responses = load_responses()
        yes_count = sum(1 for r in responses if r['response'] == 'YES')
        no_count = sum(1 for r in responses if r['response'] == 'NO')
        
        return jsonify({
            'status': 'success',
            'total_responses': len(responses),
            'yes_responses': yes_count,
            'no_responses': no_count,
            'success_rate': f"{(yes_count/len(responses)*100):.1f}%" if responses else "0%"
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    print("=" * 50)
    print("💕 Valentine's Proposal Server Started 💕")
    print("=" * 50)
    
    # Get port from environment variable or default to 5000
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') != 'production'
    
    print(f"Running on port {port}")
    print("\nEndpoints:")
    print("  GET  /")
    print("  POST /proposal")
    print("  GET  /responses")
    print("  GET  /stats")
    print("=" * 50)
    
    app.run(host='0.0.0.0', port=port, debug=debug)
