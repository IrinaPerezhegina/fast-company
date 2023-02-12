import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../service/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsRecived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        createCommentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        createCommentsRecived: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        removeCommentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        removeCommentsReseved: (state, action) => {
            state.entities = state.entities.filter(
                (el) => el._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsRecived,
    commentsRequestFiled,
    createCommentsRequestFiled,
    createCommentsRecived,
    removeCommentsRequestFiled,
    removeCommentsReseved
} = actions;

const createCommentRequested = createAction("comments/createCommentRequested");
const removeCommentRequested = createAction("comments/removeCommentRequested");

export const removeComment = (id) => async (dispatch) => {
    dispatch(removeCommentRequested());
    try {
        const { content } = await commentService.removeComment(id);

        if (!content) {
            dispatch(removeCommentsReseved(id));
        }
    } catch (error) {
        dispatch(removeCommentsRequestFiled(error.message));
    }
};

export const createComment = (payload) => async (dispatch) => {
    dispatch(createCommentRequested());
    try {
        const { content } = await commentService.createComment(payload);
        console.log(content);
        dispatch(createCommentsRecived(content));
    } catch (error) {
        dispatch(createCommentsRequestFiled(error.message));
    }
};

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsRecived(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};
export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
