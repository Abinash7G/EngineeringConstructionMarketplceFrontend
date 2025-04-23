// // import React from "react";
// // import { Bar } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";
// // import { Box } from "@mui/material";

// // // Register Chart.js components
// // ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // const Chart = () => {
// //   // Sample data
// //   const data = {
// //     labels: ["January", "February", "March", "April", "May", "June"],
// //     datasets: [
// //       {
// //         label: "Revenue ($)",
// //         data: [3000, 4000, 3200, 4500, 5000, 6000],
// //         backgroundColor: "rgba(0, 123, 255, 0.5)",
// //         borderColor: "rgba(0, 123, 255, 1)",
// //         borderWidth: 1,
// //       },
// //       {
// //         label: "Active Users",
// //         data: [200, 250, 220, 270, 300, 350],
// //         backgroundColor: "rgba(40, 167, 69, 0.5)",
// //         borderColor: "rgba(40, 167, 69, 1)",
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// //   const options = {
// //     responsive: true,
// //     plugins: {
// //       legend: {
// //         position: "top",
// //       },
// //       title: {
// //         display: true,
// //         text: "Monthly Analytics",
// //       },
// //     },
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         width: "100%",
// //         maxWidth: "800px",
// //         margin: "0 auto",
// //         backgroundColor: "white",
// //         padding: "20px",
// //         borderRadius: "10px",
// //         boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
// //       }}
// //     >
// //       <Bar data={data} options={options} />
// //     </Box>
// //   );
// // };

// // export default Chart;
// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Box } from "@mui/material";

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Chart = ({ analyticsData }) => {
//   // Use provided analyticsData or fallback to empty data
//   const data = {
//     labels: analyticsData?.labels || ["January", "February", "March", "April", "May", "June"],
//     datasets: [
//       {
//         label: "Subscription Revenue (RS.)",
//         data: analyticsData?.revenue || [0, 0, 0, 0, 0, 0],
//         backgroundColor: "rgba(0, 123, 255, 0.5)",
//         borderColor: "rgba(0, 123, 255, 1)",
//         borderWidth: 1,
//       },
//       {
//         label: "Subscriptions",
//         data: analyticsData?.subscriptions || [0, 0, 0, 0, 0, 0],
//         backgroundColor: "rgba(40, 167, 69, 0.5)",
//         borderColor: "rgba(40, 167, 69, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Monthly Subscription Analytics",
//       },
//     },
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "800px",
//         margin: "0 auto",
//         backgroundColor: "white",
//         padding: "20px",
//         borderRadius: "10px",
//         boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Bar data={data} options={options} />
//     </Box>
//   );
// };

// export default Chart;
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ analyticsData, period, setPeriod }) => {
  // Define colors for each subscription type
  const colors = {
    trial: { background: "rgba(255, 99, 132, 0.5)", border: "rgba(255, 99, 132, 1)" },
    monthly: { background: "rgba(54, 162, 235, 0.5)", border: "rgba(54, 162, 235, 1)" },
    quarterly: { background: "rgba(255, 206, 86, 0.5)", border: "rgba(255, 206, 86, 1)" },
    yearly: { background: "rgba(75, 192, 192, 0.5)", border: "rgba(75, 192, 192, 1)" },
  };

  // Prepare datasets for revenue by subscription type
  const revenueDatasets = analyticsData?.revenue_by_type
    ? Object.keys(analyticsData.revenue_by_type).map((type) => ({
        label: `Revenue (${type.charAt(0).toUpperCase() + type.slice(1)}) (RS.)`,
        data: analyticsData.revenue_by_type[type],
        backgroundColor: colors[type].background,
        borderColor: colors[type].border,
        borderWidth: 1,
        stack: "revenue", // Stack revenue bars
      }))
    : [];

  // Prepare datasets for subscriptions by type
  const subscriptionDatasets = analyticsData?.subscriptions_by_type
    ? Object.keys(analyticsData.subscriptions_by_type).map((type) => ({
        label: `Subscriptions (${type.charAt(0).toUpperCase() + type.slice(1)})`,
        data: analyticsData.subscriptions_by_type[type],
        backgroundColor: colors[type].background,
        borderColor: colors[type].border,
        borderWidth: 1,
        stack: "subscriptions", // Stack subscription bars
      }))
    : [];

  // Combine datasets (revenue and subscriptions)
  const data = {
    labels: analyticsData?.labels || ["January", "February", "March", "April", "May", "June"],
    datasets: [...revenueDatasets, ...subscriptionDatasets],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Subscription Analytics (${period.charAt(0).toUpperCase() + period.slice(1)})`,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Period</InputLabel>
          <Select value={period} onChange={handlePeriodChange} label="Period">
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="quarterly">Quarterly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Bar data={data} options={options} />
    </Box>
  );
};

export default Chart;