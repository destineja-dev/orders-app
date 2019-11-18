import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(12),
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

const renderWasteSelect = ({
  input,
  label,
  children,
  meta: { touched, error },
  ...custom
}) => (
  <FormControl fullWidth>
    <Select {...input} {...custom}>
      {children}
    </Select>
  </FormControl>
);

const renderCustomerSelect = ({
  input,
  label,
  children,
  meta: { touched, error },
  ...custom
}) => (
  <FormControl fullWidth>
    <InputLabel>Selecione o Cliente</InputLabel>
    <Select {...input} {...custom}>
      {children}
    </Select>
  </FormControl>
);

const renderWasteList = ({ fields, meta: { error, submitFailed }, wastes }) => (
  <div>
    <Button
      style={{ marginTop: 20, marginBottom: 40 }}
      size="small"
      variant="contained"
      color="default"
      onClick={() => fields.push({})}
    >
      <AddIcon /> resíduo
    </Button>
    {submitFailed && error && <span>{error}</span>}
    {fields.map((member, index) => (
      <div key={index}>
        <Field name={`${member}`} component={renderWasteSelect}>
          {wastes.map(c => (
            <MenuItem key={c.id} value={c.id}>{`${c.class} (${c.categories.join(
              ' ',
            )})`}</MenuItem>
          ))}
        </Field>
      </div>
    ))}
  </div>
);

const renderNotes = ({ input, label, meta: { touched, error }, ...custom }) => (
  <FormControl fullWidth>
    <TextField label="Observações" {...input} {...custom} />
  </FormControl>
);

const OrderForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    classes,
    customersList,
    wastesList,
  } = props;
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Field
              name="customerId"
              value={10}
              component={renderCustomerSelect}
              className={classes.formControl}
            >
              {customersList.map(c => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Field>
            <FormControl fullWidth>
              <FieldArray
                name="items"
                component={renderWasteList}
                wastes={wastesList}
              />
            </FormControl>
            <Field
              name="notes"
              multiline
              rows="4"
              margin="normal"
              variant="outlined"
              component={renderNotes}
            />
            <FormControl style={{ marginTop: 60 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={pristine || submitting}
              >
                Salvar
              </Button>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

OrderForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  customersList: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  wastesList: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default compose(
  withStyles(styles),
  reduxForm({
    form: 'orderForm',
  }),
)(OrderForm);
