import  { useState } from 'react';
import css from "./chat-box.module.scss"

const ChatBox = () => {
    const [questionsAndAnswers] = useState([
        { question: "Câu hỏi 1", answer: "Câu trả lời cho câu hỏi 1" },
        { question: "Câu hỏi 2", answer: "Câu trả lời cho câu hỏi 2" },
        { question: "Câu hỏi 3", answer: "Câu trả lời cho câu hỏi 3" },
    ]);

    const [activeIndex, setActiveIndex] = useState(null);
    const [isChatBoxVisible, setChatBoxVisible] = useState(false);

    const toggleAnswer = (index: any) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    const toggleChatBox = () => {
        setChatBoxVisible(!isChatBoxVisible);
    };

    return (
        <>
            <div className={css['chat-box-container']}>
                {isChatBoxVisible && (
                    <div>
                        <div className={css["chat-box-header"]}>
                            Chat Box
                        </div>
                        <div className={css["chat-box-content"]}>
                            {questionsAndAnswers.map((qa, index) => (
                                <div key={index}>
                                    <div
                                        onClick={() => toggleAnswer(index)}
                                        className={`chat-box-question ${activeIndex === index ? 'active' : ''}`}
                                    >
                                        <strong>{qa.question}</strong>
                                    </div>
                                    <div className={`chat-box-answer ${activeIndex === index ? 'active' : ''}`}>
                                        {qa.answer}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <input
                                type="text"
                                className={css["chat-box-input"]}
                                placeholder="Nhập tin nhắn..."
                            />
                        </div>
                    </div>
                )}

            </div>
            <div className={css["chat-button"]} onClick={toggleChatBox}>
                <i className="fa-solid fa-comments"></i>
            </div>
        </>

    );
};

export default ChatBox;
