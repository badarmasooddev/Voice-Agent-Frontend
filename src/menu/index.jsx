// @project
import { useGlobalState } from '../contexts/GlobalStateContext';
import manage from './manage';
import other from './other';
import assistantmenu from './assistantmenu';

// @types

/***************************  MENU ITEMS  ***************************/

const menuItems = {
  items: useGlobalState ? [manage] : null
};

export default menuItems;
