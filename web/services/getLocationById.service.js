import { Shopify } from "@shopify/shopify-api";

const query = `query GetLocation($location_id: ID!) {
  location(id: $location_id) {
    name
  }
}`;

const getLocationById = async (shop, accessToken, locationId) => {
  try {
    if (!shop || !accessToken) {
      throw new Error("client credentials is required");
    }
    if (!locationId) {
      throw new Error("locationId is required");
    }

    const client = new Shopify.Clients.Graphql(shop, accessToken);

    const response = await client.query({
      data: {
        query,
        variables: {
          location_id: `gid://shopify/Location/${locationId}`,
        },
      },
    });

    const location = response.body.data.location;
    return location;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.response.errors[0].message);
    } else {
      console.log(error);
    }
  }
};

export default getLocationById;
