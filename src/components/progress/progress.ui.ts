import {
  MATH_CONSTANTS,
  CANVAS_SETTINGS,
  ANIMATION_SETTINGS,
  VALUE_BOUNDS,
  DEFAULT_CONFIG,
} from './progress.constants';

export default class ProgressUI {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private rotationAnimationId: number | null = null;
  private fillAnimationId: number | null = null;

  private currentValue: number = 0;
  private currentRotation: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Canvas 2D context not supported');
    }

    this.context = context;
    this.setupCanvas();
  }

  private setupCanvas(): void {
    const size = (DEFAULT_CONFIG.RADIUS + DEFAULT_CONFIG.STROKE_WIDTH) * CANVAS_SETTINGS.SIZE_MULTIPLIER;
    const dpr = window.devicePixelRatio || CANVAS_SETTINGS.DEFAULT_DPR;

    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    this.canvas.style.width = `${size}px`;
    this.canvas.style.height = `${size}px`;

    this.context.scale(dpr, dpr);
    this.context.lineCap = CANVAS_SETTINGS.LINE_CAP;
  }

  public draw(): void {
    const size = (DEFAULT_CONFIG.RADIUS + DEFAULT_CONFIG.STROKE_WIDTH) * CANVAS_SETTINGS.SIZE_MULTIPLIER;
    const center = size / CANVAS_SETTINGS.SIZE_MULTIPLIER;

    this.context.clearRect(0, 0, size, size);
    this.context.save();
    this.context.translate(center, center);
    this.context.rotate(this.currentRotation);
    this.context.translate(-center, -center);

    this.drawTrack(center);

    if (this.currentValue > VALUE_BOUNDS.MIN) {
      this.drawProgress(center, this.currentValue);
    }

    this.context.restore();
  }

  private drawTrack(center: number): void {
    this.context.beginPath();
    this.context.arc(center, center, DEFAULT_CONFIG.RADIUS, 0, MATH_CONSTANTS.FULL_CIRCLE);
    this.context.strokeStyle = DEFAULT_CONFIG.TRACK_COLOR;
    this.context.lineWidth = DEFAULT_CONFIG.STROKE_WIDTH;
    this.context.stroke();
  }

  private drawProgress(center: number, value: number): void {
    const startAngle = MATH_CONSTANTS.START_ANGLE;
    const progressRatio = value / VALUE_BOUNDS.MAX;
    const endAngle = startAngle + progressRatio * MATH_CONSTANTS.FULL_CIRCLE;

    this.context.beginPath();
    this.context.arc(center, center, DEFAULT_CONFIG.RADIUS, startAngle, endAngle);
    this.context.strokeStyle = DEFAULT_CONFIG.FILL_COLOR;
    this.context.lineWidth = DEFAULT_CONFIG.STROKE_WIDTH;
    this.context.stroke();
  }

  public animateValue(targetValue: number, duration = ANIMATION_SETTINGS.FILL_DURATION): void {
    this.stopFillAnimation();

    const startTime = Date.now();
    const startValue = this.currentValue;
    const valueRange = targetValue - startValue;

    const animate = (): void => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - (1 - progress) ** 3;

      this.currentValue = startValue + valueRange * easeProgress;
      this.draw();

      this.fillAnimationId = progress < 1 ? requestAnimationFrame(animate) : null;
    };

    this.fillAnimationId = requestAnimationFrame(animate);
  }

  public startRotationAnimation(): void {
    if (this.rotationAnimationId) return;

    const duration = DEFAULT_CONFIG.ANIMATION_DURATION * ANIMATION_SETTINGS.MILLISECONDS_IN_SECOND;
    const startTime = Date.now();

    const animate = (): void => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % duration) / duration;
      this.currentRotation = progress * MATH_CONSTANTS.FULL_CIRCLE;
      this.draw();
      this.rotationAnimationId = requestAnimationFrame(animate);
    };

    this.rotationAnimationId = requestAnimationFrame(animate);
  }

  public stopRotationAnimation(): void {
    if (this.rotationAnimationId) {
      cancelAnimationFrame(this.rotationAnimationId);
      this.rotationAnimationId = null;
    }
    this.currentRotation = 0;
    this.draw();
  }

  public stopFillAnimation(): void {
    if (this.fillAnimationId) {
      cancelAnimationFrame(this.fillAnimationId);
      this.fillAnimationId = null;
    }
  }

  public stopAllAnimations(): void {
    this.stopRotationAnimation();
    this.stopFillAnimation();
  }

  public updateValue(newValue: number, animated = true): void {
    const updatedValue = Math.max(VALUE_BOUNDS.MIN, Math.min(VALUE_BOUNDS.MAX, newValue));

    if (this.currentValue === updatedValue) return;

    if (animated) {
      this.animateValue(updatedValue);
    } else {
      this.stopFillAnimation();
      this.currentValue = updatedValue;
      this.draw();
    }
  }

  public destroy(): void {
    this.stopAllAnimations();
  }
}
