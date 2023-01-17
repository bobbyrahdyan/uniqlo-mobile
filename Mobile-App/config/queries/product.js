import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    readAllProducts {
      id
      name
      slug
      price
      mainImg
      Category {
        name
      }
      Images {
        imgUrl
      }
    }
  }
`;

export const GET_PRODUCTS_DETAIL = gql`
  query GET_PRODUCTS_DETAIL($readDetailProductId: ID) {
    readDetailProduct(id: $readDetailProductId) {
      id
      name
      description
      price
      mainImg
      Category {
        name
      }
      Images {
        imgUrl
      }
      User {
        username
      }
    }
  }
`;
