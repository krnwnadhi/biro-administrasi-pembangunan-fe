import {
    ActionIcon,
    Anchor,
    Box,
    Breadcrumbs,
    Center,
    Container,
    Image,
    Loader,
    Pagination,
    SimpleGrid,
    Space,
    Text,
    TextInput,
    useMantineTheme,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { baseGalleryURL } from "../../../utils/baseURL";
import { fetchAllGalleryAction } from "../../redux/slices/gallery/gallerySlice";
import { useMediaQuery } from "@mantine/hooks";

const GalleryListPublic = () => {
    const dispatch = useDispatch();

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

    useEffect(() => {
        dispatch(fetchAllGalleryAction());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const gallery = useSelector((state) => state?.gallery);
    const { galleryList = [], appError, serverError, loading } = gallery;

    const [galleryItem, setGalleryItem] = useState([galleryList]);
    const [load, setLoad] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(12);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        const abortController = new AbortController();

        getGallery();

        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        setTimeout(() => setLoad(false), 2000);

        return () => {
            abortController.abort();
        };
    }, [page, keyword]);

    const getGallery = async () => {
        const response = await axios.get(
            `${baseGalleryURL}?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        // console.log(response.data.result);
        setGalleryItem(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalItem);
        setRows(response.data.totalPage);
    };

    const handlePageChange = (event) => {
        setPage(event);
        // console.log(event);
    };

    const searchData = (e) => {
        e.preventDefault();
        setLoad(true);
        setTimeout(() => {
            setPage(0);
            setKeyword(query);
            setLoad(false);
        }, 2500);
    };

    const handleTextInput = (e) => {
        setQuery(e.target.value);
    };

    const breadcrumbsItem = [
        { title: "Home", href: "/" },
        { title: "Informasi", href: "#" },
        { title: "Gallery", href: "/gallery" },
    ].map((item, index) => (
        <Anchor
            href={item.href}
            key={index}
            size="sm"
            underline={false}
            truncate="end"
        >
            {item.title}
        </Anchor>
    ));

    return (
        <Container size="lg" mt={20}>
            <Breadcrumbs>{breadcrumbsItem}</Breadcrumbs>

            <Space h="xl" />

            <div style={{ width: "100%", marginBottom: 30 }}>
                <TextInput
                    placeholder="Cari..."
                    value={query}
                    onChange={handleTextInput}
                    rightSection={
                        load ? (
                            <ActionIcon
                                loading={
                                    load ? (
                                        <Loader size="sm" variant="dots" />
                                    ) : null
                                }
                            />
                        ) : (
                            <ActionIcon
                                color="blue"
                                variant="transparent"
                                onClick={searchData}
                            >
                                <IconSearch size={18} stroke={1.5} />
                            </ActionIcon>
                        )
                    }
                />
            </div>

            <SimpleGrid
                cols={4}
                spacing="lg"
                verticalSpacing="xl"
                breakpoints={[
                    { maxWidth: 980, cols: 3, spacing: "md" },
                    { maxWidth: 755, cols: 2, spacing: "sm" },
                    { maxWidth: 600, cols: 1, spacing: "sm" },
                ]}
            >
                {loading ? (
                    <Center style={{ minHeight: "70vh" }}>
                        <Loader size="xl" />
                    </Center>
                ) : appError || serverError ? (
                    <h2>
                        {appError}
                        {serverError}
                    </h2>
                ) : galleryItem?.length === 0 ? (
                    <h2>Tidak ada Post</h2>
                ) : null}

                {galleryItem?.map((item, index) => {
                    return (
                        <Center
                            key={index}
                            // component={Link}
                            // to={`/dashboard/update-gallery/${item?._id}`}
                            sx={{ textDecoration: "none" }}
                        >
                            <Image
                                key={index}
                                radius="md"
                                height={mobile ? 200 : null}
                                width={mobile ? 200 : null}
                                fit="cover"
                                src={item?.image}
                                alt="With default placeholder"
                                withPlaceholder
                                caption={item?.title}
                            />
                        </Center>
                    );
                })}
            </SimpleGrid>

            <Space h="xl" />

            <Text size="sm">
                Halaman {rows ? page : 0} dari {rows}
                <Space h="xs" />
                Total : {pages} Item
            </Text>
            <Center>
                <Box p={20}>
                    <Pagination
                        onChange={handlePageChange}
                        total={rows}
                        withControls
                        withEdges
                    />
                </Box>
            </Center>
        </Container>
    );
};

export default GalleryListPublic;
