import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QuestionPaper } from "@/lib/types";

type PaperCardProps = {
  paper: QuestionPaper;
  index: number;
};

function convertDriveLink(link: string | undefined): string {
    if (!link) return '#';
    try {
      const idMatch = link.match(/\/d\/([a-zA-Z0-9_-]{25,})/) ||
                      link.match(/[?&]id=([a-zA-Z0-9_-]{25,})/);
      if (idMatch && idMatch[1]) {
        return 'https://drive.google.com/uc?export=download&id=' + idMatch[1];
      }
    } catch (e) { console.error('Error parsing GDrive link:', e); }
    return link;
}

export function PaperCard({ paper, index }: PaperCardProps) {
  const downloadUrl = convertDriveLink(paper.link);
  const animationDelay = `${index * 50}ms`;

  return (
    <div className="flex animate-fade-in-up items-center gap-4 rounded-2xl px-3 py-3 transition-all duration-200 hover:bg-accent" style={{ animationDelay }}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 text-primary">
        <FileText className="h-5 w-5" />
      </div>
      <div className="flex-grow overflow-hidden">
        <strong className="text-base font-semibold text-text-primary truncate">{paper.title || 'Untitled'}</strong>
        <div className="mt-0.5 text-sm text-text-muted">
          {paper.subject || 'N/A'} &bull; {paper.year || 'N/A'}
        </div>
      </div>
      <div className="text-right">
          <Button asChild size="default" variant="default" className="h-10 w-10 rounded-full p-0 transition-all duration-200 hover:scale-105 active:scale-95 sm:h-12 sm:w-auto sm:px-5 sm:rounded-xl hover:opacity-90">
              <a href={downloadUrl} download target="_blank" rel="noopener noreferrer">
                <Download className="h-5 w-5" />
                <span className="hidden sm:inline">Download</span>
              </a>
          </Button>
      </div>
    </div>
  );
}
