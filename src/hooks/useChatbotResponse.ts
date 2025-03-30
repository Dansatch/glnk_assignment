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

const mockData: SearchResults = { ...results };

// Custom function(hook) to fetch search results
const useChatbotResponse = (query: string) => {
  // Simulate fetching data from the backend
  // Find the closest matching response based on similarity
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

  return { data: findClosestMatch(query).description || "" };
};

const useSuggestions = () => {
  return mockData.suggestions;
};

export { useChatbotResponse, useSuggestions };
