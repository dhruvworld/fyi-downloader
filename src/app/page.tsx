import LinkInput from '@/components/LinkInput';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            FYI Downloader
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Download videos and audio from various platforms with ease. 
            Simply paste a URL and choose your preferred format.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <LinkInput />
        </div>

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Downloads</h3>
            <p className="text-gray-600">Quick and efficient downloads using yt-dlp</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Formats</h3>
            <p className="text-gray-600">Choose from various video and audio formats</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-gray-600">Your downloads are processed locally</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
          <p className="mt-2">
            Powered by{' '}
            <a 
              href="https://github.com/yt-dlp/yt-dlp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              yt-dlp
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
