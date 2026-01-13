
import { GoogleGenAI, Type } from "@google/genai";
import { RPMInput, RPMOutput } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function generateRPM(input: RPMInput): Promise<RPMOutput> {
  const pedagogiStr = input.pedagogicalPractices.map((p, i) => `Pertemuan ${i+1}: ${p.practice}`).join(', ');
  const dimensiStr = input.dimensions.join(', ');

  const prompt = `
    Bertindaklah sebagai ahli kurikulum pendidikan Indonesia. Buatlah Perencanaan Pembelajaran Mendalam (RPM) berdasarkan data berikut:
    
    Nama Satuan Pendidikan: ${input.schoolName}
    Jenjang: ${input.level}
    Kelas: ${input.className}
    Mata Pelajaran: ${input.subject}
    Capaian Pembelajaran (CP): ${input.cp}
    Tujuan Pembelajaran (TP): ${input.tp}
    Materi: ${input.material}
    Jumlah Pertemuan: ${input.meetingCount}
    Durasi: ${input.duration}
    Praktik Pedagogis: ${pedagogiStr}
    Dimensi Lulusan: ${dimensiStr}

    Harap generate konten untuk bagian-bagian berikut dalam Bahasa Indonesia yang formal (EYD):
    1. Deskripsi karakteristik Siswa (sesuai jenjang dan materi).
    2. Lintas Disiplin Ilmu yang terkait dengan materi ini.
    3. Topik Pembelajaran spesifik.
    4. Kemitraan Pembelajaran (instansi/tokoh yang bisa dilibatkan).
    5. Lingkungan Pembelajaran yang mendukung.
    6. Pemanfaatan Digital (rekomendasi tools spesifik seperti Kahoot, Canva, PhET, dll).
    7. Pengalaman Belajar:
       - Memahami (Kegiatan Awal: Berkesadaran, bermakna, menggembirakan).
       - Mengaplikasi (Kegiatan Inti: Sesuai sintaks dari ${pedagogiStr}).
       - Refleksi (Kegiatan Penutup).
    8. Asesmen:
       - Awal (Diagnostik/Apersepsi).
       - Proses (Observasi/Rubrik).
       - Akhir (Produk/Tugas/Presentasi).

    Pastikan output adalah JSON murni sesuai schema.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          siswa: { type: Type.STRING },
          lintasDisiplin: { type: Type.STRING },
          topik: { type: Type.STRING },
          kemitraan: { type: Type.STRING },
          lingkungan: { type: Type.STRING },
          digital: { type: Type.STRING },
          memahami: { type: Type.STRING },
          mengaplikasi: { type: Type.STRING },
          refleksi: { type: Type.STRING },
          asesmenAwal: { type: Type.STRING },
          asesmenProses: { type: Type.STRING },
          asesmenAkhir: { type: Type.STRING },
        },
        required: ["siswa", "lintasDisiplin", "topik", "kemitraan", "lingkungan", "digital", "memahami", "mengaplikasi", "refleksi", "asesmenAwal", "asesmenProses", "asesmenAkhir"]
      }
    }
  });

  const rawJson = JSON.parse(response.text || '{}');

  return {
    identitas: {
      satuanPendidikan: input.schoolName,
      mataPelajaran: input.subject,
      kelasSemester: `${input.className} / Ganjil/Genap`,
      durasiPertemuan: `${input.meetingCount} x ${input.duration}`
    },
    identifikasi: {
      siswa: rawJson.siswa,
      materiPelajaran: input.material,
      capaianDimensi: dimensiStr
    },
    desainPembelajaran: {
      cp: input.cp,
      lintasDisiplin: rawJson.lintasDisiplin,
      tp: input.tp,
      topik: rawJson.topik,
      pedagogiPerPertemuan: pedagogiStr,
      kemitraan: rawJson.kemitraan,
      lingkungan: rawJson.lingkungan,
      digital: rawJson.digital
    },
    pengalamanBelajar: {
      memahami: rawJson.memahami,
      mengaplikasi: rawJson.mengaplikasi,
      refleksi: rawJson.refleksi
    },
    asesmen: {
      awal: rawJson.asesmenAwal,
      proses: rawJson.asesmenProses,
      akhir: rawJson.asesmenAkhir
    }
  };
}
