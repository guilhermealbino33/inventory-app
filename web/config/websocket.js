import { Server } from "socket.io";

import getInventoryByVariantId from "../services/getInventoryLevelsByVariantId.service.js";
import updateVariant from "../services/updateVariant.service.js";
import ActiveShop from "../models/ActiveShop.js";

export default function connectWebSocket(server, app) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`a user connected: ${socket.id}`);

    socket.on("onProductPage", async (arg, callback) => {
      const { shopDomain, variantId } = arg;

      const session = await ActiveShop.findOne({ shop: shopDomain });

      const inventoryLevels = await getInventoryByVariantId(
        shopDomain,
        session.accessToken,
        variantId
      );

      const inventories = {};
      inventoryLevels.forEach((inventoryLevel) => {
        inventories[inventoryLevel.node.location.name] =
          inventoryLevel.node.available;
      });

      const metafields = [
        {
          namespace: "ProductInventory",
          key: "inventory",
          type: "json",
          value: JSON.stringify(inventories),
        },
      ];

      await updateVariant(shopDomain, session.accessToken, {
        id: `gid://shopify/ProductVariant/${variantId}`,
        metafields,
      });

      callback({ inventories });
    });

    socket.on("onProductChange", async (arg, callback) => {
      const { shopDomain, variantId } = arg;

      const session = await ActiveShop.findOne({ shop: shopDomain });

      const inventoryLevels = await getInventoryByVariantId(
        shopDomain,
        session.accessToken,
        variantId
      );

      const inventories = {};
      inventoryLevels.forEach((inventoryLevel) => {
        inventories[inventoryLevel.node.location.name] =
          inventoryLevel.node.available;
      });

      callback({ inventories });
    });
  });
}
