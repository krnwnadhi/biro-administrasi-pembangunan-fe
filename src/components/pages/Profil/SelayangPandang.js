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
                <Title my="sm" order={2} align="center">
                    Selayang Pandang Biro Administrasi Pembangunan Provinsi
                    Jambi
                </Title>

                <Space h="xl" />

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

                <Space h="xl" />

                <TypographyStylesProvider>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Porro aliquam quidem illo nobis nostrum veniam earum cumque
                    nam delectus, quia, eum doloribus, quam corrupti ea adipisci
                    vitae mollitia quis? Iste! Dignissimos ea magnam quaerat at
                    minus recusandae? Maxime nemo neque atque labore illum rem,
                    laboriosam dolorum incidunt voluptates repellat ad mollitia
                    corporis commodi sequi blanditiis odio doloribus quia
                    voluptatum voluptatem! Possimus quod, voluptas quae
                    consequuntur sunt architecto dolores sequi ut vero
                    distinctio quaerat eligendi odit vitae id eos ea voluptatum!
                    Dolores consequatur totam maiores, ducimus repellendus nihil
                    tempora provident cupiditate. Ullam voluptatum delectus
                    aperiam optio, ipsa dicta consequuntur modi totam assumenda
                    debitis dolorum, adipisci alias dolores corporis, id aliquid
                    sit eum reprehenderit error tempora reiciendis. Alias
                    debitis ipsum nulla magni. Suscipit, reprehenderit hic fugit
                    explicabo quis vitae aut nobis aliquid facere sint quam
                    inventore quibusdam enim, consequatur ab ipsa molestiae,
                    quidem ad natus accusamus et placeat! Reprehenderit illum
                    vel explicabo.
                </TypographyStylesProvider>

                <Space h="xl" />

                <TypographyStylesProvider>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quae, natus amet autem id dolorum libero harum quaerat, a
                    ducimus distinctio ipsam ipsum molestias nulla dignissimos.
                    Magni commodi architecto assumenda laborum? Quis modi
                    exercitationem, saepe dolores dolorem error doloremque quas
                    ratione. Magni iusto autem nostrum, repellendus quas quia.
                    Tenetur, consectetur sint fugit earum quia amet excepturi
                    suscipit temporibus quod, consequuntur eos. Vero fugit
                    maiores possimus accusantium veniam, optio itaque beatae
                    deserunt in a aliquam saepe maxime illum similique est
                    minima, labore et alias quos, magni excepturi iure. Quaerat
                    rerum eum voluptatibus. Accusamus, minus repellendus rem
                    mollitia provident voluptas officiis dolorem earum excepturi
                    eaque iure debitis asperiores, harum labore dicta ab.
                    Quibusdam neque asperiores facilis provident nemo totam
                    fugiat modi explicabo iure! Adipisci deleniti assumenda
                    corrupti a quibusdam aut dolor, ducimus laboriosam animi
                    consequuntur. Cum possimus provident dicta asperiores animi
                    ratione veniam, aliquid quia atque dolorem quidem culpa
                    molestias molestiae fugiat saepe!
                </TypographyStylesProvider>

                <Space h="xl" />

                <TypographyStylesProvider>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nihil molestiae modi facere saepe nemo eum autem minima quam
                    placeat laborum quasi eveniet aperiam odit, veritatis cum
                    non corrupti inventore optio? Animi doloremque sit optio
                    perferendis adipisci, sint architecto error quis! Tenetur
                    autem qui consectetur, odio inventore, dignissimos a
                    voluptatum nihil quaerat, quasi id repellendus adipisci
                    incidunt dolorem! Impedit, explicabo sint. Incidunt
                    blanditiis dolor veniam quod error cupiditate, consectetur
                    nostrum officia asperiores voluptatibus quo ducimus itaque
                    sit in et eaque ex minus dicta! Saepe dolore possimus esse
                    expedita animi soluta nesciunt! Dolore expedita eum iure
                    vero ex similique molestias. Corporis esse animi culpa!
                    Tempore aut sit quidem ex impedit, provident, voluptas ipsa
                    quia doloribus eos, laborum harum unde inventore itaque
                    possimus. Doloribus quasi tempora veniam architecto dolorum
                    velit accusamus. Atque quas velit unde corporis dolore et
                    laboriosam officia labore ducimus error vel, consequatur
                    sapiente dolores quam, fugiat distinctio at, explicabo quos.
                </TypographyStylesProvider>

                <Space h="xl" />

                <TypographyStylesProvider>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                    fuga voluptas iusto similique facilis rerum aspernatur!
                    Repellendus ab molestiae placeat earum consectetur pariatur
                    voluptatum, temporibus qui, a, distinctio autem voluptates.
                    Quibusdam ipsa neque vero delectus distinctio deserunt
                    dolore laboriosam at harum? Repellendus, tempora. Iure
                    consectetur odit harum. Asperiores veritatis eum, dolores
                    tempore mollitia omnis voluptates, earum nostrum provident
                    nobis temporibus? Harum, commodi aliquid. Facere distinctio
                    voluptatem cum? Ut et iusto totam ex aut sit velit! Quod
                    dolore minus fugit, nulla ea quaerat aut doloribus omnis
                    deleniti iste, perspiciatis praesentium dignissimos. Quos
                    animi non sit libero nihil accusantium alias tenetur
                    veritatis nulla fugit deserunt voluptates similique fugiat,
                    corrupti labore esse ab ipsam architecto omnis consequatur
                    iure enim exercitationem debitis consequuntur. Reiciendis!
                    Cupiditate itaque non explicabo, atque corrupti hic eaque
                    distinctio, doloribus necessitatibus odit a quo dicta
                    expedita nemo. Enim placeat non repellat nam quia, cum
                    dolorem fuga officia repellendus earum. Omnis!
                </TypographyStylesProvider>

                <Space h="xl" />

                <TypographyStylesProvider>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Consequatur, dolor? At nihil labore quas quibusdam porro
                    praesentium dignissimos sapiente est natus dolorem sequi
                    animi, et quisquam dolor, voluptatum nostrum rem. Eius
                    dignissimos impedit, eligendi libero nihil quas sapiente
                    quod dolorum eveniet! Magnam molestias nisi eos sint
                    voluptatibus, harum qui debitis incidunt. Modi, repellendus.
                    Inventore debitis quia nemo laboriosam voluptatibus
                    possimus! Quas libero quo ipsa facilis, voluptas excepturi
                    architecto est tempore mollitia doloremque aut modi
                    consequuntur sed aliquid, amet dignissimos fuga, quasi quae
                    quisquam placeat similique sapiente perspiciatis veritatis!
                    Culpa, facilis. Corporis quaerat, id cum sint aliquam ut
                    saepe unde dicta ex nulla beatae esse officiis quibusdam
                    nihil aut excepturi cumque aperiam quod? Culpa officia eaque
                    cum distinctio alias expedita velit. Pariatur dolorum
                    consequatur, porro tempore aperiam voluptate, commodi eaque
                    corrupti, nisi consequuntur optio? Suscipit ut ea tenetur
                    consequatur dignissimos earum sapiente praesentium corporis
                    ullam quidem. Dicta deserunt consequatur iste nihil?
                </TypographyStylesProvider>
            </Container>
        </Paper>
    );
};

export default SelayangPandang;
