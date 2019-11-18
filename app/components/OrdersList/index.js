import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DraftsIcon from '@material-ui/icons/Drafts';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AssignmentIcon from '@material-ui/icons/Assignment';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
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
  const { classes, list, loading, onSelect } = props;
  if (list) {
    sortedOrders = reverse(sortBy(list, order => parseInt(order.number)));
  }

  const handleSelect = order => {
    onSelect(order);
  };

  return (
    <div style={{ overflowY: 'auto', height: 600 }}>
      {loading && <LinearProgress />}
      <List
        className={classes.root}
        component="nav"
        aria-label="main mailbox folders"
      >
        {sortedOrders.map(row => (
          <ListItem key={row.id} button onClick={() => handleSelect(row)}>
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
            {row.status === 'Created' && (
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="assign"
                  onClick={() => console.log('complete', row)}
                >
                  <AssignmentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

OrdersList.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  list: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSelect: PropTypes.func,
};

export default withStyles(styles)(OrdersList);
