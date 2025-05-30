import App from '../../../../app';

describe('App', () => {
  let app: App;
  let orientationLabel: HTMLElement;

  beforeEach(() => {
    app = new App();
    orientationLabel = document.querySelector('.orientation-label') as HTMLElement;
  });

  afterEach(() => {
    app.destroy();
  });

  describe('Initialization', () => {
    it('should create app with all components', () => {
      const container = document.querySelector('.app-container');
      const progressSection = document.querySelector('.progress-section');
      const controls = document.querySelector('.controls');

      expect(container).toBeInTheDocument();
      expect(progressSection).toBeInTheDocument();
      expect(controls).toBeInTheDocument();
      expect(orientationLabel).toBeInTheDocument();
    });
  });

  describe('Orientation Adaptation', () => {
    it('should show Portrait by default', () => {
      expect(orientationLabel.textContent).toBe('Portrait');
    });

    it('should update orientation label on resize to landscape', () => {
      Object.defineProperty(window, 'innerWidth', {
        value: 568,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(window, 'innerHeight', {
        value: 320,
        writable: true,
        configurable: true,
      });

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => {
          if (query === '(orientation: landscape)') {
            return {
              matches: true,
              media: query,
              onchange: null,
              addListener: jest.fn(),
              removeListener: jest.fn(),
              addEventListener: jest.fn(),
              removeEventListener: jest.fn(),
              dispatchEvent: jest.fn(),
            };
          }
          return {
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          };
        }),
      });

      window.dispatchEvent(new Event('resize'));

      expect(orientationLabel.textContent).toBe('Landscape');
    });

    it('should update orientation label back to portrait', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: query === '(orientation: landscape)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
      window.dispatchEvent(new Event('resize'));
      expect(orientationLabel.textContent).toBe('Landscape');

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
      window.dispatchEvent(new Event('resize'));

      expect(orientationLabel.textContent).toBe('Portrait');
    });
  });

  describe('Controls Integration', () => {
    it('should have working value input', () => {
      const valueInput = document.querySelector('.value-input') as HTMLInputElement;
      expect(valueInput).toBeInTheDocument();
      expect(valueInput.type).toBe('number');
    });

    it('should have working toggle switches', () => {
      const animateToggle = document.querySelector('#animateToggle');
      const hideToggle = document.querySelector('#hideToggle');

      expect(animateToggle).toBeInTheDocument();
      expect(hideToggle).toBeInTheDocument();
    });
  });
});
