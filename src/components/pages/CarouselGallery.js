import { Container, Image, Text, createStyles } from "@mantine/core";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { fetchAllGalleryAction } from "../redux/slices/gallery/gallerySlice";

const useStyles = createStyles((theme) => ({
    transition: {
        transition: "transform 150ms ease, box-shadow 100ms ease",

        "&:hover": {
            boxShadow: theme.shadows.sm,
            transform: "scale(1.01)",
        },
    },
}));

const CarouselGallery = () => {
    const { classes } = useStyles();
    const dispatch = useDispatch();

    const autoplay = useRef(Autoplay({ delay: 2000 }));

    useEffect(() => {
        dispatch(fetchAllGalleryAction());
    }, [dispatch]);

    const gallery = useSelector((state) => state?.gallery);
    const { galleryList = [], appError, serverError, loading } = gallery;

    const { result = [] } = galleryList;

    const slides = result
        .map((item, index) => {
            return (
                <Carousel.Slide key={index}>
                    <Image
                        className={classes.transition}
                        key={index}
                        radius="md"
                        fit="cover"
                        src={item?.image}
                        alt="With default placeholder"
                        withPlaceholder
                        // caption={item?.title}
                    />
                </Carousel.Slide>
            );
        })
        .slice(0, 5);

    return (
        <Container size="lg">
            <Carousel
                // sx={{ maxWidth: 320 }}
                mx="auto "
                withIndicators
                slideSize="33%"
                breakpoints={[
                    { maxWidth: "md", slideSize: "50%" },
                    { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
                ]}
                slideGap="xl"
                align="start"
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
                        // marginTop: -35,
                        width: 12,
                        height: 8,
                        transition: "width 250ms ease",

                        "&[data-active]": {
                            width: 24,
                        },
                    },
                }}
            >
                {slides === 0 ? (
                    <>
                        <Container my={10}>
                            <Text>Belum ada Foto/Galeri</Text>
                        </Container>
                    </>
                ) : (
                    slides
                )}
            </Carousel>
        </Container>
    );
};

export default CarouselGallery;
