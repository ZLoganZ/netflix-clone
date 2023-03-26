import axios from "axios";
import React, { useCallback, useMemo } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

interface FavortiteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavortiteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const favoriteIds = currentUser?.favoriteIds || [];
    return favoriteIds.includes(movieId);
  }, [currentUser, movieId]);

  const handleFavorite = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete("/api/favorite", {
        data: { movieId },
      });
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }

    mutate({
      ...currentUser,
      favoriteIds: response?.data?.favoriteIds,
    });
    mutateFavorites();
  }, [isFavorite, movieId, mutate, mutateFavorites, currentUser]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={handleFavorite}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-6 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
