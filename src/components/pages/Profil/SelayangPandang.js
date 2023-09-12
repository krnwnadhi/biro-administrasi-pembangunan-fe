import "react-lazy-load-image-component/src/effects/blur.css";

import {
    Center,
    Container,
    Paper,
    Space,
    Title,
    TypographyStylesProvider,
    useMantineTheme,
} from "@mantine/core";
import React, { useEffect } from "react";

import { Fade } from "react-awesome-reveal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMediaQuery } from "@mantine/hooks";

const SelayangPandang = () => {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Paper style={{ minHeight: "92vh" }}>
            <Container size="md">
                <Fade triggerOnce>
                    <Title my="sm" order={2} align="center">
                        Selayang Pandang Biro Administrasi Pembangunan Provinsi
                        Jambi
                    </Title>
                </Fade>

                <Space h="xl" />

                <Fade triggerOnce>
                    <Center p={20}>
                        <LazyLoadImage
                            src="https://res.cloudinary.com/degzbxlnx/image/upload/v1690966461/Untitled_design_3_g4c2d0.png"
                            width={mobile ? 450 : 800}
                            // height={200}
                            alt="Gubernur & Wakil Gubernur
                        Provinsi Jambi.png"
                            effect="blur"
                        />
                    </Center>
                </Fade>

                <Space h="xl" />

                <Fade triggerOnce>
                    <TypographyStylesProvider>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Porro aliquam quidem illo nobis nostrum veniam
                        earum cumque nam delectus, quia, eum doloribus, quam
                        corrupti ea adipisci vitae mollitia quis? Iste!
                        Dignissimos ea magnam quaerat at minus recusandae?
                        Maxime nemo neque atque labore illum rem, laboriosam
                        dolorum incidunt voluptates repellat ad mollitia
                        corporis commodi sequi blanditiis odio doloribus quia
                        voluptatum voluptatem! Possimus quod, voluptas quae
                        consequuntur sunt architecto dolores sequi ut vero
                        distinctio quaerat eligendi odit vitae id eos ea
                        voluptatum! Dolores consequatur totam maiores, ducimus
                        repellendus nihil tempora provident cupiditate. Ullam
                        voluptatum delectus aperiam optio, ipsa dicta
                        consequuntur modi totam assumenda debitis dolorum,
                        adipisci alias dolores corporis, id aliquid sit eum
                        reprehenderit error tempora reiciendis. Alias debitis
                        ipsum nulla magni. Suscipit, reprehenderit hic fugit
                        explicabo quis vitae aut nobis aliquid facere sint quam
                        inventore quibusdam enim, consequatur ab ipsa molestiae,
                        quidem ad natus accusamus et placeat! Reprehenderit
                        illum vel explicabo.
                    </TypographyStylesProvider>
                </Fade>

                <Space h="xl" />

                <Fade triggerOnce>
                    <TypographyStylesProvider>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Quae, natus amet autem id dolorum libero harum
                        quaerat, a ducimus distinctio ipsam ipsum molestias
                        nulla dignissimos. Magni commodi architecto assumenda
                        laborum? Quis modi exercitationem, saepe dolores dolorem
                        error doloremque quas ratione. Magni iusto autem
                        nostrum, repellendus quas quia. Tenetur, consectetur
                        sint fugit earum quia amet excepturi suscipit temporibus
                        quod, consequuntur eos. Vero fugit maiores possimus
                        accusantium veniam, optio itaque beatae deserunt in a
                        aliquam saepe maxime illum similique est minima, labore
                        et alias quos, magni excepturi iure. Quaerat rerum eum
                        voluptatibus. Accusamus, minus repellendus rem mollitia
                        provident voluptas officiis dolorem earum excepturi
                        eaque iure debitis asperiores, harum labore dicta ab.
                        Quibusdam neque asperiores facilis provident nemo totam
                        fugiat modi explicabo iure! Adipisci deleniti assumenda
                        corrupti a quibusdam aut dolor, ducimus laboriosam animi
                        consequuntur. Cum possimus provident dicta asperiores
                        animi ratione veniam, aliquid quia atque dolorem quidem
                        culpa molestias molestiae fugiat saepe!
                    </TypographyStylesProvider>
                </Fade>

                <Space h="xl" />

                <Fade triggerOnce>
                    <TypographyStylesProvider>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Quae, natus amet autem id dolorum libero harum
                        quaerat, a ducimus distinctio ipsam ipsum molestias
                        nulla dignissimos. Magni commodi architecto assumenda
                        laborum? Quis modi exercitationem, saepe dolores dolorem
                        error doloremque quas ratione. Magni iusto autem
                        nostrum, repellendus quas quia. Tenetur, consectetur
                        sint fugit earum quia amet excepturi suscipit temporibus
                        quod, consequuntur eos. Vero fugit maiores possimus
                        accusantium veniam, optio itaque beatae deserunt in a
                        aliquam saepe maxime illum similique est minima, labore
                        et alias quos, magni excepturi iure. Quaerat rerum eum
                        voluptatibus. Accusamus, minus repellendus rem mollitia
                        provident voluptas officiis dolorem earum excepturi
                        eaque iure debitis asperiores, harum labore dicta ab.
                        Quibusdam neque asperiores facilis provident nemo totam
                        fugiat modi explicabo iure! Adipisci deleniti assumenda
                        corrupti a quibusdam aut dolor, ducimus laboriosam animi
                        consequuntur. Cum possimus provident dicta asperiores
                        animi ratione veniam, aliquid quia atque dolorem quidem
                        culpa molestias molestiae fugiat saepe!
                    </TypographyStylesProvider>
                </Fade>

                <Space h="xl" />

                <Fade triggerOnce>
                    <TypographyStylesProvider>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Quae, natus amet autem id dolorum libero harum
                        quaerat, a ducimus distinctio ipsam ipsum molestias
                        nulla dignissimos. Magni commodi architecto assumenda
                        laborum? Quis modi exercitationem, saepe dolores dolorem
                        error doloremque quas ratione. Magni iusto autem
                        nostrum, repellendus quas quia. Tenetur, consectetur
                        sint fugit earum quia amet excepturi suscipit temporibus
                        quod, consequuntur eos. Vero fugit maiores possimus
                        accusantium veniam, optio itaque beatae deserunt in a
                        aliquam saepe maxime illum similique est minima, labore
                        et alias quos, magni excepturi iure. Quaerat rerum eum
                        voluptatibus. Accusamus, minus repellendus rem mollitia
                        provident voluptas officiis dolorem earum excepturi
                        eaque iure debitis asperiores, harum labore dicta ab.
                        Quibusdam neque asperiores facilis provident nemo totam
                        fugiat modi explicabo iure! Adipisci deleniti assumenda
                        corrupti a quibusdam aut dolor, ducimus laboriosam animi
                        consequuntur. Cum possimus provident dicta asperiores
                        animi ratione veniam, aliquid quia atque dolorem quidem
                        culpa molestias molestiae fugiat saepe!
                    </TypographyStylesProvider>
                </Fade>

                <Space h="xl" />
            </Container>
        </Paper>
    );
};

export default SelayangPandang;
