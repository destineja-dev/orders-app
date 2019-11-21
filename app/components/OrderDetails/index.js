import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import api from 'utils/api';

import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { green } from '@material-ui/core/colors';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import DescriptionIcon from '@material-ui/icons/Description';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  card: {},
  button: {
    margin: 3,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {},
}));

const steps = ['Demanda criada', 'Coleta em execução', 'Demanda executada'];

function ExecutedOrder(props) {
  const {
    classes,
    details,
    details: { manifest },
    onClickAddOrderManifest,
  } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            style={{
              fontSize: '87%',
              fontWeight: 'bold',
              backgroundColor: green[600],
            }}
          >
            {details.number}
          </Avatar>
        }
        action={
          <div>
            <IconButton
              component="a"
              href={`${api.base}/manifests/${manifest.id}/reports`}
              aria-label="Baixar MTR"
            >
              <DescriptionIcon />
            </IconButton>
          </div>
        }
        title={`${details.customer.name}`}
        subheader={moment(details.createdAt).format('LL')}
      />
      <CardContent>
        <div>
          <Stepper activeStep={2} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <FormControl fullWidth>
            <TextField
              label="Destinador"
              margin="normal"
              value={manifest.transporter.companyName}
              disabled
            />
          </FormControl>
          <FormControl style={{ width: '55%' }}>
            <TextField
              label="Motorista"
              margin="normal"
              value={manifest.driver.name}
              disabled
            />
          </FormControl>
          <FormControl style={{ width: '45%' }}>
            <TextField
              label="Veículo"
              margin="normal"
              value={`${manifest.vehicle.description} (${
                manifest.vehicle.licencePlateNumber
              })`}
              disabled
            />
          </FormControl>
          {manifest.items.map(row => (
            <div>
              <FormControl style={{ width: '70%' }}>
                <TextField value={row.waste} disabled />
              </FormControl>
              <FormControl style={{ width: '30%' }}>
                <TextField
                  value={`${row.quantity}${row.measurement}`}
                  disabled
                />
              </FormControl>
            </div>
          ))}
          <FormControl style={{ marginTop: 25, width: '50%' }}>
            <Table className={classes.table} size="small">
              <TableBody>
                {manifest.manifestPackagings.map(row => (
                  <TableRow key={row.waste}>
                    <TableCell component="th" scope="row">
                      {row.waste}
                    </TableCell>
                    <TableCell align="right">{`(${row.quantity}) ${
                      row.packaging
                    }`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </FormControl>
          <FormControl fullWidth style={{ marginTop: 35 }}>
            <TextField
              name="notes"
              label="Observações"
              value={details.notes}
              multiline
              rows="2"
              margin="normal"
              variant="outlined"
              disabled
            />
          </FormControl>
        </div>
      </CardContent>
    </Card>
  );
}

function NotExecutedOrder(props) {
  const { classes, details, onClickAddOrderManifest } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            style={{ fontSize: '87%', fontWeight: 'bold' }}
          >
            {details.number}
          </Avatar>
        }
        action={
          <div>
            {/* <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton> */}
          </div>
        }
        title={`${details.customer.name}`}
        subheader={moment(details.createdAt).format('LL')}
      />
      <CardContent>
        <div>
          <Stepper activeStep={0} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <FormControl>
            {details.items.map(i => (
              <Chip style={{ marginBottom: 4 }} label={i.waste.class} />
            ))}
          </FormControl>
          <FormControl fullWidth>
            <TextField
              name="notes"
              label="Observações"
              value={details.notes}
              multiline
              rows="4"
              margin="normal"
              variant="outlined"
            />
          </FormControl>
          <Button
            size="small"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => onClickAddOrderManifest(details)}
          >
            <AddIcon /> Coleta
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            className={classes.button}
            disabled
          >
            <CancelIcon /> Cancelar Demanda
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function OrdersDetails(props) {
  const { onClickAddOrderManifest } = props;
  const classes = useStyles();
  const { details } = props;
  const hasManifest = !!details.manifest;

  if (!hasManifest) {
    return (
      <NotExecutedOrder
        classes={classes}
        details={details}
        onClickAddOrderManifest={onClickAddOrderManifest}
      />
    );
  }
  return <ExecutedOrder classes={classes} details={details} />;
}

OrdersDetails.propTypes = {
  loading: PropTypes.bool,
  onClickAddOrderManifest: PropTypes.func,
  details: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default OrdersDetails;
