import React from "react";
import PropTypes from "prop-types";
import Qualities from "./qualitie";
import { useQuality } from "../../../hooks/useQuality";
import { useUser } from "../../../hooks/useUsers";

const QualitiesList = ({ id }) => {
    const { isLoading, getQualities } = useQuality();
    const { users } = useUser();
    const qualities = getQualities(id, users);

    if (!isLoading) {
        return (
            <>
                {qualities.map((item) => (
                    <Qualities
                        key={item._id}
                        color={item.color}
                        name={item.name}
                    />
                ))}
            </>
        );
    } else return "Loading...";
};

QualitiesList.propTypes = {
    id: PropTypes.string
};

export default QualitiesList;

// {
//     /* // {qualitiesUser.map((user) => { */
// }
// {
//     /* //     return quality.map((item) => { */
// }
// {
/* //         if (user.includes(item._id)) {
//             return (
//                 <Qualities
//                     key={item._id}
//                     color={item.color}
//                     name={item.name}
//                 />
//             );
//         } else return "66";
//     });
// })} */
// }
// {qualitiesUser.map((us) =>
//     quality.map((item) => {
//         if (us.some((i) => i === item._id)) {
//             return (
//                 <Qualities
//                     key={item._id}
//                     color={item.color}
//                     name={item.name}
//                 />
//             );
//         } else return "y";
//     })
// )}
