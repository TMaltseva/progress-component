import ProgressComponent from './components/progress/progress.component';
import {
  createElement,
  createNumberInput,
  createToggleSwitch,
  createControlLabel,
  createControlWrapper,
} from './utils/dom.utils';
import { VALUE_BOUNDS } from './components/progress/progress.constants';
import type { ProgressOptions } from './components/progress/progress.component';

export default class App {
  private readonly container: HTMLElement;
  private readonly progress: ProgressComponent;
  private valueInput!: HTMLInputElement;
  private animateToggle!: HTMLElement;
  private hideToggle!: HTMLElement;
  private orientationLabel!: HTMLElement;

  private boundUpdateOrientation: () => void;
  private boundHandleOrientationChange: () => void;

  constructor() {
    this.boundUpdateOrientation = this.updateOrientation.bind(this);
    this.boundHandleOrientationChange = this.boundUpdateOrientation;

    this.container = this.createAppContainer();
    this.progress = new ProgressComponent({ value: 25 });

    this.render();
    this.setupProgressListener();
    this.setupEventListeners();
    this.updateOrientation();
  }

  private createAppContainer(): HTMLElement {
    const container = createElement<HTMLDivElement>('div', ['app-container']);
    document.body.append(container);

    return container;
  }

  private render(): void {
    this.orientationLabel = createElement<HTMLDivElement>('div', ['orientation-label'], {}, 'Portrait');

    const header = createElement<HTMLDivElement>('div', ['header']);
    const title = createElement<HTMLHeadingElement>('h1', [], {}, 'Progress');

    const progressSection = createElement<HTMLDivElement>('div', ['progress-section']);
    progressSection.append(this.progress.render());
    const controls = this.createControls();
    const wrapper = createElement<HTMLDivElement>('div', ['main-wrapper']);
    header.append(title);
    wrapper.append(progressSection, controls);
    this.container.append(this.orientationLabel, header, wrapper);
  }

  private setupProgressListener(): void {
    this.progress.onStateChange((state: ProgressOptions) => {
      this.valueInput.value = state.value.toString();
      this.updateToggle(this.animateToggle, state.animated);
      this.updateToggle(this.hideToggle, state.hidden);
    });
  }

  private createControls(): HTMLElement {
    const controls = createElement<HTMLDivElement>('div', ['controls']);
    const controlsGrid = createElement<HTMLDivElement>('div', ['controls-grid']);

    this.valueInput = createNumberInput('valueInput', this.progress.getValue(), VALUE_BOUNDS.MIN, VALUE_BOUNDS.MAX);
    this.animateToggle = createToggleSwitch('animateToggle', this.progress.isAnimated());
    this.hideToggle = createToggleSwitch('hideToggle', this.progress.isHidden());

    const valueLabel = createControlLabel('Value');
    const animateLabel = createControlLabel('Animate');
    const hideLabel = createControlLabel('Hide');

    const valueWrapper = createControlWrapper(this.valueInput);
    const animateWrapper = createControlWrapper(this.animateToggle);
    const hideWrapper = createControlWrapper(this.hideToggle);

    controlsGrid.append(valueWrapper, valueLabel, animateWrapper, animateLabel, hideWrapper, hideLabel);

    controls.append(controlsGrid);
    return controls;
  }

  private setupEventListeners(): void {
    this.valueInput.addEventListener('input', (event: Event) => {
      const { target } = event;

      if (!(target instanceof HTMLInputElement)) return;

      let value = Number.parseInt(target.value, 10) || 0;

      value = Math.max(VALUE_BOUNDS.MIN, Math.min(VALUE_BOUNDS.MAX, value));
      target.value = value.toString();

      this.progress.setValue(value);
    });

    this.animateToggle.addEventListener('click', () => {
      const newState = !this.progress.isAnimated();
      this.progress.setAnimated(newState);
    });

    this.hideToggle.addEventListener('click', () => {
      const newState = !this.progress.isHidden();
      this.progress.setHidden(newState);
    });

    window.addEventListener('orientationchange', this.boundHandleOrientationChange);

    window.addEventListener('resize', this.boundUpdateOrientation);
  }

  private updateToggle(toggle: HTMLElement, active: boolean): void {
    toggle.classList.toggle('active', active);

    if (toggle instanceof HTMLButtonElement) {
      toggle.setAttribute('aria-pressed', active.toString());
    }
  }

  private updateOrientation(): void {
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;
    this.orientationLabel.textContent = isLandscape ? 'Landscape' : 'Portrait';
  }

  public destroy(): void {
    window.removeEventListener('resize', this.boundUpdateOrientation);
    window.removeEventListener('orientationchange', this.boundHandleOrientationChange);

    this.progress.destroy();

    if (this.container.parentNode) {
      this.container.remove();
    }
  }
}
