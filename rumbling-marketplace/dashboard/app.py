import streamlit as st
import pandas as pd
import plotly.express as px
import requests
from datetime import datetime

# Page configuration with custom theme
st.set_page_config(
    layout="wide",
    page_title="The Rumbling Marketplace",
    page_icon="🏛️",
    initial_sidebar_state="expanded"
)

# Custom CSS for better aesthetics
st.markdown("""
<style>
    .main .block-container {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
    h1, h2, h3 {
        color: #1E3A8A;
    }
    .stMetric label {
        color: #4B5563;
    }
    .stMetric value {
        color: #1E3A8A;
        font-weight: bold;
    }
    .sidebar .sidebar-content {
        background-color: #F3F4F6;
    }
    .stButton>button {
        background-color: #1E40AF;
        color: white;
        border-radius: 4px;
    }
    div[data-testid="stExpander"] div[role="button"] p {
        font-size: 1.1rem;
        color: #1E3A8A;
    }
    div[data-testid="stExpander"] details summary p {
        font-weight: 600;
    }
    footer {visibility: hidden;}
</style>
""", unsafe_allow_html=True)

# App Header with branding
col_logo, col_title = st.columns([1, 5])
with col_logo:
    st.markdown("# 🏛️")
with col_title:
    st.title("The Rumbling Marketplace")
    st.markdown(f"<p style='color: #6B7280; margin-top: -15px;'>Last updated: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</p>", unsafe_allow_html=True)

# Data loading with enhanced error handling and animations
with st.spinner("Fetching market data..."):
    try:
        response = requests.get("http://127.0.0.1:5000/api/dashboard")
        response.raise_for_status()
        data = response.json()
        df = pd.DataFrame(data["auctions"])
        summary = data["summary"]
        success = True
    except Exception as e:
        st.error(f"Error fetching data: {e}")
        df = pd.DataFrame()  # Fallback to empty DataFrame
        summary = {"totalAuctions": 0, "highestBid": 0, "categories": []}
        success = False

# Enhanced Sidebar
st.sidebar.markdown("## 🔍 Dashboard Controls")
st.sidebar.markdown("---")

# Themed container for filters
with st.sidebar.expander("📊 Filters", expanded=True):
    if not df.empty:
        all_option = "All Categories"
        categories = [all_option] + sorted(df["category"].unique().tolist())
        selected_category = st.selectbox("Select Category", categories)
        
        min_bid = int(df["currentBid"].min())
        max_bid = int(df["currentBid"].max())
        bid_range = st.slider(
            "Bid Range ($)",
            min_value=min_bid,
            max_value=max_bid,
            value=(min_bid, max_bid)
        )
        
        # Filter data based on selections
        if selected_category != all_option:
            filtered_df = df[df["category"] == selected_category]
        else:
            filtered_df = df.copy()
            
        filtered_df = filtered_df[(filtered_df["currentBid"] >= bid_range[0]) & 
                                (filtered_df["currentBid"] <= bid_range[1])]
    else:
        st.warning("No data available for filtering")
        filtered_df = df.copy()

# Refresh button with styled container
with st.sidebar.container():
    st.markdown("---")
    st.markdown("### 🔄 Data Controls")
    if st.button("Refresh Dashboard"):
        st.experimental_rerun()
    st.caption("Click to fetch the latest auction data")

# Main dashboard content
if success:
    # Key metrics in an attractive card layout
    st.markdown("## 📈 Auction Performance")
    metric_cols = st.columns(3)
    with metric_cols[0]:
        st.metric(
            label="Total Auctions",
            value=f"{summary['totalAuctions']}",
            delta=None,
            help="Total number of active auctions"
        )
    with metric_cols[1]:
        st.metric(
            label="Highest Bid",
            value=f"${summary['highestBid']:,}",
            delta=None,
            help="Current highest bid across all auctions"
        )
    with metric_cols[2]:
        st.metric(
            label="Categories",
            value=f"{len(summary['categories'])}",
            delta=None,
            help="Number of unique auction categories"
        )
    
    # Divider
    st.markdown("---")
    
    # Data visualizations with enhanced styling
    st.markdown("## 📊 Auction Analytics")
    
    # Create enhanced visualization layout
    chart_cols = st.columns([1, 1])
    
    # Category Distribution Chart (Pie Chart)
    with chart_cols[0]:
        st.markdown("### 🔄 Category Distribution")
        if not filtered_df.empty:
            # Group by category and sum the bids
            category_data = filtered_df.groupby("category")["currentBid"].sum().reset_index()
            fig_pie = px.pie(
                category_data,
                names="category",
                values="currentBid",
                color_discrete_sequence=px.colors.qualitative.Bold,
                hole=0.4,
            )
            # Enhance pie chart
            fig_pie.update_traces(
                textposition='inside',
                textinfo='percent+label',
                hoverinfo='label+value',
                textfont_size=12,
                marker=dict(line=dict(color='#FFFFFF', width=2))
            )
            fig_pie.update_layout(
                margin=dict(t=30, b=0, l=0, r=0),
                legend=dict(orientation="h", yanchor="bottom", y=-0.2, xanchor="center", x=0.5),
                height=350,
                paper_bgcolor='rgba(0,0,0,0)',
                plot_bgcolor='rgba(0,0,0,0)'
            )
            st.plotly_chart(fig_pie, use_container_width=True)
        else:
            st.info("No data available for the selected filters")
    
    # Top Bidders Chart (Bar Chart)
    with chart_cols[1]:
        st.markdown("### 💰 Top Bidders")
        if not filtered_df.empty:
            # Sort by current bid to show highest first
            sorted_df = filtered_df.sort_values("currentBid", ascending=False).head(10)
            
            # Truncate long auction titles for better display
            sorted_df["display_title"] = sorted_df["title"].apply(
                lambda x: x[:20] + "..." if len(x) > 20 else x
            )
            
            fig_bar = px.bar(
                sorted_df,
                x="display_title",
                y="currentBid",
                text_auto='.2s',
                color="currentBid",
                color_continuous_scale=px.colors.sequential.Blues,
                labels={"display_title": "Auction", "currentBid": "Current Bid ($)"}
            )
            
            # Enhance bar chart
            fig_bar.update_layout(
                xaxis_title=None,
                yaxis_title="Current Bid ($)",
                xaxis_tickangle=-45,
                margin=dict(t=30, b=0, l=0, r=0),
                height=350,
                paper_bgcolor='rgba(0,0,0,0)',
                plot_bgcolor='rgba(0,0,0,0)',
                coloraxis_showscale=False
            )
            fig_bar.update_traces(
                texttemplate='$%{y:,.0f}',
                textposition='outside',
                marker_line_color='rgb(8,48,107)',
                marker_line_width=1.5
            )
            st.plotly_chart(fig_bar, use_container_width=True)
        else:
            st.info("No data available for the selected filters")
    
    # Divider
    st.markdown("---")
    
    # Auction data table with improved styling
    with st.expander("📋 Active Auctions", expanded=True):
        if not filtered_df.empty:
            # Column renaming and formatting for better display
            display_df = filtered_df.copy()
            display_df["Current Bid"] = display_df["currentBid"].apply(lambda x: f"${x:,.2f}")
            display_df = display_df.rename(columns={
                "title": "Auction Title",
                "category": "Category",
                "id": "Auction ID"
            })
            
            # Select and reorder columns for display
            display_cols = ["Auction Title", "Category", "Current Bid"]
            if "Auction ID" in display_df.columns:
                display_cols = ["Auction ID"] + display_cols
                
            st.dataframe(
                display_df[display_cols],
                use_container_width=True,
                height=400
            )
        else:
            st.info("No auctions match the selected criteria")
else:
    # Error state with helpful message
    st.error("⚠️ Unable to load dashboard data")
    st.markdown("""
    ### Troubleshooting Tips:
    1. Check if the API server is running at http://127.0.0.1:5000
    2. Verify your network connection
    3. Try refreshing the page
    """)
    
    # Placeholder content to show layout
    st.markdown("## Dashboard Preview (Sample Data)")
    
    # Create sample data for demonstration
    sample_df = pd.DataFrame({
        "category": ["Art", "Electronics", "Collectibles", "Art", "Jewelry"],
        "title": ["Sample Auction 1", "Sample Auction 2", "Sample Auction 3", "Sample Auction 4", "Sample Auction 5"],
        "currentBid": [1200, 950, 2500, 800, 3100]
    })
    
    # Sample visualizations
    sample_cols = st.columns([1, 1])
    with sample_cols[0]:
        st.markdown("### Category Distribution (Sample)")
        fig_pie = px.pie(sample_df, names="category", values="currentBid", 
                        color_discrete_sequence=px.colors.qualitative.Bold)
        st.plotly_chart(fig_pie, use_container_width=True)
        
    with sample_cols[1]:
        st.markdown("### Top Bidders (Sample)")
        fig_bar = px.bar(sample_df, x="title", y="currentBid", text_auto=True, 
                        color_discrete_sequence=['#1E40AF'])
        st.plotly_chart(fig_bar, use_container_width=True)

# Footer with branded message
st.markdown("---")
st.markdown(
    "<div style='text-align: center; color: #6B7280; padding: 1rem 0;'>"
    "The Rumbling Marketplace | Premium Auction Analytics"
    "</div>",
    unsafe_allow_html=True
)