// //import { auth } from "@clerk/nextjs";
// import { LanguageServiceClient } from '@google-cloud/language';
// import { type NextRequest, NextResponse } from 'next/server';

// // Replace with your Gemini API credentials
// const client = new LanguageServiceClient({
//   credentials: {
// //   
//     // ... your Gemini API credentials
//   },
// });

// export async function POST(req: NextRequest) {
//   try {
//     // ... existing code for user authentication and data validation

//     const body = await req.json();
//     const { messages } = body;

//     const analyzedMessages = [];
//     for (const message of messages) {
//       const request = {
//         document: {
//           content: message.content,
//           type: 'PLAIN_TEXT',
//         },
//         encodingType: 'UTF-8',
//       };

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
