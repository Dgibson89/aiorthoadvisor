import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import ChatInputField from "./ChatInputField";
import "bootstrap/dist/css/bootstrap.min.css";
import "../ChatinputStyles.css";
import { Container, Row, Col } from "react-bootstrap";

const ChatInput = () => {
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef(null);

  const handleNewMessage = async (newMessage) => {
    if (!newMessage.trim() || isLoading) return;

    setIsLoading(true);

    const userMessage = {
      role: "user",
      content: newMessage,
    };

    setConversation((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation,
          newMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      const aiMessage = {
        role: "assistant",
        content: data.reply,
      };

      setConversation((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error during response:", error);

      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, isLoading]);

  const handleReset = () => {
    setConversation([]);
    setIsLoading(false);
  };

  return (
    <Container className="p-4 chat-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1>Orthopedic Advisor</h1>
          <h6>
            Describe your injury or ask advice on treatments, but always follow
            up with a physical examination!
          </h6>

          <div className="conversation-output mt-3">
            {conversation.map((message, index) => (
              <Col
                key={index}
                md={12}
                ref={
                  index === conversation.length - 1 && !isLoading
                    ? endOfMessagesRef
                    : null
                }
                className={
                  message.role === "user" ? "user-message" : "ai-message"
                }
              >
                {message.role === "assistant" ? (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                  message.content
                )}
              </Col>
            ))}

            {isLoading && (
              <div className="loading-message" ref={endOfMessagesRef}>
                <b>Retrieving response...</b>
              </div>
            )}
          </div>
        </Col>
      </Row>

      <Row className="chat-input">
        <Col md={12}>
          <ChatInputField
            onSendMessage={handleNewMessage}
            onReset={handleReset}
            isLoading={isLoading}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatInput;