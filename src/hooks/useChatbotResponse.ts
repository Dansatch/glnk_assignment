import { useState, useEffect } from "react";
import results from "../data/results";

// Define the types for the response structure
interface Result {
  title: string;
  description: string;
  link: string;
}

interface SearchResults {
  query: string;
  results: Result[];
  suggestions: string[];
}

const mockData: SearchResults = { ...results };

// Custom function(hook) to fetch search results
const useChatbotResponse = (query: string) => {
  const [data, setData] = useState<string>(""); // State to hold response
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Simulate fetching data from the backend

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = findClosestMatch(query);
        // Simulate a delay of 1 seconds for fetching
        setTimeout(() => {
          setData(result.description || "");
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError("An error occurred while fetching data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const findClosestMatch = (query: string) => {
    return (
      mockData.results.find(
        (result) =>
          result.title.toLowerCase().endsWith(query.slice(-3).toLowerCase()) ||
          result.description
            .toLowerCase()
            .endsWith(query.slice(-3).toLowerCase())
      ) || mockData.results[Math.floor(Math.random() * mockData.results.length)]
    );
  };
  return { data, loading, error };
};

export const useSuggestions = () => {
  return mockData.suggestions;
};

export default useChatbotResponse;
