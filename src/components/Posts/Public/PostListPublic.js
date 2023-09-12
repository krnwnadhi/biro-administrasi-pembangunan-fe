import {
    ActionIcon,
    Anchor,
    Avatar,
    Badge,
    Box,
    Breadcrumbs,
    Button,
    Card,
    Center,
    CloseButton,
    Container,
    Divider,
    Group,
    Image,
    Loader,
    Pagination,
    SimpleGrid,
    Space,
    Text,
    TextInput,
    createStyles,
    useMantineTheme,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DateFormatter from "../../../utils/dateFormatter";
import { Fade } from "react-awesome-reveal";
import { IconSearch } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import { basePostURL } from "../../../utils/baseURL";
import { fetchAllPostAction } from "../../redux/slices/posts/postSlice";
import { useMediaQuery } from "@mantine/hooks";

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
        lineHeight: 1.7,
    },

    body: {
        padding: theme.spacing.xl,
    },
}));

export default function PostListPublic() {
    const { classes } = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPostAction(""));
        window.scrollTo(0, 0);
    }, [dispatch]);

    const post = useSelector((state) => state?.post);
    const { postList = [], appError, serverError, loading } = post;

    const [postItem, setPostItem] = useState([postList]);
    const [load, setLoad] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");

    // const [show, setShow] = useState(false);

    // console.log(postItem);

    useEffect(() => {
        const abortController = new AbortController();

        getPost();
        // window.scrollTo(0, 0);
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        setTimeout(() => setLoad(false), 2000);

        return () => {
            abortController.abort();
        };
    }, [page, keyword]);

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
        }, 2500);
    };

    // const resetData = (e) => {
    //     e.preventDefault();
    //     setQuery("");
    // };

    const handleTextInput = (e) => {
        setQuery(e.target.value);
    };

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

    const breadcrumbsItem = [
        { title: "Home", href: "/" },
        { title: "Informasi", href: "#" },
        { title: "Berita & Kegiatan", href: "/berita" },
    ].map((item, index) => (
        <Anchor
            href={item.href}
            key={index}
            size="sm"
            underline={false}
            truncate="end"
        >
            {item.title}
        </Anchor>
    ));

    return (
        <Fade delay={500} triggerOnce>
            <Container size="lg" mt={20}>
                <Breadcrumbs>{breadcrumbsItem}</Breadcrumbs>

                <Space h="xl" />

                <div style={{ width: "100%", marginBottom: 30 }}>
                    <TextInput
                        placeholder="Cari..."
                        value={query}
                        onChange={handleTextInput}
                        rightSection={
                            load ? (
                                <ActionIcon
                                    loading={
                                        load ? (
                                            <Loader size="sm" variant="dots" />
                                        ) : null
                                    }
                                />
                            ) : (
                                <ActionIcon
                                    color="blue"
                                    variant="transparent"
                                    onClick={searchData}
                                >
                                    <IconSearch size={18} stroke={1.5} />
                                </ActionIcon>
                            )
                        }
                    />
                </div>

                {/* <CloseButton
                        variant="transparent"
                        onClick={resetData}
                        disabled={!query}
                        aria-label="Close modal"
                        loading={load}
                    /> */}

                <SimpleGrid
                    // p="xl"
                    verticalSpacing="xl"
                    cols={2}
                    breakpoints={[
                        { maxWidth: 1050, cols: 1, spacing: "md" },
                        // { maxWidth: 755, cols: 2, spacing: "sm" },
                        // { maxWidth: 400, cols: 1, spacing: "sm" },
                    ]}
                >
                    {loading ? (
                        <Center style={{ minHeight: "70vh" }}>
                            <Loader size="xl" variant="dots" />
                        </Center>
                    ) : appError || serverError ? (
                        <h2>
                            {appError}
                            {serverError}
                        </h2>
                    ) : null}
                    {
                        // loading ? (
                        //     <Center style={{ minHeight: "70vh" }}>
                        //         <Loader size="xl" variant="dots" />
                        //     </Center>
                        // ) : appError || serverError ? (
                        //     <h2>
                        //         {appError}
                        //         {serverError}
                        //     </h2>
                        // ) :
                        postItem?.length === 0 ? (
                            <h2>Tidak ada Post</h2>
                        ) : (
                            postItem
                                // .sort((a, b) => (a > b ? 1 : -1))
                                ?.map((item, index) => {
                                    if (item.length !== 0) {
                                        return (
                                            <Card
                                                key={index}
                                                withBorder
                                                radius="md"
                                                className={classes.card}
                                                shadow="lg"
                                            >
                                                <Group
                                                    noWrap={
                                                        mobile ? false : true
                                                    }
                                                    position="center"
                                                    spacing={1}
                                                >
                                                    <Image
                                                        src={item?.image}
                                                        height={
                                                            mobile ? 220 : 210
                                                        }
                                                        width={
                                                            mobile ? 220 : 210
                                                        }
                                                        radius="md"
                                                        alt="Gambar Rusak"
                                                        // fit="contain"
                                                        withPlaceholder
                                                        mx={mobile ? "auto" : 0}
                                                    />
                                                    <div
                                                        className={classes.body}
                                                    >
                                                        <Badge
                                                            variant={
                                                                theme.colorScheme ===
                                                                "dark"
                                                                    ? "light"
                                                                    : "outline"
                                                            }
                                                            fullWidth
                                                        >
                                                            {item?.category}
                                                        </Badge>

                                                        <Space h="xl" />

                                                        <Text
                                                            component={Link}
                                                            to={`/berita/${item._id}`}
                                                            className={
                                                                classes.title
                                                            }
                                                            size={
                                                                mobile
                                                                    ? "sm"
                                                                    : "md"
                                                            }
                                                            lineClamp={4}
                                                        >
                                                            {item?.title}
                                                        </Text>

                                                        <Group
                                                            // noWrap
                                                            spacing="xs"
                                                            mt={20}
                                                        >
                                                            <Avatar
                                                                size={20}
                                                                src={
                                                                    item?.user
                                                                        ?.profilePhoto
                                                                }
                                                            />
                                                            <Text size="xs">
                                                                {
                                                                    item?.user
                                                                        ?.fullName
                                                                }
                                                            </Text>

                                                            <Text
                                                                size="xs"
                                                                color="dimmed"
                                                            >
                                                                •
                                                            </Text>

                                                            <Text
                                                                size="xs"
                                                                color="dimmed"
                                                            >
                                                                <DateFormatter
                                                                    date={
                                                                        item?.createdAt
                                                                    }
                                                                />
                                                            </Text>
                                                        </Group>
                                                    </div>
                                                </Group>
                                            </Card>
                                        );
                                    } else {
                                        return console.log(" ");
                                    }
                                })
                        )
                    }
                </SimpleGrid>
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
            </Container>
        </Fade>
    );
}
