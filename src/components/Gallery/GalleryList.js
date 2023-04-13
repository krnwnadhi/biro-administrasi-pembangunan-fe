import {
    Avatar,
    Box,
    Button,
    Card,
    Center,
    CloseButton,
    Divider,
    Group,
    Image,
    List,
    Loader,
    Pagination,
    SimpleGrid,
    Text,
    TextInput,
    createStyles,
    useMantineTheme,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import { fetchAllGalleryAction } from "../redux/slices/gallery/gallerySlice";
import { useMediaQuery } from "@mantine/hooks";

// import DateFormatter from "../../../utils/dateFormatter";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        "&:hover": {
            transform: "scale(1.02)",
        },
        transition: "transform 500ms ease",
    },

    title: {
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1.2,
    },

    body: {
        padding: theme.spacing.xl,
    },
}));

const GalleryList = () => {
    const { classes } = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllGalleryAction());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const gallery = useSelector((state) => state?.gallery);
    // console.log(gallery);
    const { galleryList = [], appError, serverError, loading } = gallery;

    return (
        <div>
            {loading ? (
                <Center style={{ minHeight: "70vh" }}>
                    <Loader size="xl" variant="dots" />
                </Center>
            ) : appError || serverError ? (
                <h2>
                    {appError}
                    {serverError}
                </h2>
            ) : galleryList?.length <= 0 ? (
                <h2>Tidak ada Post</h2>
            ) : (
                galleryList?.map((item, index) => {
                    return (
                        <List key={index}>
                            <List.Item>{item.title}</List.Item>
                            <List.Item>
                                {item.images.map((file, index) => {
                                    return (
                                        <div key={index}>
                                            <Text>{file.fileName}</Text>
                                            {/* <Text>{file.filePath}</Text> */}
                                            <Image
                                                // width={200}
                                                height={80}
                                                fit="contain"
                                                radius="md"
                                                src={file.filePath}
                                                alt="Random unsplash image"
                                            />
                                            <Text>{file.fileType}</Text>
                                            <Text>{file.fileSize}</Text>
                                        </div>
                                    );
                                })}
                            </List.Item>
                            <Divider />
                        </List>
                    );
                })
            )}
        </div>
    );
};

export default GalleryList;
