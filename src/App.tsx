import React from "react";
import Calculator from "./Calculator";
import { Container } from "@mui/material";

const App: React.FC = () => {
  return (
    <Container sx={{ bgcolor: "transparent" }}>
      <Calculator />
    </Container>
  );
};

export default App;
