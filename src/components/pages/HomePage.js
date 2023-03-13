import {
    Badge,
    Box,
    Button,
    Card,
    Group,
    Image,
    List,
    Loader,
    Paper,
    SimpleGrid,
    Text,
    useMantineTheme,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import CarouselMantine from "../MantineUI/CarouselMantine";
import HeroHeaderMantine from "../MantineUI/HeroHeaderMantine";
import { Link } from "react-router-dom";
import { fetchAllCategoryAction } from "../redux/slices/category/categorySlice";
import { fetchAllPostAction } from "../redux/slices/posts/postSlice";
import { useEffect } from "react";

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPostAction(""));
        window.scrollTo(0, 0);
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAllCategoryAction());
        // window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
        window.scrollTo(0, 0);
    }, [dispatch]);

    const theme = useMantineTheme();

    const jobColors = {
        sosial: "blue",
        ekonomi: "cyan",
        teknologi: "pink",
    };

    const post = useSelector((state) => state?.post);
    const { postList = [], loading, appError, serverError } = post;

    const category = useSelector((state) => state?.category);
    const {
        // appError: appErrorCat,
        categoryList = [],
        // loading: loadingCat,
        // serverError: serverErrorCat,
    } = category;
    // console.log(categoryList);

    const allCategories = categoryList?.map((category) => {
        return {
            label: category?.title,
            value: category?.title,
        };
    });

    return (
        <>
            <Paper
            // p="xl"
            // radius={0}
            >
                <HeroHeaderMantine />

                <Box
                    sx={(theme) => ({
                        backgroundColor:
                            theme.colorScheme === "dark"
                                ? theme.colors.dark[6]
                                : theme.colors.gray[2],
                        // textAlign: "center",
                        padding: theme.spacing.xl,
                        paddingTop: 100,
                        paddingBottom: 120,
                        // cursor: "pointer",
                        // marginTop: theme.radius.xl,

                        "&:hover": {
                            backgroundColor:
                                theme.colorScheme === "dark"
                                    ? theme.colors.dark[5]
                                    : theme.colors.gray[3],
                        },
                    })}
                >
                    <CarouselMantine />
                </Box>

                {/* KATEGORI */}

                {/* <div style={{ marginBottom: 20 }}>
                    <div onClick={() => dispatch(fetchAllPostAction(""))}>
                        Reset Kategori
                    </div>
                    {categoryList?.map((category) => (
                        <List key={category._id}>
                            <List.Item
                                onClick={() =>
                                    dispatch(
                                        fetchAllPostAction(category?.title)
                                    )
                                }
                            >
                                {category?.title}
                            </List.Item>
                        </List>
                    ))}
                </div> */}

                {/* POST */}

                {/* {loading ? (
                    <Loader size="xl" variant="dots" />
                ) : appError || serverError ? (
                    <h2>
                        {appError}
                        {serverError}
                    </h2>
                ) : postList?.length <= 0 ? (
                    <h2>Tidak ada Post</h2>
                ) : (
                    <SimpleGrid
                        cols={4}
                        spacing="lg"
                        breakpoints={[
                            { maxWidth: 980, cols: 3, spacing: "md" },
                            { maxWidth: 755, cols: 2, spacing: "sm" },
                            { maxWidth: 600, cols: 1, spacing: "sm" },
                        ]}
                    >
                        {postList &&
                            postList.map((post) => (
                                <div key={post._id}>
                                    <Card
                                        shadow="md"
                                        p="lg"
                                        radius="md"
                                        withBorder
                                    >
                                        <Card.Section
                                            component={Link}
                                            to={`/posts/${post?._id}`}
                                        >
                                            <Image
                                                src={post?.image}
                                                height={160}
                                                alt="Norway"
                                            />
                                        </Card.Section>

                                        <Group position="apart" mt="md" mb="xs">
                                            <Text weight={500}>
                                                {post?.title}
                                            </Text>
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
                                        </Group>

                                        <Text
                                            size="sm"
                                            color="dimmed"
                                            lineClamp={2}
                                        >
                                            {post?.description}
                                        </Text>

                                        <Button
                                            variant="light"
                                            color="blue"
                                            fullWidth
                                            mt="md"
                                            radius="md"
                                            component={Link}
                                            to={`/posts/${post?._id}`}
                                        >
                                            Selengkapnya
                                        </Button>
                                    </Card>
                                </div>
                            ))}
                    </SimpleGrid>
                )} */}
            </Paper>
        </>
    );
};

export default HomePage;
