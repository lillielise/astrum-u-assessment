import { gql, useMutation } from "@apollo/client";
import { Formik, Field, Form } from "formik";

const CREATE_ISSUE = gql`
  mutation testMutation($input: CreateIssueInput!) {
    createIssue(input: $input) {
      clientMutationId
    }
  }
`;

const CreateIssueView = () => {
  const [createIssue, { data }] = useMutation(CREATE_ISSUE);

  const handleSubmit = (values) => {
    createIssue({
      variables: {
        input: {
          repositoryId: "MDEwOlJlcG9zaXRvcnkxODQzMTcxNjI=",
          title: values.title,
          body: values.body,
        },
      },
    });
  };

  return (
    <Formik
      initialValues={{ title: "", body: "" }}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <Field placeholder="title" name="title" type="text" />
        <Field placeholder="body" name="body" type="text" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default CreateIssueView;
