import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import {
    IconChevronRight,
    IconList,
    IconLogout,
    IconUserCircle,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { forwardRef } from "react";
import { logoutUserAction } from "../redux/slices/users/usersSlices";

const UserButton = forwardRef(
    ({ image, name, email, icon, ...others }, ref) => (
        <UnstyledButton
            ref={ref}
            sx={(theme) => ({
                display: "block",
                width: "100%",
                padding: theme.spacing.md,
                color:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[0]
                        : theme.black,

                "&:hover": {
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            })}
            {...others}
        >
            <Group>
                <Avatar src={image} radius="xl" />

                <div style={{ flex: 1 }}>
                    <Text size="sm" weight={500}>
                        {name}
                    </Text>

                    <Text color="dimmed" size="xs">
                        {email}
                    </Text>
                </div>

                {/* {icon || <IconChevronRight size={16} />} */}
            </Group>
        </UnstyledButton>
    )
);

export default function MenuMantine() {
    const dispatch = useDispatch();

    const state = useSelector((state) => state?.users?.userAuth);

    return (
        <Menu trigger="hover" width={200} shadow="md">
            <Menu.Target>
                <UserButton
                    image={state.profilePhoto}
                    name={state.fullName}
                    email={state.email}
                />
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    icon={<IconUserCircle size={14} />}
                    component={Link}
                    to="/profil"
                >
                    Profil
                </Menu.Item>

                <Menu.Item
                    icon={<IconList size={14} />}
                    component={Link}
                    to="/posts"
                >
                    Daftar Post
                </Menu.Item>

                <Menu.Item
                    icon={<IconList size={14} />}
                    component={Link}
                    to="/kategori"
                >
                    Daftar Kategori
                </Menu.Item>

                <Menu.Item
                    onClick={() => dispatch(logoutUserAction())}
                    component={Link}
                    to="/"
                    icon={<IconLogout size={14} />}
                >
                    Log Out
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
