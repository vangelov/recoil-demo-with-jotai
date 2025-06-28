import { Position, Size } from "types";

function screenToWorld(screenPosition: Position, offset: Size, zoom: number) {
  const worldX = (screenPosition.x - offset.width) / zoom;
  const worldY = (screenPosition.y - offset.height) / zoom;

  return { x: worldX, y: worldY };
}

function worldToScreen(worldPosition: Position, offset: Size, zoom: number) {
  const screenX = offset.width + worldPosition.x * zoom;
  const screenY = offset.height + worldPosition.y * zoom;

  return { x: screenX, y: screenY };
}

function fromUIEvent(event: { clientX: number; clientY: number }) {
  return { x: event.clientX, y: event.clientY };
}

function subtract(valueA: Position, valueB: Position): Size {
  return { width: valueA.x - valueB.x, height: valueA.y - valueB.y };
}

function addSize(position: Position, size: Size): Position {
  return { x: position.x + size.width, y: position.y + size.height };
}

function toString(position: Position) {
  const { x, y } = position;
  const fixedX = x.toFixed(2);
  const fixedY = y.toFixed(2);

  return `(x = ${fixedX} y = ${fixedY})`;
}

export const Positions = {
  screenToWorld,
  worldToScreen,
  fromUIEvent,
  subtract,
  addSize,
  toString,
};
