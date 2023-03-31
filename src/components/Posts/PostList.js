import {
    ActionIcon,
    Anchor,
    Badge,
    Box,
    Breadcrumbs,
    Button,
    Center,
    Group,
    Image,
    List,
    Loader,
    Pagination,
    Paper,
    Table,
    Text,
    TextInput,
    TypographyStylesProvider,
    useMantineTheme,
} from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DateFormatter from "../../utils/dateFormatter";
import { Link } from "react-router-dom";
import axios from "axios";
import { basePostURL } from "../../utils/baseURL";
import { fetchAllCategoryAction } from "../redux/slices/category/categorySlice";
import { fetchAllPostAction } from "../redux/slices/posts/postSlice";
import { useEffect } from "react";
import { usePagination } from "@mantine/hooks";

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
        console.log(event);
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

    const items = [
        { title: "Dashboard", href: "#" },
        { title: "Daftar Post", href: "#" },
    ].map((item, index) => (
        <Anchor underline={false} href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <Paper p="md">
            <Breadcrumbs mb={20}>{items}</Breadcrumbs>
            <Group mb={30} position="center">
                <TextInput
                    placeholder="Cari Artikel Berita"
                    value={query}
                    onChange={handleTextInput}
                />
                {load ? (
                    <Button
                        loading={
                            load ? <Loader size="md" variant="dots" /> : null
                        }
                    >
                        Mencari
                    </Button>
                ) : (
                    <Button onClick={searchData}>Cari Berita</Button>
                )}
                <Button
                    onClick={resetData}
                    disabled={!query}
                    variant="outline"
                    color="red"
                >
                    Reset
                </Button>
            </Group>
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
                                    <th>Gambar</th>
                                    <th>Dibuat</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {postItem &&
                                    postItem?.map((post) => (
                                        <tr key={post.id}>
                                            <td>{post.title}</td>
                                            <td>
                                                <TypographyStylesProvider>
                                                    <Text lineClamp={1}>
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
                                                <Image
                                                    src={post?.image}
                                                    width={50}
                                                    fit="contain"
                                                    alt="Gambar Rusak"
                                                />
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
                                                        // to={`/update-kategori/${post?._id}`}
                                                        // to={`/posts/update/${post?._id}`}
                                                        to={`/posts/${post?._id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
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
                        <p>
                            Halaman {rows ? page : 0} dari {rows}
                            <br />
                            Total : {pages}
                        </p>
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
        </Paper>
    );
};

export default PostList;
