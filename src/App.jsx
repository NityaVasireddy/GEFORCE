import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [platform, setPlatform] = useState('Instagram');
  const [tone, setTone] = useState('Humorous');
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload an image first.');
      return;
    }

    setLoading(true);
    setError('');
    setCaptions([]);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('platform', platform);
    formData.append('tone', tone);

    try {
      const response = await fetch('https://geforce-backend.onrender.com/generate-caption', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate captions.');
      }

      setCaptions(data.captions || []);
    } catch (err) {
      setError(err.message || 'Error connecting to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-400 mb-2">AI Caption & Meme Generator</h1>
        <p className="text-slate-400">Upload an image and choose a style to generate engagement-boosting captions!</p>
      </header>

      <main className="w-full max-w-xl bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
            />
          </div>

          {preview && (
            <div className="mt-4 flex justify-center">
              <img src={preview} alt="Upload preview" className="max-h-60 rounded-lg border border-slate-600 object-cover" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Instagram">Instagram</option>
                <option value="Twitter/X">Twitter/X</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Reddit">Reddit</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Humorous">Humorous</option>
                <option value="Professional">Professional</option>
                <option value="Sarcastic">Sarcastic</option>
                <option value="Inspirational">Inspirational</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Generating Captions...' : 'Generate Captions'}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        {captions.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-bold text-indigo-300">Generated Captions</h2>
            <ul className="space-y-3">
              {captions.map((caption, index) => (
                <li key={index} className="p-4 bg-slate-700/60 rounded-lg border border-slate-600 text-slate-200 text-sm">
                  {caption}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;