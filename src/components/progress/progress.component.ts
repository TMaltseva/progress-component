import BaseComponent from '../base/component';
import ProgressUI from './progress.ui';
import { createProgressContainer, createProgressCanvas } from '../../utils/dom.utils';
import { DEFAULT_STATE, VALUE_BOUNDS } from './progress.constants';

export interface ProgressOptions {
  value: number;
  animated: boolean;
  hidden: boolean;
}

export default class ProgressComponent extends BaseComponent {
  private state: ProgressOptions;
  private renderer: ProgressUI | null = null;
  private changeCallback: ((state: ProgressOptions) => void) | null = null;

  constructor(initialState: Partial<ProgressOptions> = {}) {
    super();

    this.state = {
      value: DEFAULT_STATE.VALUE,
      animated: DEFAULT_STATE.ANIMATED,
      hidden: DEFAULT_STATE.HIDDEN,
      ...initialState,
    };
  }

  protected createElement(): HTMLElement {
    const container = createProgressContainer();
    const canvas = createProgressCanvas();

    container.append(canvas);
    this.renderer = new ProgressUI(canvas);

    this.renderer.updateValue(this.state.value, false);
    this.toggleClass('progress-hidden', this.state.hidden);
    this.toggleClass('progress-animated', this.state.animated);

    if (this.state.animated && !this.state.hidden) {
      this.renderer.startRotationAnimation();
    }

    return container;
  }

  public setValue(value: number, animated = true): void {
    const normalized = Math.max(VALUE_BOUNDS.MIN, Math.min(VALUE_BOUNDS.MAX, value));
    if (this.state.value === normalized) return;

    this.state.value = normalized;

    if (this.renderer) {
      this.renderer.updateValue(normalized, animated);
    }

    this.notifyChange();
  }

  public setAnimated(animated: boolean): void {
    if (this.state.animated === animated) return;

    this.state.animated = animated;
    this.toggleClass('progress-animated', animated);

    if (this.renderer) {
      if (animated && !this.state.hidden) {
        this.renderer.startRotationAnimation();
      } else {
        this.renderer.stopRotationAnimation();
      }
    }

    this.notifyChange();
  }

  public setHidden(hidden: boolean): void {
    if (this.state.hidden === hidden) return;

    this.state.hidden = hidden;
    this.toggleClass('progress-hidden', hidden);

    if (this.renderer) {
      if (hidden) {
        this.renderer.stopAllAnimations();
      } else if (this.state.animated) {
        this.renderer.startRotationAnimation();
      }
    }

    this.notifyChange();
  }

  public getValue(): number {
    return this.state.value;
  }

  public isAnimated(): boolean {
    return this.state.animated;
  }

  public isHidden(): boolean {
    return this.state.hidden;
  }

  public getState(): ProgressOptions {
    return { ...this.state };
  }

  public setState(newState: Partial<ProgressOptions>): void {
    if (newState.value !== undefined) this.setValue(newState.value);
    if (newState.animated !== undefined) this.setAnimated(newState.animated);
    if (newState.hidden !== undefined) this.setHidden(newState.hidden);
  }

  public onStateChange(callback: (state: ProgressOptions) => void): void {
    this.changeCallback = callback;
  }

  private notifyChange(): void {
    if (this.changeCallback) {
      this.changeCallback(this.getState());
    }
  }

  public destroy(): void {
    if (this.renderer) {
      this.renderer.destroy();
      this.renderer = null;
    }
    this.changeCallback = null;
    super.destroy();
  }
}
