export default abstract class BaseComponent {
  protected element: HTMLElement | null = null;
  protected abstract createElement(): HTMLElement;

  protected addClass(className: string): void {
    this.element?.classList.add(className);
  }

  protected removeClass(className: string): void {
    this.element?.classList.remove(className);
  }

  protected toggleClass(className: string, force?: boolean): void {
    this.element?.classList.toggle(className, force);
  }

  public render(): HTMLElement {
    if (!this.element) this.element = this.createElement();
    return this.element;
  }

  public destroy(): void {
    this.element?.remove();
    this.element = null;
  }
}
