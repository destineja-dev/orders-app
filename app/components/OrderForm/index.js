import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

const useStyles = theme => ({
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
    <Select {...input} {...custom}>
      {children}
    </Select>
  </FormControl>
);

const renderWasteList = ({ fields, meta: { error, submitFailed }, wastes }) => (
  <div>
    <Button
      style={{ marginTop: 20, marginBottom: 10 }}
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

function getSteps() {
  return ['Selecione o cliente', 'Adicione os resíduos', 'Informe observações'];
}

function getStepContent(step, classes, customersList, wastesList) {
  switch (step) {
    case 0:
      return (
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
      );
    case 1:
      return (
        <FormControl fullWidth>
          <FieldArray
            name="items"
            component={renderWasteList}
            wastes={wastesList}
          />
        </FormControl>
      );
    case 2:
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

const OrderForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    classes,
    customersList,
    wastesList,
  } = props;

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
                    {getStepContent(index, classes, customersList, wastesList)}
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

OrderForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  customersList: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  wastesList: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default compose(
  withStyles(useStyles),
  reduxForm({
    form: 'orderForm',
  }),
)(OrderForm);
