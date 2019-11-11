import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
});

const statusMap = {
  Created: 'aberta',
  Executed: 'executada',
};

const statusColorMap = {
  Created: 'secondary',
  Executed: 'default',
};

const statusIconMap = {
  Created: () => <AlarmOnIcon />,
  Executed: () => <DoneIcon />,
};

const renderStatus = status => (
  <Chip
    size="small"
    icon={statusIconMap[status]()}
    color={statusColorMap[status]}
    label={statusMap[status]}
  />
);

function OrdersList(props) {
  const { classes, list } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderActionsMenu = order => (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {order.status === 'Executed' && (
          <MenuItem onClick={handleClose}>Ver MTR</MenuItem>
        )}
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );

  return (
    <React.Fragment>
      <Table size="small">
        <TableBody>
          {list.map(row => (
            <TableRow key={row.id}>
              <TableCell>
                <Chip label={row.number} /> {row.customer.name}
              </TableCell>
              <TableCell>{renderStatus(row.status)}</TableCell>
              <TableCell>{renderActionsMenu(row)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore} />
    </React.Fragment>
  );
}

OrdersList.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default withStyles(styles)(OrdersList);
