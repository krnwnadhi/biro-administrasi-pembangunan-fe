import { Center, Paper } from "@mantine/core";
import React, { useState } from "react";

function YouTubeEmbed({ embedUrl }) {
    return (
        <div className="video-responsive">
            <iframe
                width="450"
                height="215"
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}

function VideoList() {
    const [inputValue, setInputValue] = useState("");
    const [embedUrl, setEmbedUrl] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        // Extract the video ID from the URL using a regular expression
        const videoIdMatch = inputValue.match(
            /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)$/
        );
        if (videoIdMatch) {
            const videoId = videoIdMatch[1];
            setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
        } else {
            alert("Invalid YouTube video URL");
        }
    }

    return (
        <Paper style={{ minHeight: "92vh" }}>
            <Center>
                <form onSubmit={handleSubmit}>
                    <label>
                        YouTube video URL:
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(event) =>
                                setInputValue(event.target.value)
                            }
                        />
                    </label>
                    <button type="submit">Embed video</button>
                </form>
                {embedUrl && <YouTubeEmbed embedUrl={embedUrl} />}
            </Center>
        </Paper>
    );
}

export default VideoList;
