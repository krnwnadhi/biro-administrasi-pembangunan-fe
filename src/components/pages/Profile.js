import { Button, Container, Group, Modal } from "@mantine/core";
import { Carousel, useAnimationOffsetEffect } from "@mantine/carousel";

import { useState } from "react";

export default function Profile() {
    const TRANSITION_DURATION = 200;
    const [opened, setOpened] = useState(false);
    const [embla, setEmbla] = useState(null);

    useAnimationOffsetEffect(embla, TRANSITION_DURATION);

    return (
        <Container size="xl" mt={50}>
            <Group position="center">
                <Button onClick={() => setOpened(true)}>
                    Open modal with carousel
                </Button>
            </Group>
            <Modal
                mt={50}
                opened={opened}
                size="300px"
                padding={0}
                transitionDuration={TRANSITION_DURATION}
                withCloseButton={false}
                onClose={() => setOpened(false)}
            >
                <Carousel loop getEmblaApi={setEmbla}>
                    <Carousel.Slide>
                        <img
                            src="https://cataas.com/cat"
                            alt=""
                            style={{
                                width: 300,
                                height: 200,
                                objectFit: "cover",
                            }}
                        />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <img
                            src="https://cataas.com/cat/cute"
                            alt=""
                            style={{
                                width: 300,
                                height: 200,
                                objectFit: "cover",
                            }}
                        />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <img
                            src="https://cataas.com/cat/angry"
                            alt=""
                            style={{
                                width: 300,
                                height: 200,
                                objectFit: "cover",
                            }}
                        />
                    </Carousel.Slide>
                </Carousel>
            </Modal>
        </Container>
    );
}
