import React from "react";
import Calculator from "./calculator";
import { Container } from "@mui/material";

const App: React.FC = () => {
  return (
    <Container sx={{ bgcolor: "transparent" }}>
      <Calculator />
    </Container>
  );
};

export default App;
