# import streamlit as st
# import pandas as pd
# import matplotlib.pyplot as plt
# import datetime

# # JSON Data
# items = [
#     {
#         "title": "Digital Collectible",
#         "description": "Rare digital item",
#         "image": "https://i.pinimg.com/736x/21/a7/8e/21a78ee8b3c3940bafa81a4e6dc6a4f3.jpg",
#         "currentBid": 50,
#         "bidTimer": "2025-04-03T12:00:00.000Z",
#         "category": "NFTs",
#         "bidHistory": [10, 15, 20, 25, 30, 40, 50],
#         "moreDetails": "This digital collectible represents a unique artwork that's one-of-a-kind."
#     },
#     {
#         "title": "Vintage Clock",
#         "description": "A classic wind-up clock from the 1950s.",
#         "image": "https://example.com/vintage_clock.jpg",
#         "currentBid": 40,
#         "bidTimer": "2025-04-06T14:00:00.000Z",
#         "category": "Antiques",
#         "bidHistory": [5, 10, 15, 20, 25, 30],
#         "moreDetails": "A carefully preserved vintage clock that's highly sought after by collectors."
#     },
#     {
#         "title": "Gaming Mouse",
#         "description": "High-precision gaming mouse with RGB lights.",
#         "image": "https://example.com/gaming_mouse.jpg",
#         "currentBid": 35,
#         "bidTimer": "2025-04-07T10:00:00.000Z",
#         "category": "Electronics",
#         "bidHistory": [10, 15, 20, 22, 30],
#         "moreDetails": "This mouse provides an edge in competitive gaming with high precision and customizable lighting."
#     },
#     {
#         "title": "Smartphone",
#         "description": "Latest model with high-end features.",
#         "image": "https://example.com/smartphone.jpg",
#         "currentBid": 60,
#         "bidTimer": "2025-04-04T11:00:00.000Z",
#         "category": "Electronics",
#         "bidHistory": [20, 30, 45, 55, 60],
#         "moreDetails": "A top-tier smartphone with an OLED display, long-lasting battery, and high performance."
#     },
#     {
#         "title": "Painting",
#         "description": "Oil painting by a renowned artist.",
#         "image": "https://example.com/painting.jpg",
#         "currentBid": 100,
#         "bidTimer": "2025-04-02T15:00:00.000Z",
#         "category": "Art",
#         "bidHistory": [50, 60, 70, 90, 100],
#         "moreDetails": "This painting has been exhibited in multiple art galleries and is considered a masterpiece."
#     }
# ]

# # Set up page layout
# st.set_page_config(page_title="Auction Dashboard", layout="wide")

# # Title and introduction
# st.title("Auction Dashboard")
# st.markdown("Select an item from the sidebar to view auction details, including bid history.")

# # Sidebar for item selection
# item_titles = [item["title"] for item in items]
# selected_item_title = st.sidebar.selectbox("Select an Item", item_titles, key="dropdown")

# # Find the selected item data
# selected_item = next(item for item in items if item["title"] == selected_item_title)

# # Display item details in main area
# st.image(selected_item["image"], use_column_width=True)

# # Display item title, description, and other details
# st.subheader(selected_item["title"])
# st.write(f"**Description:** {selected_item['description']}")
# st.write(f"**Category:** {selected_item['category']}")
# st.write(f"**Current Bid:** ${selected_item['currentBid']}")

# # Display remaining time for the auction
# remaining_time = datetime.datetime.strptime(selected_item["bidTimer"], "%Y-%m-%dT%H:%M:%S.000Z") - datetime.datetime.now()
# st.write(f"**Time Remaining:** {str(remaining_time).split('.')[0]}")

# # Display "More Details" about the item
# st.subheader("More Details")
# st.write(selected_item["moreDetails"])

# # Display Bid History Chart
# st.subheader("Bid History")
# # Create a DataFrame from bid history to plot a chart
# bid_history = selected_item["bidHistory"]
# bid_data = pd.DataFrame({
#     "Time": [f"Bid {i+1}" for i in range(len(bid_history))],
#     "Bid Amount": bid_history
# })

# # Plotting the bid history as a line chart
# plt.figure(figsize=(8, 5))
# plt.plot(bid_data["Time"], bid_data["Bid Amount"], marker='o', color='b')
# plt.title(f"Bid History for {selected_item['title']}")
# plt.xlabel('Bidding Rounds')
# plt.ylabel('Bid Amount ($)')
# plt.grid(True)
# st.pyplot(plt)

# # **Top 5 Items Comparison**
# st.subheader("Top 5 Items Comparison")
# # Prepare a DataFrame with relevant data for comparison
# comparison_data = {
#     "Item": [item["title"] for item in items],
#     "Current Bid ($)": [item["currentBid"] for item in items],
#     "Category": [item["category"] for item in items],
#     "Time Remaining": [
#         str(datetime.datetime.strptime(item["bidTimer"], "%Y-%m-%dT%H:%M:%S.000Z") - datetime.datetime.now()).split('.')[0] 
#         for item in items
#     ]
# }

# comparison_df = pd.DataFrame(comparison_data)

# # Sort the items by Current Bid to compare the top 5 items
# top_5_df = comparison_df.sort_values(by="Current Bid ($)", ascending=False).head(5)

# # Display the top 5 items comparison table
# st.dataframe(top_5_df)

# # Optionally, plot a bar chart for comparison
# st.subheader("Comparison Chart")
# fig, ax = plt.subplots(figsize=(10, 5))
# ax.bar(top_5_df["Item"], top_5_df["Current Bid ($)"], color='purple')
# ax.set_title("Top 5 Items by Current Bid")
# ax.set_xlabel("Items")
# ax.set_ylabel("Current Bid ($)")
# st.pyplot(fig)

import streamlit as st
import pandas as pd
import plotly.express as px
import random
from datetime import datetime, timedelta

# Sample Data (Replace with actual dataset)
data = {
    "Category": ["NFTs", "Antiques", "Electronics", "Eco Products", "Stationery", "Artisan Crafts", "Gaming"],
    "Value": [50, 170, 160, 15, 30, 50, 70],
    "Items": [1, 2, 3, 1, 1, 1, 1]
}
df = pd.DataFrame(data)

bidders = pd.DataFrame({
    "Bidder": ["501L_9012", "501T_60ea", "501T_9011", "601L_9012", "601T_60ea"],
    "Bid Amount": [450, 375, 300, 50, 30]
})

# Generate Bid History for Time-Series Chart
bid_history = []
start_time = datetime.now() - timedelta(days=7)
for i in range(50):
    bid_history.append({
        "Time": start_time + timedelta(hours=i * 3),
        "Bid Amount": random.randint(50, 500)
    })
bid_df = pd.DataFrame(bid_history)

# Streamlit Layout
st.set_page_config(layout="wide", page_title="Auction Dashboard")
st.title("The Rumbling Marketplace")
st.subheader("Auction Dashboard Analytics")

# Sidebar Filter
st.sidebar.header("Filter Options")
selected_category = st.sidebar.selectbox("Select Category", df["Category"].unique())

# Main Layout
col1, col2 = st.columns([2, 2])

# Pie Chart - Category Distribution
with col1:
    st.markdown("### Category Distribution")
    fig_pie = px.pie(df, names="Category", values="Value", color_discrete_sequence=px.colors.qualitative.Pastel)
    st.plotly_chart(fig_pie, use_container_width=True)

# Bar Chart - Top Bidders
with col2:
    st.markdown("### Top Bidders")
    fig_bar = px.bar(bidders, x="Bidder", y="Bid Amount", text_auto=True, color_discrete_sequence=['#F4A261'])
    st.plotly_chart(fig_bar, use_container_width=True)

# Time-Series Chart - Bidding Activity
st.markdown("### Bidding Activity Over Time")
fig_line = px.line(bid_df, x="Time", y="Bid Amount", title="Bid Trends Over Time", color_discrete_sequence=['#2A9D8F'])
st.plotly_chart(fig_line, use_container_width=True)

# Recent Auctions - Cards
st.markdown("### Recent Auctions")
auction_items = [
    {"name": "Digital Collectible", "bid": "$50", "time": "17h 55m 5s", "bidders": 3},
    {"name": "Vintage Clock", "bid": "$40", "time": "3d 19h 55m", "bidders": 3},
    {"name": "Gaming Mouse", "bid": "$35", "time": "4d 15h 55m", "bidders": 3},
]
cols = st.columns(3)
for i, item in enumerate(auction_items):
    with cols[i]:
        st.markdown(f"""
        <div style='background-color: #1e1e1e; padding: 10px; border-radius: 10px;'>
            <h5>{item['name']}</h5>
            <p>Current Bid: <strong>{item['bid']}</strong></p>
            <p>⏳ {item['time']} &nbsp; 👥 {item['bidders']} bidders</p>
            <button style='background-color: #F4A261; padding: 5px 10px; border-radius: 5px;'>View Details ↗</button>
        </div>
        """, unsafe_allow_html=True)

# Top-Selling Items Section
st.markdown("### Top-Selling Items")
top_selling = df.sort_values(by="Value", ascending=False).head(5)
st.table(top_selling)

# from flask import Flask, render_template, jsonify, request
# from datetime import datetime, timedelta
# import random

# app = Flask(__name__)

# # Sample auction data
# digital_collectible = {
#     "id": 1,
#     "title": "Digital Collectible",
#     "category": "NFTs",
#     "image": "static/digital-collectible.jpg",
#     "bid": "$50",
#     "created": datetime(2025, 3, 30, 17, 0),
#     "ends_at": datetime(2025, 4, 3, 17, 30),
#     "bid_history": [
#         {"bidder": "607f...9012", "amount": "$50", "time": "Mar 30, 03:00 PM"},
#         {"bidder": "607f...60ea", "amount": "$40", "time": "Mar 29, 04:55 PM"},
#         {"bidder": "607f...9011", "amount": "$30", "time": "Mar 29, 03:50 PM"},
#     ],
#     "details": {
#         "owner": "0xABCD1234...",
#         "highest_bidder": "0x607f...9012",
#         "bids": random.randint(10, 50),
#         "views": random.randint(500, 2000),
#         "watchlist": random.randint(20, 100),
#     }
# }

# @app.route('/')
# def auction_dashboard():
#     remaining_time = digital_collectible['ends_at'] - datetime.now()
#     return render_template("auction.html", auction=digital_collectible, remaining_time=remaining_time)

# @app.route('/auction/<int:auction_id>')
# def auction_details(auction_id):
#     if auction_id == digital_collectible["id"]:
#         return jsonify(digital_collectible)
#     return jsonify({"error": "Auction not found"}), 404

# @app.route('/view-details/<int:auction_id>')
# def view_details(auction_id):
#     if auction_id == digital_collectible["id"]:
#         return render_template("details.html", auction=digital_collectible)
#     return "Auction not found", 404

# if __name__ == '__main__':
#     app.run(debug=True)

