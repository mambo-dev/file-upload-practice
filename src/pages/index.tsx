import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>File uploader</title>
        <meta name="description" content="File uploader" />
      </Head>

      <main>
        <h1>Upload your files</h1>

        <form action="">
          <input name="file" type="file" />
        </form>
      </main>

      <footer>
        <p>All right reserved</p>
      </footer>
    </>
  );
}
