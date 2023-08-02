import Editor from '@monaco-editor/react';
import { useRef, useState, useEffect } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import axios from "axios";

export const Document = () => {

  const generateShareableLink = () => {
    if (!title) return ""; // Return an empty link if the title is empty
    const documentId = generateUniqueIdentifier();
    return `http://localhost:8000/documents/${documentId}`;
  };

  // Function to generate a unique identifier (you can use any other method)
  const generateUniqueIdentifier = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const [title, setTitle] = useState("");
  const [shareableLink, setShareableLink] = useState("");

  useEffect(() => {
    // Generate the shareable link when the document title changes
    setShareableLink(generateShareableLink());
  }, [title]);

  const editorRef = useRef(null);
  const docRef = useRef(null);

  // Editor value => A YJS text value ( A Text Value shared by multiple people )
  // One Person deletes text => Deletes from the overall shared text value
  // handled by YJS
  // Initialize YJS, tell it to listen to our Monaco instance for change

  function handleEditorDidMount (editor, monaco) {
    editorRef.current = editor;
    // Initialize YJS
    const doc = new Y.Doc(); // A Collection of shared object -> Text
    docRef.current = doc;
    // Connect to peers ( or start connection ) with webRTC
    const provider = new WebrtcProvider(title, doc); 
    const type = doc.getText("monaco"); // doc { "monaco" : "What our IDE is showing "}
    // content.current(type);
    // Bind YJS to Monaco
    const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
    console.log(provider.awareness);
    console.log(binding);
    console.log(monaco);
  }

  const handleAddDocument = async () => {
    if (editorRef.current && docRef.current) {
      const content = editorRef.current.getValue();
      const yText = docRef.current.getText("monaco");
      yText.delete(0, yText.length);
      yText.insert(0, content);
    }
    const documentId = generateUniqueIdentifier();
    const content = editorRef.current.getValue();
    await axios.post(
      "http://localhost:8000/api/document",
      {
        id: documentId,
        title: title,
        content: content,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    alert("Added Document!");
  }

  return (
    <div>
      <Card varint={"outlined"} style={{width: 400, padding: 20, marginTop: 30, height: "100%"}}>
        <TextField
          style={{marginBottom: 10}}
          onChange={(e) => {
              setTitle(e.target.value)
          }}
          fullWidth={true}
          label="Title"
          variant="outlined" />
      </Card>
      <Button
        size={"large"}
        variant="contained"
        onClick={handleAddDocument}
      > Add Document </Button>
      {shareableLink && (
        <p>
          Shareable Link: <a href={shareableLink}>{shareableLink}</a>
        </p>
      )}
      <Editor
        height="100vh"
        width="100vw"
        theme="vs-dark" 
        onMount={handleEditorDidMount}
      />
    </div>
  )
}