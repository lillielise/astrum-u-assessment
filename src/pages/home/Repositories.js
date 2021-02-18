import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card";

const useStyles = createUseStyles({
  repositoryContainer: {
    flex: 1,
    padding: "1em",
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
  },
  button: {
    backgroundColor: "#4267B2",
    borderRadius: "10px",
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
    padding: "10px 60px",
  },
});

const Repositories = (props) => {
  const classes = useStyles();
  const renderRepositoryCards = () => {
    return props.repositoriesList.map((repository) => (
      <Card
        width="300px"
        key={repository.id}
        handleClick={() => props.setActiveRepository(repository)}
        data={{ title: repository.name, body: repository.description }}
      >
        <FontAwesomeIcon size="3x" icon={faFolder} />
      </Card>
    ));
  };

  return (
    <div className={classes.repositoryContainer}>
      {renderRepositoryCards()}
      {props.hasNextPage && (
        <button
          className={classes.button}
          onClick={() => {
            props.fetchMore({
              variables: {
                after: props.endCursor,
              },
              updateQuery: (prevResult, { fetchMoreResult }) => {
                fetchMoreResult.user.repositories.nodes = [
                  ...prevResult.user.repositories.nodes,
                  ...fetchMoreResult.user.repositories.nodes,
                ];
                return fetchMoreResult;
              },
            });
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Repositories;
