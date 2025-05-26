import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  const client = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY,
  });
  try {
    const response = await client.textToSpeech.convert(voiceId, {
      text: body.text,
      output_format: 'mp3_44100_128',
      model_id: 'eleven_multilingual_v2',
    });
    return response;
  } catch (error) {
    console.log(error);
    setResponseStatus(event, 500);
  }
});
