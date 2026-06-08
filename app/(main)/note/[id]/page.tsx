"use client";

import { useParams } from "next/navigation";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  LoaderCircle,
  NotebookPen,
  Pencil,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";

import { formatDate } from "@/lib/format-date";

import {
  deleteNote,
  getNote,
  updateNote,
} from "@/actions/notes";

import { Note } from "@/app/generated/prisma/client";

export default function SingleNotePage() {

   const params = useParams();

  const id = params.id as string;

  const router = useRouter();

  const [note, setNote] = useState<Note | null>(null);

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await getNote(id);

        if (!response.success) {
          console.log(response.message);

          router.push("/dashboard");

          return;
        }

        setNote(response.data || null);

        setFormData({
          title: response.data?.title || '',
          content: response.data?.content || '',
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id, router]);

  async function handleUpdate() {
    try {
      setUpdateLoading(true);

      const response = await updateNote(
        note?.id || "",
        formData.title,
        formData.content,
      );

      if (!response.success) {
        console.log(response.message);
        return;
      }

      setNote(response.data || null);

      setIsEditing(false);

    } catch (error) {
      console.log(error);

      console.log("Something went wrong");
    } finally {
      setUpdateLoading(false);
    }
  }

  async function handleDelete() {
    
    try {
      setDeleteLoading(true);

      const response = await deleteNote(
        note?.id || "",
      );

      if (!response.success) {
        console.log(response.message);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log(error);

      console.log("Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f7fb]">
        <div className="flex flex-col items-center">
          <LoaderCircle
            size={45}
            className="animate-spin text-zinc-700"
          />

          <p className="mt-4 text-sm font-medium text-zinc-500">
            Loading note...
          </p>
        </div>
      </main>
    );
  }

  if (!note) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f7fb]">
        <div className="text-center">
          <h1 className="text-3xl font-black text-zinc-900">
            Note not found
          </h1>

          <Link
            href="/dashboard"
            className="mt-5 inline-flex rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7fb]">
      {/* HERO */}
      <section className="border-b border-black/5 bg-linear-to-br from-[#f8e8ff] via-[#eef4ff] to-[#fef6e4]">
        <div className="mx-auto max-w-5xl px-5 py-10">
          {/* BACK */}
          <Link
            href="/dashboard"
            className="mb-8 flex w-fit items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-full bg-black p-2 text-white">
                  <NotebookPen size={18} />
                </div>

                <span className="text-sm font-medium text-zinc-500">
                  Your note details
                </span>
              </div>

              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
                {isEditing
                  ? "Edit Note"
                  : note?.title || "Note"}
              </h1>

              <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
                <CalendarDays size={16} />

                Created on{" "}
                {formatDate(note.createdAt)}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-3">
              {!isEditing && (
                <button
                  onClick={() =>
                    setIsEditing(true)
                  }
                  className="flex h-12 items-center gap-2 rounded-2xl bg-black px-5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <Pencil size={16} />
                  Edit Note
                </button>
              )}

              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex h-12 items-center gap-2 rounded-2xl bg-red-500 px-5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-70"
              >
                {deleteLoading ? (
                  <>
                    <LoaderCircle
                      size={16}
                      className="animate-spin"
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-5 py-10">
        <div className="overflow-hidden rounded-[40px] border border-white/40 bg-white/70 shadow-sm backdrop-blur-xl">
          <div className="bg-linear-to-r from-[#C9A7FF] via-[#90E0EF] to-[#FFE08A] p-[1px]">
            <div className="rounded-t-[40px] bg-white px-8 py-6">
              <h2 className="text-2xl font-black text-zinc-900">
                {isEditing
                  ? "Edit Your Note"
                  : "Your Note"}
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                {isEditing
                  ? "Update your note information below."
                  : "Read your saved note content."}
              </p>
            </div>
          </div>

          {/* VIEW MODE */}
          {!isEditing ? (
            <div className="space-y-8 p-8">
              <div>
                <p className="mb-2 text-sm font-semibold text-zinc-500">
                  Title
                </p>

                <h1 className="text-3xl font-black leading-tight text-zinc-900">
                  {note?.title || "Note"}
                </h1>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-zinc-500">
                  Content
                </p>

                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
                  <p className="whitespace-pre-wrap text-[15px] leading-8 text-zinc-700">
                    {note.content}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* EDIT MODE */
            <div className="space-y-6 p-8">
              {/* TITLE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-700">
                  Note Title
                </label>

                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="text-gray-500 h-14 w-full rounded-2xl border border-zinc-200 bg-white px-5 text-sm outline-none transition focus:border-black"
                />
              </div>

              {/* CONTENT */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-700">
                  Note Content
                </label>

                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      content: e.target.value,
                    })
                  }
                  className="text-gray-500 min-h-[250px] w-full resize-none rounded-3xl border border-zinc-200 bg-white p-5 text-sm leading-7 outline-none transition focus:border-black"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={handleUpdate}
                  disabled={updateLoading}
                  className="flex h-14 items-center gap-2 rounded-2xl bg-black px-6 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
                >
                  {updateLoading ? (
                    <>
                      <LoaderCircle
                        size={18}
                        className="animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <NotebookPen size={18} />
                      Save Changes
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    setIsEditing(false)
                  }
                  className="flex h-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}