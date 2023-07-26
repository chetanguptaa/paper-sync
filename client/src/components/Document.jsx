import { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
const socket = socketIO.connect("http://localhost:8000");

const Document = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        socket.on('documentUpdate', (data) => {
            setContent(data.content);
        });
        return () => {
            socket.off('documentUpdate');
        };
    }, []);

    const handleContentChange = (event) => {
        const newContent = event.target.value;
        socket.emit('documentUpdate', { content: newContent });
        setContent(newContent);
    };

    return (
        <div>
            <h1>Document</h1>
            <textarea
                rows="10"
                cols="50"
                value={content}
                onChange={handleContentChange}
            />
        </div>
    );
};

export default Document;