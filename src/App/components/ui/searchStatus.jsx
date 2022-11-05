import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ number }) => {
    const textColor = () => {
        if (number) {
            return "fs-5 badge bg-primary m-2";
        } else return "fs-5 badge bg-danger m-2";
    };

    const renderPharse = (number) => {
        if (number) {
            return ["2", "3", "4"].some((item) => {
                return (
                    item ===
                    number.toString().slice(number.toString().length - 1)
                );
            }) &&
                !["12", "13", "14"].some((item) => {
                    return (
                        item ===
                        number
                            .toString()
                            .slice(
                                number.toString().length - 2,
                                number.toString().length
                            )
                    );
                })
                ? number + " человека тусанут с тобой сегодня"
                : number + " человек тусанет с тобой сегодня";
        } else return "Никто с тобой не тусанет";
    };

    return (
        <h2>
            <span className={textColor()}>{renderPharse(number)}</span>
        </h2>
    );
};
SearchStatus.propTypes = {
    number: PropTypes.number.isRequired
};

export default SearchStatus;
