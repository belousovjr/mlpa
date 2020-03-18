export default class ImgObject {
  constructor(image, slot = "", min, max, param = null) {
    this.image = image;
    this.slot = slot;
    this.min = min;
    this.max = max;
    this.param = param;
  }
}
