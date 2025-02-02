import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(async ({ file }) => {
    return { url: file.url }; // Faqat URL ni qaytaramiz
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;