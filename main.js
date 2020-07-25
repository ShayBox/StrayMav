console.log([
  "Some cool l33t hacker params:",
  "",
  "channel: Provide a different channel",
  "light: Light theme",
  "nochat: Disable chat",
  "",
  "Here is an example url: https://straymav.com?channel=slikrick&light&nochat"
].join("\n"));

const url = new URL(window.location);
const params = new URLSearchParams(url.search);
const body = document.body;

const listener = () => {
  body.removeEventListener("click", listener);

  const popup = document.getElementById("popup");
  popup.parentNode.removeChild(popup);

  const twitchEmbed = document.getElementById("twitch-embed");
  twitchEmbed.classList.remove("d-none");

  const embed = new Twitch.Embed("twitch-embed", {
    height: "100%",
    width: "100%",
    channel: params.get("channel") || "straymav",
    theme: params.get("light") === null ? "dark" : "light",
    layout: params.get("nochat") === null ? "video-with-chat" : "video",
  });

  const player = embed.getPlayer();

  embed.addEventListener(Twitch.Embed.VIDEO_READY, () => player.play());
  embed.addEventListener(Twitch.Embed.VIDEO_PLAY, () => setInterval(() => {
    if (player.getMuted() || player.getVolume() < 0.010) {
      player.setMuted(false);
      player.setVolume(0.001);
    }
  }, 1000));
};

body.addEventListener("click", listener);