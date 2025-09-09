# AI Cutout

🎨 **AI-powered image cutout tool** built with Vue 3, TypeScript, and Dify workflow platform.

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🤖 **AI-Powered** - Intelligent image type recognition and processing
- 👤 **Portrait Cutout** - Precise human figure extraction with hair detail preservation
- 🛍️ **Product Cutout** - E-commerce optimized background removal
- 🎨 **Graphic Cutout** - Logo and icon element extraction
- 📱 **Single Page App** - Clean, simple interface without complex routing
- 💾 **Local Storage** - Results saved locally, no backend required
- ⚡ **Fast Processing** - Real-time progress feedback
- 🎯 **High Accuracy** - Professional-grade AI algorithms via Dify platform

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/LynnCen/ai-cutout.git
cd ai-cutout

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:3000 to see the application.

### Build for Production

```bash
npm run build
```

## 🏗️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Vue 3** | Frontend framework | ^3.4.0 |
| **TypeScript** | Type safety | ^5.3.3 |
| **Vite** | Build tool | ^5.0.8 |
| **Tailwind CSS** | Styling | ^3.3.6 |
| **Dify** | AI workflow platform | API |

## 📁 Project Structure

```
ai-cutout/
├── src/
│   ├── App.vue              # Main application component
│   ├── main.ts              # Application entry point
│   ├── style.css            # Tailwind CSS styles
│   ├── composables/         # Vue composables (with side effects)
│   │   ├── useMatting.ts    # Image processing logic
│   │   └── useFileUpload.ts # File upload handling
│   ├── services/            # Service layer
│   │   └── dify.ts          # Dify API client
│   ├── types/               # TypeScript definitions
│   │   └── index.ts         # Core types
│   └── utils/               # Pure utility functions
│       └── image.ts         # Image processing utilities
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── vite.config.ts           # Vite configuration
```

## 🎯 How to Use

1. **Upload Image**: Click or drag an image to the upload area
2. **Select Type**: Choose cutout type or use auto-detection
3. **Process**: Click "Start Cutout" and wait for AI processing
4. **Download**: View results and download the cutout image

## 🔧 Configuration

### Dify API Setup

Configure your Dify API credentials in `src/services/dify.ts`:

```typescript
const DIFY_BASE_URL = 'your-dify-api-url';
const DIFY_API_KEY = 'your-api-key';
```

### Tailwind Customization

Customize styles in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* custom colors */ }
    }
  }
}
```

## 🏛️ Architecture Highlights

### Clean Architecture
- **Pure Functions**: Utility functions without side effects
- **Composables**: Vue composables for stateful logic
- **Type Safety**: Full TypeScript coverage
- **No Backend**: Frontend-only with AI API integration

### Modern Development
- **Composition API**: Vue 3's latest paradigm
- **Fetch API**: Native HTTP client, no axios dependency
- **ES Modules**: Modern JavaScript modules
- **Hot Reload**: Instant development feedback

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Dify](https://dify.ai/) - AI workflow platform
- [Vue.js](https://vuejs.org/) - Progressive JavaScript framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

## 📊 Browser Support

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

---

⭐ **Star this repo if you find it helpful!**