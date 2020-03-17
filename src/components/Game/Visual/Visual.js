import React from "react";
import ImgObject from "./img-object";
import SceneObject from "./scene-object";
import './style.css'

export default class Visual extends React.Component {
  constructor(props) {
    super(props);
    this.c = null;
    this.ctx = null;
    this.objects = [
      new ImgObject("background", ""),
      new ImgObject("legs", ""),
      new ImgObject("doubt", "body"),
      new ImgObject("readiness", "body"),
      new ImgObject("tension", "body"),
      new ImgObject("uncertainty", "body"),
      new ImgObject("apathy", "head"),
      new ImgObject("fear", "head"),
      new ImgObject("horror", "head"),
      new ImgObject("squinted", "head"),
      new ImgObject("trembling", "head")
    ];

    const girlX = 800;
    const girlY = 385;
    this.scene = {
      background: new SceneObject(0, -200, "background", 1920),
      legs: new SceneObject(girlX, girlY, "legs", 200),
      body: new SceneObject(girlX, girlY, "doubt", 200),
      head: new SceneObject(girlX, girlY, "horror", 200)
    };
    this.images = [];

    const { landWidth, landHeight } = this.props.landSizes;

    this.landWidth = landWidth;
    this.landHeight = landHeight;
    /*
    this.startCam = {
      zoom: 23,
      x: -872,
      y: -400
    };

    this.endCam = {
      zoom: 1,
      x: 0,
      y: 0
    };*/

    this.progress = 1;
  }
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

  drawScene() {
    const newCanvas = document.createElement("CANVAS");
    newCanvas.width = this.landWidth;
    newCanvas.height = this.landHeight;
    const newCtx = newCanvas.getContext("2d");

    for (let key in this.scene) {
      const obj = this.scene[key];
      const { img } = this.images.find(image => image.name === obj.imgName);
      const { width, x, y } = obj;

      const locFactor = width / img.width;
      const height = img.height * locFactor;

      newCtx.drawImage(img, x, y, width, height);
    }

    this.ctx.drawImage(newCanvas, 0, 0);
  }

  render() {
    const { width, height, isLoaded } = this.props;

    if (isLoaded) this.drawScene();

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
      </div>
    );
  }
}
