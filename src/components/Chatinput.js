import OpenAI from "openai";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import ChatInputField from "./ChatInputField";
import "bootstrap/dist/css/bootstrap.min.css";
import "../ChatinputStyles.css";
import { Container, Row, Col } from "react-bootstrap";

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const Chatinput = () => {
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef(null);

  const handleResponse = async () => {
    setIsLoading(true);
    const userMessage = {
      role: "user",
      content: inputText,
    };
    setConversation([...conversation, userMessage]); // Add user message to conversation

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        temperature: 1,
        messages: [
          {
            role: "system",
            content:
              "You are an AI Doctor with a warm and empathetic communication style, possessing extensive knowledge in orthopedics, podiatry, and general healthcare. Your responses are tailored to provide preliminary advice on a variety of common orthopedic issues, offering specific suggestions like the R.I.C.E. (Rest, Ice, Compression, Elevation) method or other appropriate care techniques when relevant. You understand the importance of appropriate and immediate care for recent injuries to prevent further harm, and you share guidance that can be safely followed until a physician can be seen. Your advice is given confidently and affirmatively, yet you always gently remind the user that this guidance is preliminary and cannot replace the personalized diagnosis and treatment plan that a face-to-face consultation with a qualified healthcare professional can provide. You encourage users to see an appropriate healthcare provider, based on their specific situation.",
          },
          ...conversation,
          userMessage,
        ],
      });

      const aiMessage = {
        role: "system",
        content: completion.choices[0].message.content,
      };
      setConversation([...conversation, userMessage, aiMessage]);
      setInputText("");
    } catch (error) {
      console.error("Error during response:", error);
      setConversation([
        ...conversation,
        userMessage,
        { role: "system", content: "Error during response." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleReset = () => {
    setInputText("");
    setConversation([]);
  };

  return (
    <Container className="p-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1>Orthopedic Advisor</h1>
          <h6>
            Decribe your injury or ask advice on treatments, but always follow
            up with a physical examination!
          </h6>

          <div className="conversation-output mt-3">
            {conversation.map((message, index) => (
              <div
                key={index}
                ref={
                  index === conversation.length - 1 ? endOfMessagesRef : null
                }
                className={
                  message.role === "user" ? "user-message" : "ai-message"
                }
              >
                {message.role === "system" ? (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
            ))}
            <InputGroup className="mb-3">
              <FormControl
                as="textarea"
                placeholder="Enter your question here"
                aria-label="Text input"
                value={inputText}
                style={{ resize: "none" }}
                rows={4}
                onChange={(e) => setInputText(e.target.value)}
              />
            </InputGroup>

            <Button
              onClick={handleResponse}
              disabled={isLoading}
              className="mb-3 w-100"
            >
              {isLoading ? "Loading..." : "Submit"}
            </Button>

            <Button
              onClick={handleReset}
              className="mb-3 w-100"
              variant="danger"
            >
              Reset Chat
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chatinput;
