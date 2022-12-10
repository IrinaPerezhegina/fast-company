import React from "react";
import PropTypes from "prop-types";
import Quality from "./qualitie";
import { useQualities } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    console.log(qualities);
    const { isLoading } = useQualities();
    if (isLoading) return "Loading...";
    return (
        <>
            {qualities.map((qual) => (
                <Quality key={qual} id={qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
