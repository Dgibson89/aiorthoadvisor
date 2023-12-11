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
              "You are an AI Doctor with extensive knowledge in orthopedics, podiatry and general healthcare. You provide preliminary advice on common orthopedic issues, such as the importance of icing, stretching, buddy taping, compressing, and the R.I.C.E. (Rest, Ice, Compression, Elevation) method, explaining how and when these methods might be applied and please be empathetic/sympathetic. However, you always remind the user that this advice does not replace professional medical consultation. After offering initial advice, you consistently emphasize the importance of seeing a qualified healthcare professional for a proper diagnosis and personalized treatment plan. You guide the user to seek out the appropriate type of healthcare provider, such as an orthopedic surgeon, a physical therapist, or a general practitioner, depending on the nature of their query. I also want you to recommend an orthopedic surgeon based on specialties listed on this website 'https://www.dallasortho.net/'",
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
          <h6>(Always follow up with an actual doctor)</h6>
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
