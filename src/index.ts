import App from './app';
import './styles/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();

  if (process.env.NODE_ENV === 'development') {
    window.app = app;
  }
});
