
import React, { useState } from 'react';
import { 
  EducationLevel, 
  PedagogicalPractice, 
  GraduateDimension, 
  RPMInput 
} from '../types';

interface Props {
  onSubmit: (data: RPMInput) => void;
  isLoading: boolean;
}

const RPMForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Partial<RPMInput>>({
    level: EducationLevel.SD,
    meetingCount: 1,
    dimensions: [],
    pedagogicalPractices: [{ practice: PedagogicalPractice.INQUIRY }]
  });

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, level: e.target.value as EducationLevel });
  };

  const handleMeetingCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value) || 1;
    const currentPractices = [...(formData.pedagogicalPractices || [])];
    
    if (count > currentPractices.length) {
      for (let i = currentPractices.length; i < count; i++) {
        currentPractices.push({ practice: PedagogicalPractice.INQUIRY });
      }
    } else {
      currentPractices.length = count;
    }

    setFormData({ ...formData, meetingCount: count, pedagogicalPractices: currentPractices });
  };

  const handlePracticeChange = (index: number, practice: PedagogicalPractice) => {
    const practices = [...(formData.pedagogicalPractices || [])];
    practices[index] = { practice };
    setFormData({ ...formData, pedagogicalPractices: practices });
  };

  const toggleDimension = (dim: GraduateDimension) => {
    const current = formData.dimensions || [];
    if (current.includes(dim)) {
      setFormData({ ...formData, dimensions: current.filter(d => d !== dim) });
    } else {
      setFormData({ ...formData, dimensions: [...current, dim] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    onSubmit(formData as RPMInput);
  };

  const levels = [
    { label: 'Kelas 1', val: '1' }, { label: 'Kelas 2', val: '2' }, { label: 'Kelas 3', val: '3' },
    { label: 'Kelas 4', val: '4' }, { label: 'Kelas 5', val: '5' }, { label: 'Kelas 6', val: '6' },
    { label: 'Kelas 7', val: '7' }, { label: 'Kelas 8', val: '8' }, { label: 'Kelas 9', val: '9' },
    { label: 'Kelas 10', val: '10' }, { label: 'Kelas 11', val: '11' }, { label: 'Kelas 12', val: '12' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Satuan Pendidikan *</label>
          <input required type="text" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={e => setFormData({ ...formData, schoolName: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Guru *</label>
          <input required type="text" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={e => setFormData({ ...formData, teacherName: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">NIP Guru</label>
          <input type="text" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={e => setFormData({ ...formData, teacherNip: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Kepala Sekolah *</label>
          <input required type="text" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={e => setFormData({ ...formData, headmasterName: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">NIP Kepala Sekolah</label>
          <input type="text" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={e => setFormData({ ...formData, headmasterNip: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Jenjang Pendidikan</label>
          <select className="w-full border p-2 rounded" value={formData.level} onChange={handleLevelChange}>
            <option value={EducationLevel.SD}>SD</option>
            <option value={EducationLevel.SMP}>SMP</option>
            <option value={EducationLevel.SMA}>SMA</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Kelas</label>
          <select className="w-full border p-2 rounded" onChange={e => setFormData({...formData, className: e.target.value})}>
             <option value="">Pilih Kelas</option>
             {levels.filter(l => {
               const val = parseInt(l.val);
               if (formData.level === EducationLevel.SD) return val <= 6;
               if (formData.level === EducationLevel.SMP) return val >= 7 && val <= 9;
               return val >= 10;
             }).map(l => <option key={l.val} value={l.label}>{l.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Mata Pelajaran</label>
          <input required type="text" placeholder="Contoh: Matematika" className="w-full border p-2 rounded" 
            onChange={e => setFormData({ ...formData, subject: e.target.value })} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Capaian Pembelajaran (CP)</label>
          <textarea required className="w-full border p-2 rounded h-24" 
            onChange={e => setFormData({ ...formData, cp: e.target.value })}></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Tujuan Pembelajaran (TP)</label>
          <textarea required className="w-full border p-2 rounded h-24" 
            onChange={e => setFormData({ ...formData, tp: e.target.value })}></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Materi Pelajaran</label>
          <input required type="text" className="w-full border p-2 rounded" 
            onChange={e => setFormData({ ...formData, material: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Jumlah Pertemuan</label>
          <input required type="number" min="1" className="w-full border p-2 rounded" value={formData.meetingCount}
            onChange={handleMeetingCountChange} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Durasi Pertemuan (Contoh: 2 x 45 menit)</label>
          <input required type="text" className="w-full border p-2 rounded" 
            onChange={e => setFormData({ ...formData, duration: e.target.value })} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Praktik Pedagogis per Pertemuan</label>
        <div className="space-y-3">
          {formData.pedagogicalPractices?.map((p, idx) => (
            <div key={idx} className="flex items-center space-x-4 bg-gray-50 p-2 rounded border border-gray-100">
              <span className="text-sm font-medium w-24">Pertemuan {idx + 1}</span>
              <select className="flex-1 border p-1 rounded bg-white" value={p.practice}
                onChange={e => handlePracticeChange(idx, e.target.value as PedagogicalPractice)}>
                {Object.values(PedagogicalPractice).map(op => <option key={op} value={op}>{op}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Dimensi Lulusan (Pilih sesuai materi)</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.values(GraduateDimension).map(dim => (
            <label key={dim} className={`flex items-center p-2 rounded border cursor-pointer transition-colors ${formData.dimensions?.includes(dim) ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-white border-gray-200'}`}>
              <input type="checkbox" className="hidden" checked={formData.dimensions?.includes(dim)} onChange={() => toggleDimension(dim)} />
              <span className="text-xs font-medium">{dim}</span>
            </label>
          ))}
        </div>
      </div>

      <button disabled={isLoading} type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-bold transition-all disabled:bg-blue-300">
        {isLoading ? 'Sedang Memproses...' : 'Generate Rencana Pembelajaran'}
      </button>
    </form>
  );
};

export default RPMForm;
