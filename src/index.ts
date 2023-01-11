import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";
import { IOpts } from "./types/index";
import { pxToNumber, getDom } from "./utils/index";

export const version = "1.0.0";

export class Dap {
  private opts;
  private resizeHandler;
  constructor(opts: IOpts) {
    let options;
    let el, wrapEl;
    if (opts.el) el = getDom(opts.el);
    if (opts.wrapEl) wrapEl = getDom(opts.wrapEl);

    options = {
      el: el || document.body,
      wrapEl: wrapEl || document.documentElement,
      width: opts.width || 1920,
      height: opts.height || 1080,
      zoomType: opts.zoomType || "x",
      backgroundImage: opts.backgroundImage,
      backgroundColor: opts.backgroundColor || "#fff",
    };

    this.opts = options;
    this.resizeHandler = debounce(this.resize.bind(this), 50, {
      leading: true,
    });

    this.resizeHandler();
    addListener(options.wrapEl, this.resizeHandler);
  }

  public resize() {
    let {
      el,
      wrapEl,
      width,
      height,
      zoomType,
      backgroundImage,
      backgroundColor,
    } = this.opts;

    let wrapRect = window.getComputedStyle(wrapEl);
    let resetH = 1080; // 基准高度
    let resetW = (width * resetH) / height;
    let scaleX = pxToNumber(wrapRect.width) / resetW; // 缩放比例
    let scaleY = pxToNumber(wrapRect.height) / resetH; // 缩放比例
    let marginX = (pxToNumber(wrapRect.width) - resetW * scaleY) / 2; // 水平居中

    if (zoomType === "x") {
      el.style.transform = "scale(" + scaleX + ")";
      el.style.background = "0% 0% / 100%";
    } else if (zoomType === "y") {
      el.style.transform = "scale(" + scaleY + ")";
      el.style.marginLeft = marginX + "px";
      el.style.background =
        marginX + "px top /" + (scaleY * 100) / scaleX + "% 100%";
    } else {
      el.style.transform = "scale(" + scaleX + ", " + scaleY + ")";
      el.style.background = "0% 0% / 100% 100%";
    }

    el.style.width = resetW + "px";
    el.style.height = resetH + "px";
    el.style.transformOrigin = "left top 0px";
    el.style.backgroundColor = backgroundColor;
    el.style.backgroundRepeat = "no-repeat";
    if (backgroundImage) {
      el.style.backgroundImage = `url(${backgroundImage})`;
    }
  }

  public destroy() {
    let { wrapEl } = this.opts;
    removeListener(wrapEl, this.resizeHandler);
  }
}
