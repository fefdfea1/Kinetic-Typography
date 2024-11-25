const ToTal = 12; // 파티클을 구성하는 점의 수

export class Particle {
  constructor(pos, color, ctx) {
    this.color = color;

    // 파티클 포인트 생성
    const ranMax = 20;
    this.points = [
      {
        x: pos.x,
        y: pos.y,
      },
    ];

    // 랜덤한 위치에 점들 생성
    for (let i = 0; i < ToTal; i++) {
      const prev = i === 0 ? this.points[0] : this.points[i - 1];
      this.points.push(this.setRandom(prev, ranMax));
    }

    this.draw(ctx);
  }

  // 파티클 그리기
  draw(ctx) {
    ctx.beginPath();
    ctx.lineWidth = 0.3;
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.points[0].x, this.points[0].y);

    // 베지어 곡선으로 점들 연결
    for (let i = 1; i < this.points.length; i++) {
      const prev = this.points[i - 1];
      const cur = this.points[i];
      const cx = (prev.x + cur.x) / 2;
      const cy = (prev.y + cur.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
    }

    ctx.stroke();
  }

  // 랜덤한 위치 계산
  setRandom(pos, gap) {
    return {
      x: pos.x + Math.random() * (gap + gap) - gap,
      y: pos.y + Math.random() * (gap + gap) - gap,
    };
  }
}
