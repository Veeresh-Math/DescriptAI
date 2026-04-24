// 🎙️ Voice Input - Uses Web Speech API (Browser Native - FREE!)
// No API keys needed, no credits cost

export interface VoiceRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export function createVoiceRecognition(
  onResult: (result: VoiceRecognitionResult) => void,
  onError: (error: string) => void,
  onEnd: () => void
): { start: () => void; stop: () => void; isSupported: boolean } {
  // Check browser support
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const isSupported = !!SpeechRecognition;

  if (!isSupported) {
    return {
      isSupported: false,
      start: () => onError("Voice input not supported in this browser"),
      stop: () => {}
    };
  }

  const recognition = new SpeechRecognition();
  
  // Configure for continuous listening
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: any) => {
    const results = event.results;
    const lastResult = results[results.length - 1];
    
    onResult({
      transcript: lastResult[0].transcript,
      confidence: lastResult[0].confidence,
      isFinal: lastResult.isFinal
    });
  };

  recognition.onerror = (event: any) => {
    let errorMessage = "Voice recognition error";
    
    switch (event.error) {
      case 'no-speech':
        errorMessage = "No speech detected. Please try again.";
        break;
      case 'audio-capture':
        errorMessage = "No microphone found. Please check your device.";
        break;
      case 'not-allowed':
        errorMessage = "Microphone access denied. Please allow microphone access.";
        break;
      default:
        errorMessage = `Error: ${event.error}`;
    }
    
    onError(errorMessage);
  };

  recognition.onend = () => {
    onEnd();
  };

  return {
    isSupported: true,
    start: () => {
      try {
        recognition.start();
      } catch (e) {
        onError("Failed to start voice recognition");
      }
    },
    stop: () => {
      try {
        recognition.stop();
      } catch (e) {
        // Ignore errors when stopping
      }
    }
  };
}

// Check if voice input is available
export function isVoiceInputSupported(): boolean {
  return !!(window as any).SpeechRecognition || !!(window as any).webkitSpeechRecognition;
}
