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
   before (placeholder thumbnail, placeholder view count), so it's
   safe to publish real videos one at a time as they go live.
   ============================================================ */

const YOUTUBE_API_KEY = "AIzaSyB3Cy3YP_JHf4f3IPAoCroHVwdWXVMaboI";

/** Fetches live view counts and real publish dates for a list of YouTube video
    IDs. Returns { videoId: { views, publishedAt } }. The `date` typed into
    content-data.js is only ever a placeholder used before this fetch resolves,
    the real YouTube upload date always wins once this loads. */
async function fetchYouTubeVideoInfo(videoIds) {
  if (!videoIds.length) return {};
  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds.join(",")}&key=${YOUTUBE_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    const info = {};
    (data.items || []).forEach((v) => {
      info[v.id] = {
        views: Number(v.statistics.viewCount),
        publishedAt: v.snippet && v.snippet.publishedAt ? v.snippet.publishedAt : null,
      };
    });
    return info;
  } catch (err) {
    console.warn("YouTube video info fetch failed:", err);
    return {};
  }
}

/** Call once per page, after CONTENT_ITEMS exists, before rendering.
    Mutates matching items in place with live view counts and the real
    YouTube upload date, so "Newest" sorting and displayed dates are
    always accurate rather than relying on a hand-typed guess. */
async function syncYouTubeStats(items) {
  const withVideo = items.filter((c) => c.youtubeVideoId);
  if (!withVideo.length) return;
  const info = await fetchYouTubeVideoInfo(withVideo.map((c) => c.youtubeVideoId));
  withVideo.forEach((c) => {
    const found = info[c.youtubeVideoId];
    if (!found) return;
    if (found.views != null) c.views = found.views;
    if (found.publishedAt) c.publishedAt = found.publishedAt;
  });
}

function youtubeThumbnailUrl(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
