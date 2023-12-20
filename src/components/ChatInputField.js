import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

const ChatInputField = ({ onSendMessage, onReset, isLoading }) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSend = () => {
    onSendMessage(inputText);
    setInputText(""); // Reset the input field after sending
  };



  return (
    <>
      <InputGroup className="mb-3">
        <FormControl
          as="textarea"
          placeholder="Enter your question here"
          aria-label="Text input"
          value={inputText}
          onChange={handleInputChange}
          style={{ resize: "none" }}
          rows={4}
        />
      </InputGroup>
      <Button onClick={handleSend} className="mb-3 w-100" disabled={isLoading}>
        Submit
      </Button>
      <Button onClick={onReset} className="mb-3 w-100" variant="danger">
        Reset Chat
      </Button>
    </>
  );
};

export default ChatInputField;
