import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Repositories from "./home/Repositories";
import Issues from "./home/Issues";
import UserOverview from "./home/UserOverview";
import { createUseStyles } from "react-jss";
import Header from "../components/Header";
import { useHistory } from "react-router-dom";

const useStyles = createUseStyles({
  container: {
    backgroundColor: "#ECECEC",
  },
  row: {
    paddingTop: "1em",
    paddingLeft: "1em",
    height: "calc(100vh - 75px - 75px)",
    display: "flex",
    boxSizing: "border-box",
  },
  col1: {
    display: "flex",
    flexDirection: "column",
  },
  col2: {
    display: "flex",
    flexDirection: "column",
  },
});

const GET_REPOSITORIES = gql`
query repoQuery($after: String, $first: Int){
  user(login: "${process.env.REACT_APP_GITHUB_USER}") {
    id
    name
    url
    email
    repositories(first: $first after: $after) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        name
        description
        issues(last: 5) {
          edges {
            node {
              id
              body
              title
              url
            }
          }
        }
      }
    }
  }
}
`;

const HomeView = (props) => {
  const history = useHistory();
  const [activeRepository, setActiveRepository] = useState(false);
  const { loading, error, data, refetch, fetchMore } = useQuery(
    GET_REPOSITORIES,
    {
      variables: { after: null, first: 5 },
    }
  );
  const classes = useStyles();

  useEffect(() => {
    if (!!props.location?.state?.refetchReposotories) {
      const currentLength = data.user.repositories.nodes.length;
      history.replace("/", null);
      refetch({ after: null, first: currentLength }).then((res) => {
        // eslint-disable-next-line
        res.data.user.repositories.nodes.map((repository) => {
          if (props.location?.state?.activeRepository.id === repository.id) {
            setActiveRepository(repository);
          }
        });
      });
    }
    // eslint-disable-next-line
  }, [props.location?.state?.refetchReposotories]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <Header title="Repositories" />
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes.col1}>
            <UserOverview user={data.user} />
            <Repositories
              fetchMore={fetchMore}
              endCursor={data.user.repositories.pageInfo.endCursor}
              hasNextPage={data.user.repositories.pageInfo.hasNextPage}
              setActiveRepository={setActiveRepository}
              repositoriesList={data.user.repositories.nodes}
            />
          </div>
          <div className={classes.col2}>
            <Issues activeRepository={activeRepository} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeView;
