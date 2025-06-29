import { useEffect } from "react";
import { useClickOutside } from "./use-click-outside";

function clamp(value: number, min: number, max: number) {
  return value > min ? (value < max ? value : max) : min;
}

function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here: " + x);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

function useOnWheel(callback: (event: MouseEvent) => void) {
  useEffect(() => {
    function onWheel(event: MouseEvent) {
      event.preventDefault();
      callback(event);
    }

    document.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });

    return () => document.removeEventListener("wheel", onWheel);
  }, [callback]);
}

function replaceUrlParam(param: string, value: string) {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(param, value);
  window.history.replaceState(null, "", "?" + urlParams.toString());
}

function getUrlParam(param: string, defaultValue: string | null = null) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) ?? defaultValue;
}

function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getRandomInteger(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const isMacOS = navigator.userAgent.indexOf("Mac OS X") >= 0;

export const Lib = {
  clamp,
  assertUnreachable,
  delay,
  replaceUrlParam,
  getUrlParam,
  useOnWheel,
  getRandomNumber,
  getRandomInteger,
  useClickOutside,
  isMacOS,
};
