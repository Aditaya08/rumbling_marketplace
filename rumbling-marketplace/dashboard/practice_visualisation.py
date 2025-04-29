import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import requests

# Fetch auction data from Flask API
try:
    response = requests.get("http://127.0.0.1:5000/api/auction_data")
    response.raise_for_status()
    auction_data = pd.read_json(response.text)
except Exception as e:
    print(f"Error fetching data: {e}")
    auction_data = pd.DataFrame()  # Fallback to empty DataFrame

# Visualization - Auction Category Distribution
if not auction_data.empty:
    plt.figure(figsize=(8, 5))
    sns.countplot(x=auction_data['item_category'], palette='coolwarm')
    plt.title('Auction Listings by Category')
    plt.xlabel('Category')
    plt.ylabel('Count')
    plt.xticks(rotation=45)
    plt.show()
else:
    print("No data available for visualization.")
