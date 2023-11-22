import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export function TextEditor({ onContentChange, existingReviewDescription }) {
  const [initialContent, setInitialContent] = useState("Welcome to TinyMCE!");

  useEffect(() => {
    if (existingReviewDescription) {
      setInitialContent(existingReviewDescription);
    }
  }, [existingReviewDescription]);

  const handleEditorChange = (content, editor) => {
    onContentChange(content);
  };

  return (
    <Editor
      apiKey='iokd75awv5mkifdb3j4qp387rw27smpbjgoawllblis65mrq'
      init={{
        selector: 'textarea',
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        language: 'ko_KR',
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
      }}
      initialValue={initialContent}
      onEditorChange={handleEditorChange}
    />
  );
}
