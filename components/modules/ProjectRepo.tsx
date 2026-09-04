"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

import { ProjectArchitecture } from "@/components/modules/ProjectArchitecture";
import { ProjectChangelog } from "@/components/modules/ProjectChangelog";
import { ProjectCode } from "@/components/modules/ProjectCode";
import { ProjectPackageJson } from "@/components/modules/ProjectPackageJson";
import { ProjectReadme } from "@/components/modules/ProjectReadme";
import { Document } from "@/components/ui/Document";
import { CtaButton, StatusChip } from "@/components/ui/bits";
import type { Project } from "@/content/types";

const FILES = [
  { id: "readme", name: "README.md", badge: "MD" },
  { id: "architecture", name: "architecture.md", badge: "MD" },
  { id: "changelog", name: "CHANGELOG.md", badge: "MD" },
  { id: "package", name: "package.json", badge: "JSON" },
  { id: "src", name: "src/project.ts", badge: "TS" },
] as const;

type FileId = (typeof FILES)[number]["id"];

function FileContent({ id, project }: { id: FileId; project: Project }) {
  switch (id) {
    case "readme":
      return <ProjectReadme project={project} />;
    case "architecture":
      return <ProjectArchitecture project={project} />;
    case "changelog":
      return <ProjectChangelog project={project} />;
    case "package":
      return <ProjectPackageJson project={project} />;
    case "src":
      return <ProjectCode project={project} />;
  }
}

/**
 * Opening a project opens a repository, not a card. README.md is the
 * default file — everything else (architecture, activity, the manifest,
 * the raw object) is one click away, the same open-tabs grammar the OS
 * itself already uses for the whole site, recursed one level down into a
 * single project.
 */
export function ProjectRepo({ project }: { project: Project }) {
  const [openFiles, setOpenFiles] = useState<FileId[]>(["readme"]);
  const [activeFile, setActiveFile] = useState<FileId>("readme");

  const openFile = (id: FileId) => {
    setOpenFiles((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveFile(id);
  };

  const closeFile = (id: FileId) => {
    setOpenFiles((prev) => {
      const idx = prev.indexOf(id);
      const next = prev.filter((f) => f !== id);
      if (next.length === 0) return prev;
      if (activeFile === id) {
        setActiveFile(next[Math.min(idx, next.length - 1)]);
      }
      return next;
    });
  };

  return (
    <Document wide>
      <Link
        href="/projects"
        className="text-faint hover:text-text mb-8 inline-flex items-baseline gap-1.5 font-mono text-micro transition-colors duration-150"
      >
        <span aria-hidden>←</span>
        projects/
      </Link>

      <header className="anim-rise mb-8">
        <p className="label text-faint mb-3">projects/{project.slug}</p>
        <h1 className="text-h1 sm:text-display text-text font-medium tracking-[-0.02em] text-balance">
          {project.name}
        </h1>
        <p className="text-body text-muted mt-4 max-w-[62ch] text-pretty">
          {project.description}
        </p>

        {(project.links.live || project.links.github) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.live && (
              <CtaButton href={project.links.live} primary external>
                Live Demo
              </CtaButton>
            )}
            {project.links.github && (
              <CtaButton href={project.links.github} external>
                Source
              </CtaButton>
            )}
          </div>
        )}
      </header>

      <div className="layer overflow-hidden rounded-sm">
        {/* Repository metadata — every value here is a real field on the
            project, never an invented star count or commit streak. */}
        <div className="hair-b flex flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-2.5">
          <StatusChip status={project.status} />
          <Dot />
          <span className="text-faint font-mono text-micro">{project.role}</span>
          <Dot />
          <span className="text-faint tnum font-mono text-micro">{project.year}</span>
          <Dot />
          <span className="text-faint tnum font-mono text-micro">
            {FILES.length} files
          </span>
        </div>

        <div className="md:flex">
          {/* File manifest — a horizontal switcher on mobile, a real sidebar
              on desktop. Selecting a file opens it as a tab; it's already
              the active one either way. */}
          <nav
            aria-label="Project files"
            className="no-scrollbar flex gap-1 overflow-x-auto border-b p-1.5 md:w-44 md:shrink-0 md:flex-col md:gap-0 md:overflow-visible md:border-r md:border-b-0 md:p-0 md:py-1.5"
          >
            {FILES.map((file) => {
              const active = file.id === activeFile;
              return (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => openFile(file.id)}
                  aria-current={active ? "true" : undefined}
                  className={`group relative flex shrink-0 items-center gap-2 rounded-xs px-2.5 py-1.5 text-left font-mono text-micro transition-colors duration-150 md:w-full md:rounded-none md:px-3 md:py-2 ${
                    active
                      ? "bg-accent-tint text-text"
                      : "text-faint hover:text-text hover:bg-surface-2"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`hidden md:block md:absolute md:top-1 md:bottom-1 md:left-0 md:w-0.5 ${
                      active ? "bg-accent" : "bg-transparent"
                    }`}
                  />
                  <span className="truncate">{file.name}</span>
                  <span className="text-faint ml-auto hidden shrink-0 text-[9px] tracking-wide md:inline">
                    {file.badge}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="min-w-0 flex-1">
            {/* Open tabs — desktop only; the mobile switcher above already
                does this job in less space. */}
            <div
              role="tablist"
              aria-label="Open files"
              className="hair-b no-scrollbar hidden items-stretch overflow-x-auto md:flex"
            >
              {openFiles.map((id) => {
                const file = FILES.find((f) => f.id === id)!;
                const active = id === activeFile;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveFile(id)}
                    className={`hair-r anim-fade group relative flex shrink-0 items-center gap-2 py-2 pr-1.5 pl-3 font-mono text-micro transition-colors duration-150 ${
                      active
                        ? "text-text bg-surface-2"
                        : "text-faint hover:text-muted hover:bg-surface"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute top-0 right-0 left-0 h-px ${
                        active ? "bg-accent" : "bg-transparent"
                      }`}
                    />
                    <span>{file.name}</span>
                    {openFiles.length > 1 && (
                      <span
                        role="button"
                        tabIndex={-1}
                        aria-label={`Close ${file.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          closeFile(id);
                        }}
                        className="text-faint hover:text-text hover:bg-surface-3 flex size-4 items-center justify-center rounded-xs opacity-0 transition-opacity duration-150 group-hover:opacity-100 focus-visible:opacity-100"
                      >
                        <X aria-hidden size={10} strokeWidth={2} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div key={activeFile} className="anim-fade overflow-x-auto px-5 py-5">
              <FileContent id={activeFile} project={project} />
            </div>
          </div>
        </div>
      </div>
    </Document>
  );
}

function Dot() {
  return (
    <span aria-hidden className="text-faint">
      ·
    </span>
  );
}
