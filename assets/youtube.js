/* ============================================================
   YOUTUBE INTEGRATION
   Each entry in content-data.js can carry a real `youtubeVideoId`.
   For any item that has one, this file:
     - pulls the real, live view count from YouTube and overwrites
       the placeholder `views` number
     - swaps the card's gradient placeholder thumbnail for the
       real YouTube thumbnail image
     - lets content-detail.html embed the real playable video
   Items with youtubeVideoId still null keep behaving exactly as
   before (placeholder thumbnail, placeholder view count) — so it's
   safe to publish real videos one at a time as they go live.
   ============================================================ */

const YOUTUBE_API_KEY = "AIzaSyB3Cy3YP_JHf4f3IPAoCroHVwdWXVMaboI";

/** Fetches live view counts for a list of YouTube video IDs. Returns { videoId: viewCount }. */
async function fetchYouTubeViewCounts(videoIds) {
  if (!videoIds.length) return {};
  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds.join(",")}&key=${YOUTUBE_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    const counts = {};
    (data.items || []).forEach((v) => {
      counts[v.id] = Number(v.statistics.viewCount);
    });
    return counts;
  } catch (err) {
    console.warn("YouTube view count fetch failed:", err);
    return {};
  }
}

/** Call once per page, after CONTENT_ITEMS exists, before rendering.
    Mutates matching items in place with live view counts. */
async function syncYouTubeStats(items) {
  const withVideo = items.filter((c) => c.youtubeVideoId);
  if (!withVideo.length) return;
  const counts = await fetchYouTubeViewCounts(withVideo.map((c) => c.youtubeVideoId));
  withVideo.forEach((c) => {
    if (counts[c.youtubeVideoId] != null) c.views = counts[c.youtubeVideoId];
  });
}

function youtubeThumbnailUrl(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
