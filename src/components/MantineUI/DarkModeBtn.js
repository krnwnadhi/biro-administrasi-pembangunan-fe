import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

const DarkModeBtn = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    return (
        <div>
            <ActionIcon
                onClick={() => toggleColorScheme()}
                title={dark ? "Mode Terang" : "Mode Gelap"}
            >
                {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
        </div>
    );
};

export default DarkModeBtn;
