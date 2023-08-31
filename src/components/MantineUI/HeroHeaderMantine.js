import { Container, Overlay, Text, Title, createStyles } from "@mantine/core";
import { Fade, Slide } from "react-awesome-reveal";

import React from "react";

const useStyles = createStyles((theme) => ({
    hero: {
        position: "relative",
        backgroundImage:
            "url(https://images.unsplash.com/photo-1690446142957-124a5800e656?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80)",
        // backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },

    container: {
        height: 700,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        paddingBottom: theme.spacing.xl * 11,
        zIndex: 1,
        position: "relative",

        [theme.fn.smallerThan("sm")]: {
            height: 750,
            marginTop: theme.spacing.xl * -1,
        },
    },

    title: {
        color: theme.white,
        fontSize: 50,
        fontWeight: 900,

        [theme.fn.smallerThan("sm")]: {
            fontSize: 40,
            lineHeight: 1.2,
        },

        [theme.fn.smallerThan("xs")]: {
            fontSize: 35,
            lineHeight: 1.4,
        },
    },

    description: {
        color: theme.white,
        maxWidth: 600,

        [theme.fn.smallerThan("sm")]: {
            maxWidth: "100%",
            fontSize: theme.fontSizes.md,
        },
    },
}));

export default function HeroHeaderMantine() {
    const { classes } = useStyles();

    return (
        <Fade>
            <div className={classes.hero}>
                <Overlay
                    gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 80%)"
                    opacity={1}
                    zIndex={0}
                />
                <Container className={classes.container}>
                    <Slide direction="down">
                        <Title className={classes.title}>
                            Biro Administrasi Pembangunan Provinsi Jambi
                        </Title>

                        <Text className={classes.description} size="xl" mt="xl">
                            Selamat Datang di Website
                        </Text>

                        <Text className={classes.description} size="xl">
                            Biro Administrasi Pembangunan Provinsi Jambi
                        </Text>
                    </Slide>
                </Container>
            </div>
        </Fade>
    );
}
