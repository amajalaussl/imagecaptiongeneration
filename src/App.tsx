import React, { useState, useCallback } from 'react';
import { Upload, Copy, Image as ImageIcon, Sparkles, AlertCircle, Check } from 'lucide-react';

interface CaptionResult {
  generated_text: string;
}

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateCaption = async (imageFile: File) => {
    setIsLoading(true);
    setError('');
    setCaption('');

    try {
      // Note: You'll need to set up your Hugging Face API key
      const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;
      
      if (!HF_API_KEY || HF_API_KEY === 'your_huggingface_api_key_here') {
        throw new Error('Please set up your Hugging Face API key. Get one free at https://huggingface.co/settings/tokens');
      }

      const response = await fetch(
        'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base',
        {
          headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: imageFile,
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const result: CaptionResult[] = await response.json();
      
      if (result && result[0] && result[0].generated_text) {
        setCaption(result[0].generated_text);
      } else {
        throw new Error('Invalid response from AI model');
      }
    } catch (err) {
      console.error('Caption generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate caption. Please try again.');
      
      // Demo caption for development/testing
      if (err instanceof Error && err.message.includes('API key')) {
        setCaption('Demo: A beautiful landscape with mountains and clear blue sky reflecting in a calm lake.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPEG, PNG, WebP)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('Image file size must be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    await generateCaption(file);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const copyToClipboard = async () => {
    if (caption) {
      try {
        await navigator.clipboard.writeText(caption);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  const resetGenerator = () => {
    setSelectedImage(null);
    setCaption('');
    setError('');
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              AI Image Caption Generator
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Upload any image and let our advanced AI model generate intelligent, descriptive captions automatically
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Upload className="h-5 w-5 text-blue-500" />
                  Upload Image
                </h2>
              </div>
              
              <div className="p-6">
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    isDragging
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="p-4 bg-blue-100 rounded-full">
                      <ImageIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        Drop your image here or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports JPEG, PNG, WebP (max 10MB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Reset Button */}
                {(selectedImage || caption) && (
                  <div className="mt-4">
                    <button
                      onClick={resetGenerator}
                      className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
                    >
                      Upload New Image
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Setup Instructions */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-amber-800 mb-1">API Setup Required</h3>
                  <p className="text-sm text-amber-700">
                    To use real AI caption generation, get a free API key from{' '}
                    <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                      Hugging Face
                    </a>{' '}
                    and update the code. Demo captions will show without setup.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Image Preview */}
            {selectedImage && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800">Image Preview</h2>
                </div>
                <div className="p-6">
                  <div className="relative rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="w-full h-auto max-h-96 object-contain"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Caption Results */}
            {(isLoading || caption) && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    Generated Caption
                  </h2>
                </div>
                <div className="p-6">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span className="text-gray-600">Analyzing image and generating caption...</span>
                      </div>
                    </div>
                  ) : caption ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                        <p className="text-gray-800 leading-relaxed text-lg">
                          "{caption}"
                        </p>
                      </div>
                      
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy Caption
                          </>
                        )}
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Powered by Advanced AI Technology
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Smart Analysis</h3>
              <p className="text-gray-600 text-sm">
                Uses state-of-the-art computer vision models to understand image content
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Multi-Format Support</h3>
              <p className="text-gray-600 text-sm">
                Works with JPEG, PNG, WebP and other common image formats
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Upload className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Easy Upload</h3>
              <p className="text-gray-600 text-sm">
                Simple drag & drop interface with instant processing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
