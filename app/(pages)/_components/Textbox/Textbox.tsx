import styles from './Textbox.module.scss';
import { useState, useRef, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

interface QuillEditorInstance {
  getEditor: () => {
    getLength: () => number;
    setText: (text: string) => void;
    enable: (enabled: boolean) => void;
  };
}

const Textbox = () => {
  const [content, setContent] = useState<string>('');
  const quillRef = useRef<QuillEditorInstance | null>(null);
  const maxWords = 300;

  const handleEditorChange = (newContent: string) => {
    const words = newContent
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    if (words.length <= maxWords) {
      setContent(newContent);
      if (quillRef.current) {
        const editor = quillRef.current.getEditor();
        editor.enable(true); // Enable input if word count is within the limit
      }
    } else {
      if (quillRef.current) {
        const editor = quillRef.current.getEditor();
        editor.enable(false); // Disable input if word count exceeds the limit
      }
    }
  };
  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
    ],
  };
  const quillFormats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'align',
  ];

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.setText(content);
    }
  }, [content]);

  return (
    <div className={styles.textbox_container}>
      <QuillEditor
        value={content}
        onChange={handleEditorChange}
        modules={quillModules}
        formats={quillFormats}
        className={styles.quill_style}
        theme="snow"
      />
      <div id="counter">
        {
          content
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0).length
        }{' '}
        / {maxWords}
      </div>
    </div>
  );
};

export default Textbox;
