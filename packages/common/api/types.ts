export type CollectionResult<ElementType = unknown> = {
  count: number;
  items: ElementType[];
}

export type ApiIntent<Response> = [
  () => Promise<Response>,
  () => void,
];