import { useHistory } from "react-router-dom";
import React from "react";

const BackHistoryButton = () => {
    const history = useHistory();
    return (
        <button onClick={() => history.goBack()} className="btn btn-primary">
            <i className="bi bi-caret-left"></i>
            Назад
        </button>
    );
};

export default BackHistoryButton;
