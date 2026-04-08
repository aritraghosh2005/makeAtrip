// React chat widget — JSX version (served via Express, Babel standalone handles transpilation)

(function () {
    const { useState, useEffect, useRef } = React;

    const API_BASE = 'http://localhost:3000/api/chat';

    function renderMarkdown(text) {
        let html = text
            // Escape HTML to prevent XSS, then we'll selectively re-allow our tags
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            // Headers
            .replace(/^### (.+)$/gm, '<h4>$1</h4>')
            .replace(/^## (.+)$/gm, '<h3>$1</h3>')
            .replace(/^# (.+)$/gm, '<h2>$1</h2>')
            // Bold + italic
            .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            // Inline code
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            // Bullet lists — group consecutive lines starting with - or *
            .replace(/^[\-\*] (.+)$/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
            // Numbered lists
            .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
            // Horizontal rule
            .replace(/^---$/gm, '<hr>')
            // Paragraph breaks (double newline)
            .replace(/\n{2,}/g, '</p><p>')
            // Single line breaks
            .replace(/\n/g, '<br>');
        return '<p>' + html + '</p>';
    }

    function ChatMessage({ msg }) {
        if (msg.role === 'bot') {
            return (
                <div
                    className="chat-msg bot"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                />
            );
        }
        return <div className="chat-msg user">{msg.text}</div>;
    }

    function ChatWidget() {
        const [isOpen,    setIsOpen]    = useState(false);
        const [messages,  setMessages]  = useState([]);
        const [input,     setInput]     = useState('');
        const [isTyping,  setIsTyping]  = useState(false);
        const [sessionId, setSessionId] = useState(null);
        const welcomed  = useRef(false);
        const bottomRef = useRef(null);

        // Auto-scroll to latest message
        useEffect(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, [messages, isTyping]);

        // Listen for external trigger from openVoyaraChat()
        useEffect(() => {
            const handler = () => setIsOpen(true);
            document.addEventListener('voyara:open-chat', handler);
            return () => document.removeEventListener('voyara:open-chat', handler);
        }, []);

        function handleToggle() {
            setIsOpen(prev => {
                const opening = !prev;
                if (opening && !welcomed.current) {
                    setMessages([{
                        role: 'bot',
                        text: "Hi! I'm Voyara's AI Travel Guide. Ask me anything about destinations, hotels, tips, or travel planning!"
                    }]);
                    welcomed.current = true;
                }
                return opening;
            });
        }

        async function sendMessage() {
            const text = input.trim();
            if (!text || isTyping) return;

            setInput('');
            setMessages(prev => [...prev, { role: 'user', text }]);
            setIsTyping(true);

            try {
                const res  = await fetch(`${API_BASE}/message`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionId, message: text })
                });
                const data = await res.json();
                setIsTyping(false);

                if (data.success) {
                    setSessionId(data.sessionId);
                    setMessages(prev => [...prev, { role: 'bot', text: data.message }]);
                    if (!data.conversationActive) setSessionId(null);
                } else {
                    setMessages(prev => [...prev, { role: 'bot', text: 'Something went wrong. Please try again.' }]);
                }
            } catch (err) {
                setIsTyping(false);
                setMessages(prev => [...prev, { role: 'bot', text: 'Could not reach the server. Is the backend running?' }]);
            }
        }

        return (
            <>
                {/* Floating bubble button */}
                <button id="chat-bubble" onClick={handleToggle} aria-label="Open AI Travel Guide">
                    💬
                </button>

                {/* Chat panel */}
                <div id="chat-panel" className={isOpen ? 'open' : ''} role="dialog" aria-label="Voyara AI Travel Guide">

                    {/* Header */}
                    <div id="chat-header">
                        <span id="chat-header-title">VOYARA AI GUIDE</span>
                        <button id="chat-close" onClick={() => setIsOpen(false)} aria-label="Close chat">✕</button>
                    </div>

                    {/* Messages */}
                    <div id="chat-messages">
                        {messages.map((msg, i) => <ChatMessage key={i} msg={msg} />)}
                        {isTyping && <div className="chat-msg typing">Voyara is thinking…</div>}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input row */}
                    <div id="chat-input-row">
                        <input
                            id="chat-input"
                            type="text"
                            placeholder="Ask about any destination…"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                            autoComplete="off"
                        />
                        <button id="chat-send" onClick={sendMessage} disabled={isTyping}>SEND</button>
                    </div>
                </div>
            </>
        );
    }

    // Mount widget into a dedicated root div appended to <body>
    const chatRoot = document.createElement('div');
    chatRoot.id = 'voyara-chat-root';
    document.body.appendChild(chatRoot);
    ReactDOM.createRoot(chatRoot).render(<ChatWidget />);

    // Global hook for the AI Guide card: onclick="openVoyaraChat()"
    window.openVoyaraChat = function () {
        document.dispatchEvent(new CustomEvent('voyara:open-chat'));
    };
})();
