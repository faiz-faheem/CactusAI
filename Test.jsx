import { GoogleGenerativeAI, GoogleAIFileManager, FileState } from '@google/generative-ai';
import path from 'path';

// Create a GoogleGenerativeAI instance
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const fileManager = new GoogleAIFileManager(process.env.API_KEY);

// Function to process audio input (upload and analyze)
export const processAudioInput = async (file) => {
  try {
    const uploadResult = await fileManager.uploadFile(file, {
      mimeType: 'audio/mp3', // You can dynamically adjust mime type based on the file type
      displayName: path.basename(file),
    });

    let uploadedFile = await fileManager.getFile(uploadResult.file.name);

    while (uploadedFile.state === FileState.PROCESSING) {
      await new Promise((resolve) => setTimeout(resolve, 10000));  // Sleep for 10 seconds
      uploadedFile = await fileManager.getFile(uploadResult.file.name);
    }

    if (uploadedFile.state === FileState.FAILED) {
      throw new Error('Audio processing failed.');
    }

    // Generate AI content using the uploaded audio
    const result = await model.generateContent([
      "Tell me about this audio clip.",
      {
        fileData: {
          fileUri: uploadedFile.file.uri,
          mimeType: uploadedFile.file.mimeType,
        },
      },
    ]);
    return result.response.text();
  } catch (err) {
    throw new Error('Error processing the audio input.');
  }
};

// Function to process text input (unchanged)
export const processTextInput = async (text) => {
  try {
    const result = await model.generateContent([text]);
    return result.response.text();
  } catch (err) {
    throw new Error('Error processing the text input.');
  }
};
