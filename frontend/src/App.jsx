import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    if (!code || !code.trim()) {
      setReview("Please enter your code to review it...");
      return;
    }

    setLoading(true);
    setReview("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/ai/get-review`,
        { code }
      );

      setReview(response.data.review);
    } catch (error) {
      setReview(
        error.response?.data?.message ||
        "Something went wrong while reviewing the code."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            placeholder="Write your code here..."
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
            }}
          />
        </div>

        <div onClick={reviewCode} className="review">
          {loading ? "Reviewing..." : "✦ Review"}
        </div>
      </div>

            <div className="right">
        {loading && (
          <div className="loader-text">
            Analyzing your code...
          </div>
        )}
        {review && (
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
        )}
      </div>
    </main>
  );
}

export default App;
