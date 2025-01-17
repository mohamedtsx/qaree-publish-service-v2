import { graphql } from "gql.tada";

export const addBookDetailsMutation = graphql(`
mutation addBookDetails(
  $name: String!, 
  $description: String!, 
  $publishingRights: Boolean!, 
  $categories: [String]!,
  $language: String!

  ) {
  addBookDetails(
    name: $name, 
    description: $description, 
    publishingRights: $publishingRights, 
    categories: $categories, 
    language: $language
    ) {
    _id
    name
    description
    edition,
    isbn,
    author {
        _id
        name
    },
    price,
    createdAt,
    updatedAt,
    status
  }
}`);

export const publishBookMutation = graphql(`
  mutation publishBook($bookId: String!){
    publishBook(bookId: $bookId) {
      message,
      book {
          _id,
          name,
          description,
          status,
          price,
      }
    }
  }
`);
