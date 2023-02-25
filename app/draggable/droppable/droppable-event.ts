export interface DroppableEvent<T = any> {
  nativeEvent: PointerEvent;
  data: T;
}