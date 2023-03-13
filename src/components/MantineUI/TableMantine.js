import {
    ActionIcon,
    Avatar,
    Badge,
    Button,
    Group,
    Image,
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
import { fetchAllPostAction } from "../redux/slices/posts/postSlice";
import { useEffect } from "react";

const TableMantine = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPostAction(""));
    }, [dispatch]);

    const theme = useMantineTheme();

    const jobColors = {
        sosial: "blue",
        ekonomi: "cyan",
        teknologi: "pink",
    };

    const post = useSelector((state) => state?.post);

    const { postList = [], loading, appError, serverError } = post;
    console.log(postList);

    return (
        <>
            <Text mb={20}>Daftar Post</Text>
            {/* <Button
                component={Link}
                to="/tambah-post"
                variant=""
                leftIcon={<IconPlus size={14} />}
                mb={30}
            >
                Tambah
            </Button> */}
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
                    >
                        <thead>
                            <tr>
                                <th>Author</th>
                                <th>Judul</th>
                                <th>Deskripsi</th>
                                <th>Kategori</th>
                                <th>Gambar</th>
                                <th>createdAt</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postList &&
                                postList.map((post) => (
                                    <tr key={post?._id}>
                                        <td>
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
                                        </td>
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
                                                fit="contain"
                                                alt="File Rusak"
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
                                                    to={`/update-kategori/${post?._id}`}
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
        </>
    );
};

export default TableMantine;
