import {
    Alert,
    Anchor,
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    PasswordInput,
    Stack,
    TextInput,
    Title,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import { IconAlertCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import React from "react";
import { Redirect } from "react-router-dom";
import { loginUserAction } from "../redux/slices/users/usersSlices";
import { useForm } from "@mantine/form";
import { useToggle } from "@mantine/hooks";

export default function SignInMantine(props) {
    const [type] = useToggle(["login", "register"]);
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
    const { userAuth, appError, serverError } = storeDataLogin;
    // console.log("storeDataLogin", storeDataLogin);

    //redirect'
    if (userAuth) {
        return <Redirect to="/dashboard" />;
    }

    const formOnSubmit = form.onSubmit((values) =>
        dispatch(loginUserAction(values))
    );

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
                        {appError || serverError ? (
                            <Alert
                                icon={<IconAlertCircle size={16} />}
                                color="red"
                                radius="lg"
                            >
                                {appError}
                            </Alert>
                        ) : null}

                        <TextInput
                            withAsterisk
                            autoComplete="false"
                            label="Email"
                            radius="md"
                            placeholder="xxx@mail.com"
                            {...form.getInputProps("email")}
                        />

                        <PasswordInput
                            withAsterisk
                            radius="md"
                            label="Password"
                            placeholder="Min. 6 Karakter"
                            {...form.getInputProps("password")}
                        />

                        {type === "login" && (
                            <Group position="apart" mt="lg">
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
                                <Anchor
                                    component={Link}
                                    to="/reset-password"
                                    underline={false}
                                    size="sm"
                                >
                                    Lupa password?
                                </Anchor>
                            </Group>
                        )}
                    </Stack>

                    <Group position="right" mt="xl">
                        <Button disabled={!form.isValid()} type="submit">
                            Sign In
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}
