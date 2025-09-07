#  AI Image Caption Generator

A beautiful, modern web application that generates intelligent captions for any image using advanced AI technology.

##  Features

-  **Beautiful UI** - Modern, responsive design with gradient backgrounds
-  **Easy Upload** - Drag & drop or click to browse images
-  **AI-Powered** - Uses Hugging Face's advanced image captioning models
-  **Copy to Clipboard** - Easy caption copying functionality
-  **Real-time Processing** - Instant caption generation
-  **Responsive** - Works on desktop and mobile devices

##  Live Demo

[View Live Demo](https://your-username.github.io/ai-image-caption-generator)

##  Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **AI Service**: Hugging Face Inference API
- **Icons**: Lucide React

##  Installation

1. **Clone the repository**
   `ash
   git clone https://github.com/your-username/ai-image-caption-generator.git
   cd ai-image-caption-generator
   `

2. **Install dependencies**
   `ash
   npm install
   `

3. **Set up environment variables**
   - Create a .env.local file
   - Add your Hugging Face API key:
     `
     VITE_HF_API_KEY=your_huggingface_api_key_here
     `

4. **Start the development server**
   `ash
   npm run dev
   `

##  Getting Your Hugging Face API Key

1. Go to [Hugging Face Settings](https://huggingface.co/settings/tokens)
2. Click "New token"
3. Name: "AI Caption Generator"
4. Role: Select "Read"
5. Click "Generate a token"
6. Copy your token (starts with hf_)

##  Usage

1. Open the application in your browser
2. Upload an image (JPEG, PNG, WebP - max 10MB)
3. Wait for AI to generate a caption
4. Copy the caption to your clipboard

##  Project Structure

`
 public/
    test-image-generator.html
    test-image.html
 src/
    App.tsx
    main.tsx
    index.css
    vite-env.d.ts
 .env.local
 package.json
 README.md
`

##  Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- [Hugging Face](https://huggingface.co/) for providing the AI models
- [React](https://reactjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for beautiful styling
- [Vite](https://vitejs.dev/) for fast development

##  Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with  and AI
