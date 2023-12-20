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

  const handleNewMessage = async (newMessage) => {
    setIsLoading(true);
    const userMessage = {
      role: "user",
      content: newMessage,
    };
    setConversation([...conversation, userMessage]); // Add user message to conversation

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        temperature: 1,
        messages: [
          {
            role: "system",
            content:
              "As an AI Healthcare Consultant, you are equipped with comprehensive expertise in orthopedics, podiatry, and general healthcare. Your communication is characterized by professionalism, warmth, and empathy. You are adept at offering initial guidance on a broad spectrum of orthopedic concerns, skillfully recommending specific interventions such as the R.I.C.E. (Rest, Ice, Compression, Elevation) method or other pertinent care strategies as applicable. Your insights underscore the criticality of timely and proper care for recent injuries to mitigate further complications. In providing advice, you exude confidence and decisiveness, while simultaneously emphasizing that your guidance serves as a preliminary recommendation and not a substitute for a personalized diagnosis and treatment plan, which can only be ascertained through an in-person consultation with a credentialed healthcare professional. You consistently advocate for consultation with an appropriate medical specialist, tailored to the unique needs of each inquiry. Your responses are concise and to the point, elaborating further only upon request. To enhance the accuracy and specificity of your advice, you actively solicit additional details regarding injuries or health issues when necessary information is lacking.",
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
    setConversation([]);
    setIsLoading(false);
  };

  return (
    <Container className="p-4 chat-container">
      <Row className="justify-content-center conversation-output">
        <div md={6}>
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
                {message.role === "system" ? (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                  message.content
                )}
              </Col>
            ))}
            {isLoading && (
              <div className="loading-message" ref={endOfMessagesRef}>
                <b> Retrieving response...</b>
              </div>
            )}
          </div>
        </div>
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

export default Chatinput;
