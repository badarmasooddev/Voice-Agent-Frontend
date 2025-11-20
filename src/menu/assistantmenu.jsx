// @third-party
import { FormattedMessage } from 'react-intl';

// @project
import { AuthRole } from '@/enum';

// @types

/***************************  MENU ITEMS - APPLICATIONS  ***************************/

const assistantmenu = {
  id: 'group-manage',
  title: <FormattedMessage id="manage" />,
  icon: 'IconBrandAsana',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/assistant/dashboard/:id',
      icon: 'IconLayoutGrid'
    },
    {
      id: 'Prompt',
      title: <FormattedMessage id="Prompt" />,
      type: 'item',
      url: '/assistant/prompt/:id',
      icon: 'IconFileText',
      roles: [AuthRole.SUPER_ADMIN]
    },
    {
      id: 'Configure',
      title: <FormattedMessage id="Configure" />,
      type: 'item',
      url: '/assistant/configure/:id',
      icon: 'IconSettings',
      roles: [AuthRole.SUPER_ADMIN]
    },
    {
      id: 'Calllogs',
      title: <FormattedMessage id="CallLogs" />,
      type: 'item',
      url: '/assistant/call-logs/:id',
      icon: 'IconMessage',
      roles: [AuthRole.SUPER_ADMIN]
    },
    // {
    //   id: 'user',
    //   title: <FormattedMessage id="user" />,
    //   type: 'item',
    //   url: '/user',
    //   icon: 'IconUsers'
    // },
    // {
    //   id: 'role-permission',
    //   title: <FormattedMessage id="roles-permissions" />,
    //   type: 'item',
    //   url: '/role-permission',
    //   icon: 'IconChartHistogram',
    //   roles: [AuthRole.SUPER_ADMIN]
    // },
    // {
    //   id: 'billing',
    //   title: <FormattedMessage id="billing" />,
    //   type: 'item',
    //   url: '/billing',
    //   icon: 'IconFileInvoice'
    // },
    // {
    //   id: 'blog',
    //   title: <FormattedMessage id="blog" />,
    //   type: 'item',
    //   url: '/blog',
    //   icon: 'IconBrandBlogger'
    // },
  ]
};

export default assistantmenu;
