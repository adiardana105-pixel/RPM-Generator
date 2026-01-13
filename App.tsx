
import React, { useState, useCallback, useRef } from 'react';
import { 
  EducationLevel, 
  PedagogicalPractice, 
  GraduateDimension, 
  RPMInput, 
  RPMOutput,
  MeetingConfig
} from './types';
import { generateRPM } from './geminiService';
import RPMForm from './components/RPMForm';
import RPMResult from './components/RPMResult';
import { Loader2, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RPMOutput | null>(null);
  const [currentInput, setCurrentInput] = useState<RPMInput | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (input: RPMInput) => {
    setLoading(true);
    setResult(null);
    setCurrentInput(input);
    try {
      const rpmData = await generateRPM(input);
      setResult(rpmData);
    } catch (error) {
      console.error("Error generating RPM:", error);
      alert("Terjadi kesalahan saat membuat RPM. Pastikan API Key Anda valid.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAndOpenDoc = useCallback(async () => {
    if (!resultRef.current) return;

    try {
      const type = 'text/html';
      const blob = new Blob([resultRef.current.innerHTML], { type });
      const data = [new ClipboardItem({ [type]: blob })];
      await navigator.clipboard.write(data);
      
      alert("Konten telah disalin! Tab baru Google Dokumen akan dibuka. Silakan tempel (Ctrl+V) di sana.");
      window.open('https://docs.google.com/document/create', '_blank');
    } catch (err) {
      console.error('Gagal menyalin:', err);
      alert("Gagal menyalin secara otomatis. Silakan blok tabel dan salin manual.");
    }
  }, []);

  return (
    <div className="min-h-screen pb-20">
      {/* Navbar */}
      <nav className="bg-blue-700 text-white shadow-lg py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen size={28} />
            <h1 className="text-xl font-bold tracking-tight">Generator RPM</h1>
          </div>
          <p className="hidden md:block text-sm opacity-80">Perencanaan Pembelajaran Mendalam Otomatis</p>
        </div>
      </nav>

      <main className="container mx-auto px-4 mt-8 max-w-5xl">
        <div className="grid grid-cols-1 gap-8">
          {/* Form Section */}
          <section className="bg-white rounded-xl shadow-md p-6 border border-gray-100 no-print">
            <h2 className="text-lg font-semibold mb-6 border-b pb-2 flex items-center">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
              Input Detail Pembelajaran
            </h2>
            <RPMForm onSubmit={handleSubmit} isLoading={loading} />
          </section>

          {/* Loading Indicator */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="animate-spin text-blue-600" size={48} />
              <p className="text-gray-600 font-medium animate-pulse">Menyusun Rencana Pembelajaran Terbaik...</p>
            </div>
          )}

          {/* Result Section */}
          {result && currentInput && (
            <section className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
                <h2 className="text-lg font-semibold flex items-center">
                  <span className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                  Hasil Rencana Pembelajaran Mendalam
                </h2>
                <button
                  onClick={handleCopyAndOpenDoc}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md flex items-center justify-center"
                >
                  Salin & Buka di Google Dokumen
                </button>
              </div>

              <div ref={resultRef} className="bg-white rounded-xl shadow-lg p-10 border border-gray-100 overflow-x-auto print:shadow-none print:p-0">
                <RPMResult rpm={result} input={currentInput} />
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="mt-20 py-8 border-t bg-white no-print">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Generator RPM - Membantu Guru Indonesia Bertransformasi Digital
        </div>
      </footer>
    </div>
  );
};

export default App;
