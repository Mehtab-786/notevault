"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import {
  ArrowLeft,
  LoaderCircle,
  NotebookPen,
  Sparkles,
} from "lucide-react";

import { createNote } from "@/actions/notes";

export default function CreateNotePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const userId = localStorage.getItem("userId") || "";

      if (!userId) {
        alert("User not found");
        return;
      }

      const response = await createNote(
        formData.title,
        formData.content,
        userId,
      );

      if (!response.success) {
        alert(response.message);
        return;
      }

      alert("Note created successfully");

      router.push("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7fb]">
      {/* HERO */}
      <section className="border-b border-black/5 bg-linear-to-br from-[#f8e8ff] via-[#eef4ff] to-[#fef6e4]">
        <div className="mx-auto max-w-5xl px-5 py-10">
          {/* BACK BUTTON */}
          <Link
            href="/dashboard"
            className="mb-8 flex w-fit items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* LEFT */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-full bg-black p-2 text-white">
                  <NotebookPen size={18} />
                </div>

                <span className="text-sm font-medium text-zinc-500">
                  Capture your thoughts
                </span>
              </div>

              <h1 className="text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
                Create Note
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600">
                Write down ideas, reminders, plans, or
                anything important in your personal
                workspace.
              </p>
            </div>

            {/* RIGHT */}
            <div className="hidden rounded-4xl bg-white/70 p-6 shadow-sm backdrop-blur md:block">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-purple-100 p-3">
                  <Sparkles
                    size={22}
                    className="text-purple-600"
                  />
                </div>

                <div>
                  <p className="text-sm text-zinc-500">
                    Quick Tip
                  </p>

                  <h3 className="font-bold text-zinc-900">
                    Keep notes short & clear
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="mx-auto max-w-5xl px-5 py-10">
        <div className="overflow-hidden rounded-[40px] border border-white/40 bg-white/70 shadow-sm backdrop-blur-xl">
          <div className="bg-linear-to-r from-[#C9A7FF] via-[#90E0EF] to-[#FFE08A] p-[1px]">
            <div className="rounded-t-[40px] bg-white px-8 py-6">
              <h2 className="text-2xl font-black text-zinc-900">
                New Note
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Fill in the details below to create your
                note.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-8"
          >
            {/* TITLE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                Note Title
              </label>

              <input
                type="text"
                placeholder="Enter your note title..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-5 text-sm outline-none transition focus:border-black"
                required
              />
            </div>

            {/* CONTENT */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                Note Content
              </label>

              <textarea
                placeholder="Write your note content here..."
                value={formData.content}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: e.target.value,
                  })
                }
                className="min-h-[250px] w-full resize-none rounded-3xl border border-zinc-200 bg-white p-5 text-sm leading-7 outline-none transition focus:border-black"
                required
              />
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <button
                type="submit"
                disabled={loading}
                className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-black px-5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                    Creating Note...
                  </>
                ) : (
                  <>
                    <NotebookPen size={18} />
                    Create Note
                  </>
                )}
              </button>

              <Link
                href="/dashboard"
                className="flex h-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}