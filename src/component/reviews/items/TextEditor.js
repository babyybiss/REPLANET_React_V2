import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";

export function TextEditor({ onContentChange, existingReviewDescription }) {
  const [initialContent, setInitialContent] = useState(existingReviewDescription ? existingReviewDescription : "상세 내용을 입력해주세요.");

  const handleEditorChange = (content, editor) => {    
    onContentChange(content);
    console.log(content);
  };

  const updateImageSrc = (image, newSrc) => {
    // Store the original source and file name as data attributes
    image.setAttribute('data-original', image.currentSrc);
    image.setAttribute('data-file-name', newSrc);
  
    // Set the new source
    image.setAttribute('src', newSrc);
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
          const responseData = res.data;
          const fileName = responseData.imageUrl;
          console.log("file name? : ", fileName);
  
          // Get the TinyMCE editor iframe
          const iframe = document.querySelector('iframe');
          const iframeDoc = iframe.contentDocument;
          
          // Find the defaultImg element in the iframe
          const defaultImg = iframeDoc.querySelector('img[src^="data:"]') || iframeDoc.querySelector('img[src^="blob:"]');

          if (defaultImg) {
            // Change the src attribute
            defaultImg.setAttribute('src', fileName);

            for(let i = 0; i < 10; i++) {
              // Optionally, set the alt attribute
              defaultImg.setAttribute('alt', `reviewImg[${i}]`);
            }

          // Notify TinyMCE that the upload was successful
          if (typeof success === 'function') {
            success(res.data.imageUrl);
          } else {
            // If content is not valid, notify failure if it's a function
            if (typeof failure === 'function') {
              failure('Invalid content');
            }
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

  return (
    <Editor
      apiKey='iokd75awv5mkifdb3j4qp387rw27smpbjgoawllblis65mrq'
      init={{
        images_upload_handler: imageUploadHandler,
        selector: 'iframe',
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
