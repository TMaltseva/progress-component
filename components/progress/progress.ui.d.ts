export default class ProgressUI {
    private readonly canvas;
    private readonly context;
    private rotationAnimationId;
    private fillAnimationId;
    private currentValue;
    private currentRotation;
    constructor(canvas: HTMLCanvasElement);
    private setupCanvas;
    draw(): void;
    private drawTrack;
    private drawProgress;
    animateValue(targetValue: number, duration?: 800): void;
    startRotationAnimation(): void;
    stopRotationAnimation(): void;
    stopFillAnimation(): void;
    stopAllAnimations(): void;
    updateValue(newValue: number, animated?: boolean): void;
    destroy(): void;
}
