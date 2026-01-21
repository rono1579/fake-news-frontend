# Fake News Detector

A modern web application for detecting fake news and performing NLP-based text analysis. Built with Next.js and powered by AI, this tool helps users assess the credibility of news articles and online content.

## Features

- **Fake News Detection**: Analyze text for potential misinformation using AI-powered analysis
- **Plagiarism Checker**: (Coming Soon) Detect copied content across the web
- **Sentiment Analysis**: (Coming Soon) Understand the emotional tone of text
- **Modern UI**: Clean, responsive interface built with shadcn/ui
- **Dark Mode**: Built-in support for light and dark themes

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React Hook Form, React Query
- **Deployment**: Vercel (recommended)
- **AI/ML**: (Planned) Integration with NLP models for text analysis

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rono1579/fake-news-detector.git
   cd fake-news-detector
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   # Add other environment variables as needed
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Navigate to the Fake News Detection tool
2. Paste or type the text you want to analyze
3. Click "Analyze Text"
4. View the detailed analysis results including:
   - Credibility score
   - Source reliability indicators
   - Potential red flags
   - Fact-checking suggestions

## Project Structure

```
/
├── app/                    # App router pages and API routes
│   ├── api/                # API routes
│   ├── fake-news-detector/ # Main detection tool
│   ├── plagiarism-check/   # (Coming Soon) Plagiarism checker
│   └── nlp-tools/          # (Coming Soon) Additional NLP tools
│
├── components/             # Reusable UI components
│   ├── ui/                 # shadcn/ui components
│   └── theme-provider.tsx  # Theme management
│
└── public/                 # Static assets
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Radix UI](https://www.radix-ui.com/) - Primitives for building UIs
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

Project Link: [https://github.com/rono1579/fake-news-detector](https://github.com/rono1579/fake-news-detector)
