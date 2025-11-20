import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';

// @mui
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// @third-party
import { flexRender } from '@tanstack/react-table';

// @project
import RowDetails from './RowDetails';
import Toolbar from './Toolbar';
import MainCard from '@/components/MainCard';
import EmptyTable from '@/components/third-party/table/EmptyTable';
import HeaderCell from '@/components/third-party/table/HeaderCell';
import DetailsLog from '../details/details';

/***************************  TABLE - CARD  ***************************/

export default function TableCard({ table, onDelete, onGlobalSearch, data, pagination, setPagination }) {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleRowClick = (row) => {
    setSelectedData(row);
    setOpen(true);
  };

  return (
    <MainCard sx={{ p: 0 }}>
      <Toolbar table={table} onDelete={onDelete} onGlobalSearch={onGlobalSearch} />
      <TableContainer>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <HeaderCell key={header.id} header={header} />
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => {
                const isItemSelected = table
                  .getSelectedRowModel()
                  .rows.some((item) => item.original.id === row.original.id);

                return (
                  <Fragment key={row.id}>
                    <TableRow hover selected={isItemSelected} onClick={() => handleRowClick(row.original)}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  </Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} sx={{ height: 300 }}>
                  <EmptyTable msg="No Data" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {console.log("Call-Log pagination data>>", table.getRowModel())}
      {console.log('Call-Log Data length:', data.length)}
      {console.log('Call-Log Page size:', pagination.pageSize)}
      {console.log('Call-Log Page Count:', Math.ceil(data.length / pagination.pageSize))}

      {table.getRowModel().rows.length > 0 && (
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', px: { xs: 0.5, sm: 2.5 }, py: 1.5 }}>
          <Pagination
            count={Math.ceil(data.length / pagination.pageSize)}
            page={pagination.pageIndex + 1}
            onChange={(event, value) => setPagination((prev) => ({
              ...prev,
              pageIndex: value - 1
            }))}
          />
        </Stack>
      )}

      <DetailsLog open={open} onClose={() => setOpen(false)} selectedData={selectedData} />
    </MainCard>
  );
}

TableCard.propTypes = {
  table: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onGlobalSearch: PropTypes.func,
};
