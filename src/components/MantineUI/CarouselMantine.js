// import Autoplay from "embla-carousel-autoplay";
// import { Carousel } from "@mantine/carousel";
// import { createStyles } from "@mantine/core";
// import { useRef } from "react";

// const useStyles = createStyles((theme) => ({
//     img: {
//         // position: "relative",
//         backgroundImage: "url(https://source.unsplash.com/random)",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//     },
// }));

// export default function CarouselMantine() {
//     const { classes } = useStyles();
//     const autoplay = useRef(Autoplay({ delay: 3000 }));

//     return (
//         <Carousel
//             sx={{ maxWidth: 520 }}
//             mx="auto"
//             mt={20}
//             withIndicators
//             height={400}
//             slideSize="70%"
//             slideGap="xl"
//             // loop
//             // dragFree
//             plugins={[autoplay.current]}
//             onMouseEnter={autoplay.current.stop}
//             onMouseLeave={autoplay.current.reset}
//             // styles={{
//             //     control: {
//             //         "&[data-inactive]": {
//             //             opacity: 0,
//             //             cursor: "default",
//             //         },
//             //     },
//             // }}
//         >
//             <Carousel.Slide className={classes.img} />
//             <Carousel.Slide className={classes.img} />
//             <Carousel.Slide className={classes.img} />
//             <Carousel.Slide className={classes.img} />
//             <Carousel.Slide className={classes.img} />
//             <Carousel.Slide className={classes.img} />
//             <Carousel.Slide className={classes.img} />
//             <Carousel.Slide className={classes.img} />
//             <Carousel.Slide className={classes.img} />
//             <Carousel.Slide className={classes.img} />

//             {/* ...other slides */}
//         </Carousel>
//     );
// }

import {
    Button,
    Paper,
    Text,
    Title,
    createStyles,
    useMantineTheme,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { Link } from "react-router-dom";
import { fetchAllPostAction } from "../redux/slices/posts/postSlice";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
    card: {
        height: 275,
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
        fontSize: 32,
        marginTop: theme.spacing.xs,
    },

    category: {
        color: theme.black,
        opacity: 0.7,
        fontWeight: 700,
        textTransform: "uppercase",
    },
}));

function Card({ image, title, category, _id }) {
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
                <Text className={classes.category} size="xs">
                    {category}
                </Text>
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
            </div>
            <Button
                mb={20}
                component={Link}
                // to={`/posts/${_id}`}
                // to={`/berita/${_id}`}
                to={"/berita"}
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
    console.log(postList);

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
    const slides = postList.map((item) => (
        <Carousel.Slide key={item._id}>
            <Card {...item} />
        </Carousel.Slide>
    ));

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
            slides={slides}
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
        >
            {slides}
        </Carousel>
    );
}
