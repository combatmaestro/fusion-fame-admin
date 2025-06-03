import React, { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  useMediaQuery,
  useTheme,
  TablePagination,
} from '@mui/material';
import { getAllEnquiries } from '../services/apiService';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchLeads = async () => {
      const { success, data } = await getAllEnquiries();
      if (success) {
        setLeads(data);
      } else {
        console.error('Failed to fetch leads:', data.message);
      }
      setLoading(false);
    };

    fetchLeads();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedLeads = leads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Typography variant="h4" gutterBottom>Leads</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Mobile</TableCell>
                {!isMobile && <TableCell>Email</TableCell>}
                {!isMobile && <TableCell>Comments</TableCell>}
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedLeads.map((lead) => (
                <TableRow key={lead._id}>
                  <TableCell>{lead.userName}</TableCell>
                  <TableCell>{lead.mobile}</TableCell>
                  {!isMobile && <TableCell>{lead.userEmail}</TableCell>}
                  {!isMobile && <TableCell>{lead.comments}</TableCell>}
                  <TableCell>{new Date(lead.submittedAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={leads.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </>
      )}
    </>
  );
};

export default Leads;
