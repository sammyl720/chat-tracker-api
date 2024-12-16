type DataMessage = { event: string, data: { name: string, id: string }};
export const createSSEConnection = (onMessage: (data: DataMessage) => void, onError?: (error: Event) => void) => {
    const eventSource = new EventSource(`/api/sse/events`);
  
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };
  
    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      if (onError) {
        onError(error);
      }
      eventSource.close();
    };
  
    return eventSource;
  };
  