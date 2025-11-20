// @third-party
import { FormattedMessage } from 'react-intl';

// @project
import { AuthRole } from '@/enum';

// @types

/***************************  MENU ITEMS - APPLICATIONS  ***************************/

const manage = {
  id: 'group-manage',
  title: <FormattedMessage id="manage" />,
  icon: 'IconBrandAsana',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: 'IconLayoutGrid'
    },
    {
      id: 'assistant',
      title: <FormattedMessage id="Assistant" />,
      type: 'item',
      url: '/assistant',
      icon: 'IconUserCog',
      roles: [AuthRole.SUPER_ADMIN]
    },
    {
      id: 'knowledge-base',
      title: <FormattedMessage id="Knowledge Base" />,
      type: 'item',
      url: '/knowledge-base',
      icon: 'IconBooks',
      roles: [AuthRole.SUPER_ADMIN]
    },
    {
      id: 'crm-integration',
      title: <FormattedMessage id="CRM Integration" />,
      type: 'item',
      url: '/crm-integration',
      icon: 'IconAddressBook',
      roles: [AuthRole.SUPER_ADMIN]
    },
    {
      id: 'phone-number',
      title: <FormattedMessage id="Phone Number" />,
      type: 'item',
      url: '/phone-number',
      icon: 'IconPhone',
      roles: [AuthRole.SUPER_ADMIN]
    },
    {
      id: 'voices',
      title: <FormattedMessage id="Voices" />,
      type: 'item',
      url: '/voices',
      icon: 'IconMicrophone',
      roles: [AuthRole.SUPER_ADMIN]
    },
    // {
    //   id: 'knowledge-base',
    //   title: <FormattedMessage id="Knowledge Base" />,
    //   type: 'item',
    //   url: '/knowledge-base',
    //   icon: 'IconUserCog',
    //   roles: [AuthRole.SUPER_ADMIN]
    // },
    // // {
    //   id: 'account',
    //   title: <FormattedMessage id="Account" />,
    //   type: 'item',
    //   url: '/account',
    //   icon: 'IconUserCog',
    //   roles: [AuthRole.SUPER_ADMIN]
    // },
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
    {
      id: 'setting',
      title: <FormattedMessage id="setting" />,
      type: 'item',
      url: '/setting',
      icon: 'IconSettings',
      roles: [AuthRole.SUPER_ADMIN]
    }
  ]
};

export default manage;
