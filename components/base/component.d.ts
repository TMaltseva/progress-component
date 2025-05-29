export default abstract class BaseComponent {
    protected element: HTMLElement | null;
    protected abstract createElement(): HTMLElement;
    protected addClass(className: string): void;
    protected removeClass(className: string): void;
    protected toggleClass(className: string, force?: boolean): void;
    render(): HTMLElement;
    destroy(): void;
}
