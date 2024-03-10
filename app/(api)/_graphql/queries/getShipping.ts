import { gql } from '@apollo/client';

/*
From https://developer.ups.com/api/reference?loc=en_US#tag/Shipping_other
Shipping info returns:
  - Address to ship to
  - Box dimensions (length, width, height)
  - Box weight

Takes returned items and puts them into params which will round up the shipping estimate
*/

export const getShippingEstimateQuery = gql`
  query GetShippingEstimate(
    $destination: String!
    $weight: Float!
    $length: Float!
    $width: Float!
    $height: Float!
  ) {
    getShippingEstimate(
      destination: $destination
      weight: $weight
      length: $length
      width: $width
      height: $height
    ) {
      roundedUpTwo
    }
  }
`;
