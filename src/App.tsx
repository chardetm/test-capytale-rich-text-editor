import { CapytaleRichTextEditor } from "capytale-rich-text-editor";
import "capytale-rich-text-editor/style.css";
import { useState } from "react";

import { JSONTree } from "react-json-tree";

import "./App.css";

const theme = {
  scheme: "google",
  author: "seth wright (http://sethawright.com)",
  base00: "#1d1f21",
  base01: "#282a2e",
  base02: "#373b41",
  base03: "#969896",
  base04: "#b4b7b4",
  base05: "#c5c8c6",
  base06: "#e0e0e0",
  base07: "#ffffff",
  base08: "#CC342B",
  base09: "#F96A38",
  base0A: "#FBA922",
  base0B: "#198844",
  base0C: "#3971ED",
  base0D: "#3971ED",
  base0E: "#A36AC7",
  base0F: "#3971ED",
};

function App() {
  const [jsonOutput, setJsonOutput] = useState({});
  const [htmlOutput, setHtmlOutput] = useState("");

  return (
    <>
      <div className="editor-out-container">
        <CapytaleRichTextEditor
          onChange={(json: string, html: string) => {
            setJsonOutput(JSON.parse(json));
            setHtmlOutput(html);
          }}
          isEditable={true}
          htmlInitialContent="<h1>Test</h1><p>Voici un <a href='https://google.fr/'>lien vers Google</a>.</p>"
        />
      </div>
      <div id="output">
        <div id="json-tree">
          <JSONTree data={jsonOutput} theme={theme} invertTheme={true} hideRoot />
        </div>
        <textarea
          id="json-text"
          value={JSON.stringify(jsonOutput, null, 2)}
          readOnly
        />
        <textarea
          id="html-text"
          value={htmlOutput}
          readOnly
        />
      </div>
    </>
  );
}

export default App;
