import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popper from '@mui/material/Popper';

// @project
import DialogDelete from '@/components/dialog/DialogDelete';
import MainCard from '@/components/MainCard';
import { deleteAssistant } from '@/api/assistantApi';

// @assets
import { IconDotsVertical, IconTrash, IconEdit } from '@tabler/icons-react';

/***************************  DIALOG - DATA  ***************************/

const dialogDeleteData = {
  title: 'Delete Assistant',
  heading: 'Are you sure you want to delete this assistant?',
  description: 'Deleting this assistant will remove all associated data permanently.',
  successMessage: 'Assistant has been deleted successfully.'
};

/***************************  TABLE - ACTION  ***************************/

export default function ActionCell({ row, onDelete, onEdit }) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'account-action-popper' : undefined;

  const handleActionClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDialogDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteAssistant(row._id);
      onDelete(row._id);
      console.log('Assistant deleted:', row._id);
    } catch (error) {
      console.error('Error deleting assistant:', error);
    } finally {
      setIsDeleting(false);
      handleDeleteDialogClose();
    }
  };

  // fun to handle the edit
  const handleEdit = () => {
    console.log("edit>>");
    onEdit(row);
  }

  return (
    <>
      <IconButton color="secondary" size="small" onClick={handleActionClick} aria-label="action">
        <IconDotsVertical size={16} color={theme.palette.text.secondary} />
      </IconButton>
      <Popper placement="top-end" id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade in={open} {...TransitionProps}>
            <MainCard sx={{ borderRadius: 3, boxShadow: theme.customShadows.tooltip, minWidth: 150, p: 0.5 }}>
              <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <List disablePadding>
                  <ListItemButton
                    sx={{ color: 'error.main' }}
                    onClick={handleDeleteDialogOpen}
                    disabled={isDeleting}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      <IconTrash size={16} />
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'inherit' }}>Delete</ListItemText>
                  </ListItemButton>

                  {/* edit functionality */}
                <ListItemButton
                    sx={{ color: 'primary' }}
                    onClick={handleEdit}
                    disabled={isDeleting}
                  >
                    <ListItemIcon sx={{ color: 'primary' }}>
                      <IconEdit size={16} />
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'primary' }}>Edit</ListItemText>
                  </ListItemButton>
                </List>
              </ClickAwayListener>
            </MainCard>
          </Fade>
        )}
      </Popper>

      <DialogDelete
        {...dialogDeleteData}
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        onDelete={handleDialogDelete}
      />
    </>
  );
}

ActionCell.propTypes = { row: PropTypes.any, onDelete: PropTypes.func };
