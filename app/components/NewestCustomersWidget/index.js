import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from 'components/Title';
import { withStyles } from '@material-ui/core/styles';

const rows = [];
const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

function Customers(props) {
  const classes = useStyles();
  const { customers } = props;
  console.log(customers);
  return (
    <React.Fragment>
      <Title>Novos Clientes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

Customers.propTypes = {
  customers: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  classes: PropTypes.object,
};

export default withStyles(useStyles)(Customers);
