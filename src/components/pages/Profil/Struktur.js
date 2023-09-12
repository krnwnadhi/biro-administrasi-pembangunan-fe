import "react-lazy-load-image-component/src/effects/blur.css";

import { Center, useMantineTheme } from "@mantine/core";
import React, { useEffect } from "react";

import { Fade } from "react-awesome-reveal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMediaQuery } from "@mantine/hooks";

const Struktur = () => {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Fade triggerOnce>
            <Center p={20}>
                <LazyLoadImage
                    src="https://res.cloudinary.com/degzbxlnx/image/upload/v1690966461/Untitled_design_3_g4c2d0.png"
                    width={mobile ? 420 : 1200}
                    // height={400}
                    alt="Image Alt"
                    effect="blur"
                />
            </Center>
        </Fade>
    );
};

export default Struktur;
