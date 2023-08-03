import "react-lazy-load-image-component/src/effects/blur.css";

import {
    Button,
    Center,
    Container,
    List,
    Paper,
    SimpleGrid,
    Space,
    Text,
    Title,
    createStyles,
    useMantineTheme,
} from "@mantine/core";
import { React, useEffect } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { startNavigationProgress } from "@mantine/nprogress";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
    card: {
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        transition: "transform 150ms ease, box-shadow 100ms ease",
        padding: theme.spacing.lg,
        paddingLeft: `calc(${theme.spacing.xl} * 2)`,

        "&:hover": {
            boxShadow: theme.shadows.md,
            transform: "scale(1.01)",
        },

        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 6,
            backgroundImage: theme.fn.linearGradient(
                0,
                theme.colors.blue[6],
                theme.colors.red[6]
            ),
        },
    },
}));

const VisiMisi = () => {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container size="lg">
            <Title my="sm" order={2} align="center">
                Visi Misi Biro Administrasi Pembangunan Provinsi Jambi
            </Title>

            <Space h="xl" />

            <Center p={20}>
                <LazyLoadImage
                    src="https://res.cloudinary.com/degzbxlnx/image/upload/v1690966461/Untitled_design_3_g4c2d0.png"
                    height={mobile ? 300 : 400}
                    alt="Image Alt"
                    effect="blur"
                />
            </Center>

            <SimpleGrid
                spacing="xl"
                // p={15}
                breakpoints={[{ minWidth: "md", cols: 2 }]}
            >
                <Paper withBorder radius="md" className={classes.card}>
                    <Text size="xl" weight={500} mt="md">
                        Visi
                    </Text>
                    <Text size="sm" mt="sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maiores omnis quibusdam ipsam ex dolorem iusto, non cum
                        perferendis ducimus, commodi laboriosam hic quos modi,
                        delectus nostrum. Dolore iure non labore. Nemo eaque
                        officiis esse dolor, unde numquam quisquam sint
                        provident nobis et voluptate. Iusto atque odit
                        assumenda. Asperiores nisi, veniam voluptas voluptatum
                        minus labore voluptatem fuga dolores suscipit pariatur
                        recusandae!
                    </Text>
                </Paper>
                <Paper withBorder radius="md" className={classes.card}>
                    <Text size="xl" weight={500} mt="md">
                        Misi
                    </Text>
                    <List type="ordered" size="sm" mt="sm" color="dimmed">
                        <List.Item>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Harum explicabo, quo quidem, sed odio
                            voluptatem repudiandae error voluptatum facere totam
                            sequi laboriosam possimus eaque facilis hic animi
                            unde eum atque.
                        </List.Item>
                        <List.Item>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Dolore veritatis nisi expedita consequatur hic
                            natus eius cumque officiis blanditiis quia aperiam
                            at voluptate odit, in sint? Laboriosam sapiente
                            error optio.
                        </List.Item>
                        <List.Item>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Distinctio ipsam sapiente beatae temporibus.
                            Eaque vitae quisquam dolor soluta. Quaerat tempore
                            beatae aliquid molestias iusto nesciunt cupiditate
                            iste pariatur, repellendus libero.
                        </List.Item>
                    </List>
                </Paper>
            </SimpleGrid>
        </Container>
    );
};

export default VisiMisi;
