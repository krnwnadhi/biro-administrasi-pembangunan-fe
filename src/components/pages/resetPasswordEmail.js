import {
    Button,
    Container,
    Group,
    Loader,
    Paper,
    PasswordInput,
    Space,
    Title,
    createStyles,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import { IconCheck } from "@tabler/icons-react";
import { passwordResetAction } from "../redux/slices/users/usersSlices";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 40,
        fontWeight: 900,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    controls: {
        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column-reverse",
        },
    },

    control: {
        [theme.fn.smallerThan("xs")]: {
            width: "100%",
            textAlign: "center",
        },
    },
}));

export default function ResetPasswordEmail(props) {
    const token = props.match.params.token;

    const { classes } = useStyles();

    const dispatch = useDispatch();

    const form = useForm({
        initialValues: {
            password: "",
        },

        validate: {
            password: hasLength({ min: 8, max: 14 }),
        },
    });

    const user = useSelector((state) => state?.users);
    // console.log(user);
    const { passwordReset, loading } = user;

    const formOnSubmit = form.onSubmit((values) => {
        const data = { password: values?.password, token };
        dispatch(passwordResetAction(data));
        // console.log(data);
    });

    //Redirect
    useEffect(() => {
        setTimeout(() => {
            if (passwordReset) props.history.push("/signin");
        }, 3000);
    }, [passwordReset]);

    return (
        <Container size={460} my={100} sx={{ minHeight: "65vh" }}>
            <Title className={classes.title} align="center">
                Masukkan Password baru
            </Title>

            <Space h="xl" />

            {passwordReset
                ? showNotification({
                      title: "Sukses!",
                      message:
                          "Sukses mengubah password! Akan kembali ke halaman Sign In dalam waktu 3 detik.",
                      icon: <IconCheck size={18} />,
                      color: "green",
                  })
                : null}

            <form onSubmit={formOnSubmit}>
                <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                    <PasswordInput
                        label="Password"
                        placeholder="Minimal 8-14 Karakter"
                        required
                        disabled={loading}
                        maxLength={14}
                        {...form.getInputProps("password")}
                    />
                    <Group
                        position="apart"
                        mt="lg"
                        className={classes.controls}
                    >
                        {loading ? (
                            <Button
                                className={classes.control}
                                size="sm"
                                disabled
                                leftIcon={<Loader variant="oval" size="sm" />}
                            >
                                Loading...
                            </Button>
                        ) : (
                            <Button
                                className={classes.control}
                                disabled={!form.isValid()}
                                type="submit"
                                size="sm"
                                // fullWidth
                            >
                                Konfirmasi
                            </Button>
                        )}
                    </Group>
                </Paper>
            </form>
        </Container>
    );
}
