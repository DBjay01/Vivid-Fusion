"use client";

import { useState } from "react";
import { Heading } from "@/components/heading"; // Assuming you have a Heading component similar to the music page
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
import { MessageSquare, VideoIcon } from "lucide-react";

// Define an interface for the video structure
interface VideoFile {
  link: string;
}

interface Video {
  id: number;
  video_files: VideoFile[];
}

export default function VideoSearch() {
  const [query, setQuery] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  const fetchVideos = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/getVideos?query=${query}`);
    const data = await res.json();
    setVideos(data.videos); // Assume that 'data.videos' returns an array of videos
    setIsLoading(false);
  };

  return (
    <div className="px-4 lg:px-8">
      <Heading
        title="Generate Videos"
        description="Turn your prompt into videos"
        icon={VideoIcon} // Use a relevant icon
        iconColor="text-blue-500" // Change color as needed
        bgColor="bg-blue-500/10" // Change background color as needed
      />
      <div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your video prompt"
            className="flex-1 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
            disabled={isLoading}
          />
          <Button onClick={fetchVideos} disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? "Searching..." : "Search Videos"}
          </Button>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              {/* Optionally add a loader here */}
            </div>
          ) : (
            <div className="flex flex-col-reverse gap-y-4">
              {videos.length > 0 ? (
                videos.map((video) => (
                  <video
                    key={video.id}
                    src={video.video_files[0].link}
                    controls
                    className="w-full mt-2 rounded-lg"
                  />
                ))
              ) : (
                <p>No videos found. Try searching for something else.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




// "use client" ;

// import { useState } from 'react';

// // Define an interface for the video structure
// interface VideoFile {
//   link: string;
// }

// interface Video {
//   id: number;
//   video_files: VideoFile[];
// }

// export default function VideoSearch() {
//   const [query, setQuery] = useState<string>('');
//   const [videos, setVideos] = useState<Video[]>([]); // Explicitly set the type for videos

//   const fetchVideos = async () => {
//     const res = await fetch(`/api/getVideos?query=${query}`);
//     const data = await res.json();
//     setVideos(data.videos); // Assume that 'data.videos' returns an array of videos
//   };

//   return (
//     <div className="video-search-container">
//       <h1>Generate Videos</h1>
//       <div className="search-bar">
//         <input 
//           type="text" 
//           value={query} 
//           onChange={(e) => setQuery(e.target.value)} 
//           placeholder="Enter your video prompt" 
//           className="search-input"
//         />
//         <button onClick={fetchVideos} className="search-button">Search Videos</button>
//       </div>

//       <div className="video-results">
//         {videos.length > 0 ? (
//           videos.map((video) => (
//             <video key={video.id} src={video.video_files[0].link} controls className="video-item" />
//           ))
//         ) : (
//           <p>No videos found. Try searching for something else.</p>
//         )}
//       </div>

//       <style jsx>{`
//         .video-search-container {
//           padding: 20px;
//         }
//         .search-bar {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 20px;
//         }
//         .search-input {
//           padding: 10px;
//           width: 300px;
//         }
//         .search-button {
//           padding: 10px 20px;
//           background-color: #0070f3;
//           color: white;
//           border: none;
//           cursor: pointer;
//         }
//         .video-results {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 20px;
//         }
//         .video-item {
//           width: 300px;
//           height: auto;
//         }
//       `}</style>
//     </div>
//   );
// }
