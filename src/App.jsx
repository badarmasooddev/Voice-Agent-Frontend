import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import Protected Route
import ProtectedRoute from "./utils/ProtectedRoute";

// Import Pages
import Home from "./views/admin/assistant/index";
import PhoneNumbers from "./views/admin/phone-number/index";
import AdminLayout from "./layouts/AdminLayout";
import Setting from "./views/admin/setting/index";
import Dashboard from "./views/admin/dashboard/analytics";
import Avatar from "./views/components/data-display/avatar";
import Chip from "./views/components/data-display/chip";
import Illustration from "./views/components/data-display/illustration";
import Other from "./views/components/data-display/other";
import Tooltip from "./views/components/data-display/tooltip";
import Typography from "./views/components/data-display/typography";
import Input from './views/components/inputs/input';
import Button from './views/components/inputs/button';
import Checkbox from './views/components/inputs/checkbox';
import Radio from './views/components/inputs/radio';
import Switch from './views/components/inputs/switch';
import Slider from './views/components/inputs/slider';
import Dropdown from './views/components/inputs/drop-down';
import Card from './views/components/surface/card';
import Color from './views/components/utils/colors';
import Shadow from './views/components/utils/shadow';
import Navigation from './views/components/navigation/tabs';
import Login from "./views/auth/login";
import Register from "./views/auth/register";
import ForgotPassword from "./views/auth/forgot-password";
import ResetPassword from "./views/auth/password-recovery";
import AuthLayout from "./layouts/AuthLayout";
import Dialogs from "./views/components/feedback/dialog";
import FeedbackProgress from "./views/components/feedback/progress";
import ColorPicker from "./views/components/plugins/color-picker";
import Calendar from "./views/components/plugins/calendar";
import Chart from "./views/components/chart";
import TableComponent from "./views/components/table";
import SamplePage from "./views/admin/sample-page";
import AssistantConfigureDashboard from "./views/admin/assistant/configure/index";
import Account from './views/admin/account/index';
import Prompt from './views/admin/assistant/prompt/index';
import CallLogs from './views/admin/assistant/call-logs/index';
import KnowledgeDashboard from "./sections/knowledge-base/CreateKnowledge";
import VoiceDashboard from "./sections/voices/VoiceManager";
import AssistantDashboard from './views/admin/assistant-dashboard/analytics';
import CRMIntegration from "./views/admin/crm-integration/index";
import OnBoarding from "./views/onboarding/index";
import ShareCall from "./views/admin/assistant/ShareCall";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="/on-boarding" element={<OnBoarding />} />
        <Route path="share-call/:agent_id" element={<ShareCall />} />
        <Route path="/" element={<AdminLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="account" element={<Account />} />
            <Route path="assistant" element={<Home />} />
            <Route path="phone-number" element={<PhoneNumbers />} />
            <Route path="assistant/dashboard/:id" element={<AssistantDashboard />} />
            <Route path="assistant/prompt/:id" element={<Prompt />} />
            <Route path="assistant/call-logs/:id" element={<CallLogs />} />
            <Route path="assistant/configure/:id" element={<AssistantConfigureDashboard />} />
            <Route path="setting" element={<Setting />} />
            <Route path="setting/profile" element={<Setting />} />
            <Route path="setting/appsetting" element={<Setting />} />
            <Route path="setting/general" element={<Setting />} />
            <Route path="setting/pricing" element={<Setting />} />
            <Route path="setting/internationalization" element={<Setting />} />
            <Route path="setting/authentication" element={<Setting />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/analytics/overview" element={<Dashboard />} />
            <Route path="dashboard/analytics/user-behavior" element={<Dashboard />} />
            <Route path="dashboard/analytics/performance" element={<Dashboard />} />
            <Route path="/knowledge-base" element={<KnowledgeDashboard />} />
            <Route path="/voices" element={<VoiceDashboard />} />
            <Route path="/crm-integration" element={<CRMIntegration />} />

            <Route path="data-display/avatar" element={<Avatar />} />
            <Route path="inputs/button" element={<Button />} />
            <Route path="data-display/chip" element={<Chip />} />
            <Route path="data-display/illustration" element={<Illustration />} />
            <Route path="data-display/other" element={<Other />} />
            <Route path="data-display/tooltip" element={<Tooltip />} />
            <Route path="data-display/typography" element={<Typography />} />
            <Route path="inputs/input" element={<Input />} />
            <Route path="inputs/checkbox" element={<Checkbox />} />
            <Route path="inputs/radio" element={<Radio />} />
            <Route path="inputs/switch" element={<Switch />} />
            <Route path="inputs/slider" element={<Slider />} />
            <Route path="inputs/drop-down" element={<Dropdown />} />
            <Route path="surface/card" element={<Card />} />
            <Route path="utils/color" element={<Color />} />
            <Route path="utils/shadow" element={<Shadow />} />
            <Route path="navigation/tabs" element={<Navigation />} />
            <Route path="/feedback/dialog" element={<Dialogs />} />
            <Route path="/feedback/progress" element={<FeedbackProgress />} />
            <Route path="/plugins/color-picker" element={<ColorPicker />} />
            <Route path="/plugins/calendar" element={<Calendar />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/table" element={<TableComponent />} />
            <Route path="/sample-page" element={<SamplePage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;