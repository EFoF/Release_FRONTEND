import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkDown() {
  const [markdownText, setMarkdownText] = useState("");

  const handleInputChange2 = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMarkdownText(event.target.value);
  };

  const markdownContent = `
  # 시작
  블라블라블라
  - 순서 없는 목록 1
      - 목록 1.1
      - 목록 1.2
  - 순서 없는 목록 2
     
  `;
  const markdown = `# This is a H1
  ## This is a H2
  ### This is a H3
  #### This is a H4
  ##### This is a H5
  ###### This is a H6`;

  return (
    <div
      style={{
        width: "50rem",
        height: "50rem",
      }}
    >
      <textarea
        value={markdownText}
        onChange={handleInputChange2}
        style={{
          width: "30rem",
          height: "30rem",
        }}
      />
      {/*<div>*/}
      {/*  /!* <ReactMarkdown children={markdownText} remarkPlugins={[remarkGfm]} /> *!/*/}
      {/*  <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdownContent} />*/}
      {/*  <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>*/}
      {/*</div>*/}
    </div>
  );
}
