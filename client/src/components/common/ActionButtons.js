import React from 'react';
import commonStyles from '../../styles/CommonStyles.module.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const ActionButtons = ({ onEditClick, onDeleteClick }) => {
  return (
    <div>
      <EditIcon color="primary" className={commonStyles['icon-button']}
        onClick={onEditClick}/>
      <span style={{ margin: '0 5px' }} />
      <DeleteIcon color="secondary" className={commonStyles['icon-button']}
        onClick={onDeleteClick}/>
    </div>
  );
}

export default ActionButtons;
