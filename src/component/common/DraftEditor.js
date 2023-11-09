import '../../assets/css/reset.css'
//import '../../assets/css/editor.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Editor } from "react-draft-wysiwyg";
import { PostCampaignAPI } from "../../apis/CampaignListAPI";



function DraftEditor({editorState,setEditorState}) {
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  console.log(setEditorState,'셋');

  return (
      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editor"
        toolbarClassName="toolbar-class"
        // 툴바 설정
        toolbar={{
          // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
          options: ['blockType', 'textAlign', 'list', 'fontSize', 'inline', 'colorPicker', 'emoji', 'image', 'remove', 'history'],
          inline: { inDropdown: false },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
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
  );
}

export default DraftEditor;
