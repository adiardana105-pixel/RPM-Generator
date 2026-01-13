
import React from 'react';
import { RPMOutput, RPMInput } from '../types';

interface Props {
  rpm: RPMOutput;
  input: RPMInput;
}

const RPMResult: React.FC<Props> = ({ rpm, input }) => {
  return (
    <div className="w-full leading-relaxed text-sm text-gray-900 rpm-table-container">
      <h1 className="text-center font-bold text-xl mb-6 underline">RENCANA PEMBELAJARAN MENDALAM (RPM)</h1>
      
      {/* 1. IDENTITAS */}
      <table className="w-full border-collapse border border-black mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th colSpan={2} className="border border-black p-2 text-left font-bold text-base">1. IDENTITAS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2 w-1/3 font-medium">Nama Satuan Pendidikan</td>
            <td className="border border-black p-2">{rpm.identitas.satuanPendidikan}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-medium">Mata Pelajaran</td>
            <td className="border border-black p-2">{rpm.identitas.mataPelajaran}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-medium">Kelas / Semester</td>
            <td className="border border-black p-2">{rpm.identitas.kelasSemester}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-medium">Durasi Pertemuan</td>
            <td className="border border-black p-2">{rpm.identitas.durasiPertemuan}</td>
          </tr>
        </tbody>
      </table>

      {/* 2. IDENTIFIKASI */}
      <table className="w-full border-collapse border border-black mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th colSpan={2} className="border border-black p-2 text-left font-bold text-base">2. IDENTIFIKASI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2 w-1/3 font-medium align-top">Siswa</td>
            <td className="border border-black p-2 text-justify">{rpm.identifikasi.siswa}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-medium align-top">Materi Pelajaran</td>
            <td className="border border-black p-2">{rpm.identifikasi.materiPelajaran}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-medium align-top">Capaian Dimensi Lulusan</td>
            <td className="border border-black p-2">{rpm.identifikasi.capaianDimensi}</td>
          </tr>
        </tbody>
      </table>

      {/* 3. DESAIN PEMBELAJARAN */}
      <table className="w-full border-collapse border border-black mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th colSpan={2} className="border border-black p-2 text-left font-bold text-base">3. DESAIN PEMBELAJARAN</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2 w-1/3 font-medium align-top">Capaian Pembelajaran (CP)</td>
            <td className="border border-black p-2 text-justify">{rpm.desainPembelajaran.cp}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-medium align-top">Lintas Disiplin Ilmu</td>
            <td className="border border-black p-2">{rpm.desainPembelajaran.lintasDisiplin}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-medium align-top">Tujuan Pembelajaran (TP)</td>
            <td className="border border-black p-2">{rpm.desainPembelajaran.tp}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-medium align-top">Topik Pembelajaran</td>
            <td className="border border-black p-2">{rpm.desainPembelajaran.topik}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-medium align-top">Praktik Pedagogis per Pertemuan</td>
            <td className="border border-black p-2">{rpm.desainPembelajaran.pedagogiPerPertemuan}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-medium align-top">Kemitraan Pembelajaran</td>
            <td className="border border-black p-2">{rpm.desainPembelajaran.kemitraan}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-medium align-top">Lingkungan Pembelajaran</td>
            <td className="border border-black p-2">{rpm.desainPembelajaran.lingkungan}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-medium align-top">Pemanfaatan Digital</td>
            <td className="border border-black p-2">{rpm.desainPembelajaran.digital}</td>
          </tr>
        </tbody>
      </table>

      {/* 4. PENGALAMAN BELAJAR */}
      <table className="w-full border-collapse border border-black mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th colSpan={2} className="border border-black p-2 text-left font-bold text-base">4. PENGALAMAN BELAJAR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2 w-1/3 font-medium align-top">Memahami (Kegiatan Awal)</td>
            <td className="border border-black p-2 text-justify">{rpm.pengalamanBelajar.memahami}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-medium align-top">Mengaplikasi (Kegiatan Inti)</td>
            <td className="border border-black p-2 text-justify whitespace-pre-wrap">{rpm.pengalamanBelajar.mengaplikasi}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-medium align-top">Refleksi (Kegiatan Penutup)</td>
            <td className="border border-black p-2 text-justify">{rpm.pengalamanBelajar.refleksi}</td>
          </tr>
        </tbody>
      </table>

      {/* 5. ASESMEN PEMBELAJARAN */}
      <table className="w-full border-collapse border border-black mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th colSpan={2} className="border border-black p-2 text-left font-bold text-base">5. ASESMEN PEMBELAJARAN</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2 w-1/3 font-medium align-top">Asesmen Awal (Diagnostik)</td>
            <td className="border border-black p-2">{rpm.asesmen.awal}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-medium align-top">Asesmen Proses (Observasi)</td>
            <td className="border border-black p-2">{rpm.asesmen.proses}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-medium align-top">Asesmen Akhir (Produk/Tugas)</td>
            <td className="border border-black p-2">{rpm.asesmen.akhir}</td>
          </tr>
        </tbody>
      </table>

      {/* Signatures */}
      <div className="mt-12 flex justify-between">
        <div className="text-left w-1/2">
          <p className="mb-20">Mengetahui,<br />Kepala Sekolah</p>
          <p className="font-bold underline uppercase">{input.headmasterName}</p>
          <p>NIP. {input.headmasterNip || '-'}</p>
        </div>
        <div className="text-right w-1/2">
          <p className="mb-20">Jakarta, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br />Guru Mata Pelajaran</p>
          <p className="font-bold underline uppercase">{input.teacherName}</p>
          <p>NIP. {input.teacherNip || '-'}</p>
        </div>
      </div>
    </div>
  );
};

export default RPMResult;
