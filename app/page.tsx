import ImageGenerator from '../components/ImageGenerator';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Mitt Nästa Generator</h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Exempelbilder</h2>
          
          {/* 1080x1080 examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="max-w-md">
              <h3 className="text-lg font-medium mb-2">1080x1080</h3>
              <img 
                src="https://res.cloudinary.com/dwf8fxyve/image/upload/v1734435148/Screenshot_2024-12-17_at_12.32.04.png"
                alt="Exempel 1080x1080"
                className="w-full h-auto rounded shadow"
              />
            </div>
            <div className="max-w-md">
              <h3 className="text-lg font-medium mb-2">1080x1080</h3>
              <img 
                src="https://res.cloudinary.com/dwf8fxyve/image/upload/v1734435368/Screenshot_2024-12-17_at_12.35.51.png"
                alt="Exempel 1080x1080"
                className="w-full h-auto rounded shadow"
              />
            </div>
          </div>

          {/* 1920x1080 examples */}
          <div className="grid grid-cols-1 gap-6">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-lg font-medium mb-2">1920x1080</h3>
              <img 
                src="https://res.cloudinary.com/dwf8fxyve/image/upload/v1734437342/1920x1080.jpg"
                alt="Exempel 1920x1080"
                className="w-full h-auto rounded shadow"
              />
            </div>
            <div className="max-w-3xl mx-auto">
              <h3 className="text-lg font-medium mb-2">1920x1080</h3>
              <img 
                src="https://res.cloudinary.com/dwf8fxyve/image/upload/v1734437412/fyritrail.jpg"
                alt="Exempel 1920x1080"
                className="w-full h-auto rounded shadow"
              />
            </div>
          </div>
        </div>

        <ImageGenerator />
      </div>
    </main>
  );
}