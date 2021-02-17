import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Projects from "./repositories/Projects";
import Issues from "./repositories/Issues";

const REPOSITORIES = gql`
  query {
    user(login: "${process.env.REACT_APP_GITHUB_USER}") {
      id
      name
      url
      email
      repositories(first: 100) {
        nodes {
          id
          name
          description
          isFork
          issues(first: 2) {
            edges {
              node {
                id
                body
                title
              }
            }
          }
        }
      }
    }
  }
`;

const Repositories = () => {
  const { loading, error, data } = useQuery(REPOSITORIES);
  const [activeRepository, setActiveRepository] = useState(false);

  // TODO CHANGE THIS
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data.user);

  return (
    <>
      <p>{`${data.user.name} @${data.user.email}`}</p>
      <p>{data.user.email}</p>
      <p>{`${data.user.repositories.nodes.length} ${
        data.user.repositories.nodes.length === 1
          ? "respository"
          : "repositories"
      }`}</p>
      <Projects
        setActiveRepository={setActiveRepository}
        repositoriesList={data.user.repositories.nodes}
      />
      <Issues activeRepository={activeRepository} />
    </>
  );
};

export default Repositories;
