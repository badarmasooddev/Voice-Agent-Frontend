import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// @mui
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
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
import { getAllCallLogs, getElevenLabConversations } from '@/api/callLogs';
import { getAssistantById } from '@/api/assistantApi';
import PageLoader from '@/components/PageLoader';
import DetailsLog from '../details/details';

// @assets
import { IconCircleCheck, IconClock, IconCancel } from '@tabler/icons-react';

/***************************  COMPONENT - CALL LOGS LIST  ***************************/

export default function CallLogsList() {
  const { id: assistantId } = useParams();
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [agentId, setAgentId] = useState(null);
  const [assistantPhone, setAssistantPhone] = useState('Unknown');

  const { data: assistantData, isLoading: isAssistantLoading } = useQuery({
    queryKey: ['assistant', assistantId],
    queryFn: () => getAssistantById(assistantId),
    enabled: !!assistantId,
  });
console.log("call logs data>>", assistantData)

  useEffect(() => {
    if (assistantData?.data) {
      setAgentId(assistantData.data.agentId);
      setAssistantPhone(
        assistantData.data.phoneNumber?.length > 0 ? assistantData.data.phoneNumber[0].number : 'Unknown'
      );
    }
  }, [assistantData]);

  const { data: dbCallLogs } = useQuery({
    queryKey: ['dbCallLogs', assistantId],
    queryFn: () => getAllCallLogs(assistantId),
    enabled: !!assistantId,
  });

  const { data: liveCallLogs, isLoading: isLiveCallLogsLoading } = useQuery({
    queryKey: ['liveCallLogs', agentId],
    queryFn: () => getElevenLabConversations(agentId),
    enabled: !!agentId,
  });

  useEffect(() => {
    let allLogs = [];
  
    const dbCallLogMap = dbCallLogs?.data?.reduce((acc, log) => {
      const logDate = new Date(log.startTime).toLocaleDateString('en-US');
      acc[logDate] = acc[logDate] || [];
      acc[logDate].push({
        to: log.to || 'Unknown',
        from: log.from || assistantPhone,
      });
      return acc;
    }, {}) || {};
  
    if (liveCallLogs?.data?.conversations?.length) {
      const formattedLiveLogs = liveCallLogs.data.conversations.map((conv) => {
        const convDate = new Date(conv.start_time_unix_secs * 1000).toLocaleDateString('en-US');
        const matchedLogs = dbCallLogMap[convDate] || [{ to: 'Unknown', from: assistantPhone }];
  
        return {
          id: conv.conversation_id,
          name: conv.agent_name,
          contactTo: matchedLogs.shift()?.to || 'Unknown',
          contactFrom: matchedLogs.shift()?.from || assistantPhone,
          date: convDate,
          status: conv.status || 'processing',
        };
      });
  
      allLogs = [...formattedLiveLogs];
    }
    setData(allLogs);
  }, [dbCallLogs, liveCallLogs, assistantData]);
  
  const handleRowClick = (row) => {
    setSelectedData({
      ...row,
      agentName: row.original,name,
  });
    setOpenDetails(true);
  };

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            size="small"
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            inputProps={{ 'aria-label': 'select all' }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            size="small"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
            inputProps={{ 'aria-label': 'select' }}
          />
        ),
        meta: { className: 'cell-center', style: { width: 40 } }
      },
      {
        id: 'name',
        accessorKey: 'name',
        header: 'Agent Name',
        cell: ({ row }) => <Typography variant="subtitle2">{row.original.name}</Typography>
      },
      {
        id: 'contactTo',
        accessorKey: 'contactTo',
        header: 'To',
        cell: ({ row }) => (
          <Typography variant="body2">
            {row.original.contactTo ? row.original.contactTo : 'Unknown'}
          </Typography>
        )
      },
      {
        id: 'contactFrom',
        accessorKey: 'contactFrom',
        header: 'From',
        cell: ({ row }) => (
          <Typography variant="body2">
            {row.original.contactFrom ? row.original.contactFrom : 'Unknown'}
          </Typography>
        )
      },
      {
        id: 'date',
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }) => (
          <Typography variant="body2" color="text.secondary">
            {row.original.date}
          </Typography>
        )
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          switch (getValue()) {
            case 'done':
              return <Chip label="Completed" color="success" icon={<IconCircleCheck />} />;
            case 'processing':
              return <Chip label="Processing" color="warning" icon={<IconClock />} />;
            case 'failed':
              return <Chip label="Failed" color="error" icon={<IconCancel />} />;
            default:
              return <Chip label="Unknown" color="default" />;
          }
        }
      }
    ],
    []
  );

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {pagination},
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: false,
  });

  return (
    <>
      {isAssistantLoading || isLiveCallLogsLoading ? (
        <PageLoader />
      ): (
        <>
          <Table table={table} onRowClick={handleRowClick} data={data}
          pagination={pagination}
          setPagination={setPagination} />
          <DetailsLog
            open={openDetails}
            onClose={() => setOpenDetails(false)}
            selectedData={selectedData}
          />
        </>
      )}
    </>
  );
}
