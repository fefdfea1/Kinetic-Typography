// 이미지에서 색상 정보를 추출하는 함수
export async function setColor(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      // 임시 캔버스 생성 및 이미지 그리기
      const tmpCanvas = document.createElement("canvas");
      tmpCanvas.width = image.width;
      tmpCanvas.height = image.height;
      const tmpCtx = tmpCanvas.getContext("2d");

      // 이미지를 캔버스에 그리고 컨텍스트 반환
      tmpCtx.drawImage(image, 0, 0, image.width, image.height);
      resolve({
        colorCtx: tmpCtx,
        width: image.width,
        height: image.height,
      });
    };
  });
}
