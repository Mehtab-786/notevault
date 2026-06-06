"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  NotebookPen,
  Sparkles,
  Clock3,
  LoaderCircle,
} from "lucide-react";

import { getAllNotes } from "@/actions/notes";
import { formatDate } from "@/lib/format-date";
import { Note } from "@/app/generated/prisma/client";

const cardColors = [
  "from-[#FFE08A] to-[#FFC86B]",
  "from-[#C9A7FF] to-[#9B7CFF]",
  "from-[#FFB4A2] to-[#FF8FA3]",
  "from-[#B8F2E6] to-[#8EE3CF]",
  "from-[#D9ED92] to-[#B5E48C]",
  "from-[#90E0EF] to-[#48CAE4]",
];

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const userId = localStorage.getItem("userId") || "";

        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await getAllNotes(userId);

        if (response.success) {
          setNotes(response.data || []);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f7fb]">
      {/* TOP SECTION */}
      <section className="border-b border-black/5 bg-linear-to-br from-[#f8e8ff] via-[#eef4ff] to-[#fef6e4]">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* LEFT */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-full bg-black p-2 text-white">
                  <NotebookPen size={18} />
                </div>

                <span className="text-sm font-medium text-zinc-500">
                  Your personal workspace
                </span>
              </div>

              <h1 className="text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
                My Notes
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600">
                Organize ideas, save quick thoughts, and manage everything in
                one clean workspace.
              </p>
            </div>

            {/* RIGHT */}
            <Link
              href="/create"
              className="group flex w-fit items-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
            >
              <Plus
                size={18}
                className="transition group-hover:rotate-90"
              />

              Create Note
            </Link>
          </div>

          {/* STATS */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/40 bg-white/70 p-5 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">
                  Total Notes
                </span>

                <Sparkles size={18} className="text-purple-500" />
              </div>

              <h2 className="mt-4 text-3xl font-black text-zinc-900">
                {notes.length}
              </h2>
            </div>

            <div className="rounded-3xl border border-white/40 bg-white/70 p-5 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">
                  Recent Activity
                </span>

                <Clock3 size={18} className="text-orange-500" />
              </div>

              <h2 className="mt-4 text-xl font-bold text-zinc-900">
                Active Workspace
              </h2>
            </div>

            <div className="rounded-3xl border border-white/40 bg-white/70 p-5 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">
                  Productivity
                </span>

                <NotebookPen size={18} className="text-cyan-500" />
              </div>

              <h2 className="mt-4 text-xl font-bold text-zinc-900">
                Everything synced
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* NOTES SECTION */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        {/* LOADING */}
        {loading ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center">
            <LoaderCircle
              size={45}
              className="animate-spin text-zinc-700"
            />

            <p className="mt-4 text-sm font-medium text-zinc-500">
              Loading your notes...
            </p>
          </div>
        ) : notes.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[40px] border border-dashed border-zinc-300 bg-white text-center">
            <div className="rounded-full bg-zinc-100 p-5">
              <NotebookPen
                size={35}
                className="text-zinc-700"
              />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-zinc-900">
              No notes yet
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Start by creating your first note.
            </p>

            <Link
              href="/create"
              className="mt-6 rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white"
            >
              Create Your First Note
            </Link>
          </div>
        ) : (
          /* NOTES GRID */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {notes.map((note, index) => (
              <div
                key={note.id}
                className={`group relative overflow-hidden rounded-4xl bg-linear-to-br ${
                  cardColors[index % cardColors.length]
                } p-px shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl`}
              >
                <div className="flex h-full flex-col rounded-4xl bg-white/70 p-5 backdrop-blur-xl">
                  {/* TOP */}
                  <div className="flex items-start justify-between">
                    <div className="rounded-2xl bg-white p-3 shadow-sm">
                      <NotebookPen
                        size={20}
                        className="text-zinc-700"
                      />
                    </div>

                    <div className="rounded-full bg-black/10 px-3 py-1 text-xs font-medium text-zinc-700">
                      Note
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="mt-6 flex-1">
                    <h2 className="line-clamp-2 text-xl font-black leading-tight text-zinc-900">
                      {note.title}
                    </h2>

                    <p className="mt-3 line-clamp-4 text-sm leading-6 text-zinc-700">
                      {note.content}
                    </p>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-8 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-zinc-500">
                        Created
                      </p>

                      <p className="text-sm font-semibold text-zinc-800">
                        {formatDate(note.createdAt)}
                      </p>
                    </div>

                    <Link
                      href={`/note/${note.id}`}
                      className="flex items-center gap-2 rounded-2xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:scale-105"
                    >
                      <Eye size={16} />
                      View
                    </Link>
                  </div>

                  {/* DECOR */}
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-3xl" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}