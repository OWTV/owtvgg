"use client";

import { Heart } from "lucide-react";
import { useOptimistic } from "react";
import { toast } from "sonner";
import { cn } from "../../../shared/lib/utils";
import { Button } from "../../../shared/ui/base";
import { toggleFavouritePlayer } from "../model/actions";

interface ToggleFavouriteButtonProps {
	playerId: number;
	isFavourite: boolean;
}

export function ToggleFavouriteButton({
	playerId,
	isFavourite,
}: ToggleFavouriteButtonProps) {
	const [optimisticIsFavourite, addOptimisticFavourite] = useOptimistic(
		isFavourite,
		(currentState: boolean) => !currentState,
	);

	async function formAction(formData: FormData) {
		addOptimisticFavourite(null);
		try {
			await toggleFavouritePlayer(Number(formData.get("playerId")));
		} catch (error) {
			let description = "An unexpected error occurred.";
			if (error instanceof Error) {
				description = error.message ?? description;
			}

			toast.error("Update Failed", { description });
		}
	}

	return (
		<form action={formAction}>
			<input type="hidden" name="playerId" value={playerId} />
			<Button
				type="submit"
				variant="ghost"
				size="icon-sm"
				aria-label={
					optimisticIsFavourite ? "Remove from favourites" : "Add to favourites"
				}
			>
				<Heart
					className={cn(
						"size-4 ",
						optimisticIsFavourite
							? "fill-red-500 text-red-500"
							: "text-muted-foreground hover:text-red-500",
					)}
				/>
			</Button>
		</form>
	);
}
