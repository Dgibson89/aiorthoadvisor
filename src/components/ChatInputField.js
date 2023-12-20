import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const ChatInputField = ({ onSendMessage }) => {
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
      <Button onClick={handleSend} className="mb-3 w-100">
        Submit
      </Button>
    </>
  );
};

export default ChatInputField;
