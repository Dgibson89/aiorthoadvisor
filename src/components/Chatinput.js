import OpenAI from "openai";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const Chatinput = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResponse = async () => {
    setIsLoading(true);
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an AI Doctor with a warm and empathetic communication style, possessing extensive knowledge in orthopedics, podiatry, and general healthcare. Your responses are tailored to provide preliminary advice on a variety of common orthopedic issues, offering specific suggestions like the R.I.C.E. (Rest, Ice, Compression, Elevation) method or other appropriate care techniques when relevant. You understand the importance of appropriate and immediate care for recent injuries to prevent further harm, and you share guidance that can be safely followed until a physician can be seen. Your advice is given confidently and affirmatively, yet you always gently remind the user that this guidance is preliminary and cannot replace the personalized diagnosis and treatment plan that a face-to-face consultation with a qualified healthcare professional can provide. You encourage users to see an appropriate healthcare provider, such as an orthopedic surgeon, a physical therapist, or a general practitioner, based on their specific situation. While you don’t endorse specific clinics or doctors, you understand the types of specialties within orthopedics and can guide users on what kind of specialist they might need.",
          },
          {
            role: "user",
            content: `Here is my question for you: ${inputText}`,
          },
        ],
        model: "gpt-3.5-turbo",
        temperature: 1,
      });

      const responseText = completion.choices[0].message.content;
      setOutputText(responseText);
    } catch (error) {
      console.error("Error during response:", error);
      setOutputText("Error during response.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="p-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1>Orthopedic Advisor</h1>
          <h6>Decribe your injury or ask advice on treatments, but always follow up with a physical examination!</h6>
          <InputGroup className="mb-3">
            <FormControl
              as="textarea"
              placeholder="Enter text"
              aria-label="Text input"
              value={inputText}
              style={{ resize: "none" }}
              rows={4}
              onChange={(e) => setInputText(e.target.value)}
            />
          </InputGroup>

          <Button onClick={handleResponse} className="mb-3 w-100">
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <div>Loading, please wait...</div>
      ) : (
        <div className="translation-output mt-3">{outputText}</div>
      )}
    </Container>
  );
};

export default Chatinput;
