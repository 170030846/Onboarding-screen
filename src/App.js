import React from "react";
import "./App.css";
import { makeStyles } from "@mui/styles";
import { styled, useTheme } from "@mui/material/styles";
import Logo from "./assets/images/logo.png";
import {
  Box,
  Button,
  FormControl,
  Icon,
  InputAdornment,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Lottie from "react-lottie";
import animationData from "./lotties/tick";
import useMediaQuery from "@mui/material/useMediaQuery";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
  },
  iconContainer: {
    zIndex: 1,
    color: "#40434a",
    width: 40,
    height: 40,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    border: `1px solid #727272`,
    backgroundColor: "#fafafa",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#40434a",
    marginBottom: "0.5rem",
  },
  startAdornment: {
    backgroundColor: "#e7e7e7",
    height: 48,
    fontSize: 14,
    padding: "0px 10px",
    borderRight: "1px solid #9ba0ab",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    marginLeft: -13,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  card: {
    width: 120,
    padding: "20px",
    margin: "0px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
});

const StyledDiv = styled((props) => <div {...props} />)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  // position: 'absolute',
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const StyledTextField = styled((props) => <TextField {...props} />)(
  ({ theme }) => ({
    "& label.Mui-focused": {
      color: "#5a4ad1",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#5a4ad1",
    },
    "& .MuiOutlinedInput-root": {
      height: "48px",
      borderRadius: 6,
      width: "360px",
      fontWeight: 500,
      "&.Mui-focused fieldset": {
        borderColor: "#5a4ad1",
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& .MuiOutlinedInput-root": {
        width: "300px",
      },
    },
  })
);

const ContainedButton = styled((props) => <Button {...props} />)(
  ({ theme }) => ({
    marginTop: "30px",
    padding: "6px 30px",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    outline: "none",
    border: "2px solid #5a4ad1",
    borderRadius: 6,
    backgroundColor: "#5a4ad1",
    textTransform: "capitalize",
    color: "#f2f2f2",
    transition: "all 0.3s ease-in-out",
    width: "360px",
    height: "48px",
    fontWeight: 500,
    "&:hover": {
      color: "#5a4ad1da",
      backgroundColor: "transparent",
      border: "2px solid #5a4ad1",
    },
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
  })
);

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 20,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#5a4ad1",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#5a4ad1",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 1.5,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  zIndex: 1,
  color: "#40434a",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  fontWeight: "bold",
  alignItems: "center",
  border: `1px solid ${
    theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0"
  }`,
  ...(ownerState.active && {
    backgroundColor: "#5a4ad1",
    color: "#fff",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#5a4ad1",
    color: "#fff",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;
  const values = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
  };
  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {values[props.icon]}
    </ColorlibStepIconRoot>
  );
}

const steps = ["1", "2", "3", "4"];

const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [plan, setPlan] = React.useState("myself");

  // const isStepOptional = (step) => {
  //   return step === 1;
  // };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={classes.container}>
      <StyledDiv>
        <Stack
          direction="row"
          alignItems="center"
          style={{ padding: "40px 0px" }}
        >
          <img src={Logo} alt="logo" height={32} width={32} />
          <Typography
            variant="h4"
            style={{ fontSize: 28, fontWeight: 600, paddingLeft: 8 }}
          >
            Eden
          </Typography>
        </Stack>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
          style={{ padding: "30px 0px", width: matches ? "300px" : "500px" }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
            </Step>
          ))}
        </Stepper>
        <Stack sx={{ width: "100%", padding: "20px" }}>
          {activeStep === steps.length - 1 ? (
            <React.Fragment>
              <Stack direction={"column"} alignItems={"center"}>
                {/* <Icon baseClassName="material-icons-round" style={{color: '#5a4ad1', padding: 30, fontSize: 30,}}>check_circle</Icon> */}
                <Lottie options={defaultOptions} height={160} width={160} />
                <Typography
                  variant="h4"
                  style={{
                    fontSize: 26,
                    fontWeight: 600,
                    padding: "0px 16px",
                    textAlign: "center",
                    marginTop: 30,
                  }}
                >
                  Congratulations, Eren!
                </Typography>
                <p
                  style={{
                    color: "#838d82",
                    fontWeight: 500,
                    marginBottom: 30,
                    padding: "0px 16px",
                    textAlign: "center",
                  }}
                >
                  You have completed onboarding, you can start using the Eden!
                </p>
                <ContainedButton onClick={handleReset}>
                  Launch Eden
                </ContainedButton>
              </Stack>
              {/* <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box> */}
            </React.Fragment>
          ) : // Step 1 goes here...
          activeStep === 0 ? (
            <React.Fragment>
              <Stack direction={"column"} alignItems={"center"}>
                <Typography
                  variant="h4"
                  style={{
                    fontSize: 26,
                    fontWeight: 600,
                    padding: "0px 16px",
                    textAlign: "center",
                  }}
                >
                  Welcome! First things first...
                </Typography>
                <p
                  style={{
                    color: "#838d82",
                    fontWeight: 500,
                    marginBottom: 30,
                    padding: "0px 16px",
                    textAlign: "center",
                  }}
                >
                  You can always change them later.
                </p>
                <FormControl>
                  <p className={classes.label}>Full Name</p>
                  <StyledTextField
                    variant="outlined"
                    placeholder="Steve Jobs"
                  />
                </FormControl>
                <FormControl>
                  <p className={classes.label}>Display Name</p>
                  <StyledTextField variant="outlined" placeholder="Steve" />
                </FormControl>
                <ContainedButton onClick={handleNext}>
                  Create Workspace
                </ContainedButton>
              </Stack>
              {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box> */}
            </React.Fragment>
          ) : // Step 2 goes here...
          activeStep === 1 ? (
            <React.Fragment>
              <Stack direction={"column"} alignItems={"center"}>
                <Typography
                  variant="h4"
                  style={{
                    fontSize: 26,
                    fontWeight: 600,
                    padding: "0px 16px",
                    textAlign: "center",
                  }}
                >
                  Let's set up a home for all your work
                </Typography>
                <p
                  style={{
                    color: "#838d82",
                    fontWeight: 500,
                    marginBottom: 30,
                    padding: "0px 16px",
                    textAlign: "center",
                  }}
                >
                  You can always create another workspace later.
                </p>
                <FormControl>
                  <p className={classes.label}>Workspace Name</p>
                  <StyledTextField variant="outlined" placeholder="Eden" />
                </FormControl>
                <FormControl>
                  <p className={classes.label}>Workspace URL</p>
                  <StyledTextField
                    variant="outlined"
                    placeholder="Steve"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <div className={classes.startAdornment}>
                            www.eden.com/
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <ContainedButton onClick={handleNext}>
                  Create Workspace
                </ContainedButton>
              </Stack>
            </React.Fragment>
          ) : // Step 3 goes here...
          activeStep === 2 ? (
            <React.Fragment>
              <Stack direction={"column"} alignItems={"center"}>
                <Typography
                  variant="h4"
                  style={{
                    fontSize: 26,
                    fontWeight: 600,
                    padding: "0px 16px",
                    textAlign: "center",
                  }}
                >
                  How are you planning to use Eden?
                </Typography>
                <p
                  style={{
                    color: "#838d82",
                    fontWeight: 500,
                    marginBottom: 30,
                    padding: "0px 16px",
                    textAlign: "center",
                  }}
                >
                  We'll streamline your setup experience accordingly.
                </p>
                <Stack direction={"row"} justifyContent="space-between">
                  <div
                    className={classes.card}
                    style={{
                      border:
                        plan === "myself"
                          ? "1px solid #5a4ad1"
                          : "1px solid #e2e2e2",
                    }}
                    onClick={() => setPlan("myself")}
                  >
                    <Icon
                      baseClassName="material-icons-round"
                      style={{
                        color: plan === "myself" ? "#5a4ad1" : "#464646",
                      }}
                    >
                      person
                    </Icon>
                    <Typography
                      variant="body1"
                      style={{ fontWeight: 600, padding: "10px 0px" }}
                    >
                      For myself
                    </Typography>
                    <Typography variant="body2" style={{ color: "#838d82" }}>
                      Write better. Think more clearly. Stay organized.
                    </Typography>
                  </div>
                  <div
                    className={classes.card}
                    style={{
                      border:
                        plan === "team"
                          ? "1px solid #5a4ad1"
                          : "1px solid #e2e2e2",
                    }}
                    onClick={() => setPlan("team")}
                  >
                    <Icon
                      baseClassName="material-icons-round"
                      style={{ color: plan === "team" ? "#5a4ad1" : "#464646" }}
                    >
                      groups
                    </Icon>
                    <Typography
                      variant="body1"
                      style={{ fontWeight: 600, padding: "10px 0px" }}
                    >
                      With my team
                    </Typography>
                    <Typography variant="body2" style={{ color: "#838d82" }}>
                      Wikis, docs, tasks & projects, all in one place.
                    </Typography>
                  </div>
                </Stack>
                <ContainedButton onClick={handleNext}>
                  Create Workspace
                </ContainedButton>
              </Stack>
            </React.Fragment>
          ) : (
            <></>
          )}
        </Stack>
      </StyledDiv>
    </div>
  );
};

export default App;
