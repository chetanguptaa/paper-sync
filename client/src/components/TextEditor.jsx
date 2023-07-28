/* eslint-disable react/prop-types */
import JoditEditor from "jodit-react";
import { useRef } from "react";

const config = {
    buttons: ["bold", "italic", "link", "unlink", "underline", "source"],
};

export const TextEditor = ({ initialValue, getValue }) => {
    const editor = useRef(null);

    return (
        <JoditEditor
        ref={editor}
        value={initialValue}
        config={config}
        tabIndex={1}
        onChange={(newContent) => getValue(newContent)}
        />
    );
}