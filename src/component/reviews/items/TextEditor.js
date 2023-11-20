import React, { useEffect, useState } from "react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import '../../../assets/css/draft.css';

export function TextEditor({ onContentChange, uploadImageCallback, existingReviewDescription }) {
  const [description, setDescription] = useState(() => {
    if (existingReviewDescription) {
      const contentBlock = convertFromHTML(existingReviewDescription);
      const contentState = ContentState.createFromBlockArray(contentBlock);
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });

  const [previewVisible, setPreviewVisible] = useState(false);
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    const contentState = description.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const html = draftToHtml(rawContentState);

    // Call the callback function to send the HTML content back to the parent component
    onContentChange(html);

    setConvertedContent(html);
  }, [description]);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  const togglePreview = (event) => {
    event.preventDefault();
    setPreviewVisible(!previewVisible);
  };

  const blockRendererFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'atomic') {
      return {
        component: AtomicBlock,
        editable: false,
      };
    }
    return null;
  };

  const AtomicBlock = (props) => {
    const { block, contentState } = props;
    const { url, referrerPolicy } = contentState.getEntity(block.getEntityAt(0)).getData();
    console.log("where is the url.... : ", url);
    return <img src={url} alt="uploaded" referrerPolicy={referrerPolicy} />;
  };
  

  return (
    <div className="draft">
      {/* ... (existing code) */}
      <div className="editor-container">
        <Editor
          editorState={description}
          onEditorStateChange={setDescription}
          toolbar={{
            options: ['blockType', 'textAlign', 'list', 'fontSize', 'inline', 'colorPicker', 'emoji', 'image', 'remove', 'history'],
            inline: { inDropdown: false },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { uploadCallback: uploadImageCallback, alt: { present: true, mandatory: true } },
          }}
          blockRendererFn={blockRendererFn}
          localization={{
            locale: 'ko',
          }}
          required
        />
        <img src="https://i.imgur.com/lerPgV1.jpg"/>
      </div>
    </div>
  );
}