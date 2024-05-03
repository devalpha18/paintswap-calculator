import React, { useState, useCallback } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface DataPoint {
  x: string;
  y: number;
}

interface Inputs {
  A: string;
  B: string;
}

const Calculator: React.FC = () => {
  const [inputs, setInputs] = useState<Inputs>({ A: "", B: "" });
  const [operator, setOperator] = useState<string>("+");
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [date, setDate] = useState<Date>(new Date());

  const InputStyle = {
    borderRadius: "5px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#CC6923 !important",
    },
    "& .MuiInputBase-input": {
      color: "#ffffff !important",
    },
    "& .MuiFormLabel-root": {
      color: "#ffffff !important",
    },
    "& .MuiSvgIcon-root": {
      color: "#ffffff !important",
    },
  };

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      if (!value || value.match(/^\d*\.?\d*$/)) {
        // Regex allows numbers and decimal points
        setInputs((prevInputs) => ({
          ...prevInputs,
          [name]: value,
        }));
      }
    },
    []
  );

  const handleOperatorChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      setOperator(event.target.value);
    },
    []
  );

  const calculateResult = useCallback(() => {
    const { A, B } = inputs;
    let result = 0;
    switch (operator) {
      case "+":
        result = Number(A) + Number(B);
        break;
      case "-":
        result = Number(A) - Number(B);
        break;
      case "*":
        result = Number(A) * Number(B);
        break;
      case "/":
        result = Number(A) / Number(B);
        break;
    }
    const newDate = new Date(date.setDate(date.getDate() + 1));
    setDataPoints((prevDataPoints) => [
      ...prevDataPoints,
      { x: newDate.toDateString(), y: result },
    ]);
  }, [inputs, operator, date]);

  const clearData = useCallback(() => {
    setInputs({ A: "", B: "" });
    setDataPoints([]);
    setDate(new Date());
  }, []);

  const data = {
    labels: dataPoints.map((dp) => dp.x),
    datasets: [
      {
        label: "Result",
        data: dataPoints.map((dp) => dp.y),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#ffffff",
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4, // Smooths the line
      },
    ],
  };

  return (
    <Box sx={{ m: 4 }}>
      <Typography
        sx={{
          fontSize: { sm: "50px", lg: "120px", xl: "50px" },
          fontFamily: "comics",
          background: "linear-gradient(180deg, #FFE801 50%, #F72800 91.33%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textAlign: "center",
          mb: 3,
        }}
      >
        Calculator
      </Typography>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
        <TextField
          label="A"
          variant="outlined"
          name="A"
          value={inputs.A}
          onChange={handleInputChange}
          error={!inputs.A || isNaN(Number(inputs.A))}
          helperText={
            !inputs.A || !isNaN(Number(inputs.A))
              ? ""
              : "Please enter a valid number"
          }
          sx={InputStyle}
        />
        <FormControl fullWidth>
          <InputLabel id="operator-label" sx={{ color: "#fff !important" }}>
            Operator
          </InputLabel>
          <Select
            labelId="operator-label"
            value={operator}
            label="Operator"
            onChange={handleOperatorChange}
            sx={InputStyle}
          >
            <MenuItem value="+">+</MenuItem>
            <MenuItem value="-">-</MenuItem>
            <MenuItem value="*">*</MenuItem>
            <MenuItem value="/">/</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="B"
          variant="outlined"
          name="B"
          value={inputs.B}
          onChange={handleInputChange}
          error={!inputs.B || isNaN(Number(inputs.B))}
          helperText={
            !inputs.B || !isNaN(Number(inputs.B))
              ? ""
              : "Please enter a valid number"
          }
          sx={InputStyle}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Button
          onClick={calculateResult}
          sx={{
            flex: "1 1",
            fontFamily: "comics",
            bgcolor: "#fff",
            color: "#000",
            "&:hover": {
              bgcolor: "transparent",
              color: "#ffffff",
            },
          }}
        >
          Calc
        </Button>
        <Button
          sx={{
            flex: "1 1",
            fontFamily: "comics",
            bgcolor: "#fff",
            color: "#000",
            "&:hover": {
              bgcolor: "transparent",
              color: "#ffffff",
            },
          }}
          onClick={clearData}
        >
          Clear
        </Button>
      </Box>
      {dataPoints.length > 0 && (
        <Line
          data={data}
          options={{
            responsive: true,
            scales: {
              x: {
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                  color: "#fff",
                },
              },
              y: {
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                  color: "#fff",
                },
              },
            },
          }}
        />
      )}
    </Box>
  );
};

export default Calculator;
