import React, { useState, useRef, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL; // Vite
// 或者 Next.js:
// const API_URL = process.env.NEXT_PUBLIC_API_URL;


const CHARACTERS = [
  { name: "Naruto", description: "Energetic ninja style", avatar: "🍥" },
  { name: "Luffy", description: "Funny pirate style", avatar: "🏴‍☠️" },
  { name: "Sailor Moon", description: "Cheerful magical girl style", avatar: "🌙" },
  { name: "Goku", description: "Heroic Saiyan style", avatar: "💪" },
  { name: "Doraemon", description: "Helpful robot cat style", avatar: "🐱" },
];

interface Message {
  sender: "user" | "character";
  text: string;
}

const AnimeChatUI: React.FC = () => {
  const [input, setInput] = useState("");
  const [character, setCharacter] = useState(CHARACTERS[0].name);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setChatHistory((prev) => [...prev, userMessage]);
    setLoading(true);
    setError("");
    setInput("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, character }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error || "AI response failed");
      } else {
        const characterMessage: Message = {
          sender: "character",
          text: data.response,
        };
        setChatHistory((prev) => [...prev, characterMessage]);
      }
    } catch (err: any) {
      setError(err.message || "Network error");
    }

    setLoading(false);
  };

  const selectedCharacter = CHARACTERS.find((c) => c.name === character);

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Anime Character Chat</h2>

      {/* Character Selector */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        {selectedCharacter && (
          <span style={{ fontSize: 32, marginRight: 10 }}>{selectedCharacter.avatar}</span>
        )}
        <select
          style={{ flex: 1, padding: 10 }}
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
        >
          {CHARACTERS.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name} ({c.description})
            </option>
          ))}
        </select>
      </div>

      {/* Chat history */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 10,
          minHeight: 300,
          maxHeight: 400,
          overflowY: "auto",
          marginBottom: 10,
          backgroundColor: "#f0f0f0",
        }}
      >
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: 8,
            }}
          >
            {msg.sender === "character" && selectedCharacter && (
              <div style={{ fontSize: 28, marginRight: 6 }}>{selectedCharacter.avatar}</div>
            )}
            <div
              style={{
                maxWidth: "70%",
                padding: "10px 14px",
                borderRadius: 18,
                backgroundColor: msg.sender === "user" ? "#a0e1e0" : "#ffd6aa",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <textarea
        style={{ width: "100%", height: 80, padding: 10, borderRadius: 8 }}
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />

      <button
        onClick={sendMessage}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          fontSize: 16,
          cursor: "pointer",
          borderRadius: 8,
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
        }}
        disabled={loading}
      >
        {loading ? "Waiting for reply..." : "Send"}
      </button>

      {error && <p style={{ color: "red", marginTop: 10 }}>❌ {error}</p>}
    </div>
  );
};

export default AnimeChatUI;
