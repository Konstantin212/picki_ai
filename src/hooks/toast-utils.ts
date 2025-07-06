let count = 0;

function genId(): string {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

// Global toast function for direct usage
export const toast = () => {
  const id = genId();

  // This would need to be connected to the toast state management
  // For now, it's a placeholder that can be extended
  console.warn('Toast utility called - implement connection to toast state');

  return {
    id,
    dismiss: () => {
      console.warn('Toast dismiss called - implement connection to toast state');
    },
    update: () => {
      console.warn('Toast update called - implement connection to toast state');
    },
  };
};
