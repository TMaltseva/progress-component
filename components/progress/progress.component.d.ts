import BaseComponent from '../base/component';
export interface ProgressOptions {
    value: number;
    animated: boolean;
    hidden: boolean;
}
export default class ProgressComponent extends BaseComponent {
    private state;
    private renderer;
    private changeCallback;
    constructor(initialState?: Partial<ProgressOptions>);
    protected createElement(): HTMLElement;
    setValue(value: number, animated?: boolean): void;
    setAnimated(animated: boolean): void;
    setHidden(hidden: boolean): void;
    getValue(): number;
    isAnimated(): boolean;
    isHidden(): boolean;
    getState(): ProgressOptions;
    setState(newState: Partial<ProgressOptions>): void;
    onStateChange(callback: (state: ProgressOptions) => void): void;
    private notifyChange;
    destroy(): void;
}
