// 필요한 클래스들 임포트
import { Text } from "./text.js";
import { Visual } from "./visual.js";
import { setColor } from "./colors.js";

class App {
  constructor() {
    // 캔버스 생성 및 초기 설정
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    // 고해상도 디스플레이 대응
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    // 이미지 썸네일 정보 저장 배열
    this.thumbs = [];

    // 웹폰트 로드 및 초기화
    WebFont.load({
      google: {
        families: ["Hind:700"],
      },
      fontactive: () => {
        // 이미지 리스트 요소들 가져오기
        const ul = document.getElementsByTagName("ul")[0];
        const lis = ul.getElementsByTagName("li");

        // 각 이미지에 클릭 이벤트 추가 및 정보 저장
        for (let i = 0; i < lis.length; i++) {
          const item = lis[i];
          const img = item.getElementsByTagName("img")[0];
          item.addEventListener(
            "click",
            (e) => {
              this.show(i);
            },
            false
          );

          this.thumbs[i] = {
            item,
            img: img.src,
          };
        }

        // 텍스트 객체 생성 및 이벤트 리스너 설정
        this.text = new Text();
        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        // 애니메이션 시작
        requestAnimationFrame(this.animate.bind(this));
      },
    });
  }

  // 이미지 선택 시 실행되는 메서드
  async show(index) {
    // 선택된 이미지 하이라이트
    for (let i = 0; i < this.thumbs.length; i++) {
      const item = this.thumbs[i].item;
      if (i == index) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
    }

    // 선택된 이미지로 비주얼 효과 생성
    const img = this.thumbs[index].img;
    await setColor(img).then((obj) => {
      this.visual = new Visual(this.pos, obj.colorCtx, obj.width, obj.height);
    });
  }

  // 화면 크기 조정 시 실행되는 메서드
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    // 캔버스 크기 설정
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    // 텍스트 위치 설정
    this.pos = this.text.setText("A", 6, this.stageWidth, this.stageHeight);
  }

  // 애니메이션 프레임 실행 메서드
  animate(t) {
    requestAnimationFrame(this.animate.bind(this));
    if (this.visual) {
      this.visual.animate(this.ctx);
    }
  }
}

// 페이지 로드 완료 시 App 클래스 인스턴스 생성
window.onload = () => {
  new App();
};
