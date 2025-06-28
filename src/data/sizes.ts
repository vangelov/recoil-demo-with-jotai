import { Size } from "types";

function add(sizeA: Size, sizeB: Size): Size {
  return {
    width: sizeA.width + sizeB.width,
    height: sizeA.height + sizeB.height,
  };
}

export const Sizes = {
  add,
};
