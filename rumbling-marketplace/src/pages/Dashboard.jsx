import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("summary");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/dashboard");
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading state with spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading dashboard data...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-red-500 text-6xl mb-4">!</div>
          <h2 className="text-white text-2xl font-bold mb-2">Data Loading Error</h2>
          <p className="text-gray-400 mb-6">Failed to load dashboard data. Please check your connection and try again.</p>
          <button 
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Calculate some basic stats for the charts
  const totalBidValue = data.auctions.reduce((sum, auction) => sum + auction.currentBid, 0);
  const averageBid = totalBidValue / data.auctions.length;
  const highestBid = data.summary.highestBid;

  // Create category counts for the "chart"
  const categoryData = {};
  data.auctions.forEach(auction => {
    categoryData[auction.category] = (categoryData[auction.category] || 0) + 1;
  });

  // Sort auctions by current bid (highest first)
  const sortedAuctions = [...data.auctions].sort((a, b) => b.currentBid - a.currentBid);
  const topAuctions = sortedAuctions.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 py-6 px-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-indigo-400">Auction Dashboard</h1>
            <div className="text-sm text-gray-400">Last updated: {new Date().toLocaleString()}</div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-indigo-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-400 text-sm font-medium mb-1">Total Auctions</h3>
                <p className="text-3xl font-bold">{data.summary.totalAuctions}</p>
              </div>
              <div className="bg-indigo-900 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs text-gray-400">Active listings across all categories</div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-400 text-sm font-medium mb-1">Highest Bid</h3>
                <p className="text-3xl font-bold">${data.summary.highestBid.toLocaleString()}</p>
              </div>
              <div className="bg-green-900 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs text-gray-400">Current highest auction bid amount</div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-400 text-sm font-medium mb-1">Categories</h3>
                <p className="text-3xl font-bold">{data.summary.categories.length}</p>
              </div>
              <div className="bg-purple-900 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs text-gray-400">Distinct auction categories available</div>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-700">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("summary")}
                className={`py-4 px-6 font-medium focus:outline-none ${
                  activeTab === "summary"
                    ? "text-indigo-400 border-b-2 border-indigo-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => setActiveTab("auctions")}
                className={`py-4 px-6 font-medium focus:outline-none ${
                  activeTab === "auctions"
                    ? "text-indigo-400 border-b-2 border-indigo-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Auctions
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`py-4 px-6 font-medium focus:outline-none ${
                  activeTab === "categories"
                    ? "text-indigo-400 border-b-2 border-indigo-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Categories
              </button>
            </nav>
          </div>
        </div>

        {/* Tab content */}
        <div>
          {/* Summary Tab */}
          {activeTab === "summary" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
              
              {/* Top Auctions */}
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Top Auctions</h3>
                <div className="space-y-4">
                  {topAuctions.map((auction, index) => (
                    <div key={auction.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-indigo-600 text-white text-lg font-bold h-10 w-10 rounded-full flex items-center justify-center mr-4">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{auction.title}</h4>
                          <p className="text-sm text-gray-400">{auction.category}</p>
                        </div>
                      </div>
                      <div className="text-green-400 font-bold text-xl">${auction.currentBid.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Basic Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Bid Statistics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Average Bid:</span>
                      <span className="font-medium">${averageBid.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Highest Bid:</span>
                      <span className="font-medium">${highestBid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Bid Value:</span>
                      <span className="font-medium">${totalBidValue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Category Overview</h3>
                  <div className="space-y-4">
                    {Object.entries(categoryData).map(([category, count]) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-gray-400">{category}:</span>
                        <div className="flex items-center">
                          <div className="h-2 bg-indigo-600 rounded-full mr-2" style={{ 
                            width: `${Math.max((count / data.summary.totalAuctions) * 100, 20)}px` 
                          }}></div>
                          <span className="font-medium">{count} auctions</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Auctions Tab */}
          {activeTab === "auctions" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">All Auctions</h2>
                <div className="text-sm text-gray-400">Showing {data.auctions.length} auctions</div>
              </div>
              
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Current Bid</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {data.auctions.map((auction, index) => (
                        <tr key={auction.id} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium">{auction.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-900 text-indigo-300">
                              {auction.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-green-400 font-bold">
                            ${auction.currentBid.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="flex items-center">
                              <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                              <span className="text-green-400">Active</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === "categories" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Categories</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.summary.categories.map(category => {
                  const categoryAuctions = data.auctions.filter(auction => auction.category === category);
                  const totalBids = categoryAuctions.reduce((sum, auction) => sum + auction.currentBid, 0);
                  const highestCategoryBid = Math.max(...categoryAuctions.map(auction => auction.currentBid));
                  
                  return (
                    <div key={category} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                      <div className="p-6 border-b border-gray-700">
                        <h3 className="text-xl font-bold mb-2">{category}</h3>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="text-gray-400 text-xs mb-1">Auctions</div>
                            <div className="font-bold text-lg">{categoryAuctions.length}</div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-xs mb-1">Highest Bid</div>
                            <div className="font-bold text-lg text-green-400">${highestCategoryBid.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-xs mb-1">Total Value</div>
                            <div className="font-bold text-lg">${totalBids.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-4">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Category Auctions</h4>
                        <ul className="space-y-2">
                          {categoryAuctions.slice(0, 3).map(auction => (
                            <li key={auction.id} className="flex justify-between">
                              <span className="truncate max-w-xs">{auction.title}</span>
                              <span className="text-green-400 font-medium">${auction.currentBid.toLocaleString()}</span>
                            </li>
                          ))}
                          {categoryAuctions.length > 3 && (
                            <li className="text-center text-gray-400 text-sm">
                              +{categoryAuctions.length - 3} more auctions
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 px-6 mt-10">
        <div className="container mx-auto text-center text-gray-400 text-sm">
          <p>Auction Dashboard | Last updated: {new Date().toLocaleString()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;