import { Shopify } from "@shopify/shopify-api";

const query = `query GetInventoryLevels($variant_id: ID!) {
  productVariant(id: $variant_id) {
    inventoryItem {
      inventoryLevels(first: 10) {
        edges {
          node {
            location {
              name
            }
            available
          }
        }
      }
    }
  }
}`;

const getInventoryLevelsByVariantId = async (shop, accessToken, variantId) => {
  try {
    if (!shop || !accessToken) {
      throw new Error("client credentials is required");
    }
    if (!variantId) {
      throw new Error("variantId is required");
    }

    const client = new Shopify.Clients.Graphql(shop, accessToken);

    const response = await client.query({
      data: {
        query,
        variables: {
          variant_id: `gid://shopify/ProductVariant/${variantId}`,
        },
      },
    });

    const inventoryLevels =
      response.body.data.productVariant.inventoryItem.inventoryLevels.edges;
    return inventoryLevels;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.response.errors[0].message);
    } else {
      console.log(error);
    }
  }
};

export default getInventoryLevelsByVariantId;
