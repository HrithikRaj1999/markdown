const express = require("express");
const cors = require("cors");
const { marked } = require("marked");
const hljs = require("highlight.js"); 
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


marked.setOptions({
  gfm: true, 
  breaks: true, 
  smartLists: true,
  smartypants: true,
  highlight: function (code, lang) {
    return hljs.highlightAuto(code).value; 
  },
});

app.post("/convert", (req, res) => {
  const { markdown } = req.body;
  if (!markdown) return res.status(400).json({ error: "Markdown text required" });

  try {
    const html = marked(markdown);
    res.json({ html });
  } catch (error) {
    res.status(500).json({ error: "Markdown conversion failed" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
