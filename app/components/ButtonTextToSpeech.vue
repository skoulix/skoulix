<template>
  <button
    type="button"
    :disabled="isSpeaking"
    class="flex items-center cursor-pointer"
    :class="isSpeaking ? 'opacity-50' : 'opacity-100'"
    @click="speakText"
  >
    <Icon
      v-if="isSpeaking"
      name="material-symbols:play-circle-outline animate-pulse"
      class="size-6"
    />

    <Icon v-else name="material-symbols:play-circle-outline" class="size-6" />
  </button>
</template>

<script setup>
const { content } = useCurrentContent();
const { speak, isSpeaking } = useTextToSpeech();

const speakText = () => {
  speak(content.value);
};
</script>
