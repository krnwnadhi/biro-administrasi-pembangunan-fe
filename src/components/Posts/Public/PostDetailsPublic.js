import {
    ActionIcon,
    Anchor,
    Breadcrumbs,
    Center,
    Container,
    CopyButton,
    Divider,
    Grid,
    Group,
    Loader,
    NavLink,
    Paper,
    Space,
    Text,
    ThemeIcon,
    Title,
    Tooltip,
    TypographyStylesProvider,
    useMantineTheme,
} from "@mantine/core";
import {
    IconCalendar,
    IconCheck,
    IconCopy,
    IconEye,
    IconUser,
} from "@tabler/icons-react";
import React, { useEffect } from "react";
import {
    fetchAllPostAction,
    fetchDetailPostAction,
} from "../../redux/slices/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";

import DateFormatter from "../../../utils/dateFormatter";
import { IconCategory2 } from "@tabler/icons-react";
import ReadMore from "../ReadMore";
import { useMediaQuery } from "@mantine/hooks";

const PostDetailsPublic = (props) => {
    // console.log(props);
    // const id = props.computedMatch.params.id;
    const id = props.match.params.id;

    const dispatch = useDispatch();

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

    // useEffect(() => {
    //     dispatch(fetchDetailPostAction(""));
    // }, [id, dispatch]);

    useEffect(() => {
        dispatch(fetchDetailPostAction(id));
        // dispatch(fetchAllPostAction());
        window.scrollTo(0, 0);
    }, [id, dispatch]);

    const post = useSelector((state) => state?.post);
    // console.log("postAll", post);
    // const postAll = useSelector((state) => state?.post);
    // console.log("postAll", postAll);

    const { appError, loading, postDetail = [], serverError, isDeleted } = post;
    // console.log("postDetail", postDetail);

    // const postDetailList = () => {
    //     postDetail?.result?.map((item, index) => {
    //         return item.id === id;
    //     });
    // };

    // postDetailList();

    //get login user
    // const user = useSelector((state) => state?.users);
    // console.log(user);
    // const {
    //     userAuth: { _id },
    // } = user;

    // const isCreatedBy = postDetail?.user?._id === _id;

    // if (isDeleted) return <Redirect to="/" />;

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

                                <Title my="xs" order={2}>
                                    {postDetail?.title}
                                </Title>

                                <Space h="xl" />

                                <Group position="apart">
                                    <Group mb={5}>
                                        <ThemeIcon color="gray" variant="light">
                                            <IconCalendar size={12} />
                                        </ThemeIcon>
                                        <Text
                                            fz="xs"
                                            // size={mobile ? 4 : 20}
                                            color="dimmed"
                                        >
                                            <DateFormatter
                                                date={postDetail?.createdAt}
                                            />
                                        </Text>

                                        <Divider orientation="vertical" />

                                        <ThemeIcon
                                            sx={{
                                                display: mobile ? "none" : null,
                                            }}
                                            color="gray"
                                            variant="light"
                                        >
                                            <IconUser size={12} />
                                        </ThemeIcon>
                                        <Text
                                            sx={{
                                                display: mobile ? "none" : null,
                                            }}
                                            fz="xs"
                                            color="dimmed"
                                        >
                                            {postDetail?.user?.fullName}
                                        </Text>

                                        <Divider
                                            sx={{
                                                display: mobile ? "none" : null,
                                            }}
                                            orientation="vertical"
                                        />

                                        <ThemeIcon
                                            sx={{
                                                display: mobile ? "none" : null,
                                            }}
                                            color="gray"
                                            variant="light"
                                        >
                                            <IconCategory2 size={12} />
                                        </ThemeIcon>
                                        <Text
                                            sx={{
                                                display: mobile ? "none" : null,
                                            }}
                                            fz="xs"
                                            color="dimmed"
                                        >
                                            {postDetail?.category}
                                        </Text>

                                        <Divider
                                            orientation="vertical"
                                            sx={{
                                                display: mobile ? "none" : null,
                                            }}
                                        />

                                        <ThemeIcon color="gray" variant="light">
                                            <IconEye size={12} />
                                        </ThemeIcon>
                                        <Text fz="xs" color="dimmed">
                                            {postDetail?.numViews}
                                        </Text>
                                    </Group>

                                    <CopyButton
                                        value={`/berita/${postDetail?.id}`}
                                        timeout={2000}
                                    >
                                        {({ copied, copy }) => (
                                            <Tooltip
                                                label={
                                                    copied
                                                        ? "URL disalin"
                                                        : "Salin URL"
                                                }
                                                withArrow
                                                position="right"
                                            >
                                                <ActionIcon
                                                    color={
                                                        copied ? "teal" : "gray"
                                                    }
                                                    onClick={copy}
                                                >
                                                    {copied ? (
                                                        <IconCheck size={16} />
                                                    ) : (
                                                        <IconCopy size={16} />
                                                    )}
                                                </ActionIcon>
                                            </Tooltip>
                                        )}
                                    </CopyButton>
                                </Group>

                                <Divider my="xl" size="xs" />

                                <TypographyStylesProvider>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: postDetail?.description,
                                        }}
                                    />
                                </TypographyStylesProvider>
                            </Grid.Col>

                            <Grid.Col md={4} lg={2} offset={1}>
                                <Text>{appError || serverError}</Text>

                                <Title my="sm" order={3}>
                                    {/* Baca Juga... */}
                                </Title>

                                {/* <NavLink label="AAA">aaa</NavLink> */}

                                {/* <ReadMore /> */}

                                {/* <Divider variant="dotted" /> */}
                            </Grid.Col>
                        </Grid>
                    </>
                )}
            </Container>
        </Paper>
    );
};

export default PostDetailsPublic;
