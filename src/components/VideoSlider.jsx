import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useContext } from "react";
import { VideoContext } from "../contexts/VideoContext";
import { saveLayout, getLayout } from "../utils/API/Api";
import { toast } from "react-toastify";

function RightSidebar() {
  const { videos } = useContext(VideoContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      videos &&
      videos.playlistsWithVideosAndThumbnails &&
      videos.playlistsWithVideosAndThumbnails.length > 0
    ) {
      const formattedProducts = videos.playlistsWithVideosAndThumbnails.flatMap(
        (playlist, playlistIndex) =>
          playlist.videos.map((video, videoIndex) => ({
            id: `playlist-${playlistIndex}-video-${videoIndex}`,
            title: video.title || `Video ${videoIndex + 1}`,
            thumbnailUrl: video.thumbnails?.high?.url || "",
          }))
      );
      setProducts(formattedProducts);
    }
  }, [videos]);

  const handleSaveLayout = async () => {
    try {
      const response = await saveLayout(products);
      toast.success("Layout saved successfully!");
    } catch (error) {
      toast.error("Error saving layout!");
    }
  };

  const handleLoadLayout = async () => {
    try {
      const response = await getLayout();

      // Check if the response has a 'layout' key and it's an array
      if (Array.isArray(response.layout)) {
        setProducts(response.layout);
        toast.success("Layout loaded successfully!");
      } else {
        toast.error("Layout data is not an array!");
        console.error(
          "Expected 'layout' to be an array but got:",
          response.layout
        );
      }
    } catch (error) {
      toast.error("Error loading layout.");
      console.error("Error loading layout:", error);
    }
  };

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) return;

    const items = Array.from(products);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    setProducts(items);
  };

  return (
    <div className="bg-zinc-800 h-screen rounded-xl w-[350px] py-6 px-4 mt-5">
      <div className="mb-4">
        <label className="block text-white text-sm font-medium mb-2">
          Thumbnail Title
        </label>
        <input
          type="text"
          placeholder="Enter thumbnail title"
          className="w-full px-4 py-2 rounded-md bg-zinc-800 border text-white placeholder-gray-500 focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-white text-sm font-medium mb-2">
          Video Status
        </label>
        <div className="flex items-center space-x-4">
          <label className="text-gray-300">
            <input
              type="radio"
              name="videoStatus"
              value="active"
              className="mr-2"
            />
            Active
          </label>
          <label className="text-gray-300">
            <input
              type="radio"
              name="videoStatus"
              value="inactive"
              className="mr-2"
            />
            Inactive
          </label>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-4">Product List</h3>
      <div className="overflow-y-scroll hidden-scroll max-h-[300px]">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <StrictModeDroppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
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
                        className="flex items-center gap-4 p-4 bg-zinc-800 border border-gray-700 rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105"
                      >
                        <div className="w-20 h-20 bg-gray-900 rounded-md overflow-hidden flex items-center justify-center">
                          {product.thumbnailUrl ? (
                            <img
                              src={product.thumbnailUrl}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-500 rounded-md mb-2"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm">
                            Title : {product.title}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          className="w-5 h-5 accent-blue-500"
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </div>
      {/* Button Section */}
      <div className="flex flex-row gap-3 mt-4 justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M12 2v4m0 12v4m8-8h-4M4 12H2m2.93-7.07l2.83 2.83m11.31 11.31l2.83 2.83M4.22 19.78l2.83-2.83m11.31-11.31l2.83-2.83"
            ></path>
          </svg>
          <span>Update Playlist</span>
        </button>
      </div>

      <div className="flex flex-row justify-between gap-3 mt-4">
        <button
          onClick={handleSaveLayout}
          className="bg-blue-500 hover:bg-blue-700 text-white  border border-blue-700 rounded"
        >
          Save Layout
        </button>

        <button
          onClick={handleLoadLayout}
          className=" bg-blue-500 hover:bg-blue-700 text-white border border-blue-700 rounded"
        >
          Load Layout
        </button>
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

export default RightSidebar;
