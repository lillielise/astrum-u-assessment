import { createUseStyles } from "react-jss";
import { gql, useMutation } from "@apollo/client";
import { Formik, Field, Form } from "formik";
import Header from "../components/Header";
import { useHistory } from "react-router-dom";

const CREATE_ISSUE = gql`
  mutation testMutation($input: CreateIssueInput!) {
    createIssue(input: $input) {
      clientMutationId
    }
  }
`;

const useStyles = createUseStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECECEC",
    height: "calc(100vh - 75px - 75px)",
  },
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

const CreateIssueView = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [createIssue] = useMutation(CREATE_ISSUE);

  const handleSubmit = (values) => {
    createIssue({
      variables: {
        input: {
          repositoryId: props.location.state.activeRepository.id,
          title: values.title,
          body: values.body,
        },
      },
    }).then(() =>
      history.push({
        pathname: `/`,
        state: {
          refetchReposotories: true,
          activeRepository: props.location.state.activeRepository,
        },
      })
    );
  };

  return (
    <>
      <Header title="Create Issue" />
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <h3>Submit Issue</h3>
          <Formik
            initialValues={{ title: "", body: "" }}
            onSubmit={(values) => handleSubmit(values)}
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
                    formikProps.values.body.length < 5 ||
                    formikProps.values.title.length < 5
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
      </div>
    </>
  );
};

export default CreateIssueView;
