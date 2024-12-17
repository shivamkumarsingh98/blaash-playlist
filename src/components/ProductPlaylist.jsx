import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useContext } from "react";
import { VideoContext } from "../contexts/VideoContext";

function ProductPlaylist() {
  const { videos } = useContext(VideoContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      videos &&
      videos.playlistsWithVideosAndThumbnails &&
      videos.playlistsWithVideosAndThumbnails.length > 0
    ) {
      const formattedProducts = videos.playlistsWithVideosAndThumbnails.map(
        (playlist, index) => ({
          id: `playlist-${index}`,
          title: playlist.playlistTitle || `Playlist ${index + 1}`,
          videoCount: playlist.videos.length,
          thumbnails: playlist.videos[0].thumbnails.high || {},
        })
      );
      setProducts(formattedProducts);
      setIsLoading(false); // Set loading state to false after videos are fetched
    }
  }, [videos]);

  // Handle DND logic
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside the list, do nothing
    if (!destination) return;

    // Reorder the playlists
    const reordered = Array.from(products);
    const [removed] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, removed);

    setProducts(reordered);
  };

  return (
    <div className="bg-zinc-800 h-screen flex text-white rounded-lg overflow-y-scroll hidden-scroll">
      <div className="w-full max-w-6xl p-6">
        {isLoading ? (
          <div className="text-center text-lg">Click Import to get started</div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="droppable">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex flex-wrap gap-4" // Changed to flex for row layout
                >
                  {products.map((product, index) => (
                    <Draggable
                      key={product.id}
                      draggableId={product.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="relative w-[300px] h-[170px] rounded-lg overflow-hidden shadow-md bg-zinc-800 group"
                        >
                          {/* Thumbnail */}
                          <img
                            src={product.thumbnails.url}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                          {/* Title and Video Count */}
                          <div className="absolute bottom-2 left-2 right-2 text-white">
                            <h2 className="font-semibold text-sm truncate">
                              {product.title}
                            </h2>
                            <div className="flex items-center gap-1 text-xs mt-1">
                              <span className="material-icons text-base">
                                video_library
                              </span>
                              <span>{product.videoCount} Videos</span>
                            </div>
                          </div>

                          {/* Three Dots Icon (Top Right) */}
                          <button className="absolute top-2 right-2 w-8 h-8 bg-zinc-900/70 rounded-full flex items-center justify-center text-white hover:bg-zinc-700 transition">
                            <span className="material-icons text-sm">
                              more_horiz
                            </span>
                          </button>

                          {/* Blue Left Border */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}

const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => setEnabled(true), []);
  if (!enabled) return null;
  return <Droppable {...props}>{children}</Droppable>;
};

export default ProductPlaylist;
