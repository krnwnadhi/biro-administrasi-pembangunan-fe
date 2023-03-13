import {
    Alert,
    Anchor,
    Button,
    Container,
    Divider,
    Group,
    Paper,
    Text,
    TextInput,
} from "@mantine/core";
import { IconAlertCircle, IconChevronLeft } from "@tabler/icons-react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createCategoryAction } from "../redux/slices/category/categorySlice";
import { useForm } from "@mantine/form";

export default function AddCategory() {
    const dispatch = useDispatch();
    const form = useForm({
        initialValues: {
            title: "",
        },

        validate: (value) => ({
            title:
                value.title.length < 3 ? "Terlalu pendek. Min. 3 huruf" : null,
        }),
    });

    //get data from store
    const state = useSelector((state) => state?.category);
    const { appError, loading, serverError, category, isCreated } = state;

    const formOnSubmit = form.onSubmit((values) =>
        dispatch(createCategoryAction(values))
    );

    // Redirect
    if (isCreated) return <Redirect to="/kategori" />;

    return (
        <Paper radius="md" p="xl">
            <Container size={420} my={170}>
                <Text
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                    size="lg"
                    weight={500}
                >
                    Tambah Kategori
                </Text>

                <Divider labelPosition="center" my="xl" />

                <form onSubmit={formOnSubmit}>
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
                        withAsterisk
                        label="Kategori"
                        placeholder="Cth: Teknologi"
                        {...form.getInputProps("title")}
                    />

                    <Group position="apart" mt="xl">
                        <Button
                            compact
                            component={Link}
                            color="gray"
                            to="/kategori"
                            variant="subtle"
                            leftIcon={<IconChevronLeft size={12} />}
                            size="xs"
                        >
                            <Text>Kategori</Text>
                        </Button>
                        {loading ? (
                            <Button disabled compact loading>
                                Loading...
                            </Button>
                        ) : (
                            <Button
                                disabled={!form.isValid()}
                                type="submit"
                                compact
                            >
                                Tambah
                            </Button>
                        )}
                    </Group>
                </form>
            </Container>
        </Paper>
    );
}
