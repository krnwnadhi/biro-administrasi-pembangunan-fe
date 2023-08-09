import { Image, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Carousel } from "@mantine/carousel";
import { fetchAllGalleryAction } from "../redux/slices/gallery/gallerySlice";

const CarouselGallery = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllGalleryAction());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const gallery = useSelector((state) => state?.gallery);
    const { galleryList = [], appError, serverError, loading } = gallery;
    // console.log(galleryList.result);

    const slides = galleryList?.result?.map((item, index) => {
        return (
            <Image
                key={index}
                radius="md"
                // fit="cover"
                src={item?.image}
                alt="With default placeholder"
                withPlaceholder
                caption={item?.title}
            />
        );
        // <Carousel.Slide key={url}>
        //     <Image src={url} />
        // </Carousel.Slide>
    });

    return (
        <>
            <Carousel sx={{ maxWidth: 320 }} mx="auto" withIndicators>
                {slides}
            </Carousel>
        </>
    );
};

export default CarouselGallery;
