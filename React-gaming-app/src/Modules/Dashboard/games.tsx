import { useState } from "react";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const Games = () => {
  const [rows, setRows] = useState([
    { id: 1, gameName: "Daily Bounty", bronze: 120, silver: 80, gold: 40, total: 240 },
    { id: 2, gameName: "Bounty Play Bid", bronze: 90, silver: 70, gold: 30, total: 190 },
    { id: 3, gameName: "Burst Credo", bronze: 150, silver: 100, gold: 50, total: 300 },
  ]);

  const [open, setOpen] = useState(false);
  const [newGame, setNewGame] = useState({
    id: 0,
    gameName: "",
    bronze: 0,
    silver: 0,
    gold: 0,
  });

  const handleAdd = () => {
    setRows((prevRows) => [
      ...prevRows,
      { ...newGame, total: newGame.bronze + newGame.silver + newGame.gold, id: rows.length + 1 },
    ]);
    setOpen(false);
    setNewGame({ id: 0, gameName: "", bronze: 0, silver: 0, gold: 0 });
  };

  const handleDelete = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const processRowUpdate = (newRow: any) => {
    const updatedRow = { ...newRow, total: newRow.bronze + newRow.silver + newRow.gold };
    setRows((prevRows) => prevRows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "gameName", headerName: "Game Name", flex: 1, editable: true },
    { field: "bronze", headerName: "Bronze Players", flex: 1, editable: true },
    { field: "silver", headerName: "Silver Players", flex: 1, editable: true },
    { field: "gold", headerName: "Gold Players", flex: 1, editable: true },
    { field: "total", headerName: "Total Players", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => (
        <Button variant="contained" color="error" onClick={() => handleDelete(params.row.id)}>
          Delete
        </Button>
      ),
    },
  ];
  

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <h3>Games Overview</h3>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Game
      </Button>
     
      <DataGrid
  rows={rows}
  columns={columns}
  initialState={{
    pagination: {
      paginationModel: { pageSize: 5, page: 0 },
    },
  }}
  pageSizeOptions={[5, 10]}
  checkboxSelection
  disableRowSelectionOnClick
  processRowUpdate={processRowUpdate}
  slots={{
    toolbar: GridToolbarContainer,
  }}
  sx={{
    backgroundColor: "#ffffff",
    color: "#000000",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "4px",
    mt: 2,
   
  
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#f7f7f7', // Light gray background for visibility
      color: '#2962ff',             // Black text for the headers
      fontWeight: 'bold',        // Make header text bold
    },
    '& .MuiDataGrid-cell': {
      backgroundColor: '#fff',   // Ensure cell background color is white
    },


  }}
/>


      {/* Dialog for Adding New Game */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Game</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Game Name"
            fullWidth
            value={newGame.gameName}
            onChange={(e) => setNewGame({ ...newGame, gameName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Bronze Players"
            type="number"
            fullWidth
            value={newGame.bronze}
            onChange={(e) => setNewGame({ ...newGame, bronze: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Silver Players"
            type="number"
            fullWidth
            value={newGame.silver}
            onChange={(e) => setNewGame({ ...newGame, silver: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Gold Players"
            type="number"
            fullWidth
            value={newGame.gold}
            onChange={(e) => setNewGame({ ...newGame, gold: Number(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Games;
