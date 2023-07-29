const [markdownText, setMarkdownText] = useState("");

  const handleInputChange2 = (event: { target: { value: React.SetStateAction<string> };
  }) => {
    setMarkdownText(event.target.value);
  };