import ImageGenerator from '../components/ImageGenerator';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Mitt Nästa Generator</h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Exempelbilder</h2>
          
          {/* Grid för alla exempelbilder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1080x1080 examples */}
            <div>
              <h3 className="text-lg font-medium mb-2">1080x1080</h3>
              <img 
                src="https://res.cloudinary.com/dwf8fxyve/image/upload/v1734435368/Screenshot_2024-12-17_at_12.35.51.png"
                alt="Exempel 1080x1080"
                className="w-full h-auto rounded shadow"
                style={{ maxHeight: '300px', objectFit: 'contain' }}
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">1080x1080</h3>
              <img 
                src="https://res.cloudinary.com/dwf8fxyve/image/upload/v1734439493/req-b306a5f5-7120-46f6-ac49-c1f15eb57e6c.jpg"
                alt="Exempel 1080x1080"
                className="w-full h-auto rounded shadow"
                style={{ maxHeight: '300px', objectFit: 'contain' }}
              />
            </div>

            {/* 1920x1080 examples */}
            <div>
              <h3 className="text-lg font-medium mb-2">1920x1080</h3>
              <img 
                src="https://res.cloudinary.com/dwf8fxyve/image/upload/v1734438460/Image_20241217_132404_193.jpg"
                alt="Exempel 1920x1080"
                className="w-full h-auto rounded shadow"
                style={{ maxHeight: '300px', objectFit: 'contain' }}
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">1920x1080</h3>
              <img 
                src="https://res.cloudinary.com/dwf8fxyve/image/upload/v1734437412/fyritrail.jpg"
                alt="Exempel 1920x1080"
                className="w-full h-auto rounded shadow"
                style={{ maxHeight: '300px', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        <ImageGenerator />
      </div>
    </main>
  );
}