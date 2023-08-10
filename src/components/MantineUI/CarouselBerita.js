import {
    ActionIcon,
    Avatar,
    Badge,
    Button,
    Card,
    Center,
    Container,
    Divider,
    Group,
    Image,
    Paper,
    Text,
    Title,
    TypographyStylesProvider,
    createStyles,
    useMantineTheme,
} from "@mantine/core";
import { IconBookmark, IconHeart, IconShare } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import DateFormatter from "../../utils/dateFormatter";
import { Link } from "react-router-dom";
import { fetchAllPostAction } from "../redux/slices/posts/postSlice";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
    card: {
        height: "95%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        transition: "transform 150ms ease, box-shadow 100ms ease",
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        marginTop: theme.spacing.xl,

        "&:hover": {
            boxShadow: theme.shadows.sm,
            transform: "scale(1.01)",
        },
    },

    rating: {
        position: "absolute",
        top: theme.spacing.xs,
        right: 12,
        pointerEvents: "none",
    },

    title: {
        display: "block",
        marginTop: theme.spacing.md,
        marginBottom: 5,
    },

    action: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
        ...theme.fn.hover({
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1],
        }),
    },

    footer: {
        marginTop: theme.spacing.md,
    },
}));

function Cards({ image, title, category, description, createdAt, _id, user }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPostAction(""));
    }, [dispatch]);

    const { classes } = useStyles();
    const theme = useMantineTheme();

    return (
        <Card withBorder radius="md" className={classes.card} shadow="md">
            <Card.Section>
                <Link to={"/berita"}>
                    <Image
                        src={image}
                        p={10}
                        // width={300}
                        height={250}
                        // fit="contain"
                        alt="With default placeholder"
                        withPlaceholder
                        radius="md"
                    />
                </Link>
            </Card.Section>

            <Badge
                className={classes.rating}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}
            >
                {category}
            </Badge>

            <Text
                className={classes.title}
                fw={500}
                component={Link}
                to={"/berita"}
                size="lg"
            >
                {title}
            </Text>

            <Divider my="xs" />

            <TypographyStylesProvider>
                <Text
                    lineClamp={3}
                    color="dimmed"
                    dangerouslySetInnerHTML={{
                        __html: description,
                    }}
                    size="xs"
                />
            </TypographyStylesProvider>

            <Group position="apart" className={classes.footer}>
                <Center>
                    <Avatar src={user.image} size={24} radius="xl" mr="xs" />
                    <Text size="xs" inline color="dimmed">
                        {user.fullName}
                    </Text>
                </Center>

                <Text size="xs" color="dimmed">
                    <DateFormatter date={createdAt} />
                </Text>
            </Group>
        </Card>
    );
}

export default function CarouselBerita() {
    const dispatch = useDispatch();

    const autoplay = useRef(Autoplay({ delay: 2000 }));

    useEffect(() => {
        dispatch(fetchAllPostAction(""));
    }, [dispatch]);

    const post = useSelector((state) => state?.post);
    const { postList = [], loading, appError, serverError } = post;
    // console.log(postList);

    const { result = [] } = postList;
    // console.log(result);

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

    const slides = [...result]
        .map((item) => (
            <Carousel.Slide key={item._id}>
                <Cards {...item} />
            </Carousel.Slide>
        ))
        .slice(0, 5);

    return (
        <Container size="lg">
            <Carousel
                // sx={{ maxWidth: 320 }}
                mx="auto"
                withIndicators //
                slideSize="33%"
                breakpoints={[
                    { maxWidth: "md", slideSize: "50%" },
                    { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
                ]}
                slideGap="xl"
                align="start"
                // slidesToScroll={mobile ? 1 : 1}
                loop
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
                styles={{
                    control: {
                        "&[data-inactive]": {
                            opacity: 0,
                            cursor: "default",
                        },
                    },
                    indicator: {
                        marginTop: -35,
                        width: 12,
                        height: 8,
                        transition: "width 250ms ease",

                        "&[data-active]": {
                            width: 24,
                        },
                    },
                }}
            >
                {slides}
            </Carousel>
        </Container>
    );
}
