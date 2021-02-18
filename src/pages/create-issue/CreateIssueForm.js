import { createUseStyles } from "react-jss";
import { Formik, Field, Form } from "formik";

const useStyles = createUseStyles({
  formContainer: {
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px #333333",
    width: "400px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "75%",
    padding: "1em",
    margin: "1em",
  },
  textInput: {
    width: "75%",
    height: "100px",
    padding: "1em",
    margin: "1em",
  },
  button: {
    backgroundColor: "#4267B2",
    borderRadius: "10px",
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
    padding: "10px 60px",
    margin: "1em",
  },
});

const CreateIssueForm = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.formContainer}>
      <h3>Submit Issue</h3>
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={(values) => props.handleSubmit(values)}
        render={(formikProps) => (
          <Form className={classes.form}>
            <Field
              className={classes.input}
              placeholder="Title"
              name="title"
              type="text"
            />
            <Field
              className={(classes.input, classes.textInput)}
              as="textarea"
              placeholder="Description"
              name="body"
              type="text"
            />
            <button
              disabled={
                formikProps.values.body.length < 3 ||
                formikProps.values.title.length < 3
              }
              className={classes.button}
              type="submit"
            >
              Submit
            </button>
          </Form>
        )}
      />
    </div>
  );
};

export default CreateIssueForm;
