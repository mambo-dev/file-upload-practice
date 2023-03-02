import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import MultipleUploadForm from "../../componets/multipe-upload-form";
import SingleUploadForm from "../../componets/single-upload-form";

export type ErrorMessage = {
  message: string;
};
export default function Home() {
  return (
    <>
      <Head>
        <title>file uploader</title>
        <meta name="description" content="File uploader" />
      </Head>

      <main className="bg-white py-10">
        <div className="w-full max-w-3xl px-3 mx-auto">
          <h1 className="mb-10 text-3xl font-bold text-slate-700">
            Upload your files
          </h1>
          <div className="space-y-10">
            <div>
              <h2 className="mb-3 text-xl font-bold text-gray-900">
                Single File Upload Form
              </h2>
              <SingleUploadForm />
            </div>
            <div>
              <h2 className="mb-3 text-xl font-bold text-gray-900">
                Multiple File Upload Form
              </h2>
              <MultipleUploadForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
