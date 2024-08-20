"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploaderComp: React.FC = () => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const container = document.getElementById('container');

    function _err(message: string) {
      if (container) {
        container.innerHTML = `${message}`;
      }
    }

    async function fileloader(file: File) {
      const reader = new FileReader();
      
      return new Promise<void>((resolve, reject) => {
        reader.onloadend = async () => {
          try {
            const base64String = (reader.result as string).split(',')[1];
            const response = await fetch('/api/fileuploader', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                fileData: base64String,
                fileName: file.name,
              }),
            });

            if (response.ok) {
              const data = await response.json();
              _err(`${data.message}`);
            } else {
              _err(`${response.statusText}`);
            }
            resolve();
          } catch (error) {
            _err(`Error uploading file: ${(error as Error).message}`);
            reject(error);
          }
        };

        reader.onerror = () => {
          _err('Error reading file');
          reject(new Error('Error reading file'));
        };

        reader.readAsDataURL(file);
      });
    }

    async function processFiles(files: File[]) {
      for (const file of files) {
        await fileloader(file);
      }
    }

    _err('Uploading Started...');
    try {
      await processFiles(acceptedFiles);
    } catch (error) {
      _err(`Error processing files: ${(error as Error).message}`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [trackEvent, setTrackEvent] = useState<boolean>(false);

  useEffect(() => {
    setTrackEvent(isDragActive);
  }, [isDragActive]);

  const animatedBorder: string = trackEvent ? "border-4 border-neutral-900" : "border-4 border-amber-600";

  return (
    <div id='container' className={`w-full h-80 border-dashed ${animatedBorder} rounded-3xl place-content-center text-center cursor-pointer`} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive}
      {
        trackEvent
          ? <p>Drop the files here ...</p>
          : <p>Drag &amp; drop some files here, or click to select files</p>
      }
    </div>
  );
}

export default FileUploaderComp;
