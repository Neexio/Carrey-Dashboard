export const createWebSocketConnection = (url: string, onMessage: (data: any) => void) => {
  const ws = new WebSocket(`${import.meta.env.VITE_SUPABASE_URL}/realtime/v1/websocket`);
  
  ws.onopen = () => {
    console.log('Connected to WebSocket');
    ws.send(JSON.stringify({
      type: 'subscribe',
      url: url
    }));
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  return ws;
};