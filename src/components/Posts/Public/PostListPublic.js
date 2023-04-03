import {
    Avatar,
    Box,
    Button,
    Card,
    Center,
    CloseButton,
    Group,
    Image,
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

import DateFormatter from "../../../utils/dateFormatter";
import { Link } from "react-router-dom";
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
        lineHeight: 1.2,
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

    // console.log(postItem);

    useEffect(() => {
        const abortController = new AbortController();

        getPost();
        window.scrollTo(0, 0);

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

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

    return (
        <>
            {/* <Container> */}
            <Box
                sx={(theme) => ({
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[6]
                            : theme.colors.gray[1],
                    // textAlign: "center",
                    margin: theme.spacing.lg,
                    padding: theme.spacing.xl,
                    borderRadius: theme.radius.md,
                    // cursor: "pointer",
                })}
            >
                <Text mb={20}>Home / Berita</Text>
                <Group mb={30} position="center">
                    <div style={{ width: 200 }}>
                        <TextInput
                            placeholder="Cari Artikel Berita"
                            value={query}
                            onChange={handleTextInput}
                            rightSection={
                                query ? (
                                    <CloseButton
                                        onClick={resetData}
                                        disabled={!query}
                                        aria-label="Close modal"
                                    />
                                ) : null
                            }
                        />
                    </div>
                    {load ? (
                        <Button
                            loading={
                                load ? (
                                    <Loader size="md" variant="dots" />
                                ) : null
                            }
                        >
                            Mencari
                        </Button>
                    ) : (
                        <Button onClick={searchData}>Cari Berita</Button>
                    )}
                </Group>
                <SimpleGrid
                    p="xl"
                    verticalSpacing="xl"
                    cols={2}
                    breakpoints={[
                        { maxWidth: 1050, cols: 1, spacing: "md" },
                        // { maxWidth: 755, cols: 2, spacing: "sm" },
                        { maxWidth: 600, cols: 1, spacing: "sm" },
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
                    ) : postItem?.length <= 0 ? (
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
                                            shadow="xl"
                                        >
                                            <Group noWrap spacing={0}>
                                                <Image
                                                    src={item?.image}
                                                    height={mobile ? 140 : 240}
                                                    width={mobile ? 140 : 240}
                                                    radius="xl"
                                                />
                                                <div className={classes.body}>
                                                    <Text
                                                        transform="uppercase"
                                                        color="dimmed"
                                                        weight={700}
                                                        size="xs"
                                                    >
                                                        {item?.category}
                                                    </Text>
                                                    <Text
                                                        component={Link}
                                                        to={`/berita/${item._id}`}
                                                        className={
                                                            classes.title
                                                        }
                                                        mt="xs"
                                                        mb="md"
                                                    >
                                                        {item?.title}
                                                    </Text>
                                                    {/* <Divider /> */}
                                                    <Group
                                                        noWrap
                                                        spacing="xs"
                                                        mt={20}
                                                    >
                                                        {/* <Group spacing="xs" noWrap> */}
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
                                                        {/* </Group> */}
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
                    )}
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
                {/* <SimpleGrid
                    p="xl"
                    verticalSpacing="xl"
                    cols={2}
                    breakpoints={[
                        { maxWidth: 1050, cols: 1, spacing: "md" },
                        // { maxWidth: 755, cols: 2, spacing: "sm" },
                        { maxWidth: 600, cols: 1, spacing: "sm" },
                    ]}
                >
                    <AspectRatio ratio={16 / 9} sx={{ maxWidth: 500 }}>
                        <iframe
                            src="https://www.youtube.com/embed/Dorf8i6lCuk"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </AspectRatio>
                    <AspectRatio ratio={16 / 9} sx={{ maxWidth: 500 }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d498.53206092129386!2d103.58285755645555!3d-1.6032178220115967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e25885a2db494ab%3A0x867f3a1a856bd41a!2sKantor%20Gubernur%20Jambi!5e0!3m2!1sen!2sru!4v1677471620099!5m2!1sen!2sru"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google map"
                            frameBorder="0"
                        />
                    </AspectRatio>
                </SimpleGrid> */}
            </Box>
            {/* </Container> */}
        </>
    );
}
