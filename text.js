export class Text {
  constructor() {
    // 텍스트를 그리기 위한 캔버스 생성
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  // 텍스트 설정 및 파티클 위치 계산
  setText(str, density, stageWidth, stageHeight) {
    // 캔버스 크기 설정
    this.canvas.width = stageWidth;
    this.canvas.height = stageHeight;

    // 텍스트 스타일 설정
    const myText = str;
    const fontWidth = 700;
    const fontSize = 600;
    const fontName = "Hind";

    // 텍스트 렌더링 설정
    this.ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
    this.ctx.fillStyle = `rgba(255,0,0,1)`;
    this.ctx.textBaseline = `middle`;

    // 텍스트 위치 계산 및 그리기
    const fontPos = this.ctx.measureText(myText);
    const x = (stageWidth - fontPos.width) / 2;
    const y =
      fontPos.actualBoundingBoxAscent +
      fontPos.actualBoundingBoxDescent +
      (stageHeight - fontSize) / 2 +
      -200;

    this.ctx.fillText(myText, x, y);

    // 파티클 위치 계산
    return this.dotPos(density, stageWidth, stageHeight);
  }

  // 파티클 위치 계산 메서드
  dotPos(density, stageWidth, stageHeight) {
    const imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight).data;
    const particles = [];
    let i = 0;
    let width = 0;
    let pixel;

    // 텍스트 영역 스캔하여 파티클 위치 결정
    for (let height = 0; height < stageHeight; height += density) {
      ++i;
      const slide = i % 2 == 0;
      width = 0;
      if (slide == 1) {
        width += 6;
      }

      for (width; width < stageWidth; width += density) {
        pixel = imageData[(width + height * stageWidth) * 4 - 1];
        if (
          pixel != 0 &&
          width > 0 &&
          width < stageWidth &&
          height > 0 &&
          height < stageHeight
        ) {
          particles.push({ x: width, y: height });
        }
      }
    }
    return particles;
  }
}
