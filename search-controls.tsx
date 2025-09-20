"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

type SearchControlsProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  years: (string | number)[];
  subjects: string[];
};

export function SearchControls({
  searchQuery,
  setSearchQuery,
  selectedYear,
  setSelectedYear,
  selectedSubject,
  setSelectedSubject,
  onRefresh,
  isRefreshing,
  years,
  subjects,
}: SearchControlsProps) {

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex-grow">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
        <Input
          type="search"
          placeholder="Search by title, subject, or year"
          className="h-12 rounded-xl border-border bg-input pl-12 text-base shadow-inner transition-all focus:bg-background focus:shadow-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search papers"
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="h-12 w-full rounded-xl border-border bg-input text-base shadow-inner transition-all duration-200 focus:bg-background focus:shadow-md" aria-label="Filter by subject">
            <SelectValue placeholder="All subjects" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">All subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="h-12 w-full rounded-xl border-border bg-input text-base shadow-inner transition-all duration-200 focus:bg-background focus:shadow-md sm:w-full" aria-label="Filter by year">
            <SelectValue placeholder="All years" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">All years</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={String(year)}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
