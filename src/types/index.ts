export type Workspace = {
  id?: string;
  backgroundColor: string;
  items: Array<WorkspaceItem>;
  zoom: number;
  offset: Size;
};

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type BoundingBox = {
  origin: Position;
  size: Size;
};
type WorkspaceBaseItem = {
  id: string;
  label: string;
  position: Position;
  size: Size;
  opacity?: number;
};

export type WorkspaceTextItem = WorkspaceBaseItem & {
  type: "text";
};

export type WorkspaceImageItem = WorkspaceBaseItem & {
  type: "image";
  aspectRatio: number;
  src: string;
};

export type WorkspaceChartItem = WorkspaceBaseItem & {
  type: "chart";
  seriesId: string;
};

export type WorkspaceItem =
  | WorkspaceTextItem
  | WorkspaceImageItem
  | WorkspaceChartItem;

export type SelectionType =
  | "widget"
  | "widget-from-bounding-box"
  | "boundingBox"
  | "resizeHandle"
  | "canvas";
