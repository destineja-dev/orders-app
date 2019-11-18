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
import {
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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

const renderCustomSelect = ({
  input,
  label,
  children,
  meta: { touched, error },
  ...custom
}) => (
  <FormControl {...custom}>
    <InputLabel>{label}</InputLabel>
    <Select {...input}>{children}</Select>
  </FormControl>
);

const renderPackagingList = ({ fields, meta: { error, submitFailed }, packagings }) => (
  <div>
    <Button
      style={{ marginTop: 20, marginBottom: 20 }}
      size="small"
      variant="contained"
      color="default"
      onClick={() => fields.push({})}
    >
      <AddIcon /> acondicionamento
    </Button>
    {submitFailed && error && <span>{error}</span>}
    {fields.map((member, index) => (
      <div key={index}>
        <Field
          label="Acondicionamento"
          name={`${member}.packaging`}
          style={{ width: '65%' }}
          component={renderCustomSelect}
        >
          {packagings.map(c => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Field>
        <Field
          name={`${member}.quantity`}
          style={{ width: '30%' }}
          label="Quantidade"
          component={TextField}
        />
      </div>
    ))}
  </div>
);

const renderWasteList = ({ fields, meta: { error, submitFailed }, wastes, measurements }) => (
  <div>
    <Button
      style={{ marginTop: 20, marginBottom: 20 }}
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
        <Field
          label="Resíduo"
          name={`${member}.wasteCategory`}
          style={{ width: '70%' }}
          component={renderCustomSelect}
        >
          {wastes.map(c => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Field>
        <Field
          name={`${member}.quantity`}
          style={{ width: '20%' }}
          label="Quantidade"
          component={TextField}
        />
        <Field
          label="Unidade"
          name={`${member}.measurement`}
          style={{ width: '10%' }}
          component={renderCustomSelect}
        >
          {measurements.map(c => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
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

const renderTimeField = props => {
  const {
    meta: { submitting, error, touched },
    input: { onBlur, value, ...inputProps },
    ...others
  } = props;

  const onChange = date => {
    Date.parse(date)
      ? inputProps.onChange(date.toISOString())
      : inputProps.onChange(null);
  };

  return (
    <KeyboardTimePicker
      {...inputProps}
      {...others}
      value={value ? new Date(value) : null}
      disabled={submitting}
      onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
      error={error && touched}
      onChange={onChange}
    />
  );
};

const renderDateField = props => {
  const {
    meta: { submitting, error, touched },
    input: { onBlur, value, ...inputProps },
    ...others
  } = props;

  const onChange = date => {
    Date.parse(date)
      ? inputProps.onChange(date.toISOString())
      : inputProps.onChange(null);
  };

  return (
    <KeyboardDatePicker
      {...inputProps}
      {...others}
      format="dd/MM/yyyy"
      value={value ? new Date(value) : null}
      disabled={submitting}
      onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
      error={error && touched}
      onChange={onChange}
    />
  );
};

const ManifestForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    classes,
    destinatingCompaniesList,
    driversList,
    vehiclesList,
    wastesList,
  } = props;
  let wasteCategories = [];
  wastesList.forEach(w => {
    wasteCategories = wasteCategories.concat(w.waste.categories);
  });
  const packagingList = ['Sacola', 'Tambor', 'Bombona', 'Bag', 'Lata'];
  const measurementList = ['Kg', 'Ton', 'Lt', 'M3', 'Un'];
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Field
              style={{ width: '35%' }}
              label="Destinador"
              name="destinatorId"
              value={10}
              component={renderCustomSelect}
              className={classes.formControl}
            >
              {destinatingCompaniesList.map(c => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Field>
            <Field
              style={{ width: '30%' }}
              name="driverId"
              label="Motorista"
              value={10}
              component={renderCustomSelect}
              className={classes.formControl}
            >
              {driversList.map(c => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Field>
            <Field
              style={{ width: '30%' }}
              label="Veículo"
              name="vehicleId"
              value={10}
              component={renderCustomSelect}
              className={classes.formControl}
            >
              {vehiclesList.map(c => (
                <MenuItem key={c.id} value={c.id}>
                  {c.description}
                </MenuItem>
              ))}
            </Field>
            <Field
              style={{ width: '50%' }}
              name="date"
              label="Data"
              component={renderDateField}
            />
            <Field
              style={{ width: '20%' }}
              name="arrivalTime"
              label="Hora Chegada"
              component={renderTimeField}
            />
            <Field
              style={{ width: '20%' }}
              label="Hora Saída"
              name="departureTime"
              component={renderTimeField}
            />
            <FormControl fullWidth>
              <FieldArray
                name="items"
                component={renderWasteList}
                wastes={wasteCategories}
                measurements={measurementList}
              />
            </FormControl>
            <FormControl fullWidth>
              <FieldArray
                name="manifestPackagings"
                component={renderPackagingList}
                packagings={packagingList}
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
            <FormControl style={{ marginTop: 30 }}>
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

ManifestForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  destinatingCompaniesList: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  collectingCompaniesList: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  driversList: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  vehiclesList: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  wastesList: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default compose(
  withStyles(styles),
  reduxForm({
    form: 'manifestForm',
  }),
)(ManifestForm);
