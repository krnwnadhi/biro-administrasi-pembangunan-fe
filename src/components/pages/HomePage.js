import {
    Box,
    Card,
    Center,
    Container,
    Divider,
    Image,
    Paper,
    SimpleGrid,
    Space,
    Text,
    createStyles,
    useMantineTheme,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import CarouselGallery from "./CarouselGallery";
import CarouselOne from "../MantineUI/CarouselOne";
import HeroHeaderMantine from "../MantineUI/HeroHeaderMantine";
import { fetchAllPostAction } from "../redux/slices/posts/postSlice";
import { useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";

// import CarouselMantine from "../MantineUI/CarouselMantine";

// import { fetchAllCategoryAction } from "../redux/slices/category/categorySlice";

const useStyles = createStyles((theme) => ({
    card: {
        transition: "transform 150ms ease, box-shadow 100ms ease",
        "&:hover": {
            boxShadow: theme.shadows.sm,
            transform: "scale(1.01)",
        },
    },
    boxOne: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
        padding: theme.spacing.xl,
        paddingBottom: 50,
        marginBottom: theme.radius.xl,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1],
        },
    },
    boxTwo: {
        padding: theme.spacing.xl,
        paddingBottom: 50,
        marginBottom: theme.radius.xl,
    },
}));

const HomePage = () => {
    const dispatch = useDispatch();
    const { classes } = useStyles();

    useEffect(() => {
        dispatch(fetchAllPostAction(""));
        window.scrollTo(0, 0);
    }, [dispatch]);

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

    // const jobColors = {
    //     sosial: "blue",
    //     ekonomi: "cyan",
    //     teknologi: "pink",
    // };

    // const post = useSelector((state) => state?.post);
    // const { postList = [], loading, appError, serverError } = post;

    // const category = useSelector((state) => state?.category);
    // const {
    //     // appError: appErrorCat,
    //     categoryList = [],
    //     // loading: loadingCat,
    //     // serverError: serverErrorCat,
    // } = category;
    // // console.log(categoryList);

    // const allCategories = categoryList?.map((category) => {
    //     return {
    //         label: category?.title,
    //         value: category?.title,
    //     };
    // });

    return (
        <>
            <Paper>
                <HeroHeaderMantine />

                <Space h="xl" />

                <Box className={classes.boxTwo}>
                    <Container size="xl">
                        <Divider
                            my="xs"
                            label="TENTANG"
                            color="blue"
                            fs="italic"
                            fz="xl"
                            fw={700}
                        />

                        <Space h="xl" />

                        <SimpleGrid
                            cols={2}
                            spacing={150}
                            breakpoints={[
                                {
                                    maxWidth: 1050,
                                    cols: 1,
                                    verticalSpacing: "xl",
                                },
                            ]}
                        >
                            <Text color="dimmed" size={mobile ? "sm" : "md"}>
                                <Text
                                    fs={70}
                                    fw={900}
                                    size={mobile ? 30 : 40}
                                    color={theme.colors.blue[9]}
                                >
                                    Biro Adm. Pembangunan
                                    <Text
                                        fs={70}
                                        fw={900}
                                        size={mobile ? 25 : 35}
                                        color={theme.colors.blue[9]}
                                    >
                                        Provinsi Jambi
                                    </Text>
                                </Text>
                                <Space h="xl" />
                                Biro Administrasi Pembangunan merupakan salah
                                satu Biro pada Sekretariat Daerah Prov Jambi
                                yang bertugas membantu Asisten Perekonomian dan
                                Pembangunan dalam penyiapan pengoordinasian
                                perumusan kebijakan daerah, pengoordinasian
                                pelaksanaan tugas Perangkat Daerah, pemantauan
                                dan evaluasi pelaksanaan kebijakan daerah di
                                bidang pengendalian administrasi pelaksanaan
                                pembangunan daerah, pengendalian administrasi
                                pelaksanaan pembangunan wilayah, pelaksanaan
                                tugas Simpul Kerjasama Pemerintah dengan Badan
                                Usaha (KPBU) dalam penyediaan infrastruktur, dan
                                pelaporan pelaksanaan pembangunan.
                            </Text>

                            <Card
                                shadow="lg"
                                p="lg"
                                radius="md"
                                className={classes.card}
                            >
                                <Card.Section>
                                    <Image
                                        height={mobile ? "auto" : 370}
                                        radius="md"
                                        src="https://res.cloudinary.com/degzbxlnx/image/upload/v1690966461/Untitled_design_3_g4c2d0.png"
                                        alt="With custom placeholder"
                                        withPlaceholder
                                        placeholder={
                                            <Text size="sm">
                                                Gubernur & Wakil Gubernur
                                                Provinsi Jambi.png
                                            </Text>
                                        }
                                    />
                                </Card.Section>
                            </Card>
                        </SimpleGrid>
                    </Container>
                </Box>

                <Box className={classes.boxOne}>
                    <Container size="xl" px="xs">
                        <Divider
                            my="xs"
                            label="BERITA & KEGIATAN"
                            color="blue"
                            fs="italic"
                            fz="xl"
                            fw={700}
                        />
                        <CarouselOne />
                    </Container>
                </Box>

                <Space h="xl" />

                <Box className={classes.boxTwo}>
                    <Container size="xl" px="xs">
                        <Divider
                            my="xs"
                            label="GALERI"
                            color="blue"
                            fs="italic"
                            fz="xl"
                            fw={700}
                        />
                        <Center>
                            <CarouselGallery />
                        </Center>
                    </Container>
                </Box>

                <Space h="xl" />

                <Box className={classes.boxOne}>
                    <Container size="xl" px="xs">
                        <Divider
                            my="xs"
                            label="LAYANAN"
                            color="blue"
                            fs="italic"
                            fz="xl"
                            fw={700}
                        />
                        <Center>SIMANTAP</Center>
                    </Container>
                </Box>

                {/* KATEGORI */}

                {/* <div style={{ marginBottom: 20 }}>
                    <div onClick={() => dispatch(fetchAllPostAction(""))}>
                        Reset Kategori
                    </div>
                    {categoryList?.map((category) => (
                        <List key={category._id}>
                            <List.Item
                                onClick={() =>
                                    dispatch(
                                        fetchAllPostAction(category?.title)
                                    )
                                }
                            >
                                {category?.title}
                            </List.Item>
                        </List>
                    ))}
                </div> */}
            </Paper>
        </>
    );
};

export default HomePage;
