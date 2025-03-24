import { useState, useEffect } from "react";
import results from "../data/results";

// Define the types for the response structure
export interface Result {
  title: string;
  description: string;
  link: string;
}

interface SearchResults {
  query: string;
  results: Result[];
  suggestions: string[];
}

// Custom hook to fetch search results
const useSearchResults = (query: string) => {
  const [data, setData] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data from the backend
    const fetchData = async () => {
      try {
        setTimeout(() => {
          const mockData: SearchResults = {
            ...results,
          };

          const filteredResults = mockData.results.filter(
            (result) =>
              result.title.toLowerCase().includes(query.toLowerCase()) ||
              result.description.toLowerCase().includes(query.toLowerCase())
          );

          setData({
            query: query,
            results: filteredResults.slice(0, 6), //limit results
            suggestions: mockData.suggestions,
          });
          setLoading(false);
        }, 1000); // Simulate network delay
      } catch (err) {
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return { data, loading, error };
};

export default useSearchResults;
