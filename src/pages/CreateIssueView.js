import { createUseStyles } from "react-jss";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import CreateIssueForm from "./create-issue/CreateIssueForm";
import Header from "../components/Header";

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
        <CreateIssueForm handleSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default CreateIssueView;
