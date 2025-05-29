# Progress Component

A modern, responsive circular progress component built with vanilla TypeScript, HTML5 Canvas, and SCSS. Designed specifically for mobile web applications with smooth animations and touch-friendly controls.

## 🚀 Demo

- **Live Demo**: [GitHub Pages Link](https://github.com/TMaltseva/progress-component/)
- **Repository**: [GitHub Repository](https://github.com/TMaltseva/progress-component)

## ✨ Features

- **🎯 Pure Vanilla Stack**: No frameworks or external dependencies
- **📱 Mobile-First Design**: Optimized for mobile devices with responsive layout
- **🔄 Smooth Animations**: Canvas-based rendering with 60fps animations
- **🎨 Modern UI**: Clean design with glassmorphism effects
- **♿ Accessible**: Full keyboard navigation
- **🌐 Cross-Platform**: Works on modern browsers and devices
- **🔄 Orientation Adaptation**: Automatically adjusts layout between portrait and landscape modes

## 🛠️ Tech Stack

- **TypeScript** - Type-safe JavaScript with modern ES6+ features
- **HTML5 Canvas** - High-performance graphics rendering
- **SCSS** - Advanced CSS with variables, mixins, and responsive design
- **Vanilla JavaScript** - No external frameworks or libraries
- **ESLint + Prettier** - Code quality and formatting

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/TMaltseva/progress-component
   cd progress-component
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

5. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   # or
   yarn deploy
   ```

## 🎮 Usage

### Basic Implementation

```typescript
import ProgressComponent from './components/progress/progress.component';

// Create progress instance
const progress = new ProgressComponent({
  value: 25,
  animated: false,
  hidden: false
});

// Render to DOM
document.body.append(progress.render());

// Update value with animation
progress.setValue(75, true);

// Toggle animations
progress.setAnimated(true);

// Hide/show component
progress.setHidden(false);
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── base/
│   │   └── component.ts          # Base component class
│   └── progress/
│       ├── progress.component.ts # Main progress component
│       ├── progress.ui.ts        # Canvas rendering logic
│       ├── progress.constants.ts # Configuration constants
│       └── progress.styles.scss  # Component styles
├── styles/
│   ├── _variables.scss           # SCSS variables
│   ├── _mixins.scss             # Reusable mixins
│   ├── _animations.scss         # Animation keyframes
│   ├── _base.scss               # Base styles
│   └── main.scss                # Global styles
├── utils/
│   └── dom.utils.ts             # DOM manipulation utilities
├── app.ts                       # Main application class
├── index.ts                     # Application entry point
└── index.html                   # HTML template
```

## 🎛️ Component API

### ProgressComponent

#### Constructor Options

```typescript
interface ProgressOptions {
  value: number;    // Progress value (0-100)
  animated: boolean; // Enable rotation animation
  hidden: boolean;   // Hide component
}
```

#### Public Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `setValue(value, animated?)` | `number, boolean` | Set progress value with optional animation |
| `setAnimated(animated)` | `boolean` | Toggle rotation animation |
| `setHidden(hidden)` | `boolean` | Show/hide component |
| `getValue()` | - | Get current progress value |
| `isAnimated()` | - | Check if animation is enabled |
| `isHidden()` | - | Check if component is hidden |
| `getState()` | - | Get complete component state |
| `setState(state)` | `Partial<ProgressOptions>` | Update multiple properties |
| `onStateChange(callback)` | `function` | Listen to state changes |
| `destroy()` | - | Clean up component resources |

#### States

- **Normal**: Basic progress display with animated fill transitions
- **Animated**: Continuous rotation animation of the entire component
- **Hidden**: Component is invisible and non-interactive

### Responsive Breakpoints

```scss
$breakpoint-mobile-small: 480px;
$breakpoint-mobile: 768px;
$breakpoint-tablet: 992px;
$breakpoint-desktop: 1200px;
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run lint` - Run TypeScript and SCSS linters
- `npm run test` - Run unit tests
- `npm run deploy` - Deploy to GitHub Pages

### Development Guidelines

1. **TypeScript**: Strict mode enabled with full type safety
2. **SCSS**: BEM methodology for CSS class naming
3. **Code Style**: ESLint + Prettier configuration included
4. **Browser Support**: Modern browsers (ES2018+)

## 👨‍💻 Author

**Maltseva Tamara**
- Frontend Developer
- [GitHub Profile](https://github.com/TMaltseva/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Changelog

### v1.0.0 (2025-05-29)
- Initial release
- Circular progress component with canvas rendering
- Mobile-responsive design
- Smooth animations and transitions
- Full TypeScript support
- SCSS styling system

---

*Built with ❤️ using vanilla web technologies for Ozon Bank*