import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchInput from "./components/SearchInput";
import ListCards from "./components/ListCards";
import useSearchResults from "./hooks/useSearchResults";

function App() {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { data, loading, error } = useSearchResults(searchPrompt);
  
  useEffect(() => {
    console.log(data?.results);
  }, [submitted && searchPrompt])

  return (
    <Box
      minHeight="100vh"
      minWidth={"100vw"}
      border={"2px solid green"}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <motion.div
        initial={{ y: "50%", opacity: 1 }}
        animate={submitted ? { y: "-40vh", left: "5%", scale: 0.9 } : { y: "50%", x: "0%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ position: "absolute", width: "100%", maxWidth: "400px"}}
      >
        {/* Search prompt */}
        <SearchInput placeholder="What can I find for you today?" prompt={searchPrompt} handleSubmit={() => setSubmitted(true)} setPrompt={setSearchPrompt} />
        
        {/* Results Section */}
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: "80%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease:"anticipate", delay: 0.1, duration: 1.5 }}
            style={{ position: "absolute", marginTop: "10px"}}
          >
            <ListCards data={data?.results}/>
          </motion.div>


        )}
      </motion.div>
    </Box>
  );
}

export default App;
