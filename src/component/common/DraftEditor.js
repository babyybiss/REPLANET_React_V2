import '../../assets/css/reset.css'
//import '../../assets/css/editor.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from "react-draft-wysiwyg";

function DraftEditor({ editorState, onChange }) {
  return (
        <Editor
        editorState={editorState}
        onEditorStateChange={onChange}
        ariaLabel="contents"
        placeholder="내용을 작성해주세요."
        wrapperClassName="wrapper-class"
        toolbarClassName="toolbar"
        editorClassName="editor"
        localization={{
          locale: 'ko',
        }}
        toolbar={{
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />

  );
}

export default DraftEditor;
