'use client';

import React, { useState, useRef } from 'react';

const prefixOptions = [
  { value: 'mitt-nasta-ar', label: 'Mitt nästa är' },
  { value: 'nasta-steg', label: 'Nästa steg tar du själv' },
  { value: 'min-nasta-utmaning', label: 'Min nästa utmaning' },
  { value: 'lopp', label: 'Jag tränar mot' },
];

const TEMPLATES = {
  standard: {
    landscape: 'sneaky-birds-eat-lazily-1115',
    square: 'new-foxes-shiver-yearly-1756'
  },
  race: {
    landscape: 'nasty-foxes-drink-angrily-1990',
    square: 'bizarre-werewolves-whisper-loosely-1520'
  }
};

interface RaceDetails {
  name: string;
  date: string;
  distance: string;
}

interface TemplateData {
  'text.text'?: string;
  'usertext.text'?: string;
  'Huvudbild.src'?: string;
  'racename.text'?: string;
  'racedate.text'?: string;
  'distance.text'?: string;
}

export default function ImageGenerator() {
  const [prefix, setPrefix] = useState(prefixOptions[0].value);
  const [customText, setCustomText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'landscape' | 'square'>('landscape');
  const [raceDetails, setRaceDetails] = useState<RaceDetails>({
    name: '',
    date: '',
    distance: ''
  });
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
      let templateData: TemplateData = {};
      
      if (prefix === 'lopp') {
        const formattedDate = new Date(raceDetails.date).toLocaleDateString('sv-SE', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        templateData = {
          "text.text": prefixOptions.find(opt => opt.value === prefix)?.label || prefix,
          "Huvudbild.src": selectedImage || undefined,
          "racename.text": raceDetails.name,
          "racedate.text": formattedDate,
          "distance.text": raceDetails.distance
        };
      } else {
        templateData = {
          "text.text": prefixOptions.find(opt => opt.value === prefix)?.label || prefix,
          "usertext.text": customText,
          "Huvudbild.src": selectedImage || undefined
        };
      }

      const requestData = {
        template: TEMPLATES[prefix === 'lopp' ? 'race' : 'standard'][selectedFormat],
        data: templateData
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

      {prefix === 'lopp' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Loppets namn
            </label>
            <input
              type="text"
              value={raceDetails.name}
              onChange={(e) => setRaceDetails(prev => ({...prev, name: e.target.value}))}
              className="w-full p-2 border rounded border-gray-300 focus:border-[#39705E] focus:ring-1 focus:ring-[#39705E] outline-none transition-all"
              placeholder="t.ex. Stockholm Marathon"
              disabled={isGenerating}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Datum
            </label>
            <input
              type="date"
              value={raceDetails.date}
              onChange={(e) => setRaceDetails(prev => ({...prev, date: e.target.value}))}
              className="w-full p-2 border rounded border-gray-300 focus:border-[#39705E] focus:ring-1 focus:ring-[#39705E] outline-none transition-all"
              disabled={isGenerating}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Distans
            </label>
            <input
              type="text"
              value={raceDetails.distance}
              onChange={(e) => setRaceDetails(prev => ({...prev, distance: e.target.value}))}
              className="w-full p-2 border rounded border-gray-300 focus:border-[#39705E] focus:ring-1 focus:ring-[#39705E] outline-none transition-all"
              placeholder="t.ex. 42.2 km"
              disabled={isGenerating}
            />
          </div>
        </div>
      ) : (
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
      )}

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
        disabled={
          isGenerating || 
          !selectedImage || 
          (prefix === 'lopp' 
            ? (!raceDetails.name || !raceDetails.date || !raceDetails.distance)
            : !customText.trim())
        }
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