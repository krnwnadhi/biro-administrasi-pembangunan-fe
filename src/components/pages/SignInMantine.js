import {
    Alert,
    Anchor,
    Button,
    Checkbox,
    Container,
    Divider,
    Group,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { IconAlertCircle, IconCheck, IconX } from "@tabler/icons-react";
import { upperFirst, useToggle } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router-dom";
import { loginUserAction } from "../redux/slices/users/usersSlices";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";

export default function SignInMantine(props) {
    const [type, toggle] = useToggle(["login", "register"]);
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) =>
                val.length <= 5
                    ? "Password should include at least 5 characters"
                    : null,
        },
    });

    //dispatch
    const dispatch = useDispatch();

    //select state from store
    const storeDataLogin = useSelector((store) => store?.users);
    const { userAuth, loading, appError, serverError } = storeDataLogin;
    // console.log("storeDataLogin", storeDataLogin);

    //redirect'
    if (userAuth) {
        return <Redirect to="/dashboard" />;
    }

    const formOnSubmit = form.onSubmit((values) =>
        dispatch(loginUserAction(values))
    );

    // const notification = () => {
    //     !appError &&
    //         showNotification({
    //             title: "Success!",
    //             message: "Successfully logged in",
    //             color: "green",
    //             icon: <IconCheck size={20} />,
    //             // closeButtonProps: {
    //             //     color: "green",
    //             //     iconSize: 20,
    //             // },
    //         });
    // };

    return (
        <Container size={420}>
            <Title
                align="center"
                sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                    paddingTop: 100,
                })}
            >
                Selamat Datang!
            </Title>
            <Paper mt={50} shadow="xl" radius="md" p="xl" withBorder {...props}>
                <form onSubmit={formOnSubmit}>
                    <Stack>
                        {type === "register" && (
                            <TextInput
                                label="Name"
                                placeholder="Your name"
                                value={form.values.name}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "name",
                                        event.currentTarget.value
                                    )
                                }
                            />
                        )}

                        {appError || serverError ? (
                            <Alert
                                icon={<IconAlertCircle size={16} />}
                                color="red"
                                radius="lg"
                                // withCloseButton
                            >
                                {appError}
                            </Alert>
                        ) : null}

                        <TextInput
                            withAsterisk
                            autoComplete="false"
                            label="Email"
                            placeholder="xxx@mail.com"
                            {...form.getInputProps("email")}
                        />

                        <PasswordInput
                            withAsterisk
                            label="Password"
                            placeholder="Min. 6 Karakter"
                            {...form.getInputProps("password")}
                        />

                        {type === "login" && (
                            <Checkbox
                                label="Ingat saya"
                                checked={form.values.terms}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "terms",
                                        event.currentTarget.checked
                                    )
                                }
                            />
                        )}

                        {type === "register" && (
                            <Checkbox
                                label="I accept terms and conditions"
                                checked={form.values.terms}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "terms",
                                        event.currentTarget.checked
                                    )
                                }
                            />
                        )}
                    </Stack>

                    <Group position="right" mt="xl">
                        {/* <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => toggle()}
                            size="xs"
                        >
                            {type === "register"
                                ? "Already have an account? Login"
                                : "Don't have an account? Register"}
                        </Anchor> */}
                        <Button
                            disabled={!form.isValid()}
                            type="submit"
                            // onClick={notification}
                        >
                            Sign In
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}
