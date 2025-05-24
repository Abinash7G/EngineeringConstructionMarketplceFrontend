
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Fade,
} from "@mui/material";

const RejectedCompanies = () => {
  const [rejectedCompanies, setRejectedCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/company-registration-list/")
      .then((response) => {
        const allCompanies = response.data;
        const rejected = allCompanies.filter((c) => c.is_rejected);
        setRejectedCompanies(rejected);
      })
      .catch((err) => {
        console.error("Error fetching companies:", err);
        setError("Failed to load rejected companies.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "#f5f5f5" }}>
        <Fade in={loading}>
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress sx={{ color: "#1976d2" }} />
            <Typography variant="body1" sx={{ mt: 2, color: "#666" }}>
              Loading rejected companies...
            </Typography>
          </Box>
        </Fade>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "#f5f5f5" }}>
        <Fade in={!!error}>
          <Typography variant="h6" sx={{ color: "#d32f2f", fontWeight: 500, p: 3, bgcolor: "#ffebee", borderRadius: 2 }}>
            {error}
          </Typography>
        </Fade>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f5f5" }}>
      <Sidebar />
      <Box sx={{ flex: 1, overflowY: "auto", p: 4 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            color: "#1976d2",
            fontWeight: 600,
            letterSpacing: "0.5px",
          }}
        >
          Rejected Companies
        </Typography>

        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Table>
            <TableHead sx={{ bgcolor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold", py: 2, px: 3 }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", py: 2, px: 3 }}>Company Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", py: 2, px: 3 }}>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rejectedCompanies.map((company) => (
                <TableRow
                  key={company.id}
                  hover
                  sx={{
                    "&:hover": {
                      bgcolor: "#e3f2fd",
                      transition: "background-color 0.3s ease",
                    },
                  }}
                >
                  <TableCell sx={{ py: 1.5, px: 3, color: "#333" }}>{company.id}</TableCell>
                  <TableCell sx={{ py: 1.5, px: 3, color: "#333" }}>{company.company_name}</TableCell>
                  <TableCell sx={{ py: 1.5, px: 3, color: "#333" }}>{company.company_email}</TableCell>
                </TableRow>
              ))}
              {rejectedCompanies.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 3, color: "#666" }}>
                    No rejected companies found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default RejectedCompanies;