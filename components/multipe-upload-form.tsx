import Image from "next/image";
import React, { useState } from "react";
import { ErrorMessage } from "../src/pages";

type Props = {};

export default function MultipleUploadForm({}: Props) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[] | null>(null);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadedFile, setUploadedFiles] = useState("");
  //define upload changer
  function handleFileUploadChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("on upload change", e);
    const selectedFile = e.target;
    if (!selectedFile.files) {
      setError({
        message: "no files chosen",
      });
      return;
    }

    if (selectedFile.files.length === 0) {
      setError({
        message: "file list is empty",
      });
      return;
    }

    const files = selectedFile.files;
    //only images
    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith("image")) {
        setError({ message: `File with idx: ${i} is invalid` });

        continue;
      }

      validFiles.push(file);
    }

    if (!validFiles.length) {
      setError({ message: `No valid files were chosen"` });

      return;
    }
    setPreviewUrls(
      validFiles.map((validFile) => URL.createObjectURL(validFile))
    );
    setFiles(validFiles);
    //reset file input
    e.currentTarget.type = "text";
    e.currentTarget.type = "file";
  }

  //cancel button
  function handleCancelFile(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!previewUrls && !files) {
      setError({
        message: "no file chosen",
      });
      return;
    }
    setFiles(null);
    setPreviewUrls(null);
  }

  //upload button
  async function handleUploadFile(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log(files);
    //@ts-ignore
    if (files?.length <= 0) {
      setError({
        message: "no file chosen",
      });
      return;
    }

    try {
      let formData = new FormData();

      files?.forEach((file) => {
        formData.append("media", file);
      });
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const {
        data,
        error,
      }: {
        data: {
          url: string | string[];
        } | null;
        error: string | null;
      } = await res.json();

      if (error || !data) {
        setError({
          message: error || "Sorry! something went wrong.",
        });

        return;
      }
      setSuccess(true);
      setFiles(null);
      setPreviewUrls(null);

      console.log("Files were uploaded successfully:", data);
    } catch (error) {
      console.error(error);
      setSuccess(false);
      setError({
        message: "Sorry! something went wrong",
      });
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full p-3 border border-gray-300 rounded-md border-dashed"
      >
        <div className="flex flex-col  gap-1.5 md:py-4">
          {previewUrls ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
              {previewUrls.map((url: string, index: number) => (
                <div
                  key={index}
                  className=" w-full border border-slate-300 h-64 rounded-md relative"
                >
                  <Image
                    alt="file uploader preview"
                    src={url}
                    sizes=""
                    fill
                    className="rounded-md "
                  />
                </div>
              ))}
            </div>
          ) : (
            <label className="flex flex-col gap-y-2 items-center justify-center flex-grow h-full py-3 transition-colors duration-150 cursor-pointer hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-10 h-10 text-blue-400"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>

              <strong className="text-sm font-medium">
                Select an image (uploads multipe at a time)
              </strong>
              <input
                className="block w-0 h-0"
                name="file"
                type="file"
                onChange={handleFileUploadChange}
                multiple
              />
            </label>
          )}
          <div className="flex mt-4 md:mt-0 md:flex-col  justify-center gap-1.5">
            <button
              disabled={!previewUrls}
              onClick={handleUploadFile}
              className="w-1/2 md:w-full bg-blue-600 shadow  rounded-md inline-flex items-center justify-center  px-4 py-3 text-sm font-medium text-white transition-colors duration-300 disabled:bg-blue-200 hover:bg-blue-600"
            >
              upload files
            </button>
            <button
              disabled={!previewUrls}
              onClick={handleCancelFile}
              className="w-1/2 md:w-full border border-red-500 disabled:border-0 rounded-md inline-flex items-center justify-center  px-4 py-3 text-sm font-medium hover:text-white text-red-500 disabled:text-white transition-colors duration-300 disabled:bg-red-200 hover:bg-red-500"
            >
              cancel files
            </button>
          </div>
        </div>
      </form>
      {error && error.message.length > 0 && (
        <div className="w-full flex items-center justify-center mt-2 text-red-500 text-sm font-semibold gap-x-3">
          <p>{error.message}</p>
          <button
            onClick={() => setError(null)}
            className="inline-flex items-center justify-center w-fit px-1 text-blue-500 outline-none rounded focus:ring-2 ring-slate-600 "
          >
            ok
          </button>
        </div>
      )}
      {success && (
        <div className="w-full flex items-center justify-center mt-2 text-green-500 text-sm font-semibold gap-x-3">
          <p>sucessfully uploaded file</p>
          <button
            onClick={() => setSuccess(false)}
            className="inline-flex items-center justify-center w-fit px-1 text-blue-500 outline-none rounded focus:ring-2 ring-slate-600 "
          >
            ok
          </button>
        </div>
      )}
    </>
  );
}
