export const useTextToSpeech = () => {
    const isSpeaking = ref(false);

    const speak = async (text) => {
        if (!text) return;

        isSpeaking.value = true;
        try {
            const response = await fetch('/api/speak', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error('Server TTS failed');
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);

            // Wait for playback to finish before clearing isSpeaking
            audio.onended = () => {
                isSpeaking.value = false;
            };

            audio.onerror = () => {
                isSpeaking.value = false;
            };

            audio.play();
        } catch (err) {
            console.error('Client TTS error:', err);
            isSpeaking.value = false;
        }
    };

    return { speak, isSpeaking };
};
