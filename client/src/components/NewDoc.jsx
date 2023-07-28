import { TextEditor } from "./TextEditor"
import { useState } from "react";

export const NewDoc = () => {
    // eslint-disable-next-line no-unused-vars
    const [value, setValue] = useState("");
    const getValue = (value) => {
        setValue(value);
    };
    return (
        <div>
            <div className="row">
            <div className="col-md-6" style={{ margin: "50px auto" }}>
                <div style={{ textAlign: "center" }}>
                </div>
                <TextEditor initialValue="" getValue={getValue} />
                <br />
            </div>
            </div>
        </div>
    )
}