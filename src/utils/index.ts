/**
 * 转换 '50px' => 50
 * @param value
 * @returns
 */
export const pxToNumber = (value: string): number => {
  if (!value) return 0;
  const match = value.match(/^\d*(\.\d*)?/);
  return match ? Number(match[0]) : 0;
};

/**
 * 获取节点
 * @param el
 * @returns
 */
export const getDom = (el: HTMLElement | string): HTMLElement => {
  if (typeof el === "string") {
    return document.querySelector(el) || document.body;
  }
  return el;
};
