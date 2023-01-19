import { Shopify } from "@shopify/shopify-api";

const query = `query GetInventoryItem($inventory_item_id: ID!) {
  inventoryItem(id: $inventory_item_id) {
    variant {
      id
      metafield(key: "inventory", namespace: "ProductInventory") {
        id
        value
      }
    }
  }
}`;

const getVariantByInventoryItemId = async (
  shop,
  accessToken,
  inventoryItemId
) => {
  try {
    if (!shop || !accessToken) {
      throw new Error("client credentials is required");
    }
    if (!inventoryItemId) {
      throw new Error("inventoryItemId is required");
    }

    const client = new Shopify.Clients.Graphql(shop, accessToken);

    const response = await client.query({
      data: {
        query,
        variables: {
          inventory_item_id: `gid://shopify/InventoryItem/${inventoryItemId}`,
        },
      },
    });

    const variant = response.body.data.inventoryItem.variant;
    return variant;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.response.errors[0].message);
    } else {
      console.log(error);
    }
  }
};

export default getVariantByInventoryItemId;
