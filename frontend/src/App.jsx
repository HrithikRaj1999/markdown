import "./styles/app.css";
import useMarkdown from "./hooks/useMarkdown";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";

const App = () => {
  const { markdown: markdownText, html, error, handleMarkdownChange } = useMarkdown();

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-5">
        📝 Real-time Markdown Editor
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <CodeMirror
          value={markdownText}
          height="100%"
          extensions={[markdown()]}
          onChange={handleMarkdownChange}
          className="border border-gray-300 rounded-lg shadow-md"
        />
        <div
          className="w-full h-full min-h-screen p-4 border border-gray-300 rounded-lg shadow-md bg-white overflow-auto markdown-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
};

export default App;
