import { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAssistantById } from '@/api/assistantApi';
import { useParams } from 'react-router-dom';

// @mui
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

// @third-party
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import CallModal from './CallModal';

// @project
import Table from './analytics-behavior-table/Table';
import PageLoader from '@/components/PageLoader';
import LiveCallModal from './LiveCallModal';
import AssistantShareCall from './AssistantShareCall';

export default function AnalyticsBehaviorTable() {
  const { id: assistantId } = useParams();
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [open, setOpen] = useState(false);
  const [liveCallOpen, setLiveCallOpen] = useState(false)
  const [callId, setCallId] = useState('');
  const [assistantPhone, setAssistantPhone] = useState('');
  const [agentId, setAgentId] = useState()

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { data: assistant, isLoading, isError, refetch } = useQuery({
    queryKey: ['assistant', assistantId],
    queryFn: async () => {
      try {
        return await getAssistantById(assistantId);
      } catch (error) {
        console.error("Fetching assistant failed:", error);
        throw error;
      }
    },
  });

  useEffect(() => {
    if (assistant) {
      setData([assistant]);
    }
  }, [assistant]);

  const handleRefetch = () => {
    refetch();
  };

  const columns = useMemo(
    () => [
      {
        id: 'name',
        header: 'Assistant Name',
        accessorKey: 'agentName',
        cell: ({ row }) => (
          <Typography variant="subtitle2">
            {row.original.data.name || 'N/A'}
          </Typography>
        ),
      },
      {
        id: 'phone',
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
        cell: ({ row }) => (
          <Typography variant="body2">
            {row.original.data.phoneNumber?.length > 0
              ? row.original.data.phoneNumber.map((phone) => phone.number).join(', ')
              : 'No Number'}
          </Typography>
        ),
      },
      {
        id: 'createdAt',
        header: 'Created At',
        accessorKey: 'createdAt',
        cell: ({ row }) => (
          <Typography variant="body2" color="text.secondary">
            {new Date(row.original.data.createdAt).toLocaleDateString()}
          </Typography>
        ),
      },
      {
        id: 'action',
        header: 'Actions',
        cell: ({ row }) => (
          <Button variant="contained" color="primary" size="small" onClick={() => onCall(row.original.data)}>
            Call
          </Button>
        ),
      },
      {
        id: 'action',
        header: 'Actions',
        cell: ({ row }) => (
          <Button variant="contained" color="primary" size="small" onClick={() => onLiveCall(row.original.data)}>
            Test
          </Button>
        ),
      },
      {
        id: 'action',
        header: 'Actions',
        cell: ({ row }) => (
          <Button variant="contained" color="primary" size="small" onClick={() => handleShareClick(row.original.data.agentId)}>
            Share
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  const onCall = (assistant) => {
    setOpen(true);
    setCallId(assistant._id);
    setAssistantPhone(assistant.phoneNumber?.[0]?.number || 'Unknown');
  };
  const onLiveCall = (assistant) => {
    setLiveCallOpen(true);
    setAgentId(assistant.agentId);
  };

  const handleShareClick = (agentId) => {
    const shareUrl = `${window.location.origin}/share-call/${agentId}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setSnackbarMessage('URL copied to clipboard!');
        setSnackbarOpen(true);
        console.log('URL copied to clipboard:', shareUrl);
      })
      .catch((err) => {
        setSnackbarMessage('Failed to copy URL');
        setSnackbarOpen(true);
        console.error('Failed to copy URL:', err);
      });
  };

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : isError ? (
        <Typography>Error fetching assistant data.</Typography>
      ) : (
        <Table table={table} onGlobalSearch={setGlobalFilter} onUpdate={handleRefetch} />
      )}
      <CallModal open={open} onClose={() => setOpen(false)} callId={callId} assistantPhone={assistantPhone} />
      <LiveCallModal open={liveCallOpen} onClose={() => setLiveCallOpen(false)} agentId={agentId} />
      {/* {liveCallOpen && agentId && (
        <AssistantShareCall agentId={agentId} />
      )} */}

    </>
  );
}
