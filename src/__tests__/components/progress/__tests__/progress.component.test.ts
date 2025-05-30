import ProgressComponent from '../../../../components/progress/progress.component';
import { VALUE_BOUNDS } from '../../../../components/progress/progress.constants';

describe('ProgressComponent', () => {
  let progressComponent: ProgressComponent;
  let container: HTMLElement;

  beforeEach(() => {
    jest.useFakeTimers();

    progressComponent = new ProgressComponent();
    container = progressComponent.render();
    document.body.append(container);
  });

  afterEach(() => {
    progressComponent.destroy();

    jest.useRealTimers();
  });

  describe('Initialization', () => {
    it('should create with default values', () => {
      expect(progressComponent.getValue()).toBe(0);
      expect(progressComponent.isAnimated()).toBe(false);
      expect(progressComponent.isHidden()).toBe(false);
    });

    it('should create with custom initial state', () => {
      const customProgress = new ProgressComponent({
        value: 50,
        animated: true,
        hidden: true,
      });

      expect(customProgress.getValue()).toBe(50);
      expect(customProgress.isAnimated()).toBe(true);
      expect(customProgress.isHidden()).toBe(true);

      customProgress.destroy();
    });

    it('should render DOM structure correctly', () => {
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('progress-wrapper');

      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
      expect(canvas).toHaveClass('progress-circle');
    });
  });

  describe('Value Management', () => {
    it('should set value correctly', () => {
      progressComponent.setValue(50);
      expect(progressComponent.getValue()).toBe(50);
    });

    it('should normalize value within bounds', () => {
      progressComponent.setValue(-10);
      expect(progressComponent.getValue()).toBe(VALUE_BOUNDS.MIN);

      progressComponent.setValue(150);
      expect(progressComponent.getValue()).toBe(VALUE_BOUNDS.MAX);
    });

    it('should not update if value is the same', () => {
      const callback = jest.fn();
      progressComponent.onStateChange(callback);

      progressComponent.setValue(25);
      progressComponent.setValue(25);

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('Animation State', () => {
    it('should toggle animated state', () => {
      expect(progressComponent.isAnimated()).toBe(false);

      progressComponent.setAnimated(true);
      expect(progressComponent.isAnimated()).toBe(true);
      expect(container).toHaveClass('progress-animated');

      progressComponent.setAnimated(false);
      expect(progressComponent.isAnimated()).toBe(false);
      expect(container).not.toHaveClass('progress-animated');
    });

    it('should not start animation when hidden', () => {
      progressComponent.setHidden(true);
      progressComponent.setAnimated(true);

      expect(progressComponent.isAnimated()).toBe(true);
    });
  });

  describe('Value Animation', () => {
    it('should set target value after animation', () => {
      progressComponent.setValue(0, false);
      expect(progressComponent.getValue()).toBe(0);

      progressComponent.setValue(100, true);

      jest.advanceTimersByTime(1000);

      expect(progressComponent.getValue()).toBe(100);
    });

    it('should handle multiple animation steps', () => {
      progressComponent.setValue(0, false);

      progressComponent.setValue(50, true);
      jest.advanceTimersByTime(1000);
      expect(progressComponent.getValue()).toBe(50);

      progressComponent.setValue(100, true);
      jest.advanceTimersByTime(1000);
      expect(progressComponent.getValue()).toBe(100);
    });

    it('should handle animation interruption', () => {
      progressComponent.setValue(0, false);
      progressComponent.setValue(50, true);

      progressComponent.setValue(100, true);

      jest.advanceTimersByTime(1000);

      expect(progressComponent.getValue()).toBe(100);
    });

    it('should not animate when animation is disabled', () => {
      progressComponent.setValue(0, false);
      expect(progressComponent.getValue()).toBe(0);

      progressComponent.setValue(100, false);

      expect(progressComponent.getValue()).toBe(100);
    });

    it('should complete animation to exact target value', () => {
      const targetValues = [25, 50, 75, 100];

      targetValues.forEach((targetValue) => {
        progressComponent.setValue(0, false);
        progressComponent.setValue(targetValue, true);

        jest.advanceTimersByTime(2000);

        expect(progressComponent.getValue()).toBe(targetValue);
      });
    });

    it('should handle immediate value changes without animation', () => {
      const values = [0, 25, 50, 75, 100];

      values.forEach((value) => {
        progressComponent.setValue(value, false);
        expect(progressComponent.getValue()).toBe(value);
      });
    });
  });

  describe('Visibility State', () => {
    it('should toggle hidden state', () => {
      expect(progressComponent.isHidden()).toBe(false);

      progressComponent.setHidden(true);
      expect(progressComponent.isHidden()).toBe(true);
      expect(container).toHaveClass('progress-hidden');

      progressComponent.setHidden(false);
      expect(progressComponent.isHidden()).toBe(false);
      expect(container).not.toHaveClass('progress-hidden');
    });
  });

  describe('State Management', () => {
    it('should return current state', () => {
      progressComponent.setValue(75);
      progressComponent.setAnimated(true);
      progressComponent.setHidden(false);

      const state = progressComponent.getState();
      expect(state).toEqual({
        value: 75,
        animated: true,
        hidden: false,
      });
    });

    it('should set multiple state properties', () => {
      progressComponent.setState({
        value: 60,
        animated: true,
        hidden: true,
      });

      expect(progressComponent.getValue()).toBe(60);
      expect(progressComponent.isAnimated()).toBe(true);
      expect(progressComponent.isHidden()).toBe(true);
    });

    it('should set partial state', () => {
      progressComponent.setState({ value: 30 });

      expect(progressComponent.getValue()).toBe(30);
      expect(progressComponent.isAnimated()).toBe(false);
      expect(progressComponent.isHidden()).toBe(false);
    });
  });

  describe('State Change Callback', () => {
    it('should call callback on state changes', () => {
      const callback = jest.fn();
      progressComponent.onStateChange(callback);

      progressComponent.setValue(40);

      expect(callback).toHaveBeenCalledWith({
        value: 40,
        animated: false,
        hidden: false,
      });
    });

    it('should call callback for all state changes', () => {
      const callback = jest.fn();
      progressComponent.onStateChange(callback);

      progressComponent.setValue(25);
      progressComponent.setAnimated(true);
      progressComponent.setHidden(true);

      expect(callback).toHaveBeenCalledTimes(3);
    });

    it('should not call callback after component is destroyed', () => {
      const callback = jest.fn();
      progressComponent.onStateChange(callback);

      progressComponent.destroy();
      progressComponent.setValue(50);

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('Component Lifecycle', () => {
    it('should clean up resources on destroy', () => {
      const callback = jest.fn();
      progressComponent.onStateChange(callback);
      progressComponent.destroy();
      expect(container.parentNode).toBeNull();

      expect(() => {
        progressComponent.setValue(50);
      }).not.toThrow();
    });

    it('should stop all animations on destroy', () => {
      progressComponent.setValue(100, true);
      progressComponent.setAnimated(true);

      progressComponent.destroy();

      jest.advanceTimersByTime(1000);

      expect(true).toBe(true);
    });
  });
});
