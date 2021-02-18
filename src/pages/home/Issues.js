import { createUseStyles, useTheme } from "react-jss";
import { useHistory } from "react-router-dom";
import Card from "../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
  issuesContainer: {
    flex: 1,
    display: "flex",
    padding: "1em",
    flexDirection: "column-reverse",
    overflowY: "scroll",
  },
  button: {
    backgroundColor: ({ theme }) => theme.colorPrimary,
    borderRadius: "10px",
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
    padding: "10px 60px",
    margin: "1em",
  },
});

const Issues = (props) => {
  const history = useHistory();
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });

  const renderIssueCards = () => {
    return props.activeRepository.issues.edges.map((repository) => (
      <Card
        width="350px"
        key={repository.node.id}
        handleClick={() => window.open(repository.node.url)}
        data={repository.node}
      >
        <FontAwesomeIcon size="3x" icon={faExclamationCircle} />
      </Card>
    ));
  };

  return (
    <>
      {props.activeRepository && (
        <div className={classes.issuesContainer}>
          <button
            onClick={() =>
              history.push({
                pathname: `/create-issue`,
                state: { activeRepository: props.activeRepository },
              })
            }
            className={classes.button}
          >
            Create Issue
          </button>
          {renderIssueCards()}
        </div>
      )}
    </>
  );
};
export default Issues;
