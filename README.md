## file upload

Dealing with file uploads is an important part of many applications, and this project is aimed at helping developers(myself included) understand how to handle file uploads using Next.js and Formidable.

Formidable is a Node.js module for parsing form data, including file uploads. This project uses Formidable to create an API route in Next.js that allows users to upload a profile picture.

To get started with this project, follow these steps:

Install Next.js and Tailwind CSS in your project using the TypeScript flag:

npx create-next-app my-app --example "https://github.com/vercel/next-learn-starter/tree/main/typescript" --typescript
npm install tailwindcss

Install the formidable package using npm install formidable.

Create an API route in your Next.js project that handles file uploads. You can copy the code from the pages/api/upload-profile-picture.ts file in this project.

Customize the file upload directory and file size limits to fit your application's needs.

Test your file upload functionality by sending a multipart/form-data request to your API route using a tool like Postman or cURL.

If you encounter any issues or need additional guidance, refer to the comments in the code and the official documentation for Next.js, Tailwind CSS, and Formidable.
