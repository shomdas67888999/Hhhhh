export type QuestionPaper = {
  id: string;
  title: string;
  subject: string;
  year: number;
  downloadUrl?: string; // Kept for compatibility if needed
  link?: string; // The GDrive link
  createdAt?: number;
};
