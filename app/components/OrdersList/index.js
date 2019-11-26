import React, { useState } from 'react';
import PropTypes from 'prop-types';
import remove from 'lodash/remove';
import { withStyles } from '@material-ui/core/styles';
import DraftsIcon from '@material-ui/icons/Drafts';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AssignmentIcon from '@material-ui/icons/Assignment';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import { green, orange } from '@material-ui/core/colors';

import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

function OrdersList(props) {
  let sortedOrders = [];
  const { classes, list, loading, onSelect, enableSelectMany } = props;
  if (list) {
    sortedOrders = reverse(sortBy(list, order => parseInt(order.number)));
  }
  const [selectedOrders, setSelectedOrders] = useState([]);
  const handleSelect = order => {
    onSelect(order);
  };

  const handleCheckSelect = (orderId, checked) => {
    if (checked) {
      selectedOrders.push(orderId);
      setSelectedOrders(selectedOrders);
    } else {
      remove(selectedOrders, s => s === orderId);
      setSelectedOrders(selectedOrders);
    }
  };

  console.log('enableSelectMany', enableSelectMany);

  return (
    <div style={{ overflowY: 'auto', height: 600 }}>
      {loading && <LinearProgress />}
      <List
        className={classes.root}
        component="nav"
        aria-label="main mailbox folders"
      >
        {sortedOrders.map(row => (
          <ListItem key={row.id}>
            {row.selectable && enableSelectMany && (
              <ListItemIcon style={{ minWidth: 40 }}>
                <Checkbox
                  value={row.selected}
                  color="default"
                  onChange={event =>
                    handleCheckSelect(row.id, event.target.checked)
                  }
                />
              </ListItemIcon>
            )}
            <ListItemAvatar>
              <Avatar
                style={
                  row.status === 'Executed'
                    ? { backgroundColor: green[600] }
                    : { backgroundColor: orange[600] }
                }
              >
                {row.status === 'Created' ? (
                  <DraftsIcon />
                ) : (
                  <CheckCircleIcon />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${row.number} ${row.customer.name}`}
              secondary={`${row.items.map(i => i.waste.class).join(' ')}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="assign"
                onClick={() => handleSelect(row)}
              >
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

OrdersList.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  enableSelectMany: PropTypes.bool,
  list: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSelect: PropTypes.func,
};

export default withStyles(styles)(OrdersList);
