import {
    ActionIcon,
    Alert,
    Button,
    Container,
    Divider,
    Group,
    Paper,
    Text,
    TextInput,
} from "@mantine/core";
import {
    IconAlertCircle,
    IconChevronLeft,
    IconTrash,
} from "@tabler/icons-react";
import { Link, Redirect, useParams } from "react-router-dom";
import {
    deleteCategoryAction,
    fetchCategoryAction,
    updateCategoryAction,
} from "../redux/slices/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { useForm } from "@mantine/form";

export default function UpdateCategory() {
    const dispatch = useDispatch();
    const params = useParams();
    const id = params.id;

    //get data from store
    const state = useSelector((state) => state?.category);
    const { appError, loading, serverError, category, isEdited, isDeleted } =
        state;
    // console.log(updatedCategory);

    const form = useForm({
        initialValues: {
            title: category?.title,
        },

        validate: (value) => ({
            title:
                value.title.length < 3 ? "Terlalu pendek. Min. 3 huruf" : null,
        }),
    });

    useEffect(() => {
        dispatch(fetchCategoryAction(id));
    }, [dispatch, id]);

    const formOnSubmit = form.onSubmit((values) =>
        dispatch(updateCategoryAction({ title: values.title, id }))
    );

    //redirect
    if (isEdited || isDeleted) return <Redirect push to="/kategori" />;

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
                    Update Kategori
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
                        // value={form.values.title}
                        // onChange={(event) =>
                        //     form.setFieldValue(
                        //         "title",
                        //         event.currentTarget.value
                        //     )
                        // }
                        // onChange={form.setValues((prev) => ({ ...prev }))}

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
                            <Group>
                                <Button
                                    // disabled={!form.isValid()}
                                    type="submit"
                                    compact
                                    color="green"
                                >
                                    Update
                                </Button>
                                <ActionIcon
                                    color="red"
                                    onClick={() =>
                                        dispatch(deleteCategoryAction(id))
                                    }
                                >
                                    <IconTrash size={16} stroke={1.5} />
                                </ActionIcon>
                            </Group>
                        )}
                    </Group>
                </form>
            </Container>
        </Paper>
    );
}
