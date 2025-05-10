import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Select,
  MenuItem,
  IconButton,
  Checkbox,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import API from "../services/api";

const MaterialsManagement = () => {
  const [companyId, setCompanyId] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [open, setOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    perDayRent: "",
    discountPercentage: "",
    company: "",
    isAvailable: true,
    stock: 0, // Added stock field
    id: null,
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const storedCompanyId = localStorage.getItem("company_id");
        if (!storedCompanyId) {
          console.error("Company ID not found. Please log in again.");
          return;
        }

        const numericCompanyId = parseInt(storedCompanyId, 10);
        if (isNaN(numericCompanyId)) {
          console.error("Invalid company ID format. Please log in again.");
          return;
        }

        setCompanyId(numericCompanyId);
        fetchMaterials(numericCompanyId);
      } catch (error) {
        console.error("Error fetching company or materials data:", error);
      }
    };
    loadInitialData();
  }, []);

  const fetchMaterials = async (companyId) => {
    if (!companyId) {
      console.error("No company ID available to fetch materials.");
      return;
    }
    try {
      const response = await API.get(`/api/test/?company_id=${companyId}`);
      if (response.status === 200) {
        setMaterials(response.data);
      } else {
        console.error("Failed to fetch materials:", response.status);
      }
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleOpen = () => {
    setNewMaterial({
      title: "",
      description: "",
      price: "",
      category: "",
      perDayRent: "",
      discountPercentage: "",
      company: companyId,
      isAvailable: true,
      stock: 0, // Initialize stock
      id: null,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewMaterial({
      title: "",
      description: "",
      price: "",
      category: "",
      perDayRent: "",
      discountPercentage: "",
      company: companyId || "",
      isAvailable: true,
      stock: 0, // Reset stock
      id: null,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewMaterial((prevMaterial) => ({
      ...prevMaterial,
      image: file,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMaterial((prevMaterial) => ({
      ...prevMaterial,
      [name]: type === "checkbox" ? checked : name === "stock" ? parseInt(value) || 0 : value,
    }));
  };

  const handleAddOrUpdateMaterial = async () => {
    if (!newMaterial.title || !newMaterial.description || !newMaterial.price || !newMaterial.category) {
      alert("Please fill in all required fields.");
      return;
    }

    let updatedMaterial = {
      ...newMaterial,
      perDayRent: newMaterial.category === "Selling" ? "0" : newMaterial.perDayRent || "0",
      discountPercentage: newMaterial.discountPercentage || "0",
      company: companyId,
    };

    const formData = new FormData();
    formData.append("title", updatedMaterial.title);
    formData.append("description", updatedMaterial.description);
    formData.append("price", updatedMaterial.price);
    formData.append("category", updatedMaterial.category);
    formData.append("perDayRent", updatedMaterial.perDayRent);
    formData.append("discountPercentage", updatedMaterial.discountPercentage || "0");
    formData.append("company", updatedMaterial.company);
    formData.append("isAvailable", updatedMaterial.isAvailable);
    formData.append("stock", updatedMaterial.stock); // Add stock to formData

    if (updatedMaterial.image) {
      formData.append("image", updatedMaterial.image, updatedMaterial.image.name);
    }

    try {
      let response;
      if (newMaterial.id) {
        response = await API.put(`/api/test/${newMaterial.id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await API.post("/api/test/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.status === 201 || response.status === 200) {
        fetchMaterials(companyId);
        handleClose();
      }
    } catch (error) {
      console.error("Failed to save material:", error.response?.data || error);
      alert("Error: Failed to save material. Check server logs.");
    }
  };

  const handleEditMaterial = (material) => {
    if (material.company === companyId) {
      setNewMaterial({
        ...material,
        image: null,
        stock: material.stock || 0, // Ensure stock is set
      });
      setOpen(true);
    } else {
      alert("You can only edit materials belonging to your company.");
    }
  };

  const handleDeleteMaterial = (id) => {
    const materialToDelete = materials.find((material) => material.id === id);
    if (materialToDelete.company === companyId) {
      if (window.confirm("Are you sure you want to delete this material?")) {
        API.delete(`/api/test/${id}/`)
          .then(() => {
            setMaterials(materials.filter((material) => material.id !== id));
          })
          .catch((error) => {
            console.error("Failed to delete material:", error);
            alert("Error: Failed to delete material.");
          });
      }
    } else {
      alert("You can only delete materials belonging to your company.");
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Manage Materials
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ mb: 3, borderRadius: '20px', px: 4, py: 1.5 }}
      >
        Add New Material
      </Button>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: '10px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Per Day Rent</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Discount (%)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell> {/* Added Stock Column */}
              <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Is Available</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Created At</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                <TableCell>{material.title}</TableCell>
                <TableCell>{material.price}</TableCell>
                <TableCell>{material.category}</TableCell>
                <TableCell>{material.perDayRent}</TableCell>
                <TableCell>{material.discountPercentage}</TableCell>
                <TableCell>{material.stock || 0}</TableCell> {/* Display Stock */}
                <TableCell>{material.company}</TableCell>
                <TableCell>
                  <Checkbox checked={material.isAvailable} disabled />
                </TableCell>
                <TableCell>{material.createdAt}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditMaterial(material)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteMaterial(material.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: '15px', p: 2 } }}>
        <DialogTitle sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          {newMaterial.id ? "Edit Material" : "Add New Material"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            value={newMaterial.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            value={newMaterial.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Price"
            name="price"
            fullWidth
            margin="normal"
            value={newMaterial.price}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Typography variant="body1" gutterBottom sx={{ mt: 1 }}>
            Select Category
          </Typography>
          <Select
            name="category"
            fullWidth
            margin="normal"
            value={newMaterial.category || ""}
            onChange={handleChange}
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="">
              <em>Select Category</em>
            </MenuItem>
            <MenuItem value="Renting">Renting</MenuItem>
            <MenuItem value="Selling">Selling</MenuItem>
          </Select>
          <TextField
            label="Per Day Rent"
            name="perDayRent"
            fullWidth
            margin="normal"
            value={newMaterial.perDayRent}
            onChange={handleChange}
            disabled={newMaterial.category === "Selling"}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Discount Percentage"
            name="discountPercentage"
            fullWidth
            margin="normal"
            value={newMaterial.discountPercentage}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Stock"
            name="stock"
            type="number"
            fullWidth
            margin="normal"
            value={newMaterial.stock}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Typography variant="body1" gutterBottom sx={{ mt: 1 }}>
            Image:
          </Typography>
          <input type="file" onChange={handleFileChange} style={{ marginBottom: '16px' }} />
          <TextField
            label="Company"
            name="company"
            fullWidth
            margin="normal"
            value={newMaterial.company || companyId || "Default Company"}
            disabled
            sx={{ mb: 2 }}
          />
          <Checkbox
            name="isAvailable"
            checked={newMaterial.isAvailable}
            onChange={handleChange}
            sx={{ mr: 1 }}
          />
          <Typography variant="body2" component="span">Is Available</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" sx={{ borderRadius: '20px', px: 3 }}>
            Cancel
          </Button>
          <Button onClick={handleAddOrUpdateMaterial} color="primary" sx={{ borderRadius: '20px', px: 3 }}>
            {newMaterial.id ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MaterialsManagement;