import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TablePagination,
} from '@mui/material';
import { getAllBookings, addBooking } from '../services/apiService';

const timeSlots = ['7-8', '8-9', '9-10', '10-11'];

const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [open, setOpen] = useState(false);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [form, setForm] = useState({
    clientName: '',
    clientPhone: '',
    service: '',
    slot: '',
  });

  const fetchBookings = async () => {
    const { success, data } = await getAllBookings();
    if (success) {
      setBookings(data);
      setFiltered(data);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (!fromDate && !toDate) {
      setFiltered(bookings);
      return;
    }

    const from = fromDate ? new Date(fromDate + 'T00:00:00') : new Date('1970-01-01');
    const to = toDate ? new Date(toDate + 'T23:59:59') : new Date();

    const result = bookings.filter(b => {
      const date = new Date(b.createdAt);
      return date >= from && date <= to;
    });

    setFiltered(result);
    setPage(0); // reset to first page on filter
  }, [fromDate, toDate, bookings]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddBooking = async () => {
    const { success } = await addBooking(form);
    if (success) {
      setOpen(false);
      setForm({ clientName: '', clientPhone: '', service: '', slot: '' });
      fetchBookings();
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Bookings</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Booking
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} mb={3}>
        <TextField
          label="From Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={fromDate}
          onChange={e => setFromDate(e.target.value)}
        />
        <TextField
          label="To Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={toDate}
          onChange={e => setToDate(e.target.value)}
        />
      </Stack>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Time Slot</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(b => (
              <TableRow key={b._id}>
                <TableCell>{b.clientName}</TableCell>
                <TableCell>{b.clientPhone}</TableCell>
                <TableCell>{b.service}</TableCell>
                <TableCell>{b.slot}</TableCell>
                <TableCell>{new Date(b.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={e => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {/* Add Booking Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Booking</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              name="clientName"
              label="Client Name"
              fullWidth
              value={form.clientName}
              onChange={handleChange}
            />
            <TextField
              name="clientPhone"
              label="Client Phone"
              fullWidth
              value={form.clientPhone}
              onChange={handleChange}
            />
            <TextField
              name="service"
              label="Service"
              fullWidth
              value={form.service}
              onChange={handleChange}
            />
            <TextField
              select
              name="slot"
              label="Time Slot"
              fullWidth
              value={form.slot}
              onChange={handleChange}
            >
              {timeSlots.map(slot => (
                <MenuItem key={slot} value={slot}>
                  {slot}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddBooking} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookingsTable;
