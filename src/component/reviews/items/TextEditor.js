import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";


export function TextEditor({ onContentChange, existingReviewDescription }) {
  const [initialContent, setInitialContent] = useState(existingReviewDescription ? existingReviewDescription : "상세 내용을 입력해주세요.");

  const handleEditorChange = (content, editor) => {
    onContentChange(content);
    console.log(content);
  };

  const updateImageSrc = (editor, newSrc) => {
    const images = editor.contentDocument.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
      images[i].setAttribute('data-original', images[i].currentSrc);
      images[i].setAttribute('src', newSrc);
    }
  };

  const imageUploadHandler = (blobInfo, success, failure, progress, content) => {
    const reader = new FileReader();
    console.log("들어옴1");
  
    // Wait for the file to be loaded
    reader.onloadend = () => {
      const binaryString = reader.result;
      const arrayBuffer = new Uint8Array(binaryString);
      const file = new File([arrayBuffer], blobInfo.filename(), { type: blobInfo.blob().type });
  
      console.log("들어옴2");
  
      const formData = new FormData();
      formData.append('file', file);
  
      axios.post('http://localhost:8001/reviews/imageUpload', formData)
        .then((res) => {
          console.log("Image upload successful:", res.data);
          const doc = document;
          console.log(doc.getElementsByTagName("img")[0],  " hahahahahah");

            // Get all images in the content
            //const images = content.getElementsByTagName('img');
  
            // Loop through each image and replace the source
            //for (let i = 0; i < images.length; i++) {
              
           //   images[i].setAttribute('src', res.data.imageUrl);
           // }
  
            // Notify TinyMCE that the upload was successful
            if (typeof success === 'function') {
              success(res.data.imageUrl);
            }
           else {
            // If content is not valid, notify failure if it's a function
            if (typeof failure === 'function') {
              failure('Invalid content');
            }
          }
        })
        .catch((error) => {
          console.error('Error during image upload:', error);
          // Notify failure if it's a function
          if (typeof failure === 'function') {
            failure('Image upload failed');
          }
        });
    };
  
    // Start reading the blob
    reader.readAsArrayBuffer(blobInfo.blob());
  };
  
  
  
  const newSrc = "/reviewImgs/mceclip1.png";

  return (
    <Editor
      apiKey='iokd75awv5mkifdb3j4qp387rw27smpbjgoawllblis65mrq'
      init={{
        images_upload_handler: imageUploadHandler,
        selector: 'textarea',
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
        language: 'ko_KR',
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
      }}
      initialValue={initialContent}
      onEditorChange={handleEditorChange}
    />
  );
}
