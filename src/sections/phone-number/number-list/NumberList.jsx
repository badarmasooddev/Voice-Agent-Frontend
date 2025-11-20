import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// @mui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';

// @project
import Table from './Table';
import PageLoader from '@/components/PageLoader';

// API Import
import { getAllPhoneNumber } from '@/api/phoneNumsApi';

export default function NumberList() {
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  const { data: apiResponse, isLoading, isError } = useQuery({
    queryKey: ['phoneNumbers'],
    queryFn: async () => {
      try {
        const response = await getAllPhoneNumber();
        return response || { data: [] };
      } catch (error) {
        console.error("Fetching phone numbers failed:", error);
        throw error;
      }
    },
  });

  useEffect(() => {
    if (apiResponse) {
      setData(apiResponse);
    }
  }, [apiResponse]);

  console.log("phones data", apiResponse);

  const columns = useMemo(
    () => [
      {
        id: 'region',
        accessorKey: 'region',
        header: 'Region',
        cell: ({ row }) => (
          <Box sx={{ mr: 10 }}>
            <Typography variant="subtitle2">{row.original.region}</Typography>
          </Box>
        )
      },
      {
        id: 'phone',
        accessorKey: 'number',
        header: 'Phone Number',
        cell: ({ row }) => (
          <Typography variant="body2">{row.original.number || 'No Number'}</Typography>
        )
      },
      {
        id: 'countryCode',
        accessorKey: 'countryCode',
        header: 'Country Code',
        cell: ({ row }) => (
          <Typography variant="body2">{row.original.countryCode}</Typography>
        )
      },
      {
        id: 'provider',
        accessorKey: 'provider',
        header: 'Provider',
        cell: ({ row }) => (
          <Typography variant="body2">{row.original.provider}</Typography>
        )
      }
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter
  });

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : isError ? (
        <Typography>Error fetching phone numbers</Typography>
      ) : (
        <Table table={table} onGlobalSearch={setGlobalFilter} />
      )}
    </>
  );
}
