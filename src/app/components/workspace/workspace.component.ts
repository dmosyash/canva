import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements AfterViewInit {
  @ViewChild('workCanvas') el: ElementRef;
  private canvas: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;
  private canvasAspectRatio: number;
  private image: HTMLImageElement;

  constructor() {
    this.canvasAspectRatio = 9 / 16;
  }

  ngAfterViewInit() {
    this.canvas = this.el.nativeElement;
    this.canvasContext = this.canvas.getContext('2d');
  }


  drawOrignalImage(image) {
    const imageAspectRatio: number = image.naturalWidth / image.naturalHeight;
    let imageWidth: number = this.canvas.width;
    let imageHeight: number = imageWidth / imageAspectRatio;
    let x = 0;
    let y = 0;
    if (imageAspectRatio >= this.canvasAspectRatio) {
      x = 0;
      y = (this.canvas.height / 2) - (imageHeight / 2);
    } else {
      imageHeight = this.canvas.height;
      imageWidth = imageHeight * imageAspectRatio;
      x = (this.canvas.width / 2) - (imageWidth / 2);
      y = 0;
    }
    this.canvasContext.drawImage(image, x, y, imageWidth, imageHeight);
  }

  drawBlur(image) {
    const tmpCanvas: HTMLCanvasElement = document.createElement('canvas');
    const scale = 10;
    tmpCanvas.width = 18;
    tmpCanvas.height = 32;
    if (this.canvasAspectRatio > 1) {
      tmpCanvas.width = 32;
      tmpCanvas.height = 18;
    }
    const tmpContext: CanvasRenderingContext2D = tmpCanvas.getContext('2d');
    tmpContext.drawImage(image, 0, 0, tmpCanvas.width, tmpCanvas.height);
    this.canvasContext.drawImage(tmpCanvas, 0, 0, tmpCanvas.width * scale, tmpCanvas.height * scale);
  }

  onItemDrop(event) {
    this.image = event.dragData;

    this.drawBlur(this.image);

    this.drawOrignalImage(this.image);
  }

  tiltCanvas() {
    const width = this.canvas.width;
    this.canvas.width = this.canvas.height;
    this.canvas.height = width;
    this.canvasAspectRatio = 1 / this.canvasAspectRatio;

    this.drawBlur(this.image);

    this.drawOrignalImage(this.image);
  }

}
