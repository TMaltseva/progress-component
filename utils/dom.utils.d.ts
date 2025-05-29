export declare const createElement: <T extends HTMLElement>(tag: string, classes?: string[], attributes?: Record<string, string>, textContent?: string) => T;
export declare const createProgressContainer: () => HTMLDivElement;
export declare const createProgressCanvas: () => HTMLCanvasElement;
export declare const createToggleSwitch: (id: string, active?: boolean) => HTMLElement;
export declare const createNumberInput: (id: string, value: number, min?: number, max?: number) => HTMLInputElement;
export declare const createControlWrapper: (control: HTMLElement) => HTMLElement;
export declare const createControlLabel: (labelText: string) => HTMLElement;
