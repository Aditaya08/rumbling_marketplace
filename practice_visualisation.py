import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Step 1: Generate Fake Auction Data
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

# Step 2: Show Summary of Data
print("Auction Data Sample:")
print(auction_data.head())

# Step 3: Visualization - Auction Category Distribution
plt.figure(figsize=(8,5))
sns.countplot(x=auction_data['item_category'], palette='coolwarm')
plt.title('Auction Listings by Category')
plt.xlabel('Category')
plt.ylabel('Count')
plt.xticks(rotation=45)
plt.show()

# Step 4: Visualization - Final Price Distribution
plt.figure(figsize=(8,5))
sns.histplot(auction_data['final_price'], bins=20, kde=True, color='green')
plt.title('Distribution of Final Auction Prices')
plt.xlabel('Final Price')
plt.ylabel('Count')
plt.show()

# Step 5: Relationship Between Bids and Final Price
plt.figure(figsize=(8,5))
sns.scatterplot(x=auction_data['num_bids'], y=auction_data['final_price'], hue=auction_data['item_category'], palette='viridis')
plt.title('Number of Bids vs Final Price')
plt.xlabel('Number of Bids')
plt.ylabel('Final Price')
plt.show()
