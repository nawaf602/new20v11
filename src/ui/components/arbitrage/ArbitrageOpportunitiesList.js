import React, { useState, useEffect } from 'react';
import ArbitrageOpportunityCard from './ArbitrageOpportunityCard';

const ArbitrageOpportunitiesList = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch opportunities from the backend API
  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use environment variable for API URL, default to localhost for development
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'; 
        const response = await fetch(`${apiUrl}/api/arbitrage/opportunities`); // Assuming an endpoint like this exists
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOpportunities(data); // Assuming the API returns an array of opportunities
      } catch (e) {
        console.error("Failed to fetch arbitrage opportunities:", e);
        setError('Failed to load opportunities. Please try again later.');
        // Keep sample data on error for demonstration purposes, remove in production if desired
        setOpportunities([
          {
            id: '1',
            type: 'simple',
            sourceExchange: 'Uniswap V3',
            targetExchange: 'SushiSwap',
            tokenPath: ['WETH', 'DAI', 'WETH'], // Simplified token names
            inputAmount: '1',
            expectedOutputAmount: '1.02',
            expectedProfit: '0.02',
            expectedProfitPercentage: '2.0',
            gasCost: '0.005',
            netProfit: '0.015',
            timestamp: Date.now(),
            confidence: 0.92
          },
          {
            id: '2',
            type: 'triangular',
            sourceExchange: 'Uniswap V2',
            targetExchange: 'Curve',
            intermediateExchanges: ['Balancer'],
            tokenPath: ['WETH', 'USDC', 'DAI', 'WETH'],
            inputAmount: '2',
            expectedOutputAmount: '2.05',
            expectedProfit: '0.05',
            expectedProfitPercentage: '2.5',
            gasCost: '0.008',
            netProfit: '0.042',
            timestamp: Date.now(),
            confidence: 0.85
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
    // Optionally, set up polling to refresh data periodically
    // const intervalId = setInterval(fetchOpportunities, 10000); // Fetch every 10 seconds
    // return () => clearInterval(intervalId); // Cleanup interval on unmount

  }, []); // Empty dependency array means this runs once on mount

  const handleExecute = async (opportunity) => {
    console.log(`Executing arbitrage opportunity ${opportunity.id}`);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/arbitrage/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization headers if needed
        },
        body: JSON.stringify({ opportunityId: opportunity.id }), // Send opportunity ID or full object
      });

      if (!response.ok) {
        throw new Error(`Execution failed! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Execution result:', result);
      // Remove the opportunity from the list upon successful execution
      if (result.success) {
         setOpportunities(opportunities.filter(opp => opp.id !== opportunity.id));
      } else {
         // Handle execution failure (e.g., show notification)
         console.error('Arbitrage execution failed:', result.error);
      }

    } catch (e) {
      console.error("Failed to execute arbitrage:", e);
      // Handle API call error (e.g., show notification)
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Arbitrage Opportunities</h2>
      
      {loading && (
        <div className="card p-8 text-center">
          <p className="text-secondary-500">Loading opportunities...</p>
        </div>
      )}

      {error && (
         <div className="card p-8 text-center bg-danger-50 border border-danger-200">
           <p className="text-danger-700 font-medium">Error</p>
           <p className="text-danger-600">{error}</p>
         </div>
      )}

      {!loading && !error && opportunities.length === 0 && (
        <div className="card p-8 text-center">
          <p className="text-secondary-500">No arbitrage opportunities available at the moment.</p>
          <p className="text-sm text-secondary-400 mt-2">The bot will automatically detect new opportunities.</p>
        </div>
      )}

      {!loading && !error && opportunities.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map(opportunity => (
            <ArbitrageOpportunityCard 
              key={opportunity.id} 
              opportunity={opportunity} 
              onExecute={handleExecute} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArbitrageOpportunitiesList;

