export const createElement = <T extends HTMLElement>(
  tag: string,
  classes: string[] = [],
  attributes: Record<string, string> = {},
  textContent?: string
): T => {
  const element = document.createElement(tag) as T;
  element.classList.add(...classes);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
};

export const createProgressContainer = (): HTMLDivElement => createElement<HTMLDivElement>('div', ['progress-wrapper']);

export const createProgressCanvas = (): HTMLCanvasElement =>
  createElement<HTMLCanvasElement>('canvas', ['progress-circle']);

export const createToggleSwitch = (id: string, active = false): HTMLElement => {
  const classes = active ? ['toggle-switch', 'active'] : ['toggle-switch'];
  const toggle = createElement<HTMLDivElement>('div', classes, {
    id,
    role: 'switch',
    'aria-checked': active.toString(),
  });
  const slider = createElement<HTMLDivElement>('div', ['toggle-slider']);

  toggle.append(slider);
  return toggle;
};

export const createNumberInput = (id: string, value: number, min = 0, max = 100): HTMLInputElement => {
  return createElement<HTMLInputElement>('input', ['value-input'], {
    type: 'number',
    id,
    min: min.toString(),
    max: max.toString(),
    value: value.toString(),
  });
};

export const createControlWrapper = (control: HTMLElement): HTMLElement => {
  const wrapper = createElement<HTMLDivElement>('div', ['control-input']);
  wrapper.append(control);
  return wrapper;
};

export const createControlLabel = (labelText: string): HTMLElement => {
  const label = createElement<HTMLLabelElement>('label', ['control-label']);
  label.textContent = labelText;
  return label;
};
