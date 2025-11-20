import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAssistant } from '@/api/assistantApi';

// @mui
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  useReactTable
} from '@tanstack/react-table';

// @project
import Table from './Table';
import ActionCell from './ActionCell';
import PageLoader from '@/components/PageLoader';
import AddNewAssistant from '../NewAssistant';

// @assets
import { IconChevronRight } from '@tabler/icons-react';

import { useGlobalState } from '../../../contexts/GlobalStateContext';

export default function AssistantList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const { setShowAssistantMenu } = useGlobalState();

  const [formData, setFormData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { data: apiResponse, isLoading, isError, refetch } = useQuery({
    queryKey: ['assistants'],
    queryFn: async () => {
      try {
        const response = await getAssistant();
        console.log("api for get assistant>>", response.data);
        return response.data.filter(assistant => assistant.agentId);
      } catch (error) {
        console.error("Fetching assistants failed:", error);
        throw error;
      }
    },
  });
  
  useEffect(() => {
    if (apiResponse) {
      const sortedData = [...apiResponse].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setData(sortedData);
    }
  }, [apiResponse]);


  const handleExpandAssistant = (assistant) => {
    navigate(`/assistant/configure/${assistant._id}`);
    localStorage.setItem('assistantId', assistant._id);
    setShowAssistantMenu(true);
  };

  const columns = useMemo(
    () => [
      {
        id: 'name',
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <Box sx={{ mr: 10 }}>
            <Typography variant="subtitle2">{row.original.name}</Typography>
          </Box>
        )
      },
      {
        id: 'phone',
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
        cell: ({ row }) => (
          <Typography variant="body2">
            {row.original.phoneNumber.length > 0
              ? row.original.phoneNumber.map(phone => phone.number).join(', ')
              : 'No Number'}
          </Typography>
        )
      },
      {
        id: 'provider',
        accessorKey: 'provider',
        header: 'Provider',
        cell: ({ row }) => (
          <Typography variant="body2">
            {row.original.phoneNumber.length > 0
              ? row.original.phoneNumber.map(phone => phone.provider).join(', ')
              : 'No Provider'}
          </Typography>
        )
      },
      {
        id: 'callMode',
        accessorKey: 'callMode',
        header: 'Mode',
        cell: ({ row }) => (
          <Typography variant="body2">
            {row.original.callMode || 'Outbound'}
          </Typography>
        )
      },
      {
        id: 'date',
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => (
          <Typography variant="body2" color="text.secondary">
            {new Date(row.original.createdAt).toLocaleDateString()}
          </Typography>
        )
      },
      {
        id: 'expander',
        header: () => null,
        cell: ({ row }) => {
          const assistant = row.original;
          return (
            <IconButton
              color={row.getIsExpanded() ? 'primary' : 'secondary'}
              onClick={() => {
                row.toggleExpanded();
                handleExpandAssistant(assistant);
              }}
              size="small"
              aria-label="expand"
            >
              <IconChevronRight size={18} />
            </IconButton>
          );
        },
        meta: { className: 'cell-center', style: { width: 40 } }
      },
      {
        id: 'action',
        cell: ({ row }) => (
          <ActionCell
            row={row.original}
            onEdit={(data) => onEditRow(data)}
            onDelete={(id) => onDeleteRow(id)}
          />
        )
      }
    ],
    [navigate]
  );

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
    onGlobalFilterChange: setGlobalFilter,
    manualPagination: false,
  });


  const onEditRow = (data) => {
    setFormData(data)
    setOpenModal(true)
    refetch();
  };

  const onDeleteRow = (id) => {
    setData((prev) => prev.filter((item) => item._id !== id));
    console.log('Assistant deleted', id);
    refetch();
  };

  const onGlobalSearch = (globalFilter) => {
    setGlobalFilter(globalFilter);
  };

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : isError ? (
        <Typography>Error fetching assistants</Typography>
      ) : (
        <Table
          table={table}
          onDelete={onDeleteRow}
          onGlobalSearch={onGlobalSearch}
          data={data}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
      <AddNewAssistant
        open={openModal}
        onClose={() => setOpenModal(false)}
        formData={formData}
        setData={setData}
      />
    </>
  );
}
