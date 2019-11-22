import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

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
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
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

const renderPackagingList = ({
  fields,
  meta: { error, submitFailed },
  packagings,
}) => (
  <div>
    <Button
      style={{ marginTop: 20, marginBottom: 20 }}
      size="small"
      variant="contained"
      color="primary"
      onClick={() => fields.push({})}
    >
      <AddIcon />
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
          component={renderTextField}
        />
      </div>
    ))}
  </div>
);

const renderWasteList = ({
  fields,
  meta: { error, submitFailed },
  wastes,
  measurements,
}) => (
  <div>
    <Button
      style={{ marginTop: 20, marginBottom: 20 }}
      size="small"
      variant="contained"
      color="primary"
      onClick={() => fields.push({})}
    >
      <AddIcon />
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
          component={renderTextField}
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

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <FormControl {...custom}>
    <TextField label={label} {...input} />
  </FormControl>
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

function getSteps() {
  return [
    'Adicione informações do Coletor',
    'Informe o Expeditor',
    'Informe Data e Hora da chegada e saída',
    'Adicione os resíduos coletados',
    'Adicione os acondicionamentos utilizados',
    'Informe as observações',
  ];
}

function getStepContent(
  step,
  classes,
  collectingCompaniesList,
  driversList,
  vehiclesList,
  wasteCategories,
  measurementList,
  packagingList,
) {
  switch (step) {
    case 0:
      return (
        <div>
          <Field
            style={{ width: '35%' }}
            label="Coletor"
            name="transporterId"
            value={10}
            component={renderCustomSelect}
            className={classes.formControl}
          >
            {collectingCompaniesList.map(c => (
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
        </div>
      );
    case 1:
      return (
        <div>
          <Field
            style={{ width: '40%' }}
            label="Nome"
            name="dispatcher.name"
            value={10}
            component={renderTextField}
            className={classes.formControl}
          />
          <Field
            style={{ width: '7%' }}
            name="dispatcher.documentType"            
            value={10}
            component={renderCustomSelect}
            className={classes.formControl}
          >
            {['RG', 'CPF', 'CNH'].map(c => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Field>
          <Field
            style={{ width: '40%' }}
            label="Documento"
            name="dispatcher.document"
            value={10}
            component={renderTextField}
            className={classes.formControl}
          />
        </div>
      );
    case 2:
      return (
        <div>
          <Field
            style={{ width: '50%' }}
            name="at"
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
        </div>
      );
    case 3:
      return (
        <div>
          <FormControl fullWidth>
            <FieldArray
              name="items"
              component={renderWasteList}
              wastes={wasteCategories}
              measurements={measurementList}
            />
          </FormControl>
        </div>
      );
    case 4:
      return (
        <FormControl fullWidth>
          <FieldArray
            name="manifestPackagings"
            component={renderPackagingList}
            packagings={packagingList}
          />
        </FormControl>
      );
    case 5:
      return (
        <Field
          name="notes"
          multiline
          rows="4"
          margin="normal"
          variant="outlined"
          component={renderNotes}
        />
      );
    default:
      return 'Unknown step';
  }
}

const ManifestForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    classes,
    collectingCompaniesList,
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
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.root}>
        <form onSubmit={handleSubmit}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <div>
                    {getStepContent(
                      index,
                      classes,
                      collectingCompaniesList,
                      driversList,
                      vehiclesList,
                      wasteCategories,
                      measurementList,
                      packagingList,
                    )}
                  </div>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        size="small"
                        className={classes.button}
                      >
                        retornar
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1
                          ? 'finalizar'
                          : 'continuar'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <div>
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
              <FormControl style={{ marginTop: 60 }}>
                <Button onClick={handleReset}>Reiniciar</Button>
              </FormControl>
            </div>
          )}
        </form>
      </div>
    </Paper>
  );
};

ManifestForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  destinatingCompaniesList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  collectingCompaniesList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
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
