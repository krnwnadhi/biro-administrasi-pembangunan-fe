import {
    Center,
    Container,
    Loader,
    Paper,
    Tabs,
    useMantineTheme,
} from "@mantine/core";
import { IconBinaryTree, IconBuildingArch } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Fade } from "react-awesome-reveal";
import { IconLicense } from "@tabler/icons-react";
import SelayangPandang from "./SelayangPandang";
import Struktur from "./Struktur";
import VisiMisi from "./VisiMisi";
import { useMediaQuery } from "@mantine/hooks";

const IndexProfile = () => {
    const history = useHistory();
    const { tabValue } = useParams();
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return (
        <>
            {loading === false ? (
                <Fade delay={500}>
                    <Paper style={{ minHeight: "92vh" }}>
                        <Tabs
                            variant="pills"
                            mt={30}
                            value={tabValue}
                            onTabChange={(value) =>
                                history.push(`/profil/${value}`)
                            }
                            orientation={mobile ? "horizontal" : "vertical"}
                            keepMounted={false}
                            loop
                            radius="lg"
                        >
                            <Tabs.List grow={mobile ? true : false}>
                                <Tabs.Tab
                                    icon={<IconBuildingArch size={16} />}
                                    value="selayangpandang"
                                    p={15}
                                    mx={5}
                                >
                                    Selayang Pandang
                                </Tabs.Tab>
                                <Tabs.Tab
                                    icon={<IconLicense size={16} />}
                                    value="visimisi"
                                    p={15}
                                    mx={5}
                                    color="red"
                                >
                                    Visi & Misi
                                </Tabs.Tab>
                                <Tabs.Tab
                                    icon={<IconBinaryTree size={16} />}
                                    value="struktur"
                                    p={15}
                                    mx={5}
                                    color="teal"
                                >
                                    Struktur Organisasi
                                </Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="selayangpandang">
                                <SelayangPandang />
                            </Tabs.Panel>
                            <Tabs.Panel value="visimisi">
                                <VisiMisi />
                            </Tabs.Panel>
                            <Tabs.Panel value="struktur">
                                <Struktur />
                            </Tabs.Panel>
                        </Tabs>
                    </Paper>
                </Fade>
            ) : (
                <Container size="xl">
                    <Paper style={{ minHeight: "92vh" }}>
                        <Center style={{ width: "auto", height: 460 }}>
                            <Loader size="xl" />
                        </Center>
                    </Paper>
                </Container>
            )}
        </>
    );
};

export default IndexProfile;
