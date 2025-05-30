import '@testing-library/jest-dom';

beforeEach(() => {
  if (document.body.replaceChildren) {
    document.body.replaceChildren();
  } else {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  }

  jest.clearAllMocks();
});

afterEach(() => {
  if (jest.isMockFunction(setTimeout)) {
    jest.clearAllTimers();
  }
});

const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = jest.fn();
  console.warn = jest.fn();
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});
