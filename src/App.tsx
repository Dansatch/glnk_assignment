import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchInput from "./components/SearchInput";
import ListCards from "./components/ListCards";
import useSearchResults from "./hooks/useSearchResults";

const MotionGridItem = motion(GridItem);

function App() {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { data, loading, error } = useSearchResults(searchPrompt);
  const resultReady = searchPrompt[0] && submitted;

  useEffect(() => {
    if(!searchPrompt[0]){
      setSubmitted(false);
    }
  }, [resultReady]);

  return (
    <>
      <Grid
        h="100vh"
        width={"100vw"}
        templateRows="repeat(7, 1fr)"
        display={"grid"}
      >
        <MotionGridItem
          rowSpan={7}
          display={"flex"}
          alignItems={"center"}
          animate={{ height: resultReady ? "14.28vh" : "100vh" }} // Adjusted height per row
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <SearchInput
            placeholder="What can I find for you today?"
            readOnly={!!resultReady}
            prompt={searchPrompt}
            handleSubmit={() => setSubmitted(true)}
            setPrompt={setSearchPrompt}
          />
        </MotionGridItem>

        <MotionGridItem
          rowSpan={0}
          display={resultReady ? "flex" : "none"}
          animate={{ height: resultReady ? "71.4vh" : "0vh" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <ListCards data={data?.results} />
        </MotionGridItem>

        <MotionGridItem
          rowSpan={0}
          display={resultReady ? "flex" : "none"}
          animate={{ height: resultReady ? "14.28vh" : "0vh" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          alignItems={"center"}
          justifyContent={"center"}
>
           <SearchInput placeholder="Refine your search?" prompt={searchPrompt} handleSubmit={() => setSubmitted(true)} setPrompt={setSearchPrompt} />
        </MotionGridItem>
      </Grid>
    </>
  );
}

export default App;
