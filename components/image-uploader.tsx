'use client';

import { useRef } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  value: File | null;
  preview: string | null;
  onChange: (file: File | null, preview: string | null) => void;
}

export function ImageUploader({ value, preview, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    onChange(file, url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">Product Image</label>
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative group cursor-pointer border-2 border-dashed border-border hover:border-primary/60 rounded-xl transition-colors duration-200 overflow-hidden"
        style={{ minHeight: 148 }}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-36 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
              <p className="text-white text-sm font-medium flex items-center gap-2">
                <Upload size={15} /> Change image
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(null, null); }}
              className="absolute top-2 right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow"
            >
              <X size={13} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-36 gap-2 text-muted-foreground">
            <ImageIcon size={28} className="opacity-30" />
            <p className="text-sm">
              Drop an image or{' '}
              <span className="text-primary font-medium">click to upload</span>
            </p>
            <p className="text-xs opacity-50">PNG, JPG, WEBP up to 10MB</p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}