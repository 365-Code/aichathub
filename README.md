# Retrieval-Augmented Generation (RAG) Project

This project is a Retrieval-Augmented Generation (RAG) system built using various modern technologies including Vercel AI SDK, Google Generative AI, Pinecone, Supabase, Prisma, Shadcn UI, and Next.js.

## Table of Contents

1. [Installation](#installation)
2. [Supabase Setup](#supabase-setup)
3. [Prisma Setup](#prisma-setup)
4. [Google Gemini API Key](#google-gemini-api-key)
5. [useChat Hook](#usechat-hook)
6. [License](#license)

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- Supabase account
- Pinecone account
- Google Cloud account

### Next.js and Node Packages

1. Clone the repository:

    ```sh
    git clone https://github.com/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

### Required Packages

- Next.js: `npm install next react react-dom`
- Vercel AI SDK: `npm install @ai-sdk/google`
- Google Generative AI: `npm install @google/generative-ai`
- Pinecone: `npm install @pinecone-database/pinecone`
- Supabase: `npm install @supabase/supabase-js`
- Prisma: `npm install prisma @prisma/client`
- Shadcn UI: `npm install shadcn-ui`

## Supabase Setup

1. Sign in to your Supabase account and create a new project.

2. Get your Supabase URL and API Key from the project settings.

3. Create a `.env.local` file in the root directory and add the following environment variables:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

4. Configure Supabase authentication:

    ```js
    import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);
    ```

## Prisma Setup

1. Initialize Prisma in your project:

    ```sh
    npx prisma init
    ```

2. Update your `schema.prisma` file to use Supabase as your database:

    ```prisma
    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }

    generator client {
      provider = "prisma-client-js"
    }

    // Define your models here
    ```

3. Update your `.env` file with your Supabase database URL:

    ```env
    DATABASE_URL=postgresql://your-supabase-database-url
    ```

4. Generate the Prisma client:

    ```sh
    npx prisma generate
    ```

5. Run Prisma migrations:

    ```sh
    npx prisma migrate dev --name init
    ```

## Google Gemini API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).

2. Create a new project or select an existing project.

3. Enable the Google Generative AI API for your project.

4. Generate an API key and add it to your `.env.local` file:

    ```env
    NEXT_PUBLIC_GEMINI_API_KEY=your-google-gemini-api-key
    ```

## useChat Hook

1. Create a `useChat` hook to interact with your chat API.

    ```js
    import { useState, useEffect } from 'react';

    const useChat = () => {
      const [messages, setMessages] = useState([]);

      const sendMessage = async (message) => {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });

        const data = await response.json();
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      return { messages, sendMessage };
    };

    export default useChat;
    ```

2. Implement the `/api/chat` route:

    ```js
    import { NextApiRequest, NextApiResponse } from 'next';
    import { createClient } from '@ai-sdk/google';

    const client = createClient({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    export default async (req = NextApiRequest, res = NextApiResponse) => {
      if (req.method === 'POST') {
        const { message } = req.body;
        const response = await client.chat({ message });
        res.status(200).json(response);
      } else {
        res.status(405).end();
      }
    };
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
