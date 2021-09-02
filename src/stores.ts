import { writable } from "svelte/store";

const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
export const previewCanvas = writable<HTMLCanvasElement>();
export const userInput = writable<string>("Sample Text")
export const bannerWidth = writable<number>(700)
export const bannerHeight = writable<number>(350)
export const bannerBackground = writable<string>(randomColor)
export const showModal = writable<boolean>(false)