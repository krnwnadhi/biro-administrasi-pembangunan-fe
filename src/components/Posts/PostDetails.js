import {
    ActionIcon,
    Center,
    Container,
    Divider,
    Group,
    Image,
    Loader,
    Paper,
    Text,
    Title,
    TypographyStylesProvider,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Link, Redirect } from "react-router-dom";
import React, { useEffect } from "react";
import {
    deletePostAction,
    fetchDetailPostAction,
} from "../redux/slices/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";

import DateFormatter from "../../utils/dateFormatter";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

const PostDetails = (props) => {
    // console.log(props);
    const id = props.computedMatch.params.id;
    // const id = props.match.params.id;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDetailPostAction(id));
        window.scrollTo(0, 0);
    }, [id, dispatch]);

    const post = useSelector((state) => state?.post);

    const { appError, loading, postDetail = [], serverError, isDeleted } = post;

    //get login user
    const user = useSelector((state) => state?.users);
    // console.log(user);
    const {
        userAuth: { _id },
    } = user;

    const isCreatedBy = postDetail?.user?._id === _id;

    if (isDeleted) return <Redirect to="/dashboard" />;

    const openDeleteModal = () =>
        openConfirmModal({
            title: "Hapus Post",
            centered: true,
            children: (
                <Text size="sm">
                    {`Apakah Anda yakin ingin menghapus post ${postDetail?.title}?`}
                </Text>
            ),
            labels: { confirm: "Hapus", cancel: "Kembali" },
            confirmProps: { color: "red" },
            onCancel: () => {
                showNotification({
                    title: "Batal",
                    message: "Aksi dibatalkan",
                    color: "red",
                });
            },
            onConfirm: () => {
                setTimeout(() => {
                    dispatch(deletePostAction(postDetail?._id));
                    showNotification({
                        title: "Hapus",
                        message: "Post berhasil dihapus",
                    });
                }, 1500);
            },
        });

    return (
        <Paper style={{ minHeight: "92vh" }}>
            <Container mt={20}>
                {loading ? (
                    <Center>
                        <Loader mt={300} size="xl" variant="dots" />
                    </Center>
                ) : (
                    <>
                        <Text>{appError || serverError}</Text>

                        {/* <Image
                            src={postDetail?.image}
                            radius="xl"
                            height={500}
                            fit="contain"
                        /> */}

                        {/* <Divider my="xl" variant="dotted" /> */}

                        <Title my="sm" order={1}>
                            {postDetail?.title}
                        </Title>

                        <Group position="apart">
                            <Text fz="sm">{postDetail?.user?.fullName}</Text>
                            <DateFormatter date={postDetail?.createdAt} />
                        </Group>

                        <Text fz="sm">Kategori: {postDetail?.category}</Text>
                        <Text fz="sm">Views: {postDetail?.numViews}</Text>

                        <Group>
                            {isCreatedBy ? (
                                <>
                                    <ActionIcon
                                        component={Link}
                                        to={`/posts/update/${postDetail?._id}`}
                                        color="blue"
                                    >
                                        <IconPencil size={16} stroke={1.5} />
                                    </ActionIcon>
                                    <ActionIcon
                                        color="red"
                                        loading={loading}
                                        onClick={openDeleteModal}
                                    >
                                        <IconTrash size={16} stroke={1.5} />
                                    </ActionIcon>
                                </>
                            ) : null}
                        </Group>

                        <Divider my="xl" variant="dotted" />

                        {/* <Text ta="justify" fz="lg">
                            {postDetail?.description}
                        </Text> */}

                        <TypographyStylesProvider>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: postDetail?.description,
                                }}
                            />
                        </TypographyStylesProvider>
                    </>
                )}
            </Container>
        </Paper>
    );
};

export default PostDetails;
