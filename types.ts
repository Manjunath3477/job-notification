
export interface Job {
  id: string;
  postDate: string;
  board: string;
  positionName: string;
  eligibility: string[];
  location: string;
  pdfUrl: string;
  lastDate: string;
  applyUrl: string;
  vacancies?: number; // Optional: number of vacancies
  salary?: string; // Optional: salary range
}

export interface MasterData {
  boards: string[];
  locations: string[];
  eligibilities: string[];
}

export type ViewType = 'user' | 'admin';
