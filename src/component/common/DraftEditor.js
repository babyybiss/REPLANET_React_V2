import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useState } from "react";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';

import draftToHtml from "draftjs-to-html";
import axios from "axios";

const MyBlock = styled.div`
.wrapper-class{
    width: 100%;
    margin: 0 auto;
    margin-bottom: 4rem;
}
.editor {
height: 500px !important;
border: 1px solid #f1f1f1 !important;
padding: 5px !important;
border-radius: 2px !important;
}
`;

const Container = styled.div`
        width: 100%;
        height: 80%;
        padding: 30px 10px 10px 100px;
        text-align: -webkit-center;
        .ant-descriptions-item-label{ width:100px };
        .ant-form-horizontal { width:1000px };
    `;
const header = {
  headers: {
    Authorization: "Bearer " + sessionStorage.getItem("Authorization")
  }
};

function DraftEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const campaignRegist = (value) => {
    let notice = {
      title: value.title,
      contents: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }
    axios.post('', notice, header).then((res) => {
      window.location = "/notice";
    }).catch((err) => { alert("엥?") })
  }


  return (
    <MyBlock>
      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editor"
        toolbarClassName="toolbar-class"
        // 툴바 설정
        toolbar={{
          // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
          
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
        }}
        placeholder="내용을 작성해주세요."
        // 한국어 설정
        localization={{
          locale: 'ko',
        }}
        // 초기값 설정
        editorState={editorState}
        // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
        onEditorStateChange={onEditorStateChange}
      />
    </MyBlock>
  );
}

export default DraftEditor;
