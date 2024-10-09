import { type NextRequest, NextResponse } from 'next/server';
import { LanguageServiceClient } from '@google-cloud/language';

// The client automatically picks up the GOOGLE_APPLICATION_CREDENTIALS environment variable
const client = new LanguageServiceClient();

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

      try {
        // Call to Google Cloud Natural Language API to analyze sentiment
        const [response] = await client.analyzeSentiment(request);
        const sentiment = response.documentSentiment;

        // Push analyzed message with sentiment score
        analyzedMessages.push({
          content: message.content,
          sentimentScore: sentiment?.score,
          sentimentMagnitude: sentiment?.magnitude,
        });
      } catch (error) {
        console.error('Error calling Google API for message:', message.content, error);
        analyzedMessages.push({
          content: message.content,
          error: 'Failed to analyze sentiment',
        });
      }
    }

    return NextResponse.json(analyzedMessages, { status: 200 });
  } catch (error) {
    console.error('[CONVERSATION_ERROR]:', error);
    return new NextResponse('Internal server error.', { status: 500 });
  }
}
