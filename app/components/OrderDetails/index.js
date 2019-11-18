import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    // height: '100%',
  },
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
  avatar: {
    // backgroundColor: red[500],
  },
}));

function OrdersDetails(props) {
  const { onClickAddOrderManifest } = props;
  const classes = useStyles();
  const { details } = props;
  const hasManifest = !!details.manifest;

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
          >
            <CancelIcon /> Cancelar Demanda
          </Button>
        </div>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  );
}

OrdersDetails.propTypes = {
  loading: PropTypes.bool,
  onClickAddOrderManifest: PropTypes.func,
  details: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default OrdersDetails;
