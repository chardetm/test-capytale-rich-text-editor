import {
  CapytaleRichTextEditor,
  CapytaleRichTextEditorContext,
  useCapytaleRichTextEditorContext,
} from "@capytale/capytale-rich-text-editor";
import "@capytale/capytale-rich-text-editor/style.css";
import { useState } from "react";

import { JSONTree } from "react-json-tree";

import "./App.css";

import theme from "./theme.json";

function App() {
  return (
    <CapytaleRichTextEditorContext>
      <AppContent />
    </CapytaleRichTextEditorContext>
  );
}

function AppContent() {
  const [jsonOutput, setJsonOutput] = useState({});
  const [htmlOutput, setHtmlOutput] = useState("");
  const [liveJson, setliveJson] = useState(true);
  const capytaleRichTextEditorContext = useCapytaleRichTextEditorContext();

  const asyncLoad = async () => {
    if (!capytaleRichTextEditorContext.getState) {
      alert("Méthode non chargée");
    } else {
      const state = await capytaleRichTextEditorContext.getState(true, true);
      console.log("JSON :", state.json);
      console.log("HTML :", state.html);
      state.json && setJsonOutput(JSON.parse(state.json));
      state.html && setHtmlOutput(state.html);
    }
  };

  const onChange = !liveJson
    ? undefined
    : (json: string) => {
        setJsonOutput(JSON.parse(json));
      };

  return (
    <>
      <div className="editor-out-container">
        <CapytaleRichTextEditor
          onJsonChange={onChange}
          isEditable={true}
          htmlInitialContent="<h1>Test</h1><p>Voici un <a href='https://google.fr/'>lien vers Google</a>.</p>"
        />
      </div>
      <div id="output">
        <div id="json-tree">
          <JSONTree
            data={jsonOutput}
            theme={theme}
            invertTheme={true}
            hideRoot
          />
        </div>
        <textarea
          id="json-text"
          value={JSON.stringify(jsonOutput, null, 2)}
          readOnly
        />
        <textarea id="html-text" value={htmlOutput} readOnly />
      </div>
      <div id="actions">
        <button onClick={asyncLoad}>
          Récupérer l'état de manière asynchrone
        </button>{" "}
        <button onClick={() => setliveJson(!liveJson)}>
          {liveJson ? "Désactiver" : "Activer"} la mise à jour en temps réel du
          JSON
        </button>
      </div>
    </>
  );
}

export default App;
