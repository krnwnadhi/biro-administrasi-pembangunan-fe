import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Center,
    Container,
    Divider,
    Group,
    Loader,
    Pagination,
    Space,
    Table,
    Text,
    TextInput,
    TypographyStylesProvider,
    useMantineTheme,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DateFormatter from "../../utils/dateFormatter";
import { Link } from "react-router-dom";
import axios from "axios";
import { basePostURL } from "../../utils/baseURL";
import { fetchAllCategoryAction } from "../redux/slices/category/categorySlice";
import { fetchAllPostAction } from "../redux/slices/posts/postSlice";
import { useEffect } from "react";

const PostList = (req, res) => {
    const dispatch = useDispatch();

    // const [activePage, setPage] = useState(1);
    // // const [currentPage, setPage] = useState();
    // const [count, setCount] = useState(0);
    // const [pageSize, setPageSize] = useState(3);

    useEffect(() => {
        dispatch(fetchAllPostAction(""));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAllCategoryAction());
    }, [dispatch]);

    const theme = useMantineTheme();

    const post = useSelector((state) => state?.post);

    const { postList = [], loading, appError, serverError } = post;
    // console.log(postList);

    const category = useSelector((state) => state?.category);
    const {
        // appError: appErrorCat,
        categoryList,
        // loading: loadingCat,
        // serverError: serverErrorCat,
    } = category;
    // console.log(categoryList);

    // const allCategories = categoryList?.map((category) => {
    //     return {
    //         label: category?.title,
    //         value: category?.title,
    //     };
    // });

    const [postItem, setPostItem] = useState([postList]);
    const [load, setLoad] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");

    const [show, setShow] = useState(false);

    const getPost = async () => {
        const response = await axios.get(
            `${basePostURL}?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        // console.log(response);
        setPostItem(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalItem);
        setRows(response.data.totalPage);
    };

    useEffect(() => {
        getPost();
        window.scrollTo(0, 0);
    }, [page, keyword]);

    const handlePageChange = (event) => {
        setPage(event);
        // console.log(event);
    };

    const searchData = (e) => {
        e.preventDefault();
        setLoad(true);
        setTimeout(() => {
            setPage(0);
            setKeyword(query);
            setLoad(false);
        }, 1000);
    };

    const resetData = (e) => {
        e.preventDefault();
        setQuery("");
    };

    const handleTextInput = (e) => {
        setQuery(e.target.value);
    };

    return (
        <Container size="lg">
            <Text
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
                size="lg"
                weight={500}
                mt={30}
            >
                Daftar Berita & Kegiatan
            </Text>

            <Divider labelPosition="center" my="xl" />

            <Group mb={30} position="center">
                <TextInput
                    placeholder="Cari Berdasarkan Judul"
                    value={query}
                    onChange={handleTextInput}
                    sx={!query ? { width: "54%" } : { width: "50%" }}
                />
                {load ? (
                    <Button
                        loading={
                            load ? <Loader size="md" variant="dots" /> : null
                        }
                    />
                ) : (
                    <Button onClick={searchData}>Cari </Button>
                )}
                <ActionIcon
                    onClick={resetData}
                    disabled={!query}
                    variant="subtle"
                    color="red"
                    sx={!query ? { display: "none" } : null}
                >
                    <IconTrash size={14} />
                </ActionIcon>
            </Group>

            <div>
                {loading ? (
                    <Center style={{ minHeight: "70vh" }}>
                        <Loader size="xl" />
                    </Center>
                ) : appError || serverError ? (
                    <h2>
                        {appError}
                        {serverError}
                    </h2>
                ) : postItem?.length <= 0 ? (
                    <h2>Tidak ada Post</h2>
                ) : (
                    <>
                        {/* <div onClick={() => dispatch(fetchAllPostAction(""))}>
                            Semua Kategori
                        </div>
                        {categoryList?.map((category) => (
                            <List key={category._id}>
                                <List.Item
                                    sx={{
                                        width: 100,
                                        // backgroundColor: "gray"
                                    }}
                                    onClick={() =>
                                        dispatch(
                                            fetchAllPostAction(category?.title)
                                        )
                                    }
                                >
                                    {category?.title}
                                </List.Item>
                            </List>
                        ))} */}

                        <Table
                            striped
                            highlightOnHover
                            verticalSpacing="md"
                            horizontalSpacing="xl"
                            withBorder
                            withColumnBorders
                            mt={10}
                            sx={{ width: "100%" }}
                        >
                            <thead>
                                <tr>
                                    <th style={{ width: "15%" }}>Judul</th>
                                    <th style={{ width: "45%" }}>Deskripsi</th>
                                    <th>Kategori</th>
                                    <th>Dilihat</th>
                                    <th>Dibuat</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {postItem &&
                                    postItem?.map((post) => (
                                        <tr key={post.id}>
                                            <td key={post.id}>
                                                <Text lineClamp={2} size="sm">
                                                    {post.title}{" "}
                                                </Text>
                                            </td>
                                            <td>
                                                <TypographyStylesProvider>
                                                    <Text
                                                        lineClamp={2}
                                                        size="sm"
                                                    >
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: post?.description,
                                                            }}
                                                        />
                                                    </Text>
                                                </TypographyStylesProvider>
                                            </td>
                                            <td>
                                                <Badge
                                                    color={post?.title}
                                                    variant={
                                                        theme.colorScheme ===
                                                        "dark"
                                                            ? "light"
                                                            : "outline"
                                                    }
                                                >
                                                    {post.category}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Text
                                                    size="sm"
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {post.numViews}
                                                </Text>
                                            </td>
                                            <td>
                                                <DateFormatter
                                                    date={post?.createdAt}
                                                />
                                            </td>
                                            <td>
                                                <Group
                                                    spacing={0}
                                                    position="left"
                                                >
                                                    <ActionIcon
                                                        component={Link}
                                                        to={`/posts/${post?._id}`}
                                                        color="blue"
                                                    >
                                                        <IconPencil
                                                            size={16}
                                                            stroke={1.5}
                                                        />
                                                    </ActionIcon>
                                                </Group>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>

                        <Space h="xl" />

                        <Text size="sm">
                            Halaman {rows ? page : 0} dari {rows}
                            <Space h="xs" />
                            Total : {pages} Item
                        </Text>
                    </>
                )}
                <Center>
                    <Box p={20}>
                        <Pagination
                            onChange={handlePageChange}
                            total={rows}
                            withControls
                            withEdges
                        />
                    </Box>
                </Center>
            </div>
        </Container>
    );
};

export default PostList;
