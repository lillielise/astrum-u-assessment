const Issues = (props) => {
  return (
    <>
      {props.activeRepository &&
        props.activeRepository.map(({ node }) => (
          <div key={node.id}>
            <p>{node.title}</p>
            <p>{node.body}</p>
          </div>
        ))}
    </>
  );
};
export default Issues;
