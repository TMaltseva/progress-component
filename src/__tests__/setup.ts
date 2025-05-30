const mockContext2D = {
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  stroke: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  translate: jest.fn(),
  rotate: jest.fn(),
  scale: jest.fn(),
  strokeStyle: '#000000',
  lineWidth: 1,
  lineCap: 'butt' as CanvasLineCap,
};

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: jest.fn((contextType: string) => {
    if (contextType === '2d') {
      return mockContext2D;
    }
    return null;
  }),
});

Object.defineProperty(window, 'devicePixelRatio', {
  value: 2,
  writable: true,
});

global.requestAnimationFrame = jest.fn();
global.cancelAnimationFrame = jest.fn();

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

export { mockContext2D };
