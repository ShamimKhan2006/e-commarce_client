"use client";

import { useState, useCallback } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ImageUpload({
  value,
  onChange,
  preview,
  onPreviewChange,
  placeholder = "Upload image",
  className = "",
  aspectRatio = "aspect-video",
}) {
  const [uploading, setUploading] = useState(false);

  const handleFile = useCallback(
    async (file) => {
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be under 5MB.");
        return;
      }

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || !data.url) {
          throw new Error(data.error || "Upload failed");
        }

        onChange?.(data.url);
        onPreviewChange?.(data.url);
        toast.success("Image uploaded");
      } catch (e) {
        console.error(e);
        toast.error(e.message || "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onChange, onPreviewChange]
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer?.files?.[0];
      handleFile(file);
    },
    [handleFile]
  );

  const onPaste = useCallback(
    (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const file = items[0]?.getAsFile?.();
      handleFile(file);
    },
    [handleFile]
  );

  const clear = (e) => {
    e.stopPropagation();
    onChange?.("");
    onPreviewChange?.("");
  };

  const src = preview || value;

  return (
    <div
      className={`relative rounded-2xl border border-dashed border-border bg-muted/30 transition-colors hover:border-primary/60 ${aspectRatio} ${className}`}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onPaste={onPaste}
      tabIndex={0}
      role="button"
      aria-label="Upload image"
    >
      {src ? (
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <img src={src} alt="Uploaded" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={clear}
            className="absolute right-2 top-2 rounded-full bg-background/90 p-1.5 text-muted-foreground hover:text-destructive backdrop-blur-sm"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-4 text-center">
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            {uploading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <Upload className="h-6 w-6" />
            )}
          </div>
          <span className="text-sm font-medium text-foreground">
            {uploading ? "Uploading..." : placeholder}
          </span>
          <span className="text-xs text-muted-foreground">
            Drag & drop, paste, or click to browse
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}
