import { useState } from "react";
import axios from "axios";

const useMarkdown = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const [error, setError] = useState(null);


  const handleMarkdownChange = async (value) => {
    setMarkdown(value);

    try {
      const response = await axios.post("http://localhost:8000/convert", {
        markdown: value,
      });
      setHtml(response.data.html);
      setError(null);
    } catch (error) {
      console.error("Error converting markdown:", error?.response?.data.error);
      setError(error?.response?.data.error);
    }
  };

  return { markdown, html, error, handleMarkdownChange };
};

export default useMarkdown;
