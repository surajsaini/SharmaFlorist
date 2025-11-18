import React, { useState } from 'react';
import { Sparkles, RefreshCw, MessageCircle, Loader2, Share2 } from 'lucide-react';
import { generateBouquetImage } from '../services/geminiService';
import { AICustomRequest, Size, Occasion } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

export const AIGenerator: React.FC = () => {
  const [formData, setFormData] = useState<AICustomRequest>({
    color: 'Red',
    flowerType: 'Roses',
    paperColor: 'White',
    size: Size.Medium,
    occasion: Occasion.Love,
  });

  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const imageBase64 = await generateBouquetImage(formData);
      setGeneratedImage(imageBase64);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to convert base64 to blob for sharing
  const base64ToBlob = (base64: string, mimeType: string = 'image/jpeg') => {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType });
  };

  const handleOrder = async () => {
    if (!generatedImage) return;

    const text = `Hello Rose N Petals, I created a custom design using your AI tool.\n\nDetails:\n- Flowers: ${formData.flowerType}\n- Color: ${formData.color}\n- Wrapping: ${formData.paperColor}\n- Size: ${formData.size}\n- Occasion: ${formData.occasion}\n\nPlease give me a quote for this! I am attaching the design image.`;

    try {
      const blob = base64ToBlob(generatedImage);
      const file = new File([blob], "my-bouquet-design.jpg", { type: "image/jpeg" });

      // Check if Web Share API is supported and can share files (Mobile usually)
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Custom Bouquet Design',
          text: text,
        });
      } else {
        // Fallback for Desktop: Download image + Open WhatsApp
        
        // 1. Download the image
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = 'rose-n-petals-design.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 2. Open WhatsApp
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank');

        alert("Image downloaded! Please attach the downloaded image to the WhatsApp chat.");
      }
    } catch (err) {
      console.error("Error sharing:", err);
      // Ultimate fallback
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-3xl my-12 border border-primary-100 dark:border-gray-700 shadow-xl overflow-hidden relative">
        {/* Background Element */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-primary-200 dark:bg-primary-900 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
                    <Sparkles className="text-primary-500" /> AI Custom Bouquet Designer
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Can't find what you're looking for? Describe your dream bouquet and let our Artificial Intelligence visualize it for you.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Controls */}
                <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Flower Type</label>
                            <input 
                                type="text" 
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                value={formData.flowerType}
                                onChange={(e) => setFormData({...formData, flowerType: e.target.value})}
                                placeholder="e.g. Tulips, Orchids"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Flower Color</label>
                            <select 
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                value={formData.color}
                                onChange={(e) => setFormData({...formData, color: e.target.value})}
                            >
                                <option>Red</option>
                                <option>Pink</option>
                                <option>White</option>
                                <option>Yellow</option>
                                <option>Purple</option>
                                <option>Orange</option>
                                <option>Blue</option>
                                <option>Mixed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wrapping Paper</label>
                            <select 
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                value={formData.paperColor}
                                onChange={(e) => setFormData({...formData, paperColor: e.target.value})}
                            >
                                <option>White</option>
                                <option>Brown Kraft</option>
                                <option>Pink</option>
                                <option>Black</option>
                                <option>Jute/Burlap</option>
                                <option>Transparent</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Size</label>
                            <select 
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                value={formData.size}
                                onChange={(e) => setFormData({...formData, size: e.target.value as Size})}
                            >
                                {Object.values(Size).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Occasion</label>
                            <select 
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                value={formData.occasion}
                                onChange={(e) => setFormData({...formData, occasion: e.target.value})}
                            >
                                {Object.values(Occasion).map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                    </div>

                    <button 
                        onClick={handleGenerate}
                        disabled={loading}
                        className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                        {loading ? 'Dreaming up flowers...' : 'Generate Bouquet Design'}
                    </button>

                    {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                </div>

                {/* Preview */}
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full max-w-md aspect-square bg-white dark:bg-gray-700 rounded-2xl shadow-inner border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden relative group">
                        {generatedImage ? (
                            <img src={generatedImage} alt="AI Generated Bouquet" className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-center p-6 opacity-50">
                                <Sparkles size={48} className="mx-auto mb-2 text-gray-400" />
                                <p className="text-gray-500 dark:text-gray-300">Your design will appear here</p>
                            </div>
                        )}
                    </div>

                    {generatedImage && (
                        <div className="flex gap-4 mt-6 w-full max-w-md">
                             <button 
                                onClick={handleGenerate}
                                disabled={loading}
                                className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2 transition-colors"
                            >
                                <RefreshCw size={18} /> Regenerate
                            </button>
                            <button 
                                onClick={handleOrder}
                                className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
                            >
                                <Share2 size={18} /> Share/Order
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>
  );
};