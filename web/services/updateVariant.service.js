import { Shopify } from "@shopify/shopify-api";

const query = `mutation SetProductVariantMetafield($input: ProductVariantInput!) {
  productVariantUpdate(input: $input) {
    productVariant {
      id,
      metafields(first: 10) {
        edges {
          node {
            namespace
            key
            value
          }
        }
      }
    }
  }
}`;

const updateVariant = async (shop, accessToken, input) => {
  try {
    if (!shop || !accessToken) {
      throw new Error("client credentials is required");
    }
    if (!input) {
      throw new Error("update input is required");
    }

    const client = new Shopify.Clients.Graphql(shop, accessToken);

    const response = await client.query({
      data: {
        query,
        variables: {
          input,
        },
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.response.errors[0].message);
    } else {
      console.log(error);
    }
  }
};

export default updateVariant;
