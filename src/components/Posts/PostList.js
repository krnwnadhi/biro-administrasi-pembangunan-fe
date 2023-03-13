import {
    ActionIcon,
    Anchor,
    Badge,
    Breadcrumbs,
    Button,
    Group,
    Image,
    List,
    Loader,
    Paper,
    Table,
    Text,
    useMantineTheme,
} from "@mantine/core";
import { IconPencil, IconPlus } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";

import DateFormatter from "../../utils/dateFormatter";
import { Link } from "react-router-dom";
import React from "react";
import { fetchAllCategoryAction } from "../redux/slices/category/categorySlice";
import { fetchAllPostAction } from "../redux/slices/posts/postSlice";
import { useEffect } from "react";

const PostList = (req, res) => {
    // console.log(req);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPostAction(""));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAllCategoryAction());
    }, [dispatch]);

    const theme = useMantineTheme();

    const jobColors = {
        sosial: "blue",
        ekonomi: "cyan",
        teknologi: "pink",
    };

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

    const items = [
        { title: "Mantine", href: "#" },
        { title: "Mantine hooks", href: "#" },
        { title: "use-id", href: "#" },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <Paper p="xl" radius={0} style={{ minHeight: "92vh" }}>
            {/* <Text mb={30}>Daftar Post</Text>
            <Button
                component={Link}
                to="/dashboard/tambah-post"
                variant=""
                leftIcon={<IconPlus size={14} />}
                mb={10}
            >
                Tambah
            </Button> */}
            <Breadcrumbs mb={50}>{items}</Breadcrumbs>
            {/* <div>
                <div onClick={() => dispatch(fetchAllPostAction(""))}>
                    Reset Kategori
                </div>
                {categoryList?.map((category) => (
                    <List key={category._id}>
                        <List.Item
                            sx={{
                                width: 100,
                                // backgroundColor: "gray"
                            }}
                            onClick={() =>
                                dispatch(fetchAllPostAction(category?.title))
                            }
                        >
                            {category?.title}
                        </List.Item>
                    </List>
                ))}
            </div> */}
            <div>
                {loading ? (
                    <Loader size="xl" variant="dots" />
                ) : appError || serverError ? (
                    <h2>
                        {appError}
                        {serverError}
                    </h2>
                ) : postList?.length <= 0 ? (
                    <h2>Tidak ada Post</h2>
                ) : (
                    <Table
                        striped
                        highlightOnHover
                        verticalSpacing="sm"
                        horizontalSpacing="xl"
                        withBorder
                        withColumnBorders
                        mt={10}
                        sx={{ width: "100%" }}
                    >
                        <thead>
                            <tr>
                                {/* <th>Author</th> */}
                                <th>Judul</th>
                                <th style={{ width: "40%" }}>Deskripsi</th>
                                <th>Kategori</th>
                                <th>Gambar</th>
                                <th>Dibuat</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postList &&
                                postList.map((post) => (
                                    <tr key={post?._id}>
                                        {/* <td>
                                            <Group>
                                                <Avatar
                                                    size={40}
                                                    radius={40}
                                                    src={
                                                        post?.user?.profilePhoto
                                                    }
                                                />
                                                <div>
                                                    <Text
                                                        size="sm"
                                                        weight={500}
                                                    >
                                                        {post?.user?.fullName}
                                                    </Text>
                                                    <Text
                                                        color="dimmed"
                                                        size="xs"
                                                    >
                                                        {post?.user?.email}
                                                    </Text>
                                                </div>
                                            </Group>
                                        </td> */}
                                        <td>
                                            <Text size="sm" weight={500}>
                                                {post?.title}
                                            </Text>
                                        </td>
                                        <td>
                                            <Text lineClamp={1}>
                                                {post?.description}
                                            </Text>
                                        </td>
                                        <td>
                                            <Badge
                                                color={
                                                    jobColors[
                                                        post?.title.toLowerCase()
                                                    ]
                                                }
                                                variant={
                                                    theme.colorScheme === "dark"
                                                        ? "light"
                                                        : "outline"
                                                }
                                            >
                                                {post?.category}
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
                                            <Group spacing={0} position="left">
                                                <ActionIcon
                                                    component={Link}
                                                    // to={`/update-kategori/${post?._id}`}
                                                    to={`/posts/update/${post?._id}`}
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
                )}
            </div>
        </Paper>
    );
};

export default PostList;
