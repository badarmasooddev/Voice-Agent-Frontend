import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// @third-party
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';

// @project
import Table from './Table';
import ActionCell from './ActionCell';
import Profile from '@/components/Profile';
import { AssistantListData } from './assistant-list-data';
import { getAssistantCallLogs } from '../../../api/assistantApi';
import { useQuery } from '@tanstack/react-query';

// @assets
import { IconCancel, IconChevronDown, IconChevronRight, IconCircleCheck, IconClock } from '@tabler/icons-react';

/***************************  COMPONENT - TABLE  ***************************/

export default function AssistantList() {
  const navigate = useNavigate();
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["assistantConfig", "67ca16cdb2b132dd343890a7"],
    queryFn: getAssistantCallLogs,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const safeData = data || [];

  console.log(safeData)
  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            size="small"
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
            inputProps={{ 'aria-label': 'select all' }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            size="small"
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
            inputProps={{ 'aria-label': 'select' }}
          />
        ),
        meta: { className: 'cell-center', style: { width: 40 } }
      },

      {
        id: 'name',
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <Typography variant="subtitle2">{row.original.profile.fullName}</Typography>
          // <Profile
          //   {...{
          //     ...row.original.profile,
          //     title: row.original.profile.fullName,
          //     caption: row.original.profile.id,
          //     sx: { gap: 1.5 }
          //   }}
          // />
        )
      },

      {
        id: 'phone no',
        accessorKey: 'phone no',
        header: 'To',
        cell: (info) => <Typography variant="body2">{info.row.original.contact}</Typography>
      },
      {
        id: 'phone no',
        accessorKey: 'phone no',
        header: 'From',
        cell: (info) => <Typography variant="body2">{info.row.original.contact}</Typography>
      },
      {
        id: 'date',
        accessorKey: 'date',
        header: 'Date',
        cell: (info) => (
          <Typography variant="body2" color="text.secondary">
            {info.row.original.date}
          </Typography>
        )
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          switch (getValue()) {
            case 'Paid':
              return <Chip label="Paid" color="success" icon={<IconCircleCheck />} />;
            case 'Scheduled':
              return <Chip label="Scheduled" color="warning" icon={<IconClock />} />;
            default:
              return <Chip label="Paid" color="success" icon={<IconCircleCheck />} />;
          }
        }
      },
      {
        id: 'action',
        cell: ({ row }) => (
          <ActionCell
            row={row.original}
            // onEdit={(id) => onEditRow(id)}
            onDelete={(id) => onDeleteRow(id)}
            // onBlock={(id, checked) => onBlock(id, checked)}
          />
        )
      }
    ], // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const table = useReactTable({
    data: safeData,
    columns,
    state: { rowSelection, sorting, globalFilter },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
  });

  // Edit single row by id from Modal
  const onEditRow = (id) => {
    console.log('Account edited', id);
    debugger;
  };

  // Delete selected rows by checkbox selection
  const onDelete = () => {
    if (!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()) return;
    const selectedRow = table.getSelectedRowModel().rows.map((row) => row.original.id);
    setData((prev) => prev.filter((item) => !selectedRow.includes(item.id)));
    table.resetRowSelection();
  };

  // Delete single row by id from dialog
  const onDeleteRow = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    console.log('Account deleted', data);
  };

  // Block/Unblock single row by id from dialog and switch
  const onBlock = (id, checked) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id === id) item.isBlocked = checked;
        return item;
      })
    );
  };

  // Global filter search
  const onGlobalSearch = (globalFilter) => {
    setGlobalFilter(globalFilter);
  };

  return <Table table={table} onDelete={onDelete} onGlobalSearch={onGlobalSearch} />;
}
