import PropTypes from 'prop-types';

// @project
import Locales from '@/components/Locales';
import RTLLayout from '@/components/RTLLayout';
import { GlobalStateProvider } from '@/contexts/GlobalStateContext';
import { ConfigProvider } from '@/contexts/ConfigContext';
import ThemeCustomization from '@/themes';

// @types

/***************************  LAYOUT - CONFIG, THEME  ***************************/

export default function ProviderWrapper({ children }) {
  return (
    <ConfigProvider>
      <ThemeCustomization>
        <RTLLayout>
        <GlobalStateProvider>
          <Locales>{children}</Locales>
          </GlobalStateProvider>
        </RTLLayout>
      </ThemeCustomization>
    </ConfigProvider>
  );
}

ProviderWrapper.propTypes = { children: PropTypes.any };

