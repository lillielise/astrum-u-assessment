const Projects = (props) => {
  return props.repositoriesList.map(({ name, id, description, issues }) => (
    <div key={id} onClick={() => props.setActiveRepository(issues.edges)}>
      <p>{name}</p>
      <p>{description}</p>
    </div>
  ));
};

export default Projects;
