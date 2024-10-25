import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  TextField,
  Box
} from '@mui/material';
import ExportCSV from '../exportCSV';

interface Column {
  id: string;
  label: string;
  numeric?: boolean;
  render?: (row: any) => React.ReactNode;
}

interface DynamicTableProps {
  data: any[];
  columns: Column[];
  initialRowsPerPage?: number;
}

const descendingComparator = (a: any, b: any, orderBy: string) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = (order: 'asc' | 'desc', orderBy: string) => {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
};

const DynamicTable: React.FC<DynamicTableProps> = ({ 
  data, 
  columns, 
  initialRowsPerPage = 5
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [orderBy, setOrderBy] = useState<string>(columns[0].id);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  // Filter data based on search query
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Sort filtered data
  const sortedData = React.useMemo(() => {
    const comparator = getComparator(order, orderBy);
    return [...filteredData].sort(comparator);
  }, [filteredData, order, orderBy]);

  // Calculate empty rows for current page
  const emptyRows = page > 0 
    ? Math.max(0, (1 + page) * rowsPerPage - sortedData.length) 
    : 0;

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
        />
      </Box>

      <TableContainer>
      <ExportCSV data={data} columns={columns} />
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.numeric ? 'right' : 'left'}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow 
                  hover 
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {columns.map((column) => (
                    <TableCell 
                      key={column.id}
                      align={column.numeric ? 'right' : 'left'}
                    >
                      {column.render ? column.render(row) : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={columns.length} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DynamicTable;