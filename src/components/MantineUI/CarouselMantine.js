import {
    Badge,
    Button,
    Paper,
    Text,
    Title,
    createStyles,
    useMantineTheme,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import DateFormatter from "../../utils/dateFormatter";
import { Link } from "react-router-dom";
import axios from "axios";
import { basePostURL } from "../../utils/baseURL";
import { fetchAllPostAction } from "../redux/slices/posts/postSlice";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
    card: {
        height: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&:hover": {
            transform: "scale(1.03)",
        },
        transition: "transform 500ms ease",
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        color: theme.black,
        lineHeight: 1.2,
        fontSize: 28,
        marginTop: theme.spacing.xs,
    },

    category: {
        color: theme.black,
        opacity: 0.7,
        fontWeight: 700,
        textTransform: "uppercase",
    },
}));

function Card({ image, title, category, createdAt, _id }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPostAction(""));
    }, [dispatch]);

    const post = useSelector((state) => state?.post);
    const { postList = [], loading, appError, serverError } = post;
    // console.log(postList[0].user?.isAdmin);
    // const isAdmin = postList[0].user?.isAdmin;

    const { classes } = useStyles();

    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            sx={{ backgroundImage: `url(${image})` }}
            className={classes.card}
        >
            <div>
                {/* <Badge
                    variant="gradient"
                    gradient={{ from: "orange", to: "red" }}
                    mb={10}
                >
                    Terbaru
                </Badge> */}
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
                <Text size="sm" color="dark">
                    <DateFormatter date={createdAt} />
                </Text>
                <Badge
                    color="red"
                    size="sm"
                    radius="sm"
                    variant="filled"
                    className={classes.category}
                >
                    {category}
                </Badge>
            </div>
            <Button
                mb={20}
                component={Link}
                // to={`/posts/${_id}`}
                // to={`/berita/${_id}`}
                to={"/berita"}
                target="_blank"
                rel="noopener noreferrer"
                // to={"/posts"}
                radius="md"
                size="md"
            >
                Baca Selengkapnya
            </Button>
        </Paper>
    );
}

export default function CarouselMantine() {
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
        .sort((a, b) => (a > b ? 1 : -1))
        .map((item) => (
            <Carousel.Slide key={item._id}>
                <Card {...item} />
            </Carousel.Slide>
        ))
        .slice(0, 5);

    return (
        <Carousel
            // mt={60}
            slideSize="33%"
            breakpoints={[
                { maxWidth: "md", slideSize: "50%" },
                { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
            ]}
            slideGap="xl"
            align="start"
            slidesToScroll={mobile ? 1 : 2}
            loop
            // slides={slides}
            withIndicators
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
            }}
            // slidesInView={3}
            // inViewThreshold={0.5}
        >
            {slides}
        </Carousel>
    );
}
