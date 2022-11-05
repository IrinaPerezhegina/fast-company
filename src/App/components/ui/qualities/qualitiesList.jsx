import React from "react";
import PropTypes from "prop-types";
import Qualities from "./qualitie";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((item) => (
                <Qualities key={item._id} color={item.color} name={item.name} />
            ))}
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
