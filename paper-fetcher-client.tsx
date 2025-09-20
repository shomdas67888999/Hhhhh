"use client";

import { useState, useMemo, useTransition, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import type { QuestionPaper } from "@/lib/types";
import { PaperCard } from "./paper-card";
import { SearchControls } from "./search-controls";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { app } from "@/lib/firebase";

export function PaperFetcherClient() {
  const [papers, setPapers] = useState<QuestionPaper[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase(app);
    const papersRef = ref(db, 'papers');
    
    startTransition(() => {
      setIsLoading(true);
    });

    const unsubscribe = onValue(papersRef, (snapshot) => {
      const papersData = snapshot.val();
      if (papersData) {
        const papersArray: QuestionPaper[] = Object.keys(papersData).map(key => ({
            id: key,
            ...papersData[key]
        })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setPapers(papersArray);
      } else {
        setPapers([]);
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Firebase onValue error:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const uniqueYears = useMemo(() => {
    const allYears = papers.map((p) => p.year).filter(Boolean);
    // @ts-ignore
    return [...new Set(allYears)].sort((a, b) => b - a);
  }, [papers]);

  const uniqueSubjects = useMemo(() => {
    const allSubjects = papers.map((p) => p.subject).filter(Boolean);
    // @ts-ignore
    return [...new Set(allSubjects)].sort();
  }, [papers]);

  const filteredPapers = useMemo(() => {
    return papers
      .filter((paper) => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;
        return (
          paper.title?.toLowerCase().includes(query) ||
          paper.subject?.toLowerCase().includes(query) ||
          String(paper.year).includes(query)
        );
      })
      .filter((paper) => {
        if (selectedYear === 'all') return true;
        return String(paper.year) === selectedYear;
      })
      .filter((paper) => {
        if (selectedSubject === 'all') return true;
        return paper.subject === selectedSubject;
      });
  }, [papers, searchQuery, selectedYear, selectedSubject]);

  const handleRefresh = () => {
    setSearchQuery("");
    setSelectedYear("all");
    setSelectedSubject("all");
  };

  const renderSkeletons = () => (
    <div className="flex justify-center items-center py-16">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-primary" />
    </div>
  );

  return (
    <>
      <div className="mb-6 rounded-2xl border-none bg-card p-4 sm:p-7 shadow-lg">
        <SearchControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          onRefresh={handleRefresh}
          isRefreshing={isPending}
          years={uniqueYears}
          subjects={uniqueSubjects}
        />

        <div className="mt-6">
          {isLoading ? (
            renderSkeletons()
          ) : filteredPapers.length > 0 ? (
            <div className="flex flex-col -my-1">
              {filteredPapers.map((paper, index) => (
                <PaperCard key={paper.id} paper={paper} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 sm:px-10 text-text-muted">
                <h3 className="text-lg font-semibold text-text-primary">No Matching Papers Found</h3>
                <p className="mt-2">The paper you are looking for is not yet available.</p>
            </div>
          )}
        </div>
      </div>
      
       <Button onClick={handleRefresh} disabled={isPending} variant="default" className="fixed bottom-4 right-4 h-14 w-14 rounded-full p-0 shadow-lg sm:bottom-6 sm:right-6 sm:w-auto sm:px-6 sm:rounded-3xl transform transition-all duration-200 hover:scale-110 active:scale-95 hover:opacity-90">
         <RefreshCw className={`h-5 w-5 ${isPending ? "animate-spin" : ""}`} />
         <span className="hidden sm:inline-block sm:ml-2">Reset & View All</span>
       </Button>
    </>
  );
}
