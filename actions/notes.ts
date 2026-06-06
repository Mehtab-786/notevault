"use server";

import { prisma } from "@/lib/prisma";

export async function createNote(
  title: string,
  content: string,
  userId: string,
) {
  try {
    if (!title.trim() || !content.trim() || !userId)
      return {
        success: false,
        message: "Title, content, and userId are required",
      };

    const note = await prisma.note.create({
      data: { content, title, userId },
    });

    return {
      success: true,
      message: "Note created successfully",
      data: note,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function getAllNotes(userId:string) {
    try {
        const notes = await prisma.note.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });

        return {
            success: true,
            message: "Notes retrieved successfully",
            data: notes,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Something went wrong",
        };
    }
}

export async function getNote(id:string) {
    try {
        const note = await prisma.note.findUnique({where:{id}});
        if(!note){
            return {
                success: false,
                message: "Note not found",
            };
        }
        return {
            success: true,
            message: "Note retrieved successfully",
            data: note,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Something went wrong",
        };
    }
}

export async function updateNote(id:string, title?:string, content?:string) {
    try {

        const existingNote = await prisma.note.findUnique({ where: { id } });
        if (!existingNote) {
            return {
                success: false,
                message: "Note not found",
            };
        }
        const updatedNote = await prisma.note.update({
            where: { id },
            data: {
                title: title ?? existingNote.title,
                content: content ?? existingNote.content,
            },
        })
        return {
            success: true,
            message: "Note updated successfully",
            data: updatedNote,
        };

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Something went wrong",
        };
    }
}

export async function deleteNote(id:string) {
    try {
        const existingNote = await prisma.note.findUnique({ where: { id } });
        if (!existingNote) {
            return {
                success: false,
                message: "Note not found",
            };
        }

        await prisma.note.delete({
            where: { id },
        });

        return {
            success: true,
            message: "Note deleted successfully",
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Something went wrong",
        };
    }
}
