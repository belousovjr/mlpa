import React from "react";
import ImgObject from "./img-object";
import SceneObject from "./scene-object";
import "./style.css";

import {
  PARAM_EQUILIBRIUM,
  PARAM_DETERMINATION
} from "../../../game/parameters";
import Shaking from "./shaking";

export default class Visual extends React.Component {
  constructor(props) {
    super(props);
    this.c = null;
    this.ctx = null;
    this.shaking = {
      x: new Shaking(0.05, 10),
      y: new Shaking(0.05, 7)
    };
    this.objects = [
      new ImgObject("road", "back"),
      new ImgObject("legs", "legs"),
      new ImgObject("doubt", "body", 1, 5, PARAM_DETERMINATION),
      new ImgObject("uncertainty", "body", 6, 10, PARAM_DETERMINATION),
      new ImgObject("readiness", "body", 11, 15, PARAM_DETERMINATION),
      //new ImgObject("tension", "body"),
      new ImgObject("squinted", "head", 1, 5, PARAM_EQUILIBRIUM),
      new ImgObject("horror", "head", 6, 10, PARAM_EQUILIBRIUM),
      new ImgObject("fear", "head", 11, 15, PARAM_EQUILIBRIUM)
      /* new ImgObject("apathy", "head"),
      new ImgObject("trembling", "head")*/
    ];

    this.progress = 0;
    this.currProgress = 0;

    this.positions = [
      { prog: 0, camX: 915, camY: 386, camZoom: 20 },
      { prog: 200, camX: 924, camY: 395, camZoom: 13.82 },
      { prog: 400, camX: 933, camY: 410, camZoom: 8.24 },

      { prog: 600, camX: 942, camY: 440, camZoom: 3.82 },
      { prog: 800, camX: 951, camY: 480, camZoom: 1.98 },
      { prog: 1000, camX: 960, camY: 540, camZoom: 1.4 }
    ];

    const girlX = 800;
    const girlY = 345;
    this.scene = {
      back: new SceneObject(0, 0, "road", 1920),
      legs: new SceneObject(girlX, girlY, "legs", 200),
      body: new SceneObject(girlX, girlY, "doubt", 200),
      head: new SceneObject(girlX, girlY, "horror", 200)
    };
    this.images = [];

    const { landWidth, landHeight } = this.props.landSizes;

    this.landWidth = landWidth;
    this.landHeight = landHeight;

    this.state = { isStarted: false };
  }

  getPosition() {
    if (this.positions.length === 1) return this.positions[0];
    for (let index = 0; index < this.positions.length; index++) {
      const pos = this.positions[index];
      if (this.currProgress < pos.prog) {
        const first = this.positions[index - 1];
        const last = pos;
        const factor =
          (this.currProgress - first.prog) / (last.prog - first.prog);
        const camZoom = first.camZoom + (last.camZoom - first.camZoom) * factor;
        const camX = first.camX + (last.camX - first.camX) * factor;
        const camY = first.camY + (last.camY - first.camY) * factor;
        return { camZoom, camX, camY };
      } else if (index === this.positions.length - 1) {
        return pos;
      }
    }
  }

  drawImg = (obj, ctx) => {
    const { img } = this.images.find(image => image.name === obj.imgName);
    const { width, x, y } = obj;

    if (this.progress > this.currProgress) {
      this.currProgress += 1;
    }

    const locFactor = width / img.width;
    const height = img.height * locFactor;

    const { camZoom, camX, camY } = this.getPosition();

    const screenWidth = this.landWidth / 2;
    const screenHeight = this.landHeight / 2;

    ctx.drawImage(
      img,
      (x - camX) * camZoom + screenWidth + this.shaking.x.value,
      (y - camY) * camZoom + screenHeight + this.shaking.y.value,
      width * camZoom,
      height * camZoom
    );
  };
  async componentDidMount() {
    if (!this.c && this.refs.myCanvas) {
      this.c = this.refs.myCanvas;
      this.ctx = this.c.getContext("2d");

      this.loaderLoop();
    }
  }

  loaderLoop() {
    this.objects.forEach(object => {
      this.loadImage(object);
    });
  }

  loadImage(sceneObject) {
    const { slot, image } = sceneObject;
    let img = new Image();
    let url = slot ? `${slot}/` : "";
    url += image;
    img.src = `${window.location.href}/img/${url}.png`;
    img.onload = event => {
      const { target } = event;
      this.images.push({ name: image, img: target });
      if (this.images.length === this.objects.length) {
        const { loadFinished } = this.props;
        loadFinished();
      }
    };
  }

  getCorrImgName(slotName) {
    const { params } = this.props;
    const corrImages = this.objects.filter(obj => obj.slot === slotName);
    let corrImg = corrImages.find(obj => {
      if (obj.param) {
        const param = params.find(p => p.name === obj.param);

        return param.value <= obj.max && param.value >= obj.min;
      } else return false;
    });

    if (!corrImg) {
      corrImg = corrImages.find(img => !img.param);
    }
    return corrImg.image;
  }

  drawSceneLopp = () => {
    const { params, isEnding } = this.props;
    const param = params.find(p => p.name === PARAM_EQUILIBRIUM);

    this.shaking.x.update(param);
    this.shaking.y.update(param);

    const { isStarted } = this.state;
    if (!isStarted) this.setState({ isStarted: true });

    const newCanvas = document.createElement("CANVAS");
    newCanvas.width = this.landWidth;
    newCanvas.height = this.landHeight;
    const newCtx = newCanvas.getContext("2d");

    for (let key in this.scene) {
      const obj = this.scene[key];
      obj.imgName = this.getCorrImgName(key);
      this.drawImg(obj, newCtx);
    }

    this.ctx.drawImage(newCanvas, 0, 0);

    if (!isEnding) window.requestAnimationFrame(this.drawSceneLopp);
  };

  render() {
    const { width, height, isLoaded } = this.props;
    const { isStarted } = this.state;

    if (isLoaded && !isStarted) {
      window.requestAnimationFrame(this.drawSceneLopp);
    }

    const className = isLoaded ? "loaded" : "";

    return (
      <div>
        <canvas
          className={className}
          ref="myCanvas"
          width={this.landWidth}
          height={this.landHeight}
          style={{ width, height }}
        ></canvas>
        <button
          style={{ position: "absolute", top: 100, left: 0 }}
          onClick={() => {
            this.progress += 100;
          }}
        >
          PGORGESS +{" "}
        </button>
      </div>
    );
  }
}
