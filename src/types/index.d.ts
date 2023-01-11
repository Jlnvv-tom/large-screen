export interface  IOptions {
  el: HTMLElement | string;
  wrapEl: HTMLElement | string;
  width: number;
  height: number;
  zoomType: 'x' | 'y' | 'z'; // 缩放类型，x等比缩放宽度铺满， y高度， z宽高
  backgroundColor: string;
  backgroundImage: string;
}

export type IOpts = Partial<IOptions>
