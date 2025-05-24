import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material";
import { Save, Compare, Add, Delete, PictureAsPdf, TableChart } from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const EstimationCosting = () => {
  // Initial material data with sub-units, in Rs
  const initialMaterials = [
    {
      id: 1,
      name: "Cement",
      quantity: 10000, // kg
      unit: "kg",
      subUnit: "bag",
      subUnitQuantity: 50, // 50 kg per bag
      brands: [
        { name: "UltraTech", cost: 675 },
        { name: "Shivam", cost: 750 },
        { name: "Local", cost: 540 },
      ],
      selectedBrand: "Shivam",
      customBrand: "",
      cost: 750, // Cost per bag
    },
    {
      id: 2,
      name: "Steel",
      quantity: 5000, // kg
      unit: "kg",
      subUnit: "kg",
      subUnitQuantity: 1,
      brands: [
        { name: "Ambey", cost: 99 },
        { name: "Jagadamba", cost: 98.5 },
        { name: "Hama", cost: 98 },
      ],
      selectedBrand: "Hama",
      customBrand: "",
      cost: 98,
    },
    {
      id: 3,
      name: "Vitrified Tiles",
      quantity: 1000, // sq.m
      unit: "sq.m",
      subUnit: "sq.m",
      subUnitQuantity: 1,
      brands: [
        { name: "Kajaria", cost: 1620 },
        { name: "Somany", cost: 1350 },
        { name: "Local", cost: 1080 },
      ],
      selectedBrand: "Somany",
      customBrand: "",
      cost: 1350,
    },
    {
      id: 4,
      name: "Paint",
      quantity: 1000, // sq.m
      unit: "sq.m",
      subUnit: "sq.m",
      subUnitQuantity: 1,
      brands: [
        { name: "Asian Paints", cost: 405 },
        { name: "Berger", cost: 337.5 },
        { name: "Local", cost: 270 },
      ],
      selectedBrand: "Berger",
      customBrand: "",
      cost: 337.5,
    },
    {
      id: 5,
      name: "Modular Wardrobe",
      quantity: 10, // units
      unit: "unit",
      subUnit: "unit",
      subUnitQuantity: 1,
      brands: [
        { name: "Premium", cost: 270000 },
        { name: "Standard", cost: 108000 },
        { name: "Basic", cost: 54000 },
      ],
      selectedBrand: "Standard",
      customBrand: "",
      cost: 108000,
    },
  ];

  // State management
  const [materials, setMaterials] = useState(initialMaterials);
  const [scenarios, setScenarios] = useState([]);
  const [scenarioName, setScenarioName] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    quantity: "",
    unit: "kg",
    subUnit: "kg",
    subUnitQuantity: 1,
    brands: [{ name: "", cost: "" }],
    selectedBrand: "",
    customBrand: "",
    cost: "",
  });

  // Calculate total cost for a material
  const calculateMaterialCost = (material) => {
    const subUnitCount = material.quantity / (material.subUnitQuantity || 1);
    return (subUnitCount * material.cost).toFixed(2);
  };

  // Calculate total project cost
  const calculateTotalCost = () => {
    return materials
      .reduce((total, material) => {
        const subUnitCount = material.quantity / (material.subUnitQuantity || 1);
        return total + subUnitCount * material.cost;
      }, 0)
      .toFixed(2);
  };

  // Handle field changes
  const handleFieldChange = (id, field, value) => {
    setMaterials((prev) =>
      prev.map((material) =>
        material.id === id
          ? {
              ...material,
              [field]:
                field === "quantity" || field === "subUnitQuantity" || field === "cost"
                  ? parseFloat(value) || 0
                  : value,
            }
          : material
      )
    );
  };

  const handleBrandChange = (id, brandName) => {
    setMaterials((prev) =>
      prev.map((material) =>
        material.id === id
          ? {
              ...material,
              selectedBrand: brandName,
              customBrand: "",
              cost:
                brandName === "Custom"
                  ? material.cost
                  : material.brands.find((b) => b.name === brandName)?.cost || material.cost,
            }
          : material
      )
    );
  };

  const handleCustomBrandChange = (id, value) => {
    setMaterials((prev) =>
      prev.map((material) =>
        material.id === id ? { ...material, customBrand: value } : material
      )
    );
  };

  // Handle delete material
  const handleDeleteMaterial = (id) => {
    setMaterials((prev) => prev.filter((material) => material.id !== id));
  };

  // Save scenario
  const saveScenario = () => {
    if (!scenarioName) return;
    const scenario = {
      name: scenarioName,
      materials: [...materials],
      totalCost: calculateTotalCost(),
    };
    setScenarios((prev) => [...prev, scenario]);
    setScenarioName("");
  };

  // Reset to initial materials
  const resetMaterials = () => {
    setMaterials(initialMaterials);
  };

  // Download main table as PDF
  const downloadMainTablePDF = () => {
    const doc = new jsPDF();
    doc.text("Material Table", 20, 10);

    const tableData = materials.map((material) => [
      material.name,
      `${material.quantity}`,
      material.unit,
      `${(material.quantity / (material.subUnitQuantity || 1)).toFixed(2)}`,
      material.subUnit,
      `${material.subUnitQuantity}`,
      material.selectedBrand,
      material.selectedBrand === "Custom" ? material.customBrand : "-",
      `Rs ${material.cost}`,
      `Rs ${calculateMaterialCost(material)}`,
    ]);

    doc.autoTable({
      head: [
        [
          "Material",
          "Quantity (Total)",
          "Unit",
          "Quantity (Sub-Unit)",
          "Sub-Unit",
          "Sub-Unit Quantity",
          "Brand",
          "Custom Brand",
          "Cost per Sub-Unit (Rs)",
          "Total Cost (Rs)",
        ],
      ],
      body: tableData,
      startY: 20,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [25, 118, 210] },
    });

    doc.save("material_table.pdf");
  };

  // Download main table as Excel
  const downloadMainTableExcel = () => {
    const worksheetData = materials.map((material) => ({
      Material: material.name,
      "Quantity (Total)": material.quantity,
      Unit: material.unit,
      "Quantity (Sub-Unit)": (material.quantity / (material.subUnitQuantity || 1)).toFixed(2),
      "Sub-Unit": material.subUnit,
      "Sub-Unit Quantity": material.subUnitQuantity,
      Brand: material.selectedBrand,
      "Custom Brand": material.selectedBrand === "Custom" ? material.customBrand : "-",
      "Cost per Sub-Unit (Rs)": material.cost,
      "Total Cost (Rs)": calculateMaterialCost(material),
    }));

    const ws = XLSX.utils.json_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Materials");
    XLSX.writeFile(wb, "material_table.xlsx");
  };

  // Download scenarios as PDF
  const downloadScenariosPDF = () => {
    const doc = new jsPDF();
    doc.text("Estimation & Costing Scenarios", 20, 10);

    const tableData = scenarios.map((scenario) => [
      scenario.name,
      `Rs ${scenario.totalCost}`,
      scenario.materials
        .map(
          (m) =>
            `${m.name}: ${m.selectedBrand === "Custom" ? m.customBrand : m.selectedBrand} @ Rs ${m.cost}/${m.subUnit}`
        )
        .join("\n"),
    ]);

    doc.autoTable({
      head: [["Scenario", "Total Cost (Rs)", "Materials"]],
      body: tableData,
      startY: 20,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [25, 118, 210] },
    });

    doc.save("estimation_costing_scenarios.pdf");
  };

  // Download scenarios as Excel
  const downloadScenariosExcel = () => {
    const worksheetData = scenarios.map((scenario) => ({
      Scenario: scenario.name,
      "Total Cost (Rs)": scenario.totalCost,
      Materials: scenario.materials
        .map(
          (m) =>
            `${m.name}: ${m.selectedBrand === "Custom" ? m.customBrand : m.selectedBrand} @ Rs ${m.cost}/${m.subUnit}`
        )
        .join("; "),
    }));

    const ws = XLSX.utils.json_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Scenarios");
    XLSX.writeFile(wb, "estimation_costing_scenarios.xlsx");
  };

  // Handle add material dialog
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewMaterial({
      name: "",
      quantity: "",
      unit: "kg",
      subUnit: "kg",
      subUnitQuantity: 1,
      brands: [{ name: "", cost: "" }],
      selectedBrand: "",
      customBrand: "",
      cost: "",
    });
  };

  const handleAddMaterial = () => {
    if (
      !newMaterial.name ||
      !newMaterial.quantity ||
      !newMaterial.brands[0].name ||
      !newMaterial.brands[0].cost
    ) {
      return;
    }
    const newId = materials.length ? materials[materials.length - 1].id + 1 : 1;
    setMaterials((prev) => [
      ...prev,
      {
        id: newId,
        name: newMaterial.name,
        quantity: parseFloat(newMaterial.quantity) || 0,
        unit: newMaterial.unit,
        subUnit: newMaterial.subUnit,
        subUnitQuantity: parseFloat(newMaterial.subUnitQuantity) || 1,
        brands: newMaterial.brands.filter((b) => b.name && b.cost),
        selectedBrand: newMaterial.brands[0].name,
        customBrand: "",
        cost: parseFloat(newMaterial.brands[0].cost) || 0,
      },
    ]);
    handleCloseAddDialog();
  };

  const handleAddBrandField = () => {
    setNewMaterial((prev) => ({
      ...prev,
      brands: [...prev.brands, { name: "", cost: "" }],
    }));
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#1976d2" }}>
        Estimation & Costing
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
        Modify material brands, costs, and add new materials to estimate the total project cost.
      </Typography>

      {/* Add Material Button and Download Buttons for Main Table */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenAddDialog}
          sx={{ backgroundColor: "#1976d2" }}
        >
          Add New Material
        </Button>
        <Button
          variant="contained"
          startIcon={<PictureAsPdf />}
          onClick={downloadMainTablePDF}
          sx={{ backgroundColor: "#d32f2f" }}
        >
          Download Main Table as PDF
        </Button>
        <Button
          variant="contained"
          startIcon={<TableChart />}
          onClick={downloadMainTableExcel}
          sx={{ backgroundColor: "#2e7d32" }}
        >
          Download Main Table as Excel
        </Button>
      </Box>

      {/* Material Table */}
      <TableContainer component={Paper} sx={{ mb: 4, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Material</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Quantity (Total)
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Unit
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Quantity (Sub-Unit)
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Sub-Unit
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Sub-Unit Quantity
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Brand</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Custom Brand
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Cost per Sub-Unit (Rs)
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Total Cost (Rs)
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id} sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}>
                <TableCell>
                  <TextField
                    value={material.name}
                    onChange={(e) =>
                      handleFieldChange(material.id, "name", e.target.value)
                    }
                    fullWidth
                    size="small"
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={material.quantity}
                    onChange={(e) =>
                      handleFieldChange(material.id, "quantity", e.target.value)
                    }
                    inputProps={{ min: 0 }}
                    fullWidth
                    size="small"
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={material.unit}
                    onChange={(e) =>
                      handleFieldChange(material.id, "unit", e.target.value)
                    }
                    fullWidth
                    size="small"
                  >
                    <MenuItem value="kg">kg</MenuItem>
                    <MenuItem value="sq.m">sq.m</MenuItem>
                    <MenuItem value="unit">unit</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  {(material.quantity / (material.subUnitQuantity || 1)).toFixed(2)} {material.subUnit}
                </TableCell>
                <TableCell>
                  <Select
                    value={material.subUnit}
                    onChange={(e) =>
                      handleFieldChange(material.id, "subUnit", e.target.value)
                    }
                    fullWidth
                    size="small"
                  >
                    <MenuItem value="kg">kg</MenuItem>
                    <MenuItem value="bag">bag</MenuItem>
                    <MenuItem value="sq.m">sq.m</MenuItem>
                    <MenuItem value="unit">unit</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={material.subUnitQuantity}
                    onChange={(e) =>
                      handleFieldChange(material.id, "subUnitQuantity", e.target.value)
                    }
                    inputProps={{ min: 1 }}
                    fullWidth
                    size="small"
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={material.selectedBrand}
                    onChange={(e) => handleBrandChange(material.id, e.target.value)}
                    fullWidth
                    size="small"
                  >
                    {material.brands.map((brand) => (
                      <MenuItem key={brand.name} value={brand.name}>
                        {brand.name}
                      </MenuItem>
                    ))}
                    <MenuItem value="Custom">Custom</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    value={material.customBrand}
                    onChange={(e) => handleCustomBrandChange(material.id, e.target.value)}
                    disabled={material.selectedBrand !== "Custom"}
                    placeholder="Enter custom brand"
                    fullWidth
                    size="small"
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title={`Cost per ${material.subUnit}`}>
                    <TextField
                      type="number"
                      value={material.cost}
                      onChange={(e) =>
                        handleFieldChange(material.id, "cost", e.target.value)
                      }
                      inputProps={{ step: "0.01", min: 0 }}
                      fullWidth
                      size="small"
                      variant="standard"
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>{calculateMaterialCost(material)}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteMaterial(material.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Total Cost and Actions */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: "#e3f2fd" }}>
            <CardContent>
              <Typography variant="h6" color="primary">
                Total Project Cost: Rs {calculateTotalCost()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Scenario Name"
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
            sx={{ mr: 2, width: "200px" }}
            size="small"
          />
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={saveScenario}
            disabled={!scenarioName}
            sx={{ mr: 2, backgroundColor: "#1976d2" }}
          >
            Save Scenario
          </Button>
          <Button
            variant="outlined"
            onClick={resetMaterials}
            sx={{ borderColor: "#1976d2", color: "#1976d2" }}
          >
            Reset
          </Button>
        </Grid>
      </Grid>

      {/* Comparison Table with Download Buttons */}
      {scenarios.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<PictureAsPdf />}
              onClick={downloadScenariosPDF}
              sx={{ backgroundColor: "#d32f2f" }}
            >
              Download Scenarios as PDF
            </Button>
            <Button
              variant="contained"
              startIcon={<TableChart />}
              onClick={downloadScenariosExcel}
              sx={{ backgroundColor: "#2e7d32" }}
            >
              Download Scenarios as Excel
            </Button>
          </Box>
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Scenario
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Total Cost (Rs)
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Materials
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scenarios.map((scenario, index) => (
                  <TableRow key={index}>
                    <TableCell>{scenario.name}</TableCell>
                    <TableCell>{scenario.totalCost}</TableCell>
                    <TableCell>
                      {scenario.materials.map((m) => (
                        <div key={m.id}>
                          {m.name}: {m.selectedBrand === "Custom" ? m.customBrand : m.selectedBrand} @ Rs {m.cost}/{m.subUnit}
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Add Material Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Material</DialogTitle>
        <DialogContent>
          <TextField
            label="Material Name"
            value={newMaterial.name}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, name: e.target.value })
            }
            fullWidth
            margin="dense"
            required
          />
          <TextField
            label="Quantity"
            type="number"
            value={newMaterial.quantity}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, quantity: e.target.value })
            }
            fullWidth
            margin="dense"
            required
          />
          <Select
            label="Unit"
            value={newMaterial.unit}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, unit: e.target.value })
            }
            fullWidth
            margin="dense"
          >
            <MenuItem value="kg">kg</MenuItem>
            <MenuItem value="sq.m">sq.m</MenuItem>
            <MenuItem value="unit">unit</MenuItem>
          </Select>
          <Select
            label="Sub-Unit"
            value={newMaterial.subUnit}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, subUnit: e.target.value })
            }
            fullWidth
            margin="dense"
          >
            <MenuItem value="kg">kg</MenuItem>
            <MenuItem value="bag">bag</MenuItem>
            <MenuItem value="sq.m">sq.m</MenuItem>
            <MenuItem value="unit">unit</MenuItem>
          </Select>
          <TextField
            label="Quantity per Sub-Unit"
            type="number"
            value={newMaterial.subUnitQuantity}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, subUnitQuantity: e.target.value })
            }
            fullWidth
            margin="dense"
            helperText="E.g., 50 for 50 kg per bag"
          />
          {newMaterial.brands.map((brand, index) => (
            <Box key={index} sx={{ display: "flex", gap: 2, mt: 1 }}>
              <TextField
                label="Brand Name"
                value={brand.name}
                onChange={(e) => {
                  const updatedBrands = [...newMaterial.brands];
                  updatedBrands[index].name = e.target.value;
                  setNewMaterial({ ...newMaterial, brands: updatedBrands });
                }}
                fullWidth
                margin="dense"
                required
              />
              <TextField
                label="Cost per Sub-Unit (Rs)"
                type="number"
                value={brand.cost}
                onChange={(e) => {
                  const updatedBrands = [...newMaterial.brands];
                  updatedBrands[index].cost = e.target.value;
                  setNewMaterial({ ...newMaterial, brands: updatedBrands });
                }}
                fullWidth
                margin="dense"
                required
              />
            </Box>
          ))}
          <Button
            onClick={handleAddBrandField}
            startIcon={<Add />}
            sx={{ mt: 1 }}
          >
            Add Another Brand
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddMaterial} variant="contained">
            Add Material
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EstimationCosting;