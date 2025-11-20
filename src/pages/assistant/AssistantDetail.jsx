import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import CallLogs from './CallLogs';
import Prompt from './Prompt';
import { useGlobalState } from '../../contexts/GlobalStateContext';


export default function AssistantDetail() {
  const { id } = useParams();
  const { selectedTab } = useGlobalState();

  return (
    <div style={{ display: 'flex' }}>
    <div style={{ flex: 1, padding: '20px' }}>
      {selectedTab === 'dashboard' && <Dashboard id={id} />}
      {selectedTab === 'calllogs' && <CallLogs id={id} />}
      {selectedTab === 'prompt' && <Prompt id={id} />}
    </div>
  </div>
  );
}