import {
    Card,
    Center,
    Container,
    Divider,
    Image,
    List,
    Text,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import axios from "axios";
import { basePostURL } from "../../utils/baseURL";
import { fetchAllPostAction } from "../redux/slices/posts/postSlice";
import { useEffect } from "react";

const ReadMore = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPostAction(""));
    }, [dispatch]);

    const post = useSelector((state) => state?.post);
    const { postList = [], appError, serverError, loading } = post;
    // console.log(postList?.result);

    return (
        <>
            {postList?.result?.map((item, index) => (
                <div key={index}>
                    <List>
                        <List.Item>{item.title}</List.Item>
                    </List>
                </div>
            ))}
        </>
    );
};

export default ReadMore;
