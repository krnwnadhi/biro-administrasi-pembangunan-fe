import {
    Alert,
    Box,
    Button,
    Center,
    Container,
    Divider,
    FileInput,
    Group,
    Image,
    Loader,
    Paper,
    Select,
    Text,
    TextInput,
    Textarea,
    useMantineTheme,
} from "@mantine/core";
import {
    IconAlertCircle,
    IconChevronLeft,
    IconPhoto,
    IconUpload,
    IconX,
} from "@tabler/icons-react";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom";
import { createGalleryAction } from "../redux/slices/gallery/gallerySlice";

export default function CreateGallery() {
    const [value, setValue] = useState("");

    const theme = useMantineTheme();

    const dispatch = useDispatch();

    const gallery = useSelector((state) => state);
    // console.log(gallery);
    const { appError, loading, serverError, isCreated, galleryList } = gallery;

    const form = useForm({
        initialValues: {
            title: "",
            images: [],
        },

        validate: {
            title: hasLength({ min: 3 }, "Terlalu pendek. Min. 3 huruf"),
            images: isNotEmpty("Tidak boleh kosong"),
        },
    });

    const formOnSubmit = form.onSubmit(
        (values) => console.log(values)
        // dispatch(createGalleryAction(values))
    );

    const handleFileChange = ({ target }) => {
        console.log(target.value);

        // setValue(target.file[0]);
    };

    const postDetails = () => {};

    // Redirect
    // if (isCreated) return <Redirect to="/dashboard/gallery" />;

    return (
        <Paper radius="md" p="xl">
            <Container>
                <Text
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                    size="lg"
                    weight={500}
                >
                    Tambah Gallery
                </Text>

                <Divider labelPosition="center" my="xl" />

                {loading ? (
                    <Center style={{ minHeight: "80vh" }}>
                        <Loader mt={20} size="lg" variant="dots" />
                    </Center>
                ) : (
                    <form
                        onSubmit={formOnSubmit}
                        encType="multipart/form-data"
                        method="POST"
                    >
                        {appError || serverError ? (
                            <Alert
                                icon={<IconAlertCircle size={16} />}
                                title="Error!"
                                color="red"
                            >
                                Tidak ada Token! Silahkan login kembali.
                            </Alert>
                        ) : null}
                        <TextInput
                            mb={20}
                            withAsterisk
                            label="Judul"
                            aria-label="My input"
                            placeholder="Judul Artikel"
                            {...form.getInputProps("title")}
                            disabled
                        />
                        <FileInput
                            label="Gambar"
                            description="Input gambar berekstensi jpg, jpeg, atau png. Maks 5 gambar & berukuran < 1Mb."
                            placeholder="Silahkan Pilih Gambar"
                            multiple
                            clearable
                            required
                            withAsterisk
                            accept="image/png, image/jpeg, image/jpg"
                            // value={value}
                            // onChange={handleFileChange}
                            {...form.getInputProps("images")}
                            disabled
                        />

                        <Text size="sm" color="red" ta="center">
                            {appError
                                ? "File terlalu besar, Silahkan refresh browser dahulu"
                                : null}
                        </Text>
                        <Group position="apart" mt="xl">
                            <Button
                                compact
                                component={Link}
                                color="gray"
                                to="/dashboard"
                                variant="subtle"
                                leftIcon={<IconChevronLeft size={12} />}
                                size="xs"
                            >
                                <Text>Dashboard</Text>
                            </Button>
                            {loading ? (
                                <Button disabled compact loading>
                                    Loading...
                                </Button>
                            ) : (
                                <Button
                                    // disabled={!form.isValid()}
                                    disabled
                                    type="submit"
                                    compact
                                    onClick={postDetails}
                                >
                                    Tambah
                                </Button>
                            )}
                        </Group>
                    </form>
                )}
            </Container>
        </Paper>
    );
}
