import Editor from '@monaco-editor/react';
import { useRef } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import { useState } from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Card} from "@mui/material";
import axios from "axios";

export const Document = () => {

  const [title, setTitle] = useState("");

  const editorRef = useRef(null);

  // Editor value => A YJS text value ( A Text Value shared by multiple people )
  // One Person deletes text => Deletes from the overall shared text value
  // handled by YJS
  // Initialize YJS, tell it to listen to our Monaco instance for change
  
  const content = useRef(null);

  function handleEditorDidMount (editor, monaco) {
    editorRef.current = editor;
    // Initialize YJS
    const doc = new Y.Doc(); // A Collection of shared object -> Text

    // Connect to peers ( or start connection ) with webRTC
    const provider = new WebrtcProvider(title, doc); 
    const type = doc.getText("monaco"); // doc { "monaco" : "What our IDE is showing "}
    content.current(type);
    // Bind YJS to Monaco
    const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
    console.log(provider.awareness);
    console.log(binding);
    console.log(monaco);
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
      <Editor
        height="100vh"
        width="100vw"
        theme="vs-dark" 
        onMount={handleEditorDidMount}
      />
      <Button
        size={"large"}
        variant="contained"
        onClick={async () => {
            await axios.post("http://localhost:8000/api/document", {
                title: title,
                content: content,
            }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            alert("Added Document!");
        }}
      > Add Document</Button>
    </div>
  )
}