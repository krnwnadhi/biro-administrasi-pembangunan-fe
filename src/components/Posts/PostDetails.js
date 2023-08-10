import {
    Anchor,
    Breadcrumbs,
    Button,
    Center,
    Container,
    Divider,
    Grid,
    Group,
    Loader,
    Paper,
    Space,
    Text,
    ThemeIcon,
    Title,
    TypographyStylesProvider,
} from "@mantine/core";
import {
    IconCalendar,
    IconCategory2,
    IconEye,
    IconPencil,
    IconTrash,
    IconUser,
} from "@tabler/icons-react";
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
    const id = props.computedMatch.params.id;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDetailPostAction(id));
        window.scrollTo(0, 0);
    }, [id, dispatch]);

    const post = useSelector((state) => state?.post);

    const { appError, loading, postDetail = [], serverError, isDeleted } = post;

    //get login user
    const user = useSelector((state) => state?.users);

    const {
        userAuth: { _id },
    } = user;

    const isCreatedBy = postDetail?.user?._id === _id;

    if (isDeleted) return <Redirect to="/dashboard" />;

    const openDeleteModal = () =>
        openConfirmModal({
            title: "Hapus Berita?",
            centered: true,
            children: (
                <Text size="sm">
                    {`Apakah Anda yakin ingin menghapus berita "${postDetail?.title}" ?`}
                </Text>
            ),
            labels: { confirm: "Hapus", cancel: "Batal" },
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

    const breadcrumbsItem = [
        { title: "Home", href: "/" },
        { title: "Informasi", href: "#" },
        { title: "Berita & Kegiatan", href: "/berita" },
        { title: postDetail.title, href: "#" },
    ].map((item, index) => (
        <Anchor
            href={item.href}
            key={index}
            size={"sm"}
            underline={false}
            truncate="end"
        >
            {item.title}
        </Anchor>
    ));

    return (
        <Paper style={{ minHeight: "92vh" }}>
            <Container mt={20} size="lg">
                <Breadcrumbs>{breadcrumbsItem}</Breadcrumbs>

                <Space h="xl" />

                {loading ? (
                    <Center>
                        <Loader mt={300} size="xl" variant="dots" />
                    </Center>
                ) : (
                    <>
                        <Grid>
                            <Grid.Col>
                                <Text>{appError || serverError}</Text>

                                <Title my="sm" order={2}>
                                    {postDetail?.title}
                                </Title>

                                <Group position="left" mb={5}>
                                    <ThemeIcon color="gray" variant="light">
                                        <IconCalendar size={12} />
                                    </ThemeIcon>
                                    <Text fz="xs" color="dimmed">
                                        <DateFormatter
                                            date={postDetail?.createdAt}
                                        />
                                    </Text>

                                    <ThemeIcon color="gray" variant="light">
                                        <IconUser size={12} />
                                    </ThemeIcon>
                                    <Text fz="xs" color="dimmed">
                                        {postDetail?.user?.fullName}
                                    </Text>

                                    <ThemeIcon color="gray" variant="light">
                                        <IconCategory2 size={12} />
                                    </ThemeIcon>
                                    <Text fz="xs" color="dimmed">
                                        {postDetail?.category}
                                    </Text>

                                    <ThemeIcon color="gray" variant="light">
                                        <IconEye size={12} />
                                    </ThemeIcon>
                                    <Text fz="xs" color="dimmed">
                                        {postDetail?.numViews}
                                    </Text>
                                </Group>

                                <Space h="xl" />

                                {isCreatedBy ? (
                                    <>
                                        <Button.Group>
                                            <Button
                                                component={Link}
                                                to={`/posts/update/${postDetail?._id}`}
                                                color="blue"
                                                leftIcon={
                                                    <IconPencil
                                                        size={16}
                                                        stroke={1.5}
                                                    />
                                                }
                                                fullWidth
                                                variant="light"
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                color="red"
                                                loading={loading}
                                                onClick={openDeleteModal}
                                                leftIcon={
                                                    <IconTrash
                                                        size={16}
                                                        stroke={1.5}
                                                    />
                                                }
                                                fullWidth
                                                variant="outline"
                                            >
                                                Hapus
                                            </Button>
                                        </Button.Group>
                                    </>
                                ) : null}

                                <Divider my="xl" variant="dotted" />

                                <TypographyStylesProvider>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: postDetail?.description,
                                        }}
                                    />
                                </TypographyStylesProvider>
                            </Grid.Col>
                        </Grid>
                    </>
                )}
            </Container>
        </Paper>
    );
};

export default PostDetails;
