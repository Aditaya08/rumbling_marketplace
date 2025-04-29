from flask import Flask, jsonify, request
from flask_cors import CORS  # Import Flask-CORS
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Route to call Streamlit app (app.py)
@app.route('/start_streamlit_app', methods=['POST'])
def start_streamlit_app():
    try:
        subprocess.Popen(["streamlit", "run", "app.py"])  # Run app.py
        return jsonify({"message": "Streamlit app (app.py) started successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to call Streamlit app (practice_visualisation.py)
@app.route('/start_streamlit_visualisation', methods=['POST'])
def start_streamlit_visualisation():
    try:
        subprocess.Popen(["streamlit", "run", "practice_visualisation.py"])  # Run practice_visualisation.py
        return jsonify({"message": "Streamlit app (practice_visualisation.py) started successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to stop Streamlit app
@app.route('/stop_streamlit', methods=['POST'])
def stop_streamlit():
    try:
        # For Windows, use taskkill to stop the Streamlit process
        subprocess.Popen(["taskkill", "/F", "/IM", "streamlit.exe"])
        return jsonify({"message": "Streamlit app stopped successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to provide dashboard data for app.py
@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
    data = {
        "auctions": [
            {"id": 1, "title": "Digital Collectible", "currentBid": 50, "category": "NFTs"},
            {"id": 2, "title": "Vintage Clock", "currentBid": 40, "category": "Antiques"},
            {"id": 3, "title": "Gaming Mouse", "currentBid": 35, "category": "Electronics"},
        ],
        "summary": {
            "totalAuctions": 3,
            "highestBid": 50,
            "categories": ["NFTs", "Antiques", "Electronics"]
        }
    }
    return jsonify(data), 200

# Route to provide auction data for practice_visualisation.py
@app.route('/api/auction_data', methods=['GET'])
def get_auction_data():
    import pandas as pd
    import numpy as np

    # Generate fake auction data
    np.random.seed(42)
    num_entries = 100
    auction_data = pd.DataFrame({
        'auction_id': np.arange(1, num_entries + 1),
        'item_category': np.random.choice(['Electronics', 'Fashion', 'Collectibles', 'Home', 'Toys'], num_entries),
        'starting_price': np.random.randint(500, 5000, num_entries),
        'final_price': np.random.randint(5000, 25000, num_entries),
        'num_bids': np.random.randint(1, 50, num_entries),
        'auction_duration': np.random.randint(1, 14, num_entries)  # Auction duration in days
    })

    # Convert to JSON
    return auction_data.to_json(orient='records'), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)