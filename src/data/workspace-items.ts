import { Config } from "config";
import { Lib } from "lib";
import { BoundingBox, Position, Size, WorkspaceItem } from "types";

function getBoundingBox(items: Array<WorkspaceItem>): BoundingBox | null {
  if (items.length === 0) return null;

  const firstSelectedItem = items[0];
  const origin: Position = { ...firstSelectedItem.position };
  const size: Size = { ...firstSelectedItem.size };

  for (const item of items) {
    origin.x = Math.min(origin.x, item.position.x);
    origin.y = Math.min(origin.y, item.position.y);
  }

  for (const item of items) {
    size.width = Math.max(
      size.width,
      item.position.x + item.size.width - origin.x
    );

    size.height = Math.max(
      size.height,
      item.position.y + item.size.height - origin.y
    );
  }

  return { origin, size };
}

function applyUpdates<T extends WorkspaceItem>(
  item: T,
  updates: Partial<WorkspaceItem>
): T {
  const updatedItem = { ...item, ...updates };

  if (updates.size) {
    const width = Math.max(Config.minItemSize.width, updates.size.width);

    updatedItem.size = {
      width,
      height:
        item.type === "image"
          ? updates.size.width / item.aspectRatio
          : Math.max(Config.minItemSize.height, updates.size.height),
    };
  }

  return updatedItem;
}

function createUnconfirmedItem(
  position: Position,
  type: WorkspaceItem["type"]
): WorkspaceItem {
  const id = Math.random().toString();
  const base = { id, position, opacity: 0.5 };

  switch (type) {
    case "text":
      return {
        ...base,
        label: "",
        type,
        size: { width: 150, height: 80 },
      };
      break;
    case "image": {
      const originalWidth = 640;
      const originalHeight = 853;
      const aspectRatio = originalWidth / originalHeight;

      // Image from: https://www.pexels.com/photo/close-up-of-woodchuck-17427980/
      return {
        ...base,
        label: "Olympic Marmot",
        type,
        size: { width: originalWidth / 2, height: originalHeight / 2 },
        aspectRatio,
        src: "marmot.jpg",
      };
    }
    case "chart":
      return {
        ...base,
        label: `Series ${base.id.slice(2, 6)}`,
        type,
        size: { width: 70, height: 70 },
        seriesId: Math.random().toString(),
      };

    default:
      return Lib.assertUnreachable(type);
  }
}

function createRandomItems(powerOf2: number) {
  const result: WorkspaceItem[] = [];
  const randomId = Math.random().toString();
  const side = Math.sqrt(powerOf2);

  const startX = 200;
  const startY = 200;
  const itemSize = 100;
  const gap = 10;

  for (let i = 0; i < side; i++) {
    for (let j = 0; j < side; j++) {
      const item: WorkspaceItem = {
        id: `${randomId}/${i}-${j}`,
        label: "Jotai",
        type: "text",
        position: {
          x: startX + i * (itemSize + gap) + gap,
          y: startY + j * (itemSize + gap) + gap,
        },
        size: { width: itemSize, height: itemSize },
      };
      result.push(item);
    }
  }

  return result;
}

export const WorkspaceItems = {
  getBoundingBox,
  applyUpdates,
  createRandomItems,
  createUnconfirmedItem,
};
