import React from "react";
import PropTypes from "prop-types";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import UserCard from "../../ui/userCard";
import Comments from "../../ui/comments.jsx";
import { CommentsProvider } from "../../../hooks/useComments";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId));
    console.log(user);
    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard user={user} />
                        <MeetingsCard user={user} />
                    </div>
                    <div className="col-md-8">
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
