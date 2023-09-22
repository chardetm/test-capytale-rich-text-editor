import { CapytaleRichTextEditor } from "capytale-rich-text-editor";
import "capytale-rich-text-editor/style.css";
import { useState } from "react";
import "./App.css";

function App() {
  const [output, setOutput] = useState("");
  return (
    <>
      <div className="editor-out-container">
        <CapytaleRichTextEditor
          onChange={(content: string) =>
            setOutput(JSON.stringify(JSON.parse(content), null, 2))
          }
          isEditable={true}
          htmlInitialContent="<h1>Test</h1><p>Voici un <a href='https://google.fr/'>lien vers Google</a>.</p>"
        />
      </div>
      <textarea id="json-output" value={output} />
    </>
  );
}

export default App;
