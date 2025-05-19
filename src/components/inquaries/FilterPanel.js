import React from 'react';
import { Paper, Typography, Box, FormControl, InputLabel, Select, MenuItem, Slider, Button } from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const FilterPanel = ({
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  progressRange,
  onProgressRangeChange,
  showIncompleteCertificates,
  onCertificateFilterChange,
  showOnlyPaidInquiries,
  onPaymentFilterChange,
  categories,
  statuses,
  onResetFilters,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ flex: 1, minWidth: 250 }}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3, bgcolor: 'white', height: 'fit-content' }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 'bold' }}>
          Filters
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: theme.palette.text.primary }}>Service Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              label="Service Category"
              sx={{ bgcolor: 'white', borderRadius: 2, '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider } }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel sx={{ color: theme.palette.text.primary }}>Status</InputLabel>
            <Select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              label="Status"
              sx={{ bgcolor: 'white', borderRadius: 2, '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider } }}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold', color: theme.palette.text.primary }}>
              Progress Range (%)
            </Typography>
            <Slider
              value={progressRange}
              onChange={(e, newValue) => onProgressRangeChange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              sx={{ color: theme.palette.primary.main }}
            />
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {progressRange[0]}% - {progressRange[1]}%
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <input
              type="checkbox"
              checked={showIncompleteCertificates}
              onChange={(e) => onCertificateFilterChange(e.target.checked)}
              id="certificate-filter"
            />
            <label htmlFor="certificate-filter" style={{ color: theme.palette.text.primary }}>
              Show Completed without Certificates
            </label>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <input
              type="checkbox"
              checked={showOnlyPaidInquiries}
              onChange={(e) => onPaymentFilterChange(e.target.checked)}
              id="payment-filter"
            />
            <label htmlFor="payment-filter" style={{ color: theme.palette.text.primary }}>
              Show Only Paid Inquiries
            </label>
          </Box>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ClearIcon />}
            onClick={onResetFilters}
            sx={{ borderRadius: 2, textTransform: 'none', mt: 1 }}
          >
            Reset Filters
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FilterPanel;