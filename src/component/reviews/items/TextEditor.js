import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";

export function TextEditor({ onContentChange, existingReviewDescription }) {
  const [initialContent, setInitialContent] = useState(existingReviewDescription ? existingReviewDescription : "");
  const maxSizeInBytes = 1048576; // 1 MB
  const handleEditorChange = (content, editor) => {    
    onContentChange(content);

    console.log(content);
  };

  const updateImageSrc = (fileName, content, iframeDoc) => {
    // Find the defaultImg element in the iframe
    const image = iframeDoc.querySelector('img[src^="data:"]') || iframeDoc.querySelector('img[src^="blob:"]');
  
    if (image) {
      // Change the src attribute
      image.setAttribute('src', fileName);
  
      for (let i = 0; i < 10; i++) {
        // Optionally, set the alt attribute
        image.setAttribute('alt', `reviewImg[${i}]`);
      }
  
      // Resolve the promise with the response data
      return Promise.resolve({ success: true, data: { url: fileName } });
    }
  };
  
  
  const imageUploadHandler = (blobInfo, content) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      console.log("imageUploadHandler 들어옴1");
  
      // Wait for the file to be loaded
      reader.onloadend = () => {
        const binaryString = reader.result;
        const arrayBuffer = new Uint8Array(binaryString);
        const file = new File([arrayBuffer], blobInfo.filename(), { type: blobInfo.blob().type });
          if(file.size > maxSizeInBytes){
            console.log("너무 크다");
            reject(new Error("이미지 용량이 1MB를 초과합니다."));
            return;
          }
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
  
              for (let i = 0; i < 10; i++) {
                // Optionally, set the alt attribute
                defaultImg.setAttribute('alt', `reviewImg[${i}]`);
              }

              updateImageSrc(fileName, content, iframeDoc);
  
              // Resolve the promise with the response data
              resolve(res.data);
            }
          })
          .catch((error) => {
            console.error('Error during image upload:', error);
            // Reject the promise with an error message
            reject(new Error('Image upload failed.'));
          });
      };
  
      // Start reading the blob
      reader.readAsArrayBuffer(blobInfo.blob());
    });
  };
  return (
    <Editor
      apiKey='iokd75awv5mkifdb3j4qp387rw27smpbjgoawllblis65mrq'
      init={{
        images_upload_handler: imageUploadHandler,
        selector: 'iframe',
        menubar: false,
        plugins: [
          'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
        language: 'ko_KR',
        placeholder: "이미지는 드래그 후 드랍 !",
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
        setup: function (editor) {
          editor.on('error', function (e) {
            console.error('TinyMCE Error:', e);
            e.preventDefault();
          });
        },
      }}
      initialValue={initialContent}
      onEditorChange={handleEditorChange}
      images_upload_handler={(blobInfo, success, failure, progress) => {
        imageUploadHandler(blobInfo)
          .then((result) => {
            // Call success with the result data
            success(result.data.url);
          })
          .catch((error) => {
            // Call failure with an error message
            failure('이미지 업로드에 실패했습니다.');
          });
      }}
    />
  );
}

