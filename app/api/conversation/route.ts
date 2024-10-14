// //import { auth } from "@clerk/nextjs";
// import { LanguageServiceClient } from '@google-cloud/language';
// import { type NextRequest, NextResponse } from 'next/server';

// // Replace with your Gemini API credentials
// const client = new LanguageServiceClient({
//   credentials: {
// //    key:"AIzaSyD-szHNZf8_imlHGLGnPUy2icjNirHO84c"
//     // ... your Gemini API credentials
//   },
// });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || messages.length === 0) {
      return new NextResponse('No messages provided', { status: 400 });
    }

    const analyzedMessages = [];

    for (const message of messages) {
      const request = {
        document: {
          content: message.content,
          type: 'PLAIN_TEXT' as const, // Use 'PLAIN_TEXT' as a string literal
        },
        encodingType: 'UTF8' as const, // Use 'UTF8' as a string literal
      };

//       try {
//       //  const [response] = await client.analyzeSentiment(request);
//        // const sentiment = response.documentSentiment;
//        // analyzedMessages.push({ ...message, sentiment }); // Add sentiment to message
//       } catch (error) {
//         console.error('Error calling Gemini API for message:', message.content, error);
//       }
//     }

//     return NextResponse.json(analyzedMessages, { status: 200 });
//   } catch (error) {
//     console.error("[CONVERSATION_ERROR]: ", error);
//     return new NextResponse("Internal server error.", { status: 500 });
//   }
// }