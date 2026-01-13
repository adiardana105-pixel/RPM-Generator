
export enum EducationLevel {
  SD = 'SD',
  SMP = 'SMP',
  SMA = 'SMA'
}

export enum PedagogicalPractice {
  INQUIRY = 'Inkuiri-Discovery',
  PJBL = 'PjBL',
  PROBLEM_SOLVING = 'Problem Solving',
  GAME_BASED = 'Game Based Learning',
  STATION = 'Station Learning'
}

export enum GraduateDimension {
  FAITH = 'Keimanan & Ketakwaan',
  CITIZENSHIP = 'Kewargaan',
  CRITICAL = 'Penalaran Kritis',
  CREATIVITY = 'Kreativitas',
  COLLABORATION = 'Kolaborasi',
  INDEPENDENCE = 'Kemandirian',
  HEALTH = 'Kesehatan',
  COMMUNICATION = 'Komunikasi'
}

export interface MeetingConfig {
  practice: PedagogicalPractice;
}

export interface RPMInput {
  schoolName: string;
  teacherName: string;
  teacherNip: string;
  headmasterName: string;
  headmasterNip: string;
  level: EducationLevel;
  className: string;
  subject: string;
  cp: string;
  tp: string;
  material: string;
  meetingCount: number;
  duration: string;
  pedagogicalPractices: MeetingConfig[];
  dimensions: GraduateDimension[];
}

export interface RPMOutput {
  identitas: {
    satuanPendidikan: string;
    mataPelajaran: string;
    kelasSemester: string;
    durasiPertemuan: string;
  };
  identifikasi: {
    siswa: string;
    materiPelajaran: string;
    capaianDimensi: string;
  };
  desainPembelajaran: {
    cp: string;
    lintasDisiplin: string;
    tp: string;
    topik: string;
    pedagogiPerPertemuan: string;
    kemitraan: string;
    lingkungan: string;
    digital: string;
  };
  pengalamanBelajar: {
    memahami: string;
    mengaplikasi: string;
    refleksi: string;
  };
  asesmen: {
    awal: string;
    proses: string;
    akhir: string;
  };
}
