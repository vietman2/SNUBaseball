import { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";

interface Props {
    setContent: (content: string) => void;
  uploadImage: (file: File) => Promise<{ status: number; data: any } | null>;
}

export function ContentInput({ setContent, uploadImage }: Readonly<Props>) {
  const quillRef = useRef<ReactQuill>(null);

  const handleUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (!input.files || !quillRef || !quillRef.current) return;

      const file = input.files[0];
      if (file) {
        try {
          // Send the image to your backend server
          const response = await uploadImage(file);

          if (!response) {
            return;
          }

          const data = response.data;
          const imageUrl = data.image; // Assuming the server returns the URL of the uploaded image

          // Insert the image into the editor
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();


          if (range) {
            quill.insertEmbed(range.index, "image", imageUrl);
          }
        } catch (error) {}
      }
    };
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image"],
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "italic", "underline", "strike"],
        ],
        handlers: {
          image: handleUpload,
        },
      },
    };
  }, []);

  return (
    <Container>
      <ReactQuill
        theme="snow"
        modules={modules}
        ref={quillRef}
        onChange={setContent}
        style={{ height: "90%", width: "100%" }}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 8px;
`;
