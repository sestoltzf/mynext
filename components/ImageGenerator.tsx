'use client';

import React, { useState, useRef } from 'react';

const prefixOptions = [
  { value: 'mitt-nasta-ar', label: 'Mitt nästa är' },
  { value: 'nasta-steg', label: 'Nästa steg tar du själv' },
  { value: 'min-nasta-utmaning', label: 'Min nästa utmaning' },
];

const TEMPLATES = {
  landscape: 'sneaky-birds-eat-lazily-1115',
  square: 'new-foxes-shiver-yearly-1756'
};

export default function ImageGenerator() {
  const [prefix, setPrefix] = useState(prefixOptions[0].value);
  const [customText, setCustomText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'landscape' | 'square'>('landscape');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateImage = async () => {
    setIsGenerating(true);
    try {
      const requestData = {
        template: TEMPLATES[selectedFormat],
        data: {
          "text.text": prefixOptions.find(opt => opt.value === prefix)?.label || prefix,
          "usertext.text": customText,
          "Huvudbild.src": selectedImage || undefined
        }
      };
      
      console.log('Sending request:', requestData);

      const response = await fetch('https://api.renderform.io/api/v2/render', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': process.env.NEXT_PUBLIC_RENDERFORM_API_KEY || '',
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      console.log('Received response:', data);
      
      if (data.msg) {
        throw new Error(data.msg);
      }
      
      setGeneratedImageUrl(data.href);
      window.open(data.href, '_blank');
    } catch (error) {
      console.error('Error details:', error);
      alert('Ett fel uppstod vid generering av bilden. Försök igen.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Välj format
        </label>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            onClick={() => setSelectedFormat('landscape')}
            className={`p-4 border rounded text-center transition-all ${
              selectedFormat === 'landscape' 
                ? 'bg-[#39705E] text-white border-[#39705E]' 
                : 'border-[#39705E] text-[#39705E] hover:bg-[#39705E]/10'
            }`}
          >
            1920x1080 (stående format)
          </button>
          <button
            onClick={() => setSelectedFormat('square')}
            className={`p-4 border rounded text-center transition-all ${
              selectedFormat === 'square' 
                ? 'bg-[#39705E] text-white border-[#39705E]' 
                : 'border-[#39705E] text-[#39705E] hover:bg-[#39705E]/10'
            }`}
          >
            1080x1080 (kvadratiskt format)
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Välj inledning
        </label>
        <select 
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          className="w-full p-2 border rounded border-gray-300 focus:border-[#39705E] focus:ring-1 focus:ring-[#39705E] outline-none transition-all"
          disabled={isGenerating}
        >
          {prefixOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Din text
        </label>
        <input
          type="text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          className="w-full p-2 border rounded border-gray-300 focus:border-[#39705E] focus:ring-1 focus:ring-[#39705E] outline-none transition-all"
          placeholder="Skriv din text här..."
          disabled={isGenerating}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Välj bild
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Max filstorlek: 10MB. Rekommenderade format: JPG, PNG, WEBP.
        </p>
        <div className="flex flex-col gap-2">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-2 border border-[#39705E] rounded text-[#39705E] hover:bg-[#39705E]/10 transition-all"
          >
            {selectedImage ? 'Byt bild' : 'Välj bild'}
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Vald bild"
              className="w-full max-h-48 object-cover rounded"
            />
          )}
        </div>
      </div>

      <button
        onClick={generateImage}
        disabled={isGenerating || !customText.trim() || !selectedImage}
        className="w-full bg-[#39705E] text-white py-2 px-4 rounded hover:bg-[#39705E]/90 disabled:bg-[#39705E]/50 disabled:cursor-not-allowed transition-all"
      >
        {isGenerating ? 'Genererar...' : 'Generera bild'}
      </button>

      {generatedImageUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Din genererade bild:</h3>
          <img 
            src={generatedImageUrl} 
            alt="Genererad bild" 
            className="w-full rounded shadow"
          />
        </div>
      )}
    </div>
  );
}